import React from 'react'
import { TableOfContents, TOCItem } from '../../type'
import { slugifyTitle } from '../../utils/toc'
import './inline-toc.css'

interface InlineTOCProps {
  tableOfContents: TableOfContents
}

const InlineTOC = ({ tableOfContents }: InlineTOCProps) => {
  return (
    <div className="inline-toc">
      <div className="inline-toc__header">Table Of Contents</div>
      {tableOfContents.items && (
        <TOCItemComponent item={tableOfContents} className="inline-toc__top-node" />
      )}
    </div>
  )
}

type TOCItemProps = {
  item: TOCItem
  className?: string
}

function TOCItemComponent({ item, className }: TOCItemProps) {
  const itemsElement = item.items ? (
    <ol className={className}>
      {item.items.map((childItem) => (
        <TOCItemComponent key={childItem.url} item={childItem} />
      ))}
    </ol>
  ) : null
  return item.title ? (
    <li className={className}>
      <a href={`#${slugifyTitle(item.title)}`}>{item.title}</a>
      {itemsElement}
    </li>
  ) : (
    itemsElement
  )
}

export default InlineTOC
