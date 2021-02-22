Add syntax highlight
===

The `gatsby-theme-kb` does not cover syntax highlighting, it's up to your options to choose your syntax highlighter. Luckily, the Gatsby ecosystem has some pretty good plugins, [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/) can be a good start.

Here is an example of add a remark plugin to `gatsby-theme-kb`. Since in this theme we use `gatsby-plugin-mdx` to process markdown files, **not** the `gatsby-transformer-remark`.

```js
// a fragment of gatsby-config.js
const path = require('path');

module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-theme-kb',
      options: {
        contentPath: path.resolve(__dirname, 'content'),
        getPluginMdx(defaultPluginMdx) {
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          })
          return defaultPluginMdx
        },
      },
    },
    //  ...
  ],
};
```

Choose one PrismJS theme from it's official site, or [prism-themes](https://github.com/PrismJS/prism-themes).

In this demo site, I use the prism-nord theme, I download it into `src/styles/prism-theme.css`, and import it in `gatsby-browser.js`.

```js
// gatsby-browser.js
import './src/styles/prism-theme.css'
```

## Other resources

- You may try `gatsby-remark-shiki-twoslash` as [this issue mentioned](https://github.com/hikerpig/foam-template-gatsby-kb/issues/5#issuecomment-782902350).