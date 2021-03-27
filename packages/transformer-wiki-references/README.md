# `@gatsby-project-kb/transformer-wiki-references`

A gatsby transformer plugin to extract references between markdown nodes. You can then use them to create bi-directional links.

Forked from [mathieudutour/gatsby-digital-garden](https://github.com/mathieudutour/gatsby-digital-garden/tree/master/packages/gatsby-transformer-markdown-references).

An example site for using this plugin is at [https://wiki.hikerpig.cn/](https://wiki.hikerpig.cn/).


## Install

```
yarn add @gatsby-project-kb/transformer-wiki-references
```

## Usage

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    // after a markdown or Mdx transformer
    {
      resolve: `@gatsby-project-kb/transformer-wiki-references`,
      options: {
        contentPath: '/home/hikerpig/Notes',
        types: ["Mdx"], // or ["MarkdownRemark"] (or both)
      },
    },
  ],
};
```


### Configuration options

**`contentPath`** [string][optional]

The path to directory of your notes, if there are nested folders in your notes, it's recommended that this option is provided so the plugin can resolve the references correctly.

**`types`** [Array<string>][optional]

The types of the nodes to transform. Defaults to `['Mdx']`

## How to query for references

Two types of references are available: `outboundReferences` and `inboundReferences`.

The fields will be created in your site's GraphQL schema on the nodes of types specified in the options.

```graphql
{
  allMdx {
    outboundReferences {
      ... on Mdx {
        id
        parent {
          id
        }
      }
    }
    inboundReferences {
      ... on Mdx {
        id
        parent {
          id
          ... on RoamPage {
            title
          }
        }
      }
    }
  }
}
```
