import React from 'react'
import { graphql } from 'gatsby'

import Topic from '../components/Topic'
import Seo from '../components/seo'
import Layout from '../components/layout'

import GraphButton from '../components/GraphButton'


export default (props) => {
  console.log('props', props)

  const file = props.data.file

  const headerAddons = <GraphButton graphState="maximized" currentFileId={props.pageContext.id}></GraphButton>
  return (
    <Layout headerAddons={headerAddons}>
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
