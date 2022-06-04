import { basename, extname } from 'path'
import { GatsbyCache } from 'gatsby'
import { nonNullable } from './util'
import {
  getAllCachedNodes,
  setCachedNode,
  setInboundReferences,
  InboundReferences,
  CachedNode,
} from './cache'
import { MdxNode, NodeReference } from './type'
import { Reference } from './get-references'
import { ContentNode, ContentTree, CONTEXT_TREE_CACHE_KEY } from './content-tree'

function hasChildInArrayExcept(
  node: MdxNode,
  array: MdxNode[],
  except: string,
  getNode: (id: string) => MdxNode | undefined
): boolean {
  return node.children.some((id) => {
    if (id === except) {
      return false
    }

    if (array.some((x) => x.id === id)) {
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

function getFilePathFromCachedNode(x: CachedNode) {
  let filePath: string
  if (typeof x.node.fileAbsolutePath === 'string') {
    filePath = x.node.fileAbsolutePath
  } else if (typeof x.node.absolutePath === 'string') {
    filePath = x.node.absolutePath
  }
  return filePath
}

export async function generateData(cache: GatsbyCache, getNode: Function) {
  if (currentGeneration) {
    return currentGeneration
  }

  currentGeneration = Promise.resolve().then(async () => {
    const nodes = await getAllCachedNodes(cache, getNode)
    const inboundReferences: InboundReferences = {}

    let tree: ContentTree
    let cachedNodeToContentNodeMap: Map<CachedNode, ContentNode>
    const contextTreeRepr = await cache.get(CONTEXT_TREE_CACHE_KEY)
    if (contextTreeRepr) {
      tree = ContentTree.fromRepr(contextTreeRepr)

      cachedNodeToContentNodeMap = new Map<CachedNode, ContentNode>()
      nodes.forEach((cachedNode) => {
        const filePath = getFilePathFromCachedNode(cachedNode)
        if (!filePath) return
        const contentNode = tree.getNode(filePath)
        if (contentNode) {
          cachedNodeToContentNodeMap.set(cachedNode, contentNode)
        }
      })
    }

    function getRefNode(ref: Reference) {
      const title = ref.target
      if (!title) return
      let node = nodes.find((x) => {
        if (x.title === title || x.aliases.some((alias) => alias === title)) {
          return true
        }

        const filePath = getFilePathFromCachedNode(x)
        if (filePath) {
          if (tree) {
            if (cachedNodeToContentNodeMap.has(x)) {
              const contentNodeByTitle = tree.getNode(title)
              if (contentNodeByTitle === cachedNodeToContentNodeMap.get(x)) {
                return true
              }
            }
          } else {
            return basename(filePath, extname(filePath)) === title
          }
        }
      })
      return node
    }

    await Promise.all(
      nodes
        .map((node) => {
          const mapped = node.outboundReferences.pages
            .map((reference) => {
              const cachedNode = getRefNode(reference)
              if (!cachedNode) return null
              return {
                contextLine: reference.contextLine,
                target: cachedNode.node,
                referrer: reference.referrerNode,
                refWord: reference.label || reference.target,
                label: reference.label,
                targetAnchor: reference.targetAnchor,
              } as NodeReference
            })
            .filter(nonNullable)

          mapped.forEach((item) => {
            const nodeId = item.target.id
            if (!inboundReferences[nodeId]) {
              inboundReferences[nodeId] = []
            }
            inboundReferences[nodeId].push({
              contextLine: item.contextLine,
              target: item.target,
              referrer: node.node,
              refWord: item.refWord,
            })
          })

          return {
            ...node,
            resolvedOutboundReferences: mapped,
          }
        })
        .map((data) => setCachedNode(cache, data.node.id, data))
    )

    Object.keys(inboundReferences).forEach((nodeId) => {
      inboundReferences[nodeId] = inboundReferences[nodeId].filter(
        (reference) =>
          getNode(reference.target.parent) &&
          !hasChildInArrayExcept(
            getNode(reference.target.parent),
            inboundReferences[nodeId].map((o) => o.target),
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
