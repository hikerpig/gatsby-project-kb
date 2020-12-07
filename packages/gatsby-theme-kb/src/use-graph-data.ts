import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import type { Note } from 'note-graph'

// export interface GraphNodeNote extends Note {}

export const useGraphData = () => {
  const data = useStaticQuery(graphql`
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
              ... on Mdx {
                parent {
                  id
                }
              }
            }
            outboundReferences {
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

      node.childMdx.inboundReferences.forEach((x) => {
        note.referencedBy && note.referencedBy.push(x.parent.id)
      })
      node.childMdx.outboundReferences.forEach((x) => {
        note.linkTo && note.linkTo.push(x.parent.id)
      })
    })

    return { notesMap, fileNodesMap }
  }, [data])

  return { notesMap, fileNodesMap }
}
