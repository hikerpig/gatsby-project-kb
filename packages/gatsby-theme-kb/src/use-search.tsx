import React, { useState, useEffect, useMemo } from 'react'
import FlexSearch from 'flexsearch'
import { graphql, useStaticQuery } from 'gatsby'

export default (query: string, opts: { searchOptions?: any } = {}) => {
  const [store, setStore] = useState<any>(null)
  const [pathIndex, setPathIndex] = useState<any>(null)
  const [titleIndex, setTitleIndex] = useState<any>(null)
  const [bodyIndex, setBodyIndex] = useState<any>(null)

  const searchOptions = opts.searchOptions || {}

  const data = useStaticQuery(graphql`
    query SearchBarQuery {
      localSearchPaths {
        publicIndexURL
        publicStoreURL
      }
      localSearchTitles {
        publicIndexURL
      }
      localSearchBodies {
        publicIndexURL
      }
    }
  `)
  // console.log('use-search data is', data)

  useEffect(() => {
    fetch(data.localSearchPaths.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        const importedIndex = FlexSearch.create<any>()
        importedIndex.import(res)

        setPathIndex(importedIndex)
      })
    fetch(data.localSearchTitles.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        const importedIndex = FlexSearch.create()
        importedIndex.import(res)

        setTitleIndex(importedIndex)
      })
    fetch(data.localSearchBodies.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        const importedIndex = FlexSearch.create()
        importedIndex.import(res)

        setBodyIndex(importedIndex)
      })
    fetch(data.localSearchPaths.publicStoreURL)
      .then((result) => result.json())
      .then((res) => {
        setStore(res)
      })
  }, [setPathIndex, setTitleIndex, setBodyIndex, setStore, data])

  return useMemo(() => {
    if (!query || !store || (!pathIndex && !bodyIndex && !titleIndex))
      return [
        {
          id: 'loading',
          title: '',
          excerpt: <div className="lds-dual-ring"></div>,
        },
      ]

    const rawPathResults = pathIndex
      ? pathIndex.search(query, searchOptions)
      : []
    const rawBodyResults = bodyIndex
      ? bodyIndex.search(query, searchOptions)
      : []
    const rawTitleResults = titleIndex
      ? titleIndex.search(query, searchOptions)
      : []

    const uniqIds = new Set()

    return (
      rawPathResults
        .concat(rawTitleResults)
        .concat(rawBodyResults)
        .filter((id) => {
          if (uniqIds.has(id)) {
            return false
          }
          uniqIds.add(id)
          return true
        })
        .map((id) => store[id])
    )
  }, [query, pathIndex, titleIndex, bodyIndex, store, searchOptions])
}
