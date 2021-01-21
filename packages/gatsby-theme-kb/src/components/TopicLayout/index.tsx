import * as React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import './topic-layout.css'

import GraphButton from '../GraphButton'
import SiteSidebar from '../SiteSidebar'
import { PageContext } from '../../type'

export type Props = React.PropsWithChildren<{
  pageContext: PageContext
}>

export default function TopicLayout(props: Props) {
  const { children, pageContext } = props

  return (
    <div className="topic-layout flex min-h-screen">
      <div className="topic-layout__left flex-shrink-0 py-5 px-2">
        <SiteSidebar pageContext={pageContext}></SiteSidebar>
      </div>
      <main className="topic-layout__main flex-grow">
        <div className="topic-layout__content">{children}</div>
      </main>
      <div className="topic-layout__right flex-shrink-0 p-5">
        <GraphButton graphState="maximized" currentFileId={pageContext.id}></GraphButton>
        <div id="toc" className="toc tocbot" />
      </div>
    </div>
  )
}
