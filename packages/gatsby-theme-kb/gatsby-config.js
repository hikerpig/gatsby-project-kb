const path = require('path')

module.exports = function ({
  contentPath = 'content',
  notesFileExtensions = ['.md', '.mdx'], // File extensions that will be used to generate pages
  additionalNoteTypes = {}, // Mapping object from note type keys to template paths
  baseUrl = '', // Set the base url for your site (e.g. in this case https://example.com/brain)
  mdxOtherwiseConfigured = false,
}) {
  // console.log('options', arguments)

  return {
    plugins: [
      `gatsby-plugin-react-helmet`,
      'gatsby-transformer-remark',
      {
        resolve: 'gatsby-plugin-alias-imports',
        options: {
          // alias: {
          //   "note-graph": path.join(__dirname, '../../node_modules/note-graph/dist/note-graph.js'),
          // },
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
          gatsbyRemarkPlugins: [
            'gatsby-remark-double-brackets-link',
            'gatsby-remark-double-parenthesis-link',
            // {
            //   resolve: `gatsby-remark-images`,
            //   options: {
            //     maxWidth: 561,
            //   },
            // },
            // `gatsby-remark-copy-linked-files`,
            // {
            //   resolve: `gatsby-remark-autolink-headers`,
            //   options: {
            //     icon: false,
            //   },
            // },
          ],
        },
      },
      'gatsby-transformer-markdown-references',
      'gatsby-plugin-postcss',
      // {
      //   resolve: `gatsby-source-filesystem`,
      //   options: {
      //     name: `images`,
      //     path: `${__dirname}/src/images`,
      //   },
      // },
    ],
  }
}
