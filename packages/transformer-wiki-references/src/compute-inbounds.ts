import { basename, extname } from 'path'
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
      // console.log('[cm] getRefNode for target', ref.target, ', nodes: ', nodes)
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
            .map(reference => {
              const cachedNode = getRefNode(reference)
              if (!cachedNode) return null
              return {
                contextLine: reference.contextLine,
                target: cachedNode.node,
                referrer: reference.referrerNode,
                targetAnchor: reference.targetAnchor,
              } as NodeReference
            })
            .filter(nonNullable)

          mapped.forEach(item => {
            const nodeId = item.target.id
            if (!inboundReferences[nodeId]) {
              inboundReferences[nodeId] = []
            }
            inboundReferences[nodeId].push({
              contextLine: item.contextLine,
              target: item.target,
              referrer: node.node,
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
          getNode(reference.target.parent) &&
          !hasChildInArrayExcept(
            getNode(reference.target.parent),
            inboundReferences[nodeId].map(o => o.target),
            reference.target.id,
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
