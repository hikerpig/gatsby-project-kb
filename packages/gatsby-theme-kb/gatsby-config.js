const path = require('path')
const makeSearchPlugins = require('./gatsby-node-utils/makeSearchPlugins')

module.exports = function (options) {
  const {
    contentPath = 'content',
    mdxOtherwiseConfigured = false,
  } = options
  // console.log('options', arguments)

  return {
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: 'gatsby-plugin-alias-imports',
        options: {
          extensions: ['js']
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: contentPath,
          name: contentPath,
        },
      },
      !mdxOtherwiseConfigured && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.md`, `.mdx`],
          remarkPlugins: [
          ],
          gatsbyRemarkPlugins: [
            // 'gatsby-remark-double-brackets-link',
            {
              resolve: 'gatsby-remark-double-brackets-link',
              options: {
                stripBrackets: false,
              }
            },
            'gatsby-remark-double-parenthesis-link',
            // {
            //   resolve: `gatsby-remark-images`,
            //   options: {
            //     maxWidth: 561,
            //   },
            // },
            // `gatsby-remark-copy-linked-files`,
          ],
        },
      },
      'gatsby-transformer-markdown-references',
      'gatsby-plugin-postcss',
      {
        resolve: 'gatsby-plugin-tocbot',
        options: {
          tocbotOptions: {
            contentSelector: '.topic-layout__main',
            collapseDepth: 5,
            scrollContainer: '.topic-layout__main',
          }
        },
      },
      ...makeSearchPlugins(options),
    ],
  }
}
