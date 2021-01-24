import * as React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import './topic-layout.css'

import { PageContext } from '../../type'
import GraphButton from '../GraphButton'
import SiteSidebar from '../SiteSidebar'

export type Props = React.PropsWithChildren<{
  pageContext: PageContext
}>

export default function TopicLayout(props: Props) {
  const { children, pageContext } = props

  return (
    <div className="topic-layout flex min-h-screen">
      <div className="topic-layout__left flex-shrink-0 hidden md:flex">
        <SiteSidebar pageContext={pageContext}></SiteSidebar>
      </div>
      <main className="topic-layout__main flex-grow md:h-screen md:overflow-y-auto">
        <div className="topic-layout__content">{children}</div>
      </main>
      <div className="topic-layout__right flex-shrink-0 p-5 hidden lg:block">
        <GraphButton currentFileId={pageContext.id}></GraphButton>
        <div id="toc" className="toc tocbot js-toc" />
      </div>
    </div>
  )
}
