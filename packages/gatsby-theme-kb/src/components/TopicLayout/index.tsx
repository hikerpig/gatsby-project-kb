import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import './topic-layout.css'

import GraphButton from '../GraphButton'

export type Props = React.PropsWithChildren<{
  pageContext: any
}>

export default function TopicLayout(props: Props) {
  const { children, pageContext } = props
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const title = data.site!.siteMetadata.title

  return (
    <div className="topic-layout flex min-h-screen">
      <div className="topic-layout__left">
        <b>{title}</b>
      </div>
      <main className="topic-layout__main flex-grow">
        <div className="topic-layout__content">{children}</div>
      </main>
      <div className="topic-layout__right p-5">
        <GraphButton graphState="maximized" currentFileId={pageContext.id}></GraphButton>
      </div>
    </div>
  )
}
