import React from 'react'
import { graphql } from 'gatsby'

import Topic from '../components/Topic'
import Seo from '../components/seo'
import Layout from '../components/Layout'

export default (props) => {
  console.log('props', props)

  const file = props.data.file

  return (
    <Layout>
      <Seo title={file.fields.title}></Seo>
      <Topic file={file}></Topic>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    file(id: { eq: $id }) {
      childMdx {
        body
        frontmatter {
          title
          private
        }
        ...GatsbyGardenReferences
      }
      fields {
        slug
        title
      }
    }
  }
`
