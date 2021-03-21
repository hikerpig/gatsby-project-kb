import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import type { Note } from 'note-graph'
import { Reference, TopicFlie } from './type'

export const useGraphData = () => {
  const data: { allFile: { nodes: TopicFlie[] } } = useStaticQuery(graphql`
    {
      allFile {
        nodes {
          id
          fields {
            title
            slug
          }
          childMdx {
            inboundReferences {
              referrer {
                ... on Mdx {
                  parent {
                    id
                  }
                }
              }
            }
            outboundReferences {
              target {
                ... on Mdx {
                  parent {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { notesMap, fileNodesMap } = useMemo(() => {
    const notes: Note[] = []
    const notesMap = new Map<string, Note>()
    const fileNodesMap = new Map<string, any>()
    data.allFile.nodes.forEach((node) => {
      if (!node.fields || !node.fields.slug) {
        return
      }
      fileNodesMap.set(node.id, node)

      const note: Note = {
        id: node.id,
        title: node.fields.title,
        linkTo: [],
        referencedBy: [],
      }
      notes.push(note)
      notesMap.set(node.id, note)

      node.childMdx.inboundReferences.forEach((x: Reference) => {
        note.referencedBy && x.referrer.parent?.id && note.referencedBy.push(x.referrer.parent.id)
      })

      node.childMdx.outboundReferences.forEach((x: Reference) => {
        note.linkTo && note.linkTo.push(x.target.parent.id)
      })
    })

    return { notesMap, fileNodesMap }
  }, [data])

  return { notesMap, fileNodesMap }
}
