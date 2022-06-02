//@ts-check
const fs = require(`fs`)
const path = require(`path`)
const { urlResolve } = require(`gatsby-core-utils`)
const shouldHandleFile = require('./gatsby-node-utils/shouldHandleFile')
const slugify = require(`slugify`)
const {
  findTopLevelHeading,
} = require(`@gatsby-project-kb/transformer-wiki-references`)

// These are customizable theme options we only need to check once
let contentPath
let rootNoteSlug
// let extensions
// let mediaTypes
let wikiLinkLabelTemplate
let tocTypes = ['sidebar']
let slugifyFn = defaultSlugifyFn

function padSlugLeading(str) {
  if (typeof str !== 'string') return str
  if (!str.startsWith('/')) str = '/' + str
  return str
}

exports.onPreBootstrap = async ({ store }, themeOptions) => {
  contentPath = themeOptions.contentPath
  rootNoteSlug = padSlugLeading(themeOptions.rootNote) || '/readme'
  // extensions = themeOptions.extensions || ['.md', '.mdx']
  // mediaTypes = themeOptions.mediaTypes || ['text/markdown', 'text/x-markdown']
  wikiLinkLabelTemplate =
    themeOptions.wikiLinkLabelTemplate || wikiLinkLabelTemplate

  if (themeOptions.slugifyFn && typeof themeOptions.slugifyFn === 'function') {
    slugifyFn = themeOptions.slugifyFn
  }

  if ('tocTypes' in themeOptions) {
    tocTypes = themeOptions.tocTypes
  }
}

function getTitle(node, content) {
  if (
    typeof node.frontmatter === 'object' &&
    node.frontmatter &&
    node.frontmatter['title']
  ) {
    return node.frontmatter['title']
  }
  return (
    findTopLevelHeading(content) ||
    (typeof node.fileAbsolutePath === 'string'
      ? path.basename(
          node.fileAbsolutePath,
          path.extname(node.fileAbsolutePath)
        )
      : '') ||
    (typeof node.absolutePath === 'string'
      ? path.basename(node.absolutePath, path.extname(node.absolutePath))
      : '')
  )
}

function defaultSlugifyFn(str) {
  return slugify.default(str)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MdxFrontmatter: {
      private: {
        type: `Boolean`,
        resolve(source, args, context, info) {
          const { private } = source
          if (private == null) {
            return false
          }
          return private
        },
      },
    },
  }
  createResolvers(resolvers)
}

exports.onCreateNode = async ({ node, actions, loadNodeContent }, options) => {
  const { createNodeField } = actions
  if (node.internal.type === `File` && shouldHandleFile(node, options)) {
    const slugifiedName = slugifyFn(node.name)
    const slug = '/' + urlResolve(path.parse(node.relativePath).dir, slugifiedName)
    // console.log('slug is', slug, node.relativePath)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `title`,
      value: getTitle(node, await loadNodeContent(node)),
    })
  }
}

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions

  if (contentPath) {
    const result = await graphql(
      `
        {
          allFile {
            nodes {
              id
              sourceInstanceName
              ext
              internal {
                mediaType
              }
              fields {
                slug
              }
              childMdx {
                id
                frontmatter {
                  private
                }
                outboundReferences {
                  refWord
                  label
                  target {
                    ... on Mdx {
                      id
                      slug
                    }
                  }
                }
              }
            }
          }
          allMdx {
            nodes {
              id
              slug
              outboundReferences {
                refWord
                label
                target {
                  ... on Mdx {
                    id
                    slug
                  }
                }
              }
              parent {
                ... on File {
                  id
                }
              }
            }
          }
        }
      `
    )

    if (result.errors) {
      console.log(result.errors)
      throw new Error(`Could not query notes`, result.errors)
    }

    const TopicTemplate = require.resolve(
      options.topicTemplate || `./src/templates/Topic`
    )

    const mdxNodeMap = new Map()
    result.data.allMdx.nodes.forEach((mdxNode) => {
      mdxNodeMap.set(mdxNode.id, mdxNode)
    })

    const getContextByNode = (n) => {
      const refWordMdxSlugDict = {}

      const enrichRefDetails = (mdxNode) => {
        if (mdxNode && mdxNode.outboundReferences) {
          mdxNode.outboundReferences.forEach((ref) => {
            const refMdxNode = mdxNodeMap.get(ref.target.id)
            // console.log(
            //   'refMdxNode exists: ',
            //   Boolean(refMdxNode),
            //   ref.target.id
            // )
            if (refMdxNode) {
              // console.log(`${ref.refWord}: ${refMdxNode.slug}`)
              if (refWordMdxSlugDict[ref.refWord]) {
                return // prevent cycles
              }
              refWordMdxSlugDict[ref.refWord] = refMdxNode.slug
              enrichRefDetails(refMdxNode)
            }
          })
        }
      }

      enrichRefDetails(n.childMdx)

      return {
        id: n.id,
        wikiLinkLabelTemplate,
        refWordMdxSlugDict,
        tocTypes,
      }
    }

    const localFiles = result.data.allFile.nodes
      .filter((node) => shouldHandleFile(node, options))
      .filter((x) => x.childMdx.frontmatter.private !== true)

    localFiles.forEach((node) => {
      createPage({
        path: node.fields.slug,
        component: TopicTemplate,
        context: getContextByNode(node),
      })
    })

    if (rootNoteSlug) {
      const root = localFiles.find((node) => node.fields.slug === rootNoteSlug)
      // console.log('root is', root, 'rootNoteSlug', rootNoteSlug)
      if (root) {
        createPage({
          path: '/',
          component: TopicTemplate,
          context: getContextByNode(root),
        })
      }
    }
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve('path-browserify'),
      },
      fallback: {
        fs: false,
      },
    },
  })
}
