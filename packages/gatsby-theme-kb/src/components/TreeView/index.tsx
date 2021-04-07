import * as React from 'react'
import './tree-view.css'
import { IconChevronRight } from '../icons'

export type TreeNodeRawData = {
  id: string
  label: string
  isLeaf: boolean
  isExpanded?: boolean
  parentId?: string | null
  className?: string
}

type TreeNodeData = TreeNodeRawData & {
  children?: TreeNodeData[]
  depth: number
}

interface TreeCommonProps {
  onSelect(node: TreeNodeData): void
  onBranchNodeClick?(node: TreeNodeData): void
  renderLabel?(props: TreeNodeProps, opts: { labelClassName: string }): JSX.Element
}

export interface TreeNodeProps extends TreeCommonProps {
  data: TreeNodeData
}
export interface ITreeViewProps extends TreeCommonProps {
  nodes: TreeNodeRawData[]
}

export default function TreeView(props: ITreeViewProps) {
  const tree = buildTree(props.nodes)
  return (
    <ul className="tree-view">
      {tree.rootNode.children!.map((node) => {
        return (
          <MemorizedTreeNode
            {...props}
            key={node.id}
            data={node}
          ></MemorizedTreeNode>
        )
      })}
    </ul>
  )
}

function TreeNode(props: TreeNodeProps) {
  const { data, onSelect, onBranchNodeClick } = props
  const onClick = (e: React.MouseEvent) => {
    if (data.isLeaf) onSelect(data)
    e.stopPropagation()
  }
  const labelClassName = 'tree-view__label'
  const nodeLabel = props.renderLabel ? (
    props.renderLabel(props, { labelClassName })
  ) : (
    <span onClick={onClick} className={`${labelClassName} ${data.className}`}>{data.label}</span>
  )
  const onNodeClick = (e: React.MouseEvent) => {
    if (!data.isLeaf && onBranchNodeClick) {
      e.stopPropagation()
      onBranchNodeClick(data)
    }
  }
  return (
    <li className={`tree-view__node ${data.className || ''}`} data-depth={data.depth} onClick={onNodeClick}>
      <span className="tree-view__node-header" data-id={data.id}>
        {!data.isLeaf && <IconChevronRight className={`tree-view__icon ${data.isExpanded ? 'tree-view__icon--expanded': ''}`} />}
        {nodeLabel}
      </span>
      {(data.isLeaf || !data.isExpanded) ? null : (
        <ul className="tree-view__sub-tree">
          {data.children!.map((childNode) => {
            return (
              <MemorizedTreeNode
                key={childNode.id}
                data={childNode}
                onSelect={onSelect}
                renderLabel={props.renderLabel}
                onBranchNodeClick={onBranchNodeClick}
              ></MemorizedTreeNode>
            )
          })}
        </ul>
      )}
    </li>
  )
}

const MemorizedTreeNode = React.memo(TreeNode)

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
            isExpanded: node.isExpanded,
          }
        }
      }
      parentNode = treeMap[node.parentId]
    } else {
      parentNode = rootNode
    }

    const treeNode: TreeNodeData = {
      isExpanded: false,
      ...node,
      depth: parentNode.depth + 1,
      children: [],
    }
    // console.log('tree node', treeNode)
    treeMap[node.id] = treeNode
    parentNode.children.push(treeNode)
    treeNodes.push(treeNode)
  }
  return { rootNode, treeNodes }
}
