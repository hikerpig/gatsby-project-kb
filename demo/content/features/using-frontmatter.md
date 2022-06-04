Using frontmatter
===

## Some special fields

### `title`

This will set the page title of a topic page.

```yaml
---
title: Zettelkasten
---
```

If you have not specified title in frontmatter, `gatsby-theme-kb` will extract the first `h1` as title of the page.

### `private` to hide it from publishing

You can prevent the topic from being published by setting `private: True` in frontmatter.

```markdown
---
private: True
---

## Some private or temporary stuff
```
