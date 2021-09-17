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
    script.setAttribute('label', 'comment')
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
