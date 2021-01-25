import React, { useState, useEffect, useMemo } from 'react'
import { useScrollRestoration } from 'gatsby-react-router-scroll'
import useBreakpoint from 'use-breakpoint'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import './topic-layout.css'

import { PageContext } from '../../type'
import GraphButton from '../GraphButton'
import SiteSidebar from '../SiteSidebar'
import DarkModeToggle from '../DarkModeToggle'

export type Props = React.PropsWithChildren<{
  pageContext: PageContext
}>

const BREAKPOINTS = {
  md: 768,
  lg: 1024,
  xl: 1280,
}
type BreakpointName = keyof typeof BREAKPOINTS

enum CmpResult {
  Greater = 1,
  Equal = 0,
  Less = -1,
}

function cmpBreakpoint(p1: BreakpointName, p2: BreakpointName) {
  const v1 = BREAKPOINTS[p1]
  const v2 = BREAKPOINTS[p2]
  if (v1 > v2) return CmpResult.Greater
  if (v1 === v2) return CmpResult.Equal
  return CmpResult.Less
}

export default function TopicLayout(props: Props) {
  const { children, pageContext } = props
  const tocRestoration = useScrollRestoration('toc')
  const data = useStaticQuery(graphql`
    query TopicLayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [menuOpened, setMenuOpened] = useState(false)

  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'md')

  const isMobileMode = useMemo(() => {
    return cmpBreakpoint(breakpoint, 'lg') === CmpResult.Less
  }, [breakpoint])

  const title = data.site.siteMetadata!.title

  const handleMenuClick = () => {
    setMenuOpened(!menuOpened)
  }
  const expandIcon = (
    <div className="topic-layout__menu-icon mr-2" onClick={handleMenuClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  )

  const topicLayoutClass = classnames({
    'topic-layout--mobile': isMobileMode,
  })

  const leftClass = classnames({
    'topic-layout__left--mobile': isMobileMode,
    'topic-layout__left--show': isMobileMode && menuOpened,
    'shadow:md': isMobileMode,
    'transition-all': isMobileMode,
    'z-10': isMobileMode,
  })

  const sideBar = useMemo(() => {
    return <SiteSidebar pageContext={pageContext} title={title} isMobileMode={isMobileMode}></SiteSidebar>
  }, [isMobileMode])

  return (
    <div
      className={`topic-layout flex flex-col min-h-screen ${topicLayoutClass}`}
    >
      <div className="topic-layout__header w-screen py-3 px-5 flex justify-between text-lg font-semibold md:hidden">
        <div className="flex items-center">
          {expandIcon}
          <div className="topic-layout__header-title">{title}</div>
        </div>
        <div className="flex items-center">
          <DarkModeToggle></DarkModeToggle>
        </div>
      </div>
      <div className="topic-layout__main md:m-auto flex min-h-screen">
        <div
          className={`topic-layout__left flex-shrink-0 ${leftClass} md:flex hover:shadow-md`}
        >
          {sideBar}
        </div>
        <main className="topic-layout__content flex-grow p-5 md:h-screen md:overflow-y-auto">
          {children}
        </main>
        <div className="topic-layout__right flex-shrink-0 p-5 hidden lg:block hover:shadow-md">
          <GraphButton currentFileId={pageContext.id} showHint></GraphButton>
          <DarkModeToggle showHint />

          <div {...tocRestoration}>
            <div id="toc" className="toc tocbot js-toc" />
          </div>
        </div>
      </div>
      {isMobileMode && menuOpened ? (
        <div
          className="topic-layout__mask fixed w-screen h-screen"
          onClick={() => setMenuOpened(false)}
        ></div>
      ) : null}
    </div>
  )
}
