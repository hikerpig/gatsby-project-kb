import React from 'react'
import { graphql } from 'gatsby'
import Topic from '../components/Topic'

export default props => {
  return (
    <Topic
      note={props.data.brainNote}
      siteMetadata={props.data.site.siteMetadata}
    />
  )
}

export const query = graphql`
query BrainNoteWithRefsBySlug($slug: String!) {
  brainNote(slug: { eq: $slug }) {
    slug
    title
    childMdx {
      body
      frontmatter {
        title
      }
    }
    inboundReferences
    inboundReferencePreviews {
      source
      previewHtml
    }
    externalInboundReferences {
      siteName
      sourcePage
      sourceUrl
      previewHtml
    }
    outboundReferenceNotes {
      title
      slug
      childMdx {
        excerpt
      }
    }
  }
  site {
    siteMetadata {
      title
    }
  }
}
`
