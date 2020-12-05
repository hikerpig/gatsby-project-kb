exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

      // childMdx: Mdx
  const typeDefs = `
    type Note implements Node @infer {
      title: String!
      slug: String!
      rawContent: String
      content: String
      noteTemplate: String
      aliases: [String]
      outboundReferences: [String]
      outboundReferenceNotes: [Note] @link(from: "outboundReferenceNotes___NODE")
      inboundReferences: [String]
      inboundReferenceNotes: [Note] @link(from: "inboundReferenceNotes___NODE")
      inboundReferencePreview: [InboundReferencePreview]
      externalInboundReferences: [ExternalInboundReference]
      externalOutboundReferences: [ExternalOutboundReference]
    }

    type ExternalInboundReference {
      siteName: String!
      sourcePage: String!
      sourceUrl: String!
      previewHtml: String!
    }

    type ExternalOutboundReference {
      targetSite: String!
      targetPage: String!
      previewHtml: String!
    }

    type InboundReferencePreview @infer {
      source: String!
      previewHtml: String!
    }
  `

  createTypes(typeDefs)
}
