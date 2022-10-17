import React, { useCallback, useState, useEffect } from 'react'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import TreeView, { TreeNodeRawData, TreeNodeProps } from '../TreeView'
import Search from '../Search'
import { PageContext } from '../../type'
import { recursivelyCallNode } from '../../utils/index'
import { SEARCH_HOTKEY } from '../../configs/hotkeys'
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

  const [treeNodes, setTreeNodes] = useState<TreeNodeRawData[]>([])
  const [treeDataMap, setTreeDataMap] = useState<
    Record<string, TreeNodeRawData>
  >({})
  const [nodeMap, setNodeMap] = useState<Record<string, RemarkNode>>({})

  // initialize
  useEffect(() => {
    const nodes = data.allMdx!.nodes as RemarkNode[]
    const validNodes = nodes.filter((node) => node.parent).sort((a,b) => {
      if (a.parent.relativePath > b.parent.relativePath) return 1
      if (a.parent.relativePath < b.parent.relativePath) return -1
      return 0
    })

    function makeDirectoryNodes(inputPath: string) {
      const directories = getDirectoriesByPath(inputPath)
      let parentDirId
      directories.forEach((dir) => {
        if (!treeDataMap[dir]) {
          const dirLabel = dir.split('/').pop() || dir
          const dirNode: TreeNodeRawData = {
            id: dir,
            label: dirLabel,
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

    const expandedParents: TreeNodeRawData[] = []

    validNodes.forEach((node) => {
      if (!node.parent) return
      const file = node.parent
      const parentNode = file.relativeDirectory
        ? treeDataMap[file.relativeDirectory]
        : null
      const treeNode: TreeNodeRawData = {
        id: file.id,
        label: node.frontmatter?.title || file.fields.title,
        parentId: parentNode ? parentNode.id : null,
        isLeaf: true,
      }
      const isCurrent = file.id === pageContext.id
      if (isCurrent) {
        treeNode['className'] = 'site-sidebar__link--cur'
        if (parentNode) {
          expandedParents.push(parentNode)
        }
      }
      treeNodes.push(treeNode)
      treeDataMap[file.id] = treeNode
      nodeMap[file.id] = node
    })

    // expand parent node through the pah
    const _getParentNode = (node: TreeNodeRawData) =>
      node.parentId ? treeDataMap[node.parentId] : undefined
    expandedParents.forEach((node) => {
      recursivelyCallNode(node, _getParentNode, (_node) => {
        _node.isExpanded = true
      })
    })

    setTreeNodes(treeNodes.slice())
    setNodeMap(nodeMap)
    setTreeDataMap(treeDataMap)

    return () => {}
  }, [])

  const onNodeSelect = useCallback(
    (treeNode) => {
      const node = nodeMap[treeNode.id]
      if (node) {
        navigate(node.parent.fields.slug)
      }
    },
    [nodeMap]
  )

  const renderLabel: TreeNodeProps['renderLabel'] = useCallback(
    (nodeProps, { labelClassName }) => {
      const { data } = nodeProps
      const node = nodeMap[data.id]
      let slug = ''
      if (node) {
        slug = node.parent.fields.slug
      }
      if (data.isLeaf) {
        // console.log('slug is', slug, node.parent.fields)
        return (
          <Link
            className={`site-sidebar__link ${labelClassName}`}
            onClick={onNodeSelect}
            to={slug}
          >
            {data.label}
          </Link>
        )
      } else {
        return <span className={`${labelClassName}`}>{data.label}</span>
      }
    },
    [onNodeSelect, nodeMap]
  )

  const onBranchNodeClick: TreeNodeProps['onBranchNodeClick'] = useCallback(
    (nodeProps) => {
      const dataNode = treeDataMap[nodeProps.id]
      const newDataNode = { ...dataNode, isExpanded: !nodeProps.isExpanded }
      treeDataMap[nodeProps.id] = newDataNode

      // make parent nodes expanded otherwise their state will be lost.
      //  this logic should be in TreeView rather than here, need to separate it.
      recursivelyCallNode(
        newDataNode,
        (_node) => {
          const parentNode = _node.parentId ? treeDataMap[_node.parentId] : null
          return parentNode as any
        },
        (_node) => {
          if (_node === newDataNode) return
          _node.isExpanded = true
        }
      )

      const newTreeNodes = Object.values(treeDataMap)
      setTreeNodes(newTreeNodes)
    },
    [treeNodes]
  )

  return (
    <div className="site-sidebar py-5 px-2">
      <div className="site-sidebar__title">
        <Link to="/">{title}</Link>
      </div>
      <div className="site-sidebar__search">
        <Search
          isMobileMode={isMobileMode}
          searchActivateHotkey={SEARCH_HOTKEY}
        />
      </div>
      <div className="site-sidebar__files">
        <TreeView
          nodes={treeNodes}
          onSelect={onNodeSelect}
          onBranchNodeClick={onBranchNodeClick}
          renderLabel={renderLabel}
        ></TreeView>
      </div>
    </div>
  )
}
