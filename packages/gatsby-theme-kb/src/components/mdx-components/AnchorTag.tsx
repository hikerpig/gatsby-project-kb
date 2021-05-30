import React from 'react'
import { withPrefix, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import * as path from 'path'
import slugify from 'slugify'
import MDXRenderer from './MDXRenderer'
import Tippy from '@tippyjs/react'
import { Reference, WikiLinkLabelTemplateFn } from '../../type'

import './anchor-tag.css'

type Props = React.PropsWithChildren<{
  title: string
  href: string
  withoutLink: boolean
  withoutPopup: boolean
  references: Reference[]
  currentSlug: string
  currentLocation: Location
  wikiLinkLabelTemplateFn?: WikiLinkLabelTemplateFn | null
}>

/**
 * Infer the target's slug based on an intuitive method.
 * But usually if `contentPath` is passed to config,
 *   relative ref resolving should be done by the transformer-wiki-references, based on the directory.
 *   The anchorSlug will not be used.
 */
function genHrefInfo(opts: { currentSlug: string; href: string }) {
  const { href, currentSlug } = opts
  let isLocalHash = false
  const isExternalLink = /\/\//.test(href)
  let anchorSlug = href
  if (!isExternalLink) {
    if (href.startsWith('#')) {
      anchorSlug = currentSlug
      isLocalHash = true
    } else if (href.startsWith('..') || !href.startsWith('/')) {
      anchorSlug = path.resolve(path.dirname(currentSlug), href)
    }
  }
  return {
    anchorSlug,
    isExternalLink,
    isLocalHash,
  }
}

function padHrefWithAnchor(href: string, anchor?: string) {
  if (anchor) {
    return `${href}#${slugify(anchor)}`
  }
  return href
}

const AnchorTag = ({
  title,
  href,
  references = [],
  withoutLink,
  withoutPopup,
  currentSlug,
  currentLocation,
  wikiLinkLabelTemplateFn,
  ...restProps
}: Props) => {
  // prettier-ignore
  const { anchorSlug } = genHrefInfo({ currentSlug, href })

  const ref = references.find((x) => {
    return (
      `/${x.refWord}` === href ||
      withPrefix(x.target.parent?.fields.slug || '') === withPrefix(anchorSlug)
    )
  })
  // console.log('ref', ref, 'href', href, 'anchorSlug', anchorSlug, references)

  let content
  let popupContent
  let child

  if (ref && ref.target.parent) {
    // console.log('reference is', ref, 'withoutLink', withoutLink)
    const targetFileNode = ref.target.parent
    const fields = ref.target.parent.fields
    const mdxBody = ref.target.body
    const nestedComponents = {
      a(props) {
        const {
          anchorSlug: nestedAnchorSlug,
          isExternalLink: nestedIsExternalLink,
        } = genHrefInfo({ currentSlug, href: props.href })
        return nestedIsExternalLink ? (
          <a href={props.href}>{props.children}</a>
        ) : (
          <Link to={nestedAnchorSlug}>{props.children}</Link>
        )
      },
      p(props) {
        return <span {...props} />
      },
    }
    content = wikiLinkLabelTemplateFn
      ? wikiLinkLabelTemplateFn({ refWord: ref.refWord, title: fields.title })
      : restProps.children
    // content = fields.title || restProps.children
    popupContent = (
      <div id={targetFileNode.id} className="anchor-tag__popover with-markdown">
        <React.Fragment>
          <MDXProvider components={nestedComponents}>
            <MDXRenderer>{mdxBody}</MDXRenderer>
          </MDXProvider>
        </React.Fragment>
      </div>
    )
    child = (
      <Link
        {...restProps}
        to={padHrefWithAnchor(fields.slug, ref.targetAnchor)}
        title={title}
      >
        {content}
      </Link>
    )
  } else {
    content = restProps.children
    popupContent = <div className="popover no-max-width">{href}</div>
    // console.log('no ref', anchorSlug)
    child = (
      <a
        {...restProps}
        href={
          !href || (href.indexOf && href.indexOf('#') === 0)
            ? href
            : withPrefix(href)
        }
        title={title}
      />
    )
    return child
  }

  if (withoutLink) {
    return <span>{content}</span>
  }

  if (withoutPopup) {
    return child
  }

  return (
    <Tippy
      animation="shift-away"
      content={popupContent}
      maxWidth="none"
      arrow={true}
      interactive
    >
      {child}
    </Tippy>
  )
}

export default AnchorTag
