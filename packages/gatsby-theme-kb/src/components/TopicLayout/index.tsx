import * as React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import './topic-layout.css';

export type Props = React.PropsWithChildren<{
}>

export default function TopicLayout(props: Props) {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="topic-layout">
      <div className="topic-layout__left">
        Left
      </div>
      <div className="topic-layout__content">
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}
