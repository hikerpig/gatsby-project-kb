gatsby-theme-kb
===

A Gatsby theme for publishing **K**nowledge **B**ase.

See the [demo and documentation](https://gatsby-project-kb.vercel.app/).

[![preview](https://i.loli.net/2021/01/28/cD6QRIZqUoum4Tf.png)](https://gatsby-project-kb.vercel.app/)

# Setup in your Gatsby project

1. Install dependency

```
yarn add gatsby-theme-kb
```

2. Add these to your gatsby-config.js file:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-kb`,
      options: {
        contentPath: path.resolve(__dirname, 'content'),
        rootNote: 'readme',
        wikiLinkLabelTemplate: '[[{{ refWord }}]]',
        getPluginMdx(defaultPluginMdx) {
          // customise pre-configured `gatsby-plugin-mdx`, for example:
          // defaultPluginMdx.options.gatsbyRemarkPlugins.push({
          //   resolve: 'gatsby-remark-prismjs',
          // })
          return defaultPluginMdx
        },
      },
    },
  ],
};
```

3. Add notes to your site by adding `md` or `mdx` files in `content` directory, especially you need a `content/readme.md` file if you are using above configs.

4. Start developing your site by running `gatsby develop`. If you are using above configuration, your start url will be 'http://localhost:8000'.

# Usage

## Options

|           Key          | Default value |                                  Description                                 |
|:----------------------:|:-------------:|:----------------------------------------------------------------------------:|
| rootNote               |  `/readme`    | Root note's name (without exts)
| contentPath            |               | Location of local content                                                    |
| extensions | `['.md', '.mdx']`         | Valid content file exts |
| ignore     | `['.git']`         | A list of file globs to ignore |
| wikiLinkLabelTemplate     |          | A template string for specifying wiki link label, see [ options.wikiLinkLabelTemplate](# options.wikiLinkLabelTemplate) |
| getPluginMdx | (defaultPluginMdx) => PluginMdx | Customise pre-configured `gatsby-plugin-mdx`, please do always return a valid gatsby plugin object |
| tocTypes | `['sidebar']` | Customise the toc location, type is `false \| Array<'inline' | 'sidebar'>` |
| slugifyFn | `(name) => require('slugify')(name)` | Customise the url slug of a given file name |


### options.wikiLinkLabelTemplate

When a wikilink is resolved and rendered as an anchor element, the anchor label is by default `[[reference-word]]`. But some people may prefer some other forms, so here is one option for specifying the link label you want.

The template string will be processed in a mustache alike manner, the variable inside `{{}}` will be replaced by real value. Currently there are some variables available:

- `refWord`, the reference word inside the double brackets, usually it's the filename (without exts).
- `title`, the title of the page, may be the frontmatter `title` field value, or h1 of the markdown content. 

For example there is page A, filename is `page-a.md`, page title is `Awesome Themes`.

And in page B I write the reference as `[[page-a]]`.

- config `wikiLinkLabelTemplate: '[[ {{refWord}} ]]'`, will generate `[[ page-a ]]` as link label.
- config `wikiLinkLabelTemplate: '{{title}}'`, will generate `Awesome Themes` as link label.

<!-- ## How to override a Component -->
