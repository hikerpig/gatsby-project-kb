import {
  CreateSchemaCustomizationArgs,
  SetFieldsOnGraphQLNodeTypeArgs,
  Node,
} from 'gatsby'
import { PluginOptions, resolveOptions } from './options'
import { generateData } from './compute-inbounds'
import { getCachedNode, getInboundReferences } from './cache'
import { nonNullable } from './util'
import { NodeReference } from './type'

export const createSchemaCustomization = (
  { actions }: CreateSchemaCustomizationArgs,
  _options?: PluginOptions
) => {
  const options = resolveOptions(_options)
  actions.createTypes(`
    union ReferenceTarget = ${options.types.join(' | ')}

    type NodeReference {
      target: ReferenceTarget
      refWord: String
      referrer: ReferenceTarget
      targetAnchor: String
      contextLine: String
      label: String
    }
  `)
}

export const setFieldsOnGraphQLNodeType = (
  { cache, type, getNode }: SetFieldsOnGraphQLNodeTypeArgs,
  _options?: PluginOptions
) => {
  const options = resolveOptions(_options)

  // if we shouldn't process this node, then return
  if (!options.types.includes(type.name)) {
    return {}
  }

  return {
    outboundReferences: {
      type: `[NodeReference!]!`,
      resolve: async (node: Node) => {
        let cachedNode = await getCachedNode(cache, node.id, getNode)

        if (!cachedNode || !cachedNode.resolvedOutboundReferences) {
          await generateData(cache, getNode)
          cachedNode = await getCachedNode(cache, node.id, getNode)
        }

        if (cachedNode && cachedNode.resolvedOutboundReferences) {
          return cachedNode.resolvedOutboundReferences
            .map((refNode) => {
              const { target } = refNode
              const targetNode = getNode(target.id)
              if (!targetNode) return null
              return {
                ...refNode,
                target: targetNode,
              } as NodeReference
            })
            .filter(nonNullable)
        }

        return []
      },
    },
    inboundReferences: {
      type: `[NodeReference!]!`,
      resolve: async (node: Node) => {
        let data = await getInboundReferences(cache)

        if (!data) {
          await generateData(cache, getNode)
          data = await getInboundReferences(cache)
        }

        if (data) {
          return (data[node.id] || [])
            .map((refNode) => {
              const { target } = refNode
              const targetNode = getNode(target.id)
              if (!targetNode) return null
              return {
                ...refNode,
                target: targetNode,
              } as NodeReference
            })
            .filter(nonNullable)
        }

        return []
      },
    },
  }
}
