Add a comment system
===

The `gatsby-theme-kb` itself **does not** have a comment system.

But sure, you can see the comments in this demo.

Here is an example of adding a comment system to your site using Gatsby's Shadowing feature.

> 📢  Please read the doc [_Shadowing in Gatsby Themes_](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) first to have a basic understanding of shadowing.

You can check the [demo code on Github](https://github.com/hikerpig/gatsby-project-kb/blob/master/demo/src/gatsby-theme-kb/components/Topic).

## Shadowing component

Take this demo site for example, we add a component in our own site's source to shadow one in the `gatsby-theme-kb` without touching its code.

Here is a simplified list of `gatsby-theme-kb/src/components` directory. Technically you can shadow any component, but we will focus on the `Topic` component for now as it is the main content of the page and very fit to hold the comments.

For all the files those are capable of being shadowed in the `gatsby-theme-kb`, please [refer to its source code](https://github.com/hikerpig/gatsby-project-kb/tree/master/packages/gatsby-theme-kb/src).

``` text
components
├── DarkModeToggle
├── GraphButton
├── GraphView
├── LinkReference
├── Search
├── SiteSidebar // topic left sidebar
├── Topic // topic main content
├── TopicLayout
├── TreeView // directory tree view inside the sidebar
├── mdx-components
└── seo.js
```

- We can reuse the shadowed component by importing it from `gatsby-theme-kb/src/components/Topic`.
- Besides that, our main purpose of shadowing is to add a `Comment` component below the main content.

```tsx
// your-site/src/gatsby-theme-kb/components/Topic/index.tsx
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
```

## The Comment component

Here we choose [utterances](https://utteranc.es/) as the comment system. It is a lightweight system that uses GitHub issues. Please refer to its site for more details of setting up it to your github repository.

This component is based on a tutorial [_How to Add Comments To Your GatsbyJS Blog In Less Than 10 Minutes | ahsanayaz.com_](https://ahsanayaz.com/adding-comments-to-your-gatsbyjs-blog/). With a little extra support of light/dark mode toggle.

```tsx
// your-site/src/gatsby-theme-kb/components/Topic/Comment/index.tsx
import React, { useEffect, memo } from 'react'
import useDarkMode from 'use-dark-mode'

type Props = {
  issueTerm: string
}

// you could choose other themes too
const UTTERANCES_THEME_MAP = {
  light: 'github-light',
  dark: 'dark-blue',
}

// please change it to your own and make sure your repo has installed utterances app
const REPO_NAME = 'hikerpig/gatsby-project-kb'

const Comment: React.FC<Props> = memo(({ issueTerm }) => {
  const { value: isDark } = useDarkMode(false)
  const commentsUUID = `comments_${issueTerm}`

  useEffect(() => {
    let anchor
    const theme = isDark ? UTTERANCES_THEME_MAP.dark: UTTERANCES_THEME_MAP.light
    const script = document.createElement('script')
    anchor = document.getElementById(commentsUUID)
    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    script.setAttribute('repo', REPO_NAME)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', theme)
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ''
    }
  })

  return (
    <>
      <div
        id={commentsUUID}
        className="post-comments"
        style={{ position: 'relative' }}
      >
        <div className="utterances-frame"></div>
      </div>
    </>
  )
})

export default Comment
```
