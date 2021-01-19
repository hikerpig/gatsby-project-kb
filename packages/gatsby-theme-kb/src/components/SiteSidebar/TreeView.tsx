import * as React from 'react';

type TreeNodeRawData = {
  id: string
  parentId?: string
  label: string
}

type TreeNodeData = TreeNodeRawData & {
  isLeaf: boolean
  children?: TreeNodeData[]
  depth: number
}

type TreeNodeProps = {
  data: TreeNodeData
  onSelect(node: TreeNodeData): void
  renderLabel?(props: TreeNodeProps): JSX.Element
}

export interface ITreeViewProps {
  nodes: TreeNodeRawData[]
  onSelect(node: TreeNodeData): void
  renderLabel?(props: TreeNodeProps): JSX.Element
}

function TreeNode(props: TreeNodeProps) {
  const { data, onSelect } = props
  const onClick = () => {
    if (data.isLeaf) onSelect(data)
  }
  const nodeLabel = props.renderLabel ? props.renderLabel(props): (
    <span onClick={onClick}>{data.label}</span>
  )
  return (
    <div className="tree-node" style={{marginLeft: '5px'}}>
      {nodeLabel}
      {data.isLeaf ? null: data.children!.map((childNode) => {
        return <TreeNode
          key={childNode.id}
          data={childNode}
          onSelect={onSelect}
        ></TreeNode>
      })}
    </div>
  )
}

function buildTree(nodes: TreeNodeRawData[]) {
  const rootNode: TreeNodeData = {
    id: '__root__',
    label: '__root__',
    isLeaf: false,
    children: [],
    depth: 0,
  }
  const treeNodes = [rootNode]
  const treeMap = {
    [rootNode.id]: rootNode,
  }
  const allIds = [rootNode.id].concat(nodes.map(node => node.id))
  const nodeQueue = nodes.slice()
  while (nodeQueue.length) {
    const node = nodeQueue.shift()!
    let parentNode
    if (node.parentId) {
      if (!treeMap[node.parentId]) {
        if (allIds.includes(node.parentId)) {
          nodeQueue.push(node)
          continue
        } else {
          treeMap[node.parentId] = {
            id: node.parentId,
            label: '',
            isLeaf: false,
            children: [],
            depth: 1,
          }
        }
      }
      parentNode = treeMap[node.parentId]
    } else {
      parentNode = rootNode
    }

    const treeNode: TreeNodeData = {
      ...node,
      isLeaf: true,
      depth: parentNode.depth + 1,
    }
    parentNode.children.push(treeNode)
    treeNodes.push(treeNode)
  }
  return { rootNode, treeNodes }
}

export default function TreeView (props: ITreeViewProps) {
  const tree = buildTree(props.nodes)
  console.log('tree is', tree)
  return (
    <div>
      {tree.rootNode.children!.map((node) => {
        return <TreeNode key={node.id} data={node} onSelect={props.onSelect} renderLabel={props.renderLabel}></TreeNode>
      })}
    </div>
  );
}
