import * as React from 'react'
import { useScrollRestoration } from 'gatsby-react-router-scroll'
// import { useStaticQuery, graphql } from 'gatsby'
import './topic-layout.css'

import { PageContext } from '../../type'
import GraphButton from '../GraphButton'
import SiteSidebar from '../SiteSidebar'
import DarkModeToggle from '../DarkModeToggle'

export type Props = React.PropsWithChildren<{
  pageContext: PageContext
}>


export default function TopicLayout(props: Props) {
  const { children, pageContext } = props
  const tocRestoration = useScrollRestoration('toc')

  return (
    <div className="topic-layout flex min-h-screen">
      <div className="topic-layout__left flex-shrink-0 hidden md:flex">
        <SiteSidebar pageContext={pageContext}></SiteSidebar>
      </div>
      <main className="topic-layout__main flex-grow p-5 md:h-screen md:overflow-y-auto">
        <div className="topic-layout__content">{children}</div>
      </main>
      <div className="topic-layout__right flex-shrink-0 p-5 hidden lg:block">
        <GraphButton currentFileId={pageContext.id}></GraphButton>
        <DarkModeToggle></DarkModeToggle>

        <div {...tocRestoration}>
          <div id="toc" className="toc tocbot js-toc" />
        </div>
      </div>
    </div>
  )
}
