import * as React from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import TreeView from './TreeView'

export interface ISiteSidebarProps {
  pageContext: any
}

type RemarkNode = {
  parent: {
    id: string
    relativeDirectory: string
    name: string
    fields: {
      slug: string
      title: string
    }
  }
}

// TODO: generate sidebar with config
export default function SiteSidebar(props: ISiteSidebarProps) {
  const data = useStaticQuery(graphql`
    query SiteSidebarQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark {
        nodes {
          parent {
            id
            ... on File {
              id
              name
              relativeDirectory
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

  const title = data.site!.siteMetadata.title
  const nodes = data.allMarkdownRemark!.nodes as RemarkNode[]

  console.log('data', data)
  const treeNodes: any[] = [] 
  const nodeMap: Record<string, RemarkNode> = {}
  nodes.forEach((node) => {
    if (!node.parent) return
    const file = node.parent
    const treeNode = {
      id: file.id,
      label: file.fields.title,
    }
    treeNodes.push(treeNode)
    nodeMap[file.id] = node
  })
  console.log('tree nodes', treeNodes)

  const onNodeSelect = (treeNode) => {
    console.log('node select', treeNode)
    const node = nodeMap[treeNode.id]
    if (node) {
      navigate(node.parent.fields.slug)
    }
  }

  const renderLabel = (nodeProps) => {
    const { data } = nodeProps
    const node = nodeMap[data.id]
    let slug = ''
    if (node) {
      slug = node.parent.fields.slug
    }
    return <a className="site-sidebar__link" onClick={nodeProps.onClick} href={slug}>{data.label}</a>
  }

  return <div className="site-sidebar">
    <b>{ title }</b>
    <TreeView nodes={treeNodes} onSelect={onNodeSelect} renderLabel={renderLabel}></TreeView>
  </div>
}
