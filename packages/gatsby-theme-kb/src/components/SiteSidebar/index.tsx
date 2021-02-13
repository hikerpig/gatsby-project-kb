import * as React from 'react'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import TreeView, { TreeNodeRawData, TreeNodeProps } from '../TreeView'
import Search from '../Search'
import { PageContext } from '../../type'
import './site-sidebar.css'

function getDirectoriesByPath(dir: string) {
  const segs = dir.split('/')
  const directories: string[] = []
  let cur = ''
  segs.forEach((seg) => {
    const joinedCur = cur ? [cur, seg].join('/') : seg
    directories.push(joinedCur)
    cur = joinedCur
  })
  return directories
}

export interface ISiteSidebarProps {
  pageContext: PageContext
  title: string
  isMobileMode?: boolean
}

type RemarkNode = {
  frontmatter?: {
    title: string
  }
  parent: {
    id: string
    relativeDirectory: string
    relativePath: string
    name: string
    fields: {
      slug: string
      title: string
    }
  }
}

export default function SiteSidebar(props: ISiteSidebarProps) {
  const { pageContext, title, isMobileMode } = props
  const data = useStaticQuery(graphql`
    query SiteSidebarQuery {
      allMdx {
        nodes {
          frontmatter {
            title
          }
          parent {
            id
            ... on File {
              id
              name
              relativeDirectory
              relativePath
              fields {
                title
                slug
              }
            }
          }
        }
      }
    }
  `)

  const nodes = data.allMdx!.nodes as RemarkNode[]

  // console.log('data', data, pageContext)
  const treeNodes: TreeNodeRawData[] = []
  const treeDataMap: Record<string, TreeNodeRawData> = {}
  const nodeMap: Record<string, RemarkNode> = {}
  const validNodes = nodes.filter((node) => node.parent)

  function makeDirectoryNodes(inputPath: string) {
    const directories = getDirectoriesByPath(inputPath)
    let parentDirId
    directories.forEach((dir) => {
      if (!treeDataMap[dir]) {
        const dirNode: TreeNodeRawData = {
          id: dir,
          label: dir,
          parentId: parentDirId,
          isLeaf: false,
        }
        treeDataMap[dir] = dirNode
        treeNodes.push(dirNode)
      }
      parentDirId = dir
    })
  }

  validNodes.forEach((node) => {
    if (node.parent.relativeDirectory) {
      makeDirectoryNodes(node.parent.relativeDirectory)
    }
  })
  validNodes.forEach((node) => {
    if (!node.parent) return
    const file = node.parent
    const parentNode = file.relativeDirectory ? treeDataMap[file.relativeDirectory]: null
    const treeNode: TreeNodeRawData = {
      id: file.id,
      label: node.frontmatter?.title || file.fields.title,
      parentId: parentNode ? parentNode.id: null,
      isLeaf: true,
    }
    const isCurrent = file.id === pageContext.id
    if (isCurrent) {
      treeNode['className'] = 'site-sidebar__link--cur'
      if (parentNode) {
        parentNode.isExpanded = true
      }
    }
    treeNodes.push(treeNode)
    treeDataMap[file.id] = treeNode
    nodeMap[file.id] = node
  })

  const onNodeSelect = (treeNode) => {
    const node = nodeMap[treeNode.id]
    if (node) {
      navigate(node.parent.fields.slug)
    }
  }

  const renderLabel: TreeNodeProps['renderLabel'] = (nodeProps, { labelClassName }) => {
    const { data } = nodeProps
    const node = nodeMap[data.id]
    let slug = ''
    if (node) {
      slug = node.parent.fields.slug
    }
    if (data.isLeaf) {
      // console.log('slug is', slug, node.parent.fields)
      return (
        <Link className={`site-sidebar__link ${labelClassName}`} onClick={onNodeSelect} to={slug}>
          {data.label}
        </Link>
      )
    } else {
      return (
        <span className={`${labelClassName}`}>{ data.label }</span>
      )
    }
  }

  const onBranchNodeClick: TreeNodeProps['onBranchNodeClick'] = (nodeProps) => {
    const dataNode = treeDataMap[nodeProps.id]
    const newDataNode = {...dataNode, isExpanded: !nodeProps.isExpanded}
    treeDataMap[nodeProps.id] = newDataNode
    const newTreeNodes = Object.values(treeDataMap)
    setTreeNodes(newTreeNodes)
  }

  const [stateTreeNodes, setTreeNodes] = React.useState<TreeNodeRawData[]>(treeNodes)

  return (
    <div className="site-sidebar py-5 px-2">
      <div className="site-sidebar__title">
        {title}
      </div>
      <div className="site-sidebar__search">
        <Search isMobileMode={isMobileMode} />
      </div>
      <div className="site-sidebar__files">
        <TreeView
          nodes={stateTreeNodes}
          onSelect={onNodeSelect}
          onBranchNodeClick={onBranchNodeClick}
          renderLabel={renderLabel}
        ></TreeView>
      </div>
    </div>
  )
}
