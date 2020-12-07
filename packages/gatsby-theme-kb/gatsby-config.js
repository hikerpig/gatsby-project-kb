// module.exports = {
//   siteMetadata: {
//     title: `gatsby-theme-kb`,
//     description: `Your personal knowledge base`,
//     author: `@gatsbyjs`,
//   },
//   plugins: [
//     `gatsby-plugin-react-helmet`,
//     {
//       resolve: `gatsby-source-filesystem`,
//       options: {
//         name: `images`,
//         path: `${__dirname}/src/images`,
//       },
//     },
//     `gatsby-transformer-sharp`,
//     `gatsby-plugin-sharp`,
//     {
//       resolve: `gatsby-plugin-manifest`,
//       options: {
//         name: `gatsby-starter-default`,
//         short_name: `starter`,
//         start_url: `/`,
//         background_color: `#663399`,
//         theme_color: `#663399`,
//         display: `minimal-ui`,
//         icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
//       },
//     },
//   ],
// }

module.exports = function ({
  contentPath = 'content',
  notesFileExtensions = ['.md', '.mdx'], // File extensions that will be used to generate pages
  additionalNoteTypes = {}, // Mapping object from note type keys to template paths
  baseUrl = '', // Set the base url for your site (e.g. in this case https://example.com/brain)
  mdxOtherwiseConfigured = false,
}) {
  console.log('options', arguments)

  return {
    plugins: [
      `gatsby-plugin-react-helmet`,
      'gatsby-transformer-remark',
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
