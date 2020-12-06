import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

type Note = {
  title: string
  slug: string
  childMdx: {
    body: () => string
  }
  inboundReferencePreviews: {
    source: string
    previewHtml: string
  }[]
  outboundReferencePreviews: {
    previewHtml: string
  }[]
  externalInboundReferences: {
    sourceUrl: string
    sourcePage: string
    siteName: string
    previewHtml: string
  }[]
}

type Props = {
  note: Note
}

const BrainNote = ({ note }: Props) => {
  let references = []
  let referenceBlock
  if (note.inboundReferencePreviews != null) {
    references = note.inboundReferencePreviews.map(ref => (
      <li key={ref.source}>
        <div><a href={ref.source} className="topic__reference">{ref.source}</a></div>
        <div dangerouslySetInnerHTML={{ __html: ref.previewHtml }} />
      </li>
    ))

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h2>Linked References</h2>
          <ul>{references}</ul>
        </>
      )
    }
  }

  let externalRefBlock
  if (note.externalInboundReferences) {
    let refs = note.externalInboundReferences.map(ref => (
      <li key={ref.sourceUrl}>
        <a href={ref.sourceUrl} className="topic__reference">
          {ref.siteName}/{ref.sourcePage}
        </a>
        <br />
        <div dangerouslySetInnerHTML={{ __html: ref.previewHtml }} />
      </li>
    ))
    if (refs.length > 0) {
      externalRefBlock = (
        <>
          <h2>External References</h2>
          <ul>{refs}</ul>
        </>
      )
    }
  }

  const shouldRenderTitle = note.title !== note.slug

  return (
    <div className="topic">
      {shouldRenderTitle ? <h1>{note.title}</h1>: null}
      <MDXRenderer scope="">{note.childMdx.body}</MDXRenderer>
      {referenceBlock}
      {externalRefBlock}
    </div>
  )
}

export default BrainNote
