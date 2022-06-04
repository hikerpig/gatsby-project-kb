# Gatsby knowledge base theme

This is a Gatsby theme for publishing a knowledge base or personal wiki. Named `gatsby-theme-kb`.

Create your [Second Brain](https://www.buildingasecondbrain.com/) by writing down your thoughts - or as the term used this theme `topics` -  and their relations in markdown.

Heavily inspired by [gatsby-digital-garden](https://github.com/mathieudutour/gatsby-digital-garden) and [Obsidian](https://publish.obsidian.md/help/Index).

## ✨ Features

- Support bidirectional [[wiki-links]] in double brackets `[[]]`, will show the backlink reference context.
- Hover preview for wiki-links.
- A nice interactive [[graph-view]] visualizing the relationships of your notes.
- Mobile-friendly responsive design.
- Local search.
- Light and dark mode.
- Auto-generated sidebar based on notes directory.
- Auto-generated [[table-of-contents]].
- Configurable `mdx` processing system, with the power of `gatsby-plugin-mdx`.
- Page customization by [[using-frontmatter]].

This demo site has some extra gatsby config apart from `gatsby-theme-kb` itself. You can [find them on github](https://github.com/hikerpig/gatsby-project-kb/blob/master/demo/gatsby-config.js).

## Working with knowledge management tools

### Foam

[Foam](https://foambubble.github.io/foam/) is a personal knowledge management and sharing system inspired by Roam Research, built on Visual Studio Code and GitHub.

But it doesn't bundle with an official publishing system (yet).

And `gatsby-theme-kb` is one of the few Foam publishing solutions that support note graph rendering.

With the help of [Foam for VSCode](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode) plugin auto-creating link definitions, your knowledge base can have nested folders.

I've created a Foam template [foam-template-gatsby-kb](https://github.com/hikerpig/foam-template-gatsby-kb/) to help you start. It can also be used to publish an Obsidian vault. There are some detailed instructions in its readme.

### Obsidian

This theme can be used to publish an Obsidian project.

Though currently this is far less versatile than Obsidian's publishing system. e.g. lack of tagging system.

But this is free and open, you can always extend it as you wish.

## Extending it in your Gatsby site

- [Shadowing in Gatsby Themes](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/), Gatsby offical tutorial about extending a theme.
- Extend `gatsby-theme-kb` to [[comment-system]].
- [[override-styles]] shows some approaches to change the appearance of the site.

## Any Thoughts to make this better?

Welcome to open issues and PRs on [github repo](https://github.com/hikerpig/gatsby-project-kb).

[wiki-links]: ./features/wiki-links.md
[graph-view]: ./features/graph-view.md
[using-frontmatter]: ./features/using-frontmatter.md
[comment-system]: ./examples/comment-system
[override-styles]: ./examples/override-styles
