import React from 'react'
import { Link} from 'gatsby'
// import { MDXRenderer } from 'gatsby-plugin-mdx'
import MDXRenderer from '../mdx-components/MDXRenderer'
import { TopicFlie } from '../../type'
import AnchorTag from '../mdx-components/AnchorTag'
import { MDXProvider } from "@mdx-js/react";
import './topic.css'


type Props = {
  file: TopicFlie
}

const Topic = ({ file }: Props) => {
  let referenceBlock
  const { frontmatter, inboundReferences, outboundReferences } = file.childMdx
  const { title, slug } = file.fields

  // console.log('outboundReferences', outboundReferences, 'inboundReferences', inboundReferences)

  const ProvidedAnchorTag = (anchorProps) => {
    return <AnchorTag {...anchorProps} references={outboundReferences}></AnchorTag>
  }

  if (inboundReferences) {
    const references = inboundReferences.map(ref => {
      const { slug, title } = ref.parent?.fields!
      return <li key={slug}>
        <Link to={slug} className="topic__reference">{title}</Link>
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
      <MDXProvider components={{ a: ProvidedAnchorTag }}>
        <MDXRenderer scope="">{file.childMdx.body}</MDXRenderer>
      </MDXProvider>
      {referenceBlock}
    </div>
  )
}

export default Topic
