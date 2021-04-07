import * as path from 'path'

export const CONTEXT_TREE_CACHE_KEY = 'content-tree-repr'

export class ContentNode<T = { name: string; path: string; key: string }> {
  constructor(public data: T) {}
}

export class ContentTree {
  pathMap = new Map<string, ContentNode>()
  shortPathMap = new Map<string, ContentNode>()
  keyMap = new Map<string, ContentNode>()
  nodes = new Set()

  constructor(public rootNode: ContentNode) {}

  static fromRepr(repr: string) {
    const { nodes, rootPath } = JSON.parse(repr)
    const tree = new ContentTree(
      new ContentNode({
        name: rootPath,
        path: rootPath,
        key: rootPath,
      })
    )
    nodes.forEach((node) => {
      tree.add(node)
    })
    return tree
  }

  add(node: ContentNode) {
    const p = node.data.path
    this.pathMap.set(node.data.path, node)
    this.keyMap.set(node.data.key, node)

    const extLength = path.extname(p).length
    const pathWithoutExt = p.slice(0, -extLength)
    this.shortPathMap.set(pathWithoutExt, node)

    this.nodes.add(node)
  }

  getByName(p: string) {
    return this.keyMap.get(p)
  }

  serialize(): string {
    const nodes = Array.from(this.nodes)
    return JSON.stringify({ nodes, rootPath: this.rootNode.data.name }, null, 2)
  }

  getNode(input: string) {
    const relPath = path.relative(this.rootNode.data.name, input)
    const key = path.basename(relPath)
    if (this.pathMap.has(relPath)) return this.pathMap.get(relPath)
    if (this.shortPathMap.has(relPath)) return this.shortPathMap.get(relPath)
    if (this.keyMap.has(key)) return this.keyMap.get(key)
  }
}

