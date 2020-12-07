import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

type Reference = {
  __typename: string
  body: string
  parent: Omit<TopicFlie, 'childMax'> | null
}

type TopicFlie = {
  fields: {
    slug: string
    title: string
  }
  childMdx: {
    body: string
    inboundReferences: Reference[]
    outboundReferences: Reference[]
    frontmatter: {
      title: string
    }
  }
}

type Props = {
  file: TopicFlie
}

const Topic = ({ file }: Props) => {
  let referenceBlock
  const { frontmatter, inboundReferences, outboundReferences } = file.childMdx
  const { title, slug } = file.fields
  if (inboundReferences) {
    const references = inboundReferences.map(ref => {
      const { slug, title } = ref.parent?.fields!
      return <li key={slug}>
        <a href={slug} className="topic__reference">{title}</a>
        {/* <div dangerouslySetInnerHTML={{ __html: ref.previewHtml }} /> */}
      </li>
    })

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h2>Linked References</h2>
          <ul>{references}</ul>
        </>
      )
    }
  }

  const shouldRenderTitle = !!frontmatter.title

  return (
    <div className="topic">
      {shouldRenderTitle ? <h1>{title}</h1>: null}
      <MDXRenderer scope="">{file.childMdx.body}</MDXRenderer>
      {referenceBlock}
    </div>
  )
}

export default Topic
