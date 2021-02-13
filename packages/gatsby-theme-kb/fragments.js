import { graphql } from "gatsby";

export const references = graphql`
  fragment GatsbyGardenReferences on Mdx {
    outboundReferences {
      contextLine
      target {
        ... on Mdx {
          body
          parent {
            id
            ... on File {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    }
    inboundReferences {
      contextLine
      target {
        ... on Mdx {
          body
          parent {
            id
            ... on File {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    }
  }
`;
