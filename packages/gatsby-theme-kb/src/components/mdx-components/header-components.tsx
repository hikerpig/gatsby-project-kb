import React from 'react'
import { slugifyTitle } from '../../utils/toc'

function makeHeaderComponent(tag) {
  return (props) => {
    const slugified = typeof props.children === 'string' ? slugifyTitle(props.children): props.children
    const id = slugified ? slugified: props.children
    // console.log(`${tag} props`, props, id)
    return React.createElement(tag, {
      id,
      ...props,
    }, props.children)
  }
}

export const h1 = makeHeaderComponent('h1')
export const h2 = makeHeaderComponent('h2')
export const h3 = makeHeaderComponent('h3')
export const h4 = makeHeaderComponent('h4')
export const h5 = makeHeaderComponent('h5')
export const h6 = makeHeaderComponent('h6')
