gatsby-theme-kb
===

A Gatsby theme for publishing **K**nowledge **B**ase.

See the demo and [documentation](https://gatsby-project-kb.vercel.app/).

# Setup

1. Install dependency

```
yarn add gatsby-theme-kb
```

2. Add these to your gatsby-config.js file:

```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: path.resolve(__dirname, 'content'),
        rootNote: 'readme'
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
| rootNote               |  readme       | Root note's name (without exts)
| contentPath            |               | Location of local content                                                    |
| extensions | ['.md', '.mdx']         | Valid content file exts |
| ignore     | `['.git']`         | A list of file globs to ignore |
| mdxOtherwiseConfigured | false         | Set it to true if gatsby-plugin-mdx is already configured for your site. |

<!-- ## How to override a Component -->
