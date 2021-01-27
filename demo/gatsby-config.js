const path = require('path');

const pathPrefix = process.env.KB_BASE_PATH || '/'

module.exports = {
  pathPrefix,
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
    'gatsby-plugin-no-sourcemaps',
  ],
};
