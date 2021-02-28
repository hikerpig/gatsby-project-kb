gatsby-theme-kb
===

A Gatsby theme for publishing **K**nowledge **B**ase.

See the demo and [documentation](https://gatsby-project-kb.vercel.app/).

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
| extensions | ['.md', '.mdx']         | Valid content file exts |
| ignore     | `['.git']`         | A list of file globs to ignore |
| getPluginMdx | (defaultPluginMdx) => PluginMdx | Customise pre-configured `gatsby-plugin-mdx`, please do always return a valid gatsby plugin object |

<!-- ## How to override a Component -->
