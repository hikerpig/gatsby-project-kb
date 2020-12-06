const path = require('path');

module.exports = {
  siteMetadata: {
    title: `gatsby-theme-kb`,
    description: `Your personal knowledge base`,
    author: `@hikerpig`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-kb',
      options: {
        contentPath: path.resolve(__dirname, 'content'),
      },
    },
    // {
    //   resolve: '@aengusm/gatsby-theme-brain',
    //   options: {
    //     notesDirectory: path.join(__dirname, 'content/'),
    //     noteTemplate: path.join(__dirname, 'src/templates/note.js'),
    //     rootPath: '/',
    //     rootNote: 'index',
    //   },
    // },
    // {
    //   resolve: 'gatsby-theme-garden',
    //   options: {
    //     contentPath: path.join(__dirname, 'content/'),
    //   },
    // },
  ],
};
