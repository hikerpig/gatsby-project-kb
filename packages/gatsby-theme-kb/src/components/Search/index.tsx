import React, { useState, useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
// import useHotkeys from '@reecelucas/react-use-hotkeys'
import { navigate } from 'gatsby'
import Downshift from 'downshift'
import useSearch, { SearchResult, LOADING_ID } from '../../use-search'

import './search.css'

const RESULTS_WIDTH = 500

export type SearchProps = {
  isMobileMode?: boolean
  searchActivateHotkey?: string
  resultsClassName?: string
  resultsWidth?: number
  position?: 'right'
  onResults?(results: SearchResult[]): void
}

export default function Search(props: SearchProps) {
  const { isMobileMode, resultsClassName, resultsWidth, onResults, position } = props
  const [query, setQuery] = useState('')
  const searchBarRef = useRef<HTMLDivElement>(null)
  const searchBarInputRef = useRef<HTMLInputElement>(null)

  const results = useSearch(query)

  const handleChange = useCallback((e) => setQuery(e.target.value), [setQuery])

  // if (searchActivateHotkey) {
  //   useHotkeys(searchActivateHotkey, () => {
  //     setTimeout(() => {
  //       if (searchBarInputRef.current) searchBarInputRef.current.focus()
  //     })
  //   })
  // }

  if (onResults) {
    useEffect(() => {
      onResults(results.filter((o) => o.id !== LOADING_ID))
    }, [results])
  }

  return (
    <Downshift
      onChange={(selection) => navigate(selection.path)}
      itemToString={(item) => (item ? item.title : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        getRootProps,
      }) => {
        return (
          <div
            className="searchWrapper"
            {...getRootProps({} as any, { suppressRefError: true })}
          >
            <SearchBar
              onChange={handleChange}
              getInputProps={getInputProps}
              ref={searchBarRef}
              inputRef={searchBarInputRef}
            />
            {isOpen && (
              <Results
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                results={results}
                highlightedIndex={highlightedIndex}
                searchBarRef={searchBarRef}
                isMobileMode={isMobileMode}
                className={resultsClassName}
                position={position}
                width={resultsWidth}
              />
            )}
          </div>
        )
      }}
    </Downshift>
  )
}

const SearchBar = React.forwardRef<any>((props, ref) => {
  const { onChange, getInputProps, inputRef } = props as any
  return (
    <div className="inputWrapper" ref={ref}>
      <svg
        className="searchIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782z" />
      </svg>
      <input
        {...getInputProps({
          placeholder: 'Search...',
          onChange: onChange,
        })}
        ref={inputRef}
        type="text"
      />
    </div>
  )
}) as any

function Results({
  results,
  getItemProps,
  getMenuProps,
  highlightedIndex,
  searchBarRef,
  isMobileMode = false,
  className = '',
  position,
  width = 0,
}) {
  width = width || RESULTS_WIDTH

  const sRef: React.RefObject<HTMLDivElement> = searchBarRef
  const styles: React.CSSProperties = sRef.current
    ? (function () {
        const searchBarBox = sRef.current.getBoundingClientRect()
        let left = isMobileMode ? 10 : searchBarBox.left
        if (position === 'right') {
          left = searchBarBox.right - width
        }
        return {
          top: searchBarBox.top + searchBarBox.height + 10,
          left,
          width,
        }
      })()
    : {}

  return ReactDOM.createPortal(
    <ul
      className={`results z-20 ${className}`}
      {...getMenuProps()}
      style={styles}
    >
      {results.map((r, index) => (
        <li
          key={r.id}
          {...getItemProps({
            index,
            item: r,
            style: {
              background:
                highlightedIndex === index
                  ? 'var(--kb-search-highlight-bg)'
                  : 'var(--kb-note-bg)',
            },
          })}
        >
          <div className="title">{r.title}</div>
          <div className="excerpt">{r.excerpt}</div>
        </li>
      ))}
    </ul>,
    document.body
  )
}
