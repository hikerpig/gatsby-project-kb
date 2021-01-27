const path = require('path')
const makeSearchPlugins = require('./gatsby-node-utils/makeSearchPlugins')

module.exports = function (options) {
  const {
    basePath = '/',
    contentPath = 'content',
    mdxOtherwiseConfigured = false,
  } = options
  // console.log('options', arguments)

  return {
    pathPrefix: basePath,
    plugins: [
      `gatsby-plugin-react-helmet`,
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
            {
              resolve: 'gatsby-remark-double-brackets-link',
              options: {
                stripBrackets: false,
              }
            },
            'gatsby-remark-double-parenthesis-link',
          ],
        },
      },
      'gatsby-transformer-markdown-references',
      'gatsby-plugin-postcss',
      {
        resolve: 'gatsby-plugin-purgecss',
        options: {
          printRejected: true,
          tailwind: true,
          purgeOnly: [
            path.join(__dirname, 'src/styles/global.css')
          ],
          content: [
            path.join(__dirname, 'src/**/*.{ts,js,jsx,tsx}')
          ],
        }
      },
      {
        resolve: 'gatsby-plugin-tocbot',
        options: {
          tocbotOptions: {
            contentSelector: '.topic-layout__content',
            collapseDepth: 5,
            scrollContainer: '.topic-layout__content',
          }
        },
      },
      ...makeSearchPlugins(options),
    ],
  }
}
