import * as React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import './topic-layout.css'

import { PageContext } from '../../type'
import GraphButton from '../GraphButton'
import SiteSidebar from '../SiteSidebar'
import Search from '../Search'

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
        <div className="flex">
          <GraphButton graphState="maximized" currentFileId={pageContext.id}></GraphButton>
          <Search></Search>
        </div>
        <div id="toc" className="toc tocbot js-toc" />
      </div>
    </div>
  )
}
