import React from 'react'
import { graphql } from 'gatsby'

import Topic from '../components/Topic'
import Seo from '../components/seo'
import TopicLayout from '../components/TopicLayout'
import { isServer } from '../env'

// minimal template engine
function evaluateTemplate(tpl, data) {
  const re = /{{([^}]+)?}}/g
  let match
  while ((match = re.exec(tpl))) {
    const key = match[1].trim()
    tpl = tpl.replace(match[0], data[key])
  }
  return tpl
}

export default (props) => {
  if (!isServer) {
    console.debug('Topic props', props)
  }

  const file = props.data.file
  let wikiLinkLabelTemplateFn = null
  if (props.pageContext.wikiLinkLabelTemplate) {
    wikiLinkLabelTemplateFn = function (data) {
      try {
        return evaluateTemplate(props.pageContext.wikiLinkLabelTemplate, data)
      } catch (error) {
        console.error('error while evaluateTemplate', error)
      }
    }
  }

  return (
    <TopicLayout pageContext={props.pageContext}>
      <Seo title={file.fields.title}></Seo>
      <Topic
        file={file}
        currentLocation={props.location}
        wikiLinkLabelTemplateFn={wikiLinkLabelTemplateFn}
        refWordMdxSlugDict={props.pageContext.refWordMdxSlugDict}
      ></Topic>
    </TopicLayout>
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
