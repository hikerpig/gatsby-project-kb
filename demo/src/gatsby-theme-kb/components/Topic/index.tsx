import React from 'react'
import ThemeTopic, {
  Props as ThemeTopicProps,
} from 'gatsby-theme-kb/src/components/Topic'
import Comment from './Comment'

interface TopicProps extends ThemeTopicProps {}

const Topic = (props: TopicProps) => {
  return (
    <>
      <ThemeTopic {...props}></ThemeTopic>
      <div className="comment-wrapper">
        <Comment issueTerm={props.file.fields.slug} />
      </div>
    </>
  )
}

export default Topic
