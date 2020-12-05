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

module.exports = ({
  contentRoot = 'content',
  notesFileExtensions = ['.md', '.mdx'], // File extensions that will be used to generate pages
  noteTemplate = './templates/brain.js', // Template to use for note rendering
  additionalNoteTypes = {}, // Mapping object from note type keys to template paths
  baseUrl = '', // Set the base url for your site (e.g. in this case https://example.com/brain)
}) => {
  console.log('options', arguments[0])

  return {
    plugins: [
      `gatsby-plugin-react-helmet`,
      'gatsby-transformer-remark',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: contentRoot,
        },
      },
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
