import * as React from 'react'
import './tree-view.css'

export type TreeNodeRawData = {
  id: string
  label: string
  isLeaf: boolean
  parentId?: string | null
  className?: string
}

type TreeNodeData = TreeNodeRawData & {
  children?: TreeNodeData[]
  depth: number
}

interface TreeCommonProps {
  onSelect(node: TreeNodeData): void
  renderLabel?(props: TreeNodeProps, opts: { labelClassName: string }): JSX.Element
}

export interface TreeNodeProps extends TreeCommonProps {
  data: TreeNodeData
}
export interface ITreeViewProps extends TreeCommonProps {
  nodes: TreeNodeRawData[]
}

function TreeNode(props: TreeNodeProps) {
  const { data, onSelect } = props
  const onClick = () => {
    if (data.isLeaf) onSelect(data)
  }
  const labelClassName = 'tree-view__label'
  const nodeLabel = props.renderLabel ? (
    props.renderLabel(props, { labelClassName })
  ) : (
    <span onClick={onClick} className={`${labelClassName} ${data.className}`}>{data.label}</span>
  )
  return (
    <li className={`tree-view__node ${data.className}`} data-depth={data.depth}>
      {nodeLabel}
      {data.isLeaf ? null : (
        <ul>
          {data.children!.map((childNode) => {
            return (
              <TreeNode
                key={childNode.id}
                data={childNode}
                onSelect={onSelect}
                renderLabel={props.renderLabel}
              ></TreeNode>
            )
          })}
        </ul>
      )}
    </li>
  )
}

const MAX_LOOP_COUNT = 200000

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
  const allIds = [rootNode.id].concat(nodes.map((node) => node.id))
  const nodeQueue = nodes.slice()
  let cur = 0
  while (nodeQueue.length) {
    const node = nodeQueue.shift()!
    let parentNode
    if (cur++ > MAX_LOOP_COUNT) {
      console.error('[TreeView], exceeds MAX_LOOP_COUNT, need to check nodes data')
      break
    }
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
      depth: parentNode.depth + 1,
      children: [],
    }
    treeMap[node.id] = treeNode
    parentNode.children.push(treeNode)
    treeNodes.push(treeNode)
  }
  return { rootNode, treeNodes }
}

export default function TreeView(props: ITreeViewProps) {
  const tree = buildTree(props.nodes)
  return (
    <ul className="tree-view">
      {tree.rootNode.children!.map((node) => {
        return (
          <TreeNode
            key={node.id}
            data={node}
            onSelect={props.onSelect}
            renderLabel={props.renderLabel}
          ></TreeNode>
        )
      })}
    </ul>
  )
}
