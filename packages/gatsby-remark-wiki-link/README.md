# `gatsby-remark-wiki-link`

Transform `[[Link to page]]` into `[Link to page](titleToURL('Link to page'))`.

## Installation

```bash
npm install gatsby-remark-wiki-link
```

## Usage

Add the plugin to your Gatsby config:

```js
{
  resolve: `gatsby-plugin-mdx`,
  options: {
    gatsbyRemarkPlugins: [
      {
        resolve: `gatsby-remark-wiki-link`,
      },
    ],
  },
}
```
