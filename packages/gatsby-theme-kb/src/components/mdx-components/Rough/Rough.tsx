// Adopted from https://github.com/mrmartineau/gatsby-theme-code-notes

import React from 'react'
import { RoughNotation } from 'react-rough-notation'

export const Underline = (props) => (
  <RoughNotation type="underline" show={true} {...props} />
)
export const Box = (props) => {
  return (
    <RoughNotation
      type="box"
      show={true}
      color={props.color}
      multiline={true}
      {...props}
    />
  )
}
export const Circle = (props) => {
  return (
    <RoughNotation
      type="circle"
      show={true}
      color={props.color}
      multiline={true}
      {...props}
    />
  )
}
export const Highlight = (props) => {
  return (
    <RoughNotation
      type="highlight"
      show={true}
      color={props.color}
      multiline={true}
      {...props}
    />
  )
}
export const StrikeThrough = (props) => {
  return (
    <RoughNotation
      type="strike-through"
      show={true}
      color={props.color}
      multiline={true}
      {...props}
    />
  )
}
export const CrossedOff = (props) => {
  return (
    <RoughNotation
      type="crossed-off"
      show={true}
      color={props.color}
      multiline={true}
      {...props}
    />
  )
}
