import React, { useState, useMemo, useRef, useLayoutEffect, useCallback } from 'react'
import { useScrollRestoration } from 'gatsby-react-router-scroll'
import useBreakpoint from 'use-breakpoint'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import './topic-layout.css'

import { PageContext } from '../../type'
import GraphButton from '../GraphButton'
import SiteSidebar from '../SiteSidebar'
import DarkModeToggle from '../DarkModeToggle'
import { isServer } from '../../env'

export type Props = React.PropsWithChildren<{
  pageContext: PageContext
  showSidebarTOC?: boolean
}>

const BREAKPOINTS = {
  sm: 0,
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
  const { children, pageContext, showSidebarTOC } = props
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
  const [rightMenuOpened, setRightMenuOpened] = useState(false)

  const defaultBreakPoint: BreakpointName = isServer
    ? 'md'
    : window.innerWidth > BREAKPOINTS.md
    ? 'md'
    : 'sm'
  const { breakpoint } = useBreakpoint(BREAKPOINTS, defaultBreakPoint)

  const isMobileMode = useMemo(() => {
    return cmpBreakpoint(breakpoint, 'md') === CmpResult.Less
  }, [breakpoint])

  const title = data.site.siteMetadata!.title

  const handleMenuClick = useCallback(() => {
    setMenuOpened(!menuOpened)
  }, [menuOpened])
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

  const handleTocClick = useCallback(() => {
    setRightMenuOpened(!rightMenuOpened)
  }, [rightMenuOpened])

  // this ref and useLayoutEffect are kind of hack, but I don't know if
  //   there is a better solution to tweak the hydration of '.topic-layout__left'
  // so I choose to force some manipulation in browser side
  const leftEleRef = useRef<HTMLDivElement>(null)
  const leftClassObject = {
    'topic-layout__left--mobile': isMobileMode,
    'topic-layout__left--show': isMobileMode && menuOpened,
    'shadow-md': isMobileMode,
    'transition-all': isMobileMode,
    'z-10': isMobileMode,
  }
  useLayoutEffect(() => {
    if (!leftEleRef.current) return
    for (const [key, value] of Object.entries(leftClassObject)) {
      if (value) {
        leftEleRef.current.classList.add(key)
      } else {
        leftEleRef.current.classList.remove(key)
      }
    }
  })
  const leftClass = classnames(leftClassObject)

  const rightEleRef = useRef<HTMLDivElement>(null)
  const rightClassObject = {
    'topic-layout__right': true,
    'topic-layout__right--drawer': isMobileMode,
    'topic-layout__right--drawer-show': isMobileMode && rightMenuOpened,
    'shadow-md': isMobileMode,
    'transition-all': isMobileMode,
    'z-10': isMobileMode,
    'flex-shrink-0': true,
    'p-5': true,
    'hover:shadow-md': true,
  }
  useLayoutEffect(() => {
    if (!rightEleRef.current) return
    for (const [key, value] of Object.entries(rightClassObject)) {
      if (value) {
        rightEleRef.current.classList.add(key)
      } else {
        rightEleRef.current.classList.remove(key)
      }
    }
  })
  const rightClass = classnames(rightClassObject)

  const sideBar = useMemo(() => {
    return (
      <SiteSidebar
        pageContext={pageContext}
        title={title}
        isMobileMode={isMobileMode}
      ></SiteSidebar>
    )
  }, [isMobileMode, breakpoint])

  return (
    <div className={`topic-layout flex flex-col min-h-screen`}>
      <div className="topic-layout__header w-screen py-3 px-5 flex justify-between text-lg font-semibold shadow-md md:hidden">
        <div className="flex items-center">
          {expandIcon}
          <div className="topic-layout__header-title">{title}</div>
        </div>
        {showSidebarTOC && (
          <div className="flex items-center">
            <div className="top-layout__header-item toc-layout__toc-icon" onClick={handleTocClick}>
              T
            </div>
            <GraphButton className="top-layout__header-item" currentFileId={pageContext.id} isMobileMode={isMobileMode}/>
            <DarkModeToggle></DarkModeToggle>
          </div>
        )}
      </div>
      <div className="topic-layout__main md:m-auto flex min-h-screen">
        <div
          className={`topic-layout__left flex-shrink-0 ${leftClass} md:flex hover:shadow-md`}
          ref={leftEleRef}
        >
          {sideBar}
        </div>
        <main className="topic-layout__content flex-grow py-5 px-7 md:h-screen md:overflow-y-auto">
          {children}
        </main>
        <div className={rightClass} ref={rightEleRef}>
          {isMobileMode ? null : (
            <>
              <GraphButton currentFileId={pageContext.id} showHint isMobileMode={isMobileMode}/>
              <DarkModeToggle showHint />
            </>
          )}

          {showSidebarTOC && (
            <div {...tocRestoration}>
              {isMobileMode && (
                <header>
                  <b>Table Of Contents</b>
                </header>
              )}
              <div id="toc" className="toc tocbot js-toc" />
            </div>
          )}
        </div>
      </div>
      {isMobileMode && (menuOpened || rightMenuOpened) ? (
        <div
          className="topic-layout__mask fixed w-screen h-screen"
          onClick={() => {
            setMenuOpened(false)
            setRightMenuOpened(false)
          }}
        ></div>
      ) : null}
    </div>
  )
}
