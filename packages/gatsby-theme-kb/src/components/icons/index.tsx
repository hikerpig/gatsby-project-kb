import * as React from 'react'
import classnames from 'classnames'
import './svg-icon.css';

export const IconChevronRight = (props: { className?: string }) => {
  const className = classnames({
    [props.className || '']: true,
    'svg-icon': true
  })
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
}
