import { basename, extname } from 'path'
import { Node } from 'gatsby'
import { nonNullable } from './util'
import { getAllCachedNodes, setCachedNode, setInboundReferences, InboundReferences } from './cache'
import { MdxNode, NodeReference } from './type'
import { Reference } from './get-references'

function hasChildInArrayExcept(
  node: MdxNode,
  array: MdxNode[],
  except: string,
  getNode: (id: string) => MdxNode | undefined
): boolean {
  return node.children.some(id => {
    if (id === except) {
      return false
    }

    if (array.some(x => x.id === id)) {
      return true
    }

    const child = getNode(id)
    if (!child || !child.children || !child.children.length) {
      return false
    }

    return hasChildInArrayExcept(child, array, except, getNode)
  })
}

let currentGeneration: Promise<boolean> | undefined

export async function generateData(cache: any, getNode: Function) {
  if (currentGeneration) {
    return currentGeneration
  }

  currentGeneration = Promise.resolve().then(async () => {
    const nodes = await getAllCachedNodes(cache, getNode)
    const inboundReferences: InboundReferences = {}

    function getRefNode(ref: Reference) {
      const title = ref.target
      return nodes.find(
        x =>
          x.title === title ||
          x.aliases.some(alias => alias === title) ||
          (typeof x.node.fileAbsolutePath === 'string' &&
            basename(
              x.node.fileAbsolutePath,
              extname(x.node.fileAbsolutePath)
            ) === title) ||
          (typeof x.node.absolutePath === 'string' &&
            basename(x.node.absolutePath, extname(x.node.absolutePath)) ===
              title)
      )
    }

    await Promise.all(
      nodes
        .map(node => {
          const mapped = node.outboundReferences.pages
            .concat(node.outboundReferences.blocks)
            .map(reference => {
              const cachedNode = getRefNode(reference)
              if (!cachedNode) return null
              return {
                contextLine: reference.contextLine,
                node: cachedNode.node,
              }
            })
            .filter(nonNullable)

          mapped.forEach(item => {
            const nodeId = item.node.id
            if (!inboundReferences[nodeId]) {
              inboundReferences[nodeId] = []
            }
            inboundReferences[nodeId].push({
              contextLine: item.contextLine,
              node: item.node,
            })
          })

          return {
            ...node,
            resolvedOutboundReferences: mapped,
          }
        })
        .map(data => setCachedNode(cache, data.node.id, data))
    )

    Object.keys(inboundReferences).forEach(nodeId => {
      inboundReferences[nodeId] = inboundReferences[nodeId].filter(
        reference =>
          getNode(reference.node.parent) &&
          !hasChildInArrayExcept(
            getNode(reference.node.parent),
            inboundReferences[nodeId].map(o => o.node),
            reference.node.id,
            getNode as any
          )
      )
    })

    await setInboundReferences(cache, inboundReferences)

    currentGeneration = undefined

    return true
  })

  return currentGeneration
}
