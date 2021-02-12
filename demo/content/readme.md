# Gatsby knowledge base theme

This is a Gatsby theme for publishing knowledge base or personal wiki. Named `gatsby-theme-kb`.

Create your [Second Brain](https://www.buildingasecondbrain.com/) by writing down your thoughts - or as the term used this theme `topics` -  and their relations in markdown.

Heavily inspired by [gatsby-digital-garden](https://github.com/mathieudutour/gatsby-digital-garden) and [Obsidian](https://publish.obsidian.md/help/Index).

## ✨ Features

- Support bidirectional wiki-links in double brackets `[[]]`.
- Hover preview for wiki-links.
- A nice interactive [[graph-view]] visualizing the relationships of your notes.
- Mobile friendly responsive design.
- Local search.
- Light and dark mode.
- Auto-generated sidebar based on notes directory.
- Auto-generated table of contents.
- Configurable `mdx` processing system, with the power of `gatsby-plugin-mdx`.

## Working with knowledge management tools

### Foam

[Foam](https://foambubble.github.io/foam/) is a personal knowledge management and sharing system inspired by Roam Research, built on Visual Studio Code and GitHub.

But it doesn't bundled with an offical publishing system (yet).

And `gatsby-theme-kb` is one of the few Foam publishing solutions that supports note graph rendering.

With the help of [Foam for VSCode](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode) plugin auto-creating link definitions, you knowledge base can have nested folders. 

I've created a Foam template [foam-template-gatsby-kb](https://github.com/hikerpig/foam-template-gatsby-kb/) to help you start. There are some detailed instructions in it's readme.

### Obsidian

Currently this theme is far less versatile than Obsidian's publishing system.

And this doest not support nested folder very well (yet).

But this is free and open, you can extend it as you wish.

## Extending it in your Gatsby site

Some Gatsby offical tutorials about extending a theme.

- [Shadowing in Gatsby Themes](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/)

## Any Thoughts to make this better?

Welcome to open issues and PRs on [github repo](https://github.com/hikerpig/gatsby-project-kb).

[graph-view]: ./features/graph-view.md