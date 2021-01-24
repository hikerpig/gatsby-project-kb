import React from 'react'
import { Link } from 'gatsby'
import MDXRenderer from '../mdx-components/MDXRenderer'
import { TopicFlie } from '../../type'
import AnchorTag from '../mdx-components/AnchorTag'
import * as HEADER_COMPONENTS from '../mdx-components/header-components'
import { MDXProvider } from '@mdx-js/react'
import slugify from 'slugify'
import './topic.css'

type Props = {
  file: TopicFlie
  currentLocation: Location
}

const Topic = ({ file, currentLocation }: Props) => {
  let referenceBlock
  const { frontmatter, inboundReferences, outboundReferences } = file.childMdx
  const { title, slug } = file.fields

  // console.log(
  //   'outboundReferences',
  //   outboundReferences,
  //   'inboundReferences',
  //   inboundReferences,
  //   slug,
  // )

  const ProvidedAnchorTag = (anchorProps) => {
    // console.log("ProviµdedAnchorTag", anchorProps)
    return (
      <AnchorTag
        {...anchorProps}
        currentLocation={currentLocation}
        currentSlug={slug}
        references={outboundReferences}
      ></AnchorTag>
    )
  }

  if (inboundReferences) {
    const references = inboundReferences.map((ref) => {
      const { slug, title } = ref.parent?.fields!
      return (
        <li key={slug}>
          <Link to={slug} className="topic__reference">
            {title}
          </Link>
          {/* <div dangerouslySetInnerHTML={{ __html: ref.previewHtml }} /> */}
        </li>
      )
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
  const realTitle = frontmatter.title || title

  return (
    <div className="topic">
      {shouldRenderTitle ? <h1 id={slugify(realTitle)}>{realTitle}</h1> : null}
      <MDXProvider components={{ a: ProvidedAnchorTag, ...HEADER_COMPONENTS }}>
        <MDXRenderer scope="">{file.childMdx.body}</MDXRenderer>
      </MDXProvider>
      {referenceBlock}
    </div>
  )
}

export default Topic
