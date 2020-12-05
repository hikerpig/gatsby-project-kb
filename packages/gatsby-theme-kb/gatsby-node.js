const { createFilePath } = require(`gatsby-source-filesystem`)
const { sourceNodes } = require('./gatsby-node-utils/source-nodes')
const { createSchemaCustomization } = require('./gatsby-node-utils/create-schema-customization')

exports.sourceNodes = sourceNodes

exports.createSchemaCustomization = createSchemaCustomization

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slugValue = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: slugValue,
    })
  }
}
