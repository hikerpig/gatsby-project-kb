const shouldHandleFile = require('./shouldHandleFile')

module.exports = function makeSearchPlugins (options) {
  const { contentPath } = options;

  if (!contentPath) {
    return [];
  }

  const filesPath = `
  {
    allFile {
      nodes {
        id
        ext
        sourceInstanceName
        fields {
          title
          slug
        }
        childMdx {
          excerpt
          rawBody
        }
        internal {
          mediaType
        }
      }
    }
  }
  `;

  const query = filesPath

  return [
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "paths",
        engine: "flexsearch",
        query,

        index: ["path"],

        store: ["id", "path", "title", "excerpt"],

        normalizer: ({ data }) => {
          let result = [];
          if (contentPath) {
            result = result.concat(
              data.allFile.nodes
                .filter((node) => shouldHandleFile(node, options))
                .map((node) => ({
                  id: node.id,
                  path: node.fields.slug,
                  title: node.fields.title,
                  // Replace weirdly formatted [ link ] in excerpt to look like wikilinks ([link])
                  excerpt: node.childMdx.excerpt.replace(
                    /\[\s([\w'-]+)\s\]/gi,
                    (_, p1) => `[${p1}]`
                  ),
                }))
            );
          }
          return result;
        },
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "titles",
        engine: "flexsearch",
        query,

        index: ["title"],

        store: [],

        normalizer: ({ data }) => {
          let result = [];
          if (contentPath) {
            result = result.concat(
              data.allFile.nodes
                .filter((node) => shouldHandleFile(node, options))
                .map((node) => ({
                  id: node.id,
                  title: node.fields.title,
                }))
            );
          }
          return result;
        },
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "bodies",
        engine: "flexsearch",
        query,

        index: ["body"],

        store: [],

        normalizer: ({ data }) => {
          let result = [];
          if (contentPath) {
            result = result.concat(
              data.allFile.nodes
                .filter((node) => shouldHandleFile(node, options))
                .map((node) => ({
                  id: node.id,
                  body: node.childMdx.rawBody,
                }))
            );
          }
          return result;
        },
      },
    },
  ];
};