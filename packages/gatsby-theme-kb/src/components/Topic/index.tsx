import React from 'react'
import MDXRenderer from '../mdx-components/MDXRenderer'
import { TopicFlie, WikiLinkLabelTemplateFn } from '../../type'
import AnchorTag from '../mdx-components/AnchorTag'
import LinkReference from '../LinkReference'
import * as HEADER_COMPONENTS from '../mdx-components/header-components'
import * as ROUGH_COMPONENTS from '../mdx-components/Rough'
import { MDXProvider } from '@mdx-js/react'
import slugify from 'slugify'
import './topic.css'

type Props = {
  file: TopicFlie
  currentLocation: Location
  wikiLinkLabelTemplateFn?: WikiLinkLabelTemplateFn | null
}

const Topic = ({ file, currentLocation, wikiLinkLabelTemplateFn }: Props) => {
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
        wikiLinkLabelTemplateFn={wikiLinkLabelTemplateFn}
      ></AnchorTag>
    )
  }

  if (inboundReferences) {
    const references = inboundReferences.reduce((acc, ref) => {
      if (!ref.referrer.parent?.fields) return acc
      const { slug } = ref.referrer.parent?.fields!
      acc.push(<LinkReference key={slug} reference={ref}></LinkReference>)
      return acc
    }, [] as JSX.Element[])

    if (references.length > 0) {
      referenceBlock = (
        <div className="topic__references">
          <h2>Backlinks</h2>
          <div>{references}</div>
        </div>
      )
    }
  }

  const shouldRenderTitle = !!frontmatter.title
  const realTitle = frontmatter.title || title

  return (
    <div className="topic">
      {shouldRenderTitle ? <h1 id={slugify(realTitle)}>{realTitle}</h1> : null}
      <MDXProvider
        components={{
          a: ProvidedAnchorTag,
          ...HEADER_COMPONENTS,
          ...ROUGH_COMPONENTS,
        }}
      >
        <MDXRenderer scope="">{file.childMdx.body}</MDXRenderer>
      </MDXProvider>
      {referenceBlock}
    </div>
  )
}

export default Topic
