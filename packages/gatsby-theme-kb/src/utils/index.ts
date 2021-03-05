export function recursivelyCallNode<T>(node: T, getNextNode: (node: T) => T | void, cb: (node: T) => void) {
  cb(node)
  const nextNode = getNextNode(node)
  if (nextNode) {
    recursivelyCallNode(nextNode, getNextNode, cb)
  }
}
