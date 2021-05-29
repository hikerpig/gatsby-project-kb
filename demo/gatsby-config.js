const path = require('path')

const pathPrefix = process.env.KB_BASE_PATH || '/'

module.exports = {
  pathPrefix,
  siteMetadata: {
    title: `Vidyāmaṇḍala`,
    description: `Working notes aka a digital garden a place for collecting ideas and ideating.`,
    author: `Zubayr Ali`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-kb',
      options: {
        contentPath: path.resolve(__dirname, 'content'),
        wikiLinkLabelTemplate: '[[{{ title }}]]',
        ignore: [
          '**/.git/**',
          '**/.github/**',
          '**/.vscode/**',
          '**/.obsidian/**',
          '**/.cache/**',
        ],
        getPluginMdx(defaultPluginMdx) {
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          })
          return defaultPluginMdx
        },
      },
    },
    'gatsby-plugin-no-sourcemaps',
  ],
}
