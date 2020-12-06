import React from 'react'
import { graphql } from 'gatsby'

import Topic from '../components/Topic'

export default (props) => {
  console.log('props', props)
  return <div></div>
}

export const pageQuery = graphql`
  query($id: String!) {
    file(id: { eq: $id }) {
      childMdx {
        body
        ...GatsbyGardenReferences
      }
      fields {
        slug
        title
      }
    }
  }
`
