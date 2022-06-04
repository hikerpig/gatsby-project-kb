# Wiki Link

A wiki-link is a link text wrapped inside double brackets `[[]]`.

## Some further details

### Anchor reference

> NOTICE: This is non-standard for wiki links, but I found it quite suit to my needs so I implement it in gatsby-project-kb, and Obsidian has this support, too.

You can refer to a topic's specific section by anchor text, which is after the hashtag `#`.

For example, for a target topic with the structure as below.

```text
# header 1
## header 2
```

It's possible to link to the second header with `[[topic#header 2]]`. The target url will be `topic#header-2`, with the anchor text processed by `slugify`.

## About markdown link

This theme is also capable of [extract plain markdowndown internal links](https://github.com/hikerpig/gatsby-project-kb/issues/53) and show them in backlinks.

```md
A paragraph with a [markdown link](../some-other-file)
```

Currently only relative link **without** file extension will be recognized.

```md
This [won't work](../some-other-file.md)
```
