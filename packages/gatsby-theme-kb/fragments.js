import { graphql } from "gatsby";

export const references = graphql`
  fragment GatsbyGardenReferences on Mdx {
    outboundReferences {
      contextLine
      targetAnchor
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
      referrer {
        ... on Mdx {
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
