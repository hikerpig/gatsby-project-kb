const path = require('path');

module.exports = {
  siteMetadata: {
    title: `gatsby-theme-kb`,
    description: `Your personal knowledge base`,
    author: `@hikerpig`,
  },
  plugins: [
    // {
    //   resolve: 'gatsby-theme-kb',
    //   options: {
    //     contentRoot: path.resolve(__dirname, 'content'),
    //   },
    // },
    {
      resolve: '@aengusm/gatsby-theme-brain',
      options: {
        notesDirectory: path.join(__dirname, 'content/'),
        rootPath: '/',
        rootNote: 'index',
      },
    },
  ],
};
