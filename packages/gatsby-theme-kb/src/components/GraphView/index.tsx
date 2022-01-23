import React, { useRef, useEffect } from 'react'
import useHotkeys from '@reecelucas/react-use-hotkeys'
// import { NoteGraphView, NoteGraphModel } from 'note-graph/dist/note-graph.esm'
import { NoteGraphView, NoteGraphModel } from 'note-graph'
import { navigate } from 'gatsby'
import { createPortal } from 'react-dom'
import { useGraphData } from '../..//use-graph-data'
import { useWindowSize } from '../../use-window-size'
import Search, { SearchProps } from '../Search'

import './graph-view.css'

export type GraphState = 'show' | 'hidden'

const RESULTS_WIDTH = 300

type Props = {
  graphState: GraphState
  setGraphState: (state: GraphState) => void
  currentFileId: string
  isMobileMode?: boolean
}

export default function GraphView({
  setGraphState,
  graphState,
  currentFileId,
  isMobileMode,
}: Props) {
  const { notesMap, fileNodesMap } = useGraphData()
  const windowSize = useWindowSize()
  const graphContainer = useRef<HTMLDivElement>(null)
  const shouldShowGraph = graphState !== 'hidden'

  const modalShrinkSizeX = isMobileMode ? 20: 40
  const modalShrinkSizeY = isMobileMode ? 80: 40
  const modalSize = {
    width: Math.min(windowSize.width - modalShrinkSizeX, 1400),
    height: Math.min(windowSize.height - modalShrinkSizeY, 800),
  }

  const navigateTo = (p: string) => {
    navigate(p)
  }

  const notes = Array.from(notesMap.values())
  let noteGraphView: NoteGraphView

  useEffect(() => {
    if (!graphContainer.current || graphState === 'hidden') {
      return
    }

    const graphModel = new NoteGraphModel(notes)

    noteGraphView = new NoteGraphView({
      container: graphContainer.current,
      graphModel,
      width: isMobileMode ? modalSize.width : modalSize.width - RESULTS_WIDTH,
      height: modalSize.height,
    })

    noteGraphView.onInteraction('nodeClick', ({ node }) => {
      const fileNode = fileNodesMap.get(node.id)
      const slug = fileNode?.fields?.slug
      if (slug) {
        navigateTo(slug)
      }
    })

    if (currentFileId) {
      const currentNoteInfo = graphModel.getNodeInfoById(currentFileId)
      const shouldZoomToFit = currentNoteInfo && Boolean(currentNoteInfo.neighbors?.length)
      noteGraphView.setSelectedNodes([currentFileId], { shouldZoomToFit })
    }

    return () => {
      noteGraphView.dispose()
    }
  }, [notes, graphState])

  useHotkeys('Escape Escape', () => {
    setGraphState('hidden')
  })

  const onSearchResults: SearchProps['onResults'] = (results) => {
    if (noteGraphView) {
      const nodeIds = results.map((o) => o.id).filter((s) => s)
      // console.debug('onSearchResults node ids', nodeIds)
      // It's better to add another highlight style or specity styles in `setSelectedNodes`,
      //   I will need to extend note-graph for this.
      if (nodeIds.length) {
        noteGraphView.setSelectedNodes(nodeIds)
      } else {
        noteGraphView.setSelectedNodes([currentFileId])
      }
    }
  }

  return createPortal(
    <div>
      <div
        aria-hidden
        className={`overlay ${shouldShowGraph ? 'show' : ''}`}
        onClick={(ev) => {
          if (!ev.isDefaultPrevented()) {
            setGraphState('hidden')
          }
        }}
      />

      <div
        className={`graph-view__modal modal-${graphState}`}
        onClick={(ev) => ev.preventDefault()}
        style={{ display: shouldShowGraph ? 'flex' : 'none' }}
      >
        <div
          style={{
            width: modalSize.width,
            height: modalSize.height,
          }}
        >
          <button
            className="modal-close"
            type="button"
            onClick={() => {
              setGraphState('hidden')
            }}
            aria-label="Close Graph"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M11.997 9.90045L20.9 1L23 3.09955L14.097 12L23 20.9005L20.9 23L11.997 14.0995L3.10001 22.994L1 20.8944L9.89699 12L1 3.10558L3.10001 1.00603L11.997 9.90045Z" />
            </svg>
          </button>
          <div className="modal-body">
            <div className="flex">
              {!isMobileMode && (
                <div className="graph-view__search-wrap w-3/12">
                  <Search
                    position="right"
                    resultsClassName="graph-view__search-results"
                    resultsWidth={RESULTS_WIDTH}
                    onResults={onSearchResults}
                  ></Search>
                </div>
              )}
              <div>
                <div ref={graphContainer} id="graph-container"></div>
                <div className="graph-view__modal-hint">Press Esc twice to
                  <button
                    type="button"
                    className="graph-view__btn--link"
                    onClick={() => {
                      setGraphState('hidden')
                    }}
                    aria-label="Close Graph"
                  >close</button>
                 this modal.
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
