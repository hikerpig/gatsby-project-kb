import React from 'react'
import { withPrefix } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from './MDXRenderer'
import Tippy from '@tippyjs/react'
import { Reference } from '../../type'

import './anchor-tag.css'

type Props = React.PropsWithChildren<{
  title: string
  href: string
  withoutLink: boolean
  withoutPopup: boolean
  references: Reference[]
}>

const AnchorTag = ({
  title,
  href,
  references = [],
  withoutLink,
  withoutPopup,
  ...restProps
}: Props) => {
  const ref = references.find((x) => {
    return withPrefix(x.parent?.fields.slug || '') === withPrefix(href)
  })

  let content
  let popupContent
  let child

  if (ref && ref.parent) {
    // console.log('reference is', ref, 'withoutLink', withoutLink)
    const fileds = ref.parent.fields
    const mdxBody = ref.body
    const nestedComponents = {
      a(props) {
        return <AnchorTag {...props} references={references} withoutLink />
      },
      p(props) {
        return <span {...props} />
      },
    }
    // content =
    //   (
    //     <MDXProvider components={nestedComponents}>
    //       <MDXRenderer>{mdxBody}</MDXRenderer>
    //     </MDXProvider>
    //   )
    content = restProps.children
    popupContent = (
      <div id={ref.parent.id} className="anchor-tag__popover with-markdown">
        <React.Fragment>
          <MDXProvider components={nestedComponents}>
            <MDXRenderer>{mdxBody}</MDXRenderer>
          </MDXProvider>
        </React.Fragment>
      </div>
    )
    child = (
      <a {...restProps} href={fileds.slug} title={title}>
        {content}
      </a>
    )
  } else {
    content = restProps.children
    popupContent = <div className="popover no-max-width">{href}</div>
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
      interactive
    >
      {child}
    </Tippy>
  )
}

export default AnchorTag
