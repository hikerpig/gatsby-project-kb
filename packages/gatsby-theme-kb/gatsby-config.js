const path = require('path')
const makeSearchPlugins = require('./gatsby-node-utils/makeSearchPlugins')

module.exports = function (options) {
  const {
    contentPath = 'content',
    mdxOtherwiseConfigured = false,
    ignore = ['.git'],
    extensions = [`.md`, `.mdx`],
  } = options

  // console.log('options', arguments)
  const defaultGetPluginMdx = () => {
    return {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-wiki-link',
            options: {
              stripBrackets: false,
              stripDefinitionExts: extensions,
            },
          },
          'gatsby-remark-double-parenthesis-link',
        ],
      },
    }
  }

  const pluginMdx = mdxOtherwiseConfigured
    ? null
    : options.getPluginMdx
    ? options.getPluginMdx(defaultGetPluginMdx())
    : defaultGetPluginMdx()

  // console.log('plugin mdx', pluginMdx)

  return {
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: contentPath,
          name: contentPath,
          ignore,
        },
      },
      pluginMdx,
      {
        resolve: '@gatsby-project-kb/transformer-wiki-references',
        options: {
          contentPath: path.resolve(process.cwd(), contentPath),
          extensions,
        },
      },
      'gatsby-plugin-postcss',
      {
        resolve: 'gatsby-plugin-purgecss',
        options: {
          printRejected: true,
          tailwind: true,
          purgeOnly: ['src/styles/global.css'],
          content: [path.join(__dirname, 'src/**/*.{ts,js,jsx,tsx}')],
        },
      },
      {
        resolve: 'gatsby-plugin-tocbot',
        options: {
          tocbotOptions: {
            contentSelector: '.topic-layout__content',
            collapseDepth: 5,
            scrollContainer: '.topic-layout__content',
          },
        },
      },
      ...makeSearchPlugins(options),
    ],
  }
}
