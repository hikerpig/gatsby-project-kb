Override Styles
===

If you want to customize this theme's appearance in your site, there are multiple ways to achieve it.

## Include your own styles for overriding

You can import your own style files in your site's `gatsby-browser.js`. For example, see how this
demo site [overrides and adds its own
styles](https://github.com/hikerpig/gatsby-project-kb/blob/master/demo/gatsby-browser.js).

```js
import './src/styles/prism-theme.css'
import './src/styles/main.css'
```

## Override gatsby-theme-kb css variables

This is similar to the previous approach, but if you just want to change some colors, instead of rewriting all things on your own, it's better to override some of gatsby-theme-kb's builtin CSS variables.

You can see them in the [latest source code](https://github.com/hikerpig/gatsby-project-kb/blob/master/packages/gatsby-theme-kb/src/styles/vars.css).

```css
// obsidian nord
:scope {
  --light-1: #F9FAFB;
  --light-2: #F3F4F6;
  --light-3: #E7E5E4;
  --light-4: #ffffff;

  --dark-1:  #2e3440;
  --dark-2:  #3b4252;
  --dark-3:  #434c5e;
  --dark-4:  #4c566a;

  --frost1: #8fbcbb;
  --frost2: #88c0d0;
  --frost3: #a1c4e6;
  --frost4: #81a1c1;

  --red:    #bf616a;
  --orange: #d08770;
  --yellow: #ebcb8b;
  --green:  #a3be8c;
  --purple: #b48ead;
}

/* default theme light */
body {
  --kb-link-color: #ff5449;
  --kb-tree-cur-color: #e7e5e4;
  --kb-font-family: 'Avenir', -apple-system, sans-serif;
  --kb-shadow-bg: rgba(0, 0, 0, 0.2);
  --kb-text-color: hsl(2deg 20% 15%);
  --kb-text-inverse-color: white;
  --kb-references-bg:  #fafafa;
  --kb-search-highlight-bg: #eaeaea;
  --kb-note-bg: var(--bg-color-1);
  --kb-separator-color: #ddd;
  --kb-scrollbar-thumb: #ddd;
  --kb-blockquote-bg: #f6f6f6;

  --bg-color-1: #F9FAFB;
  --bg-color-2: #F3F4F6;
  --code-bg-color: #f0f0f0;
  --code-color: #333;
}
```

Here is how the dark mode overrides some of the variables:

```css
.dark-mode {
  --kb-link-color: var(--frost3);
  --kb-tree-cur-color: var(--dark-3);
  --kb-font-family: 'Avenir', -apple-system, sans-serif;
  --kb-shadow-bg: rgba(0, 0, 0, 0.2);
  --kb-text-color: #eceff4;
  --kb-text-inverse-color: white;
  --kb-references-bg:  var(--dark-2);
  --kb-search-highlight-bg: var(--dark-3);
  --kb-separator-color: #666;
  --kb-scrollbar-thumb: var(--dark-4);
  --kb-blockquote-bg: #353c48;

  --bg-color-1: var(--dark-1);
  --bg-color-2: var(--dark-2);
  --code-bg-color: var(--dark-2);
  --code-color: var(--purple);
}
```

## Override graph view colors

This theme uses [note-graph](https://github.com/hikerpig/note-graph) to show the relationship of the
notes. note-graph uses a canvas for drawing, so usually it's not straightforward to change how it
looks.

note-graph do provide some methods to customize the colors.

### CSS Variables

When initializing its theme, note-graph will try to read CSS variables on it's container's scope:

```text
--notegraph-background:                   color of canvas background
--notegraph-note-color-regular:           color of normal node
--notegraph-highlighted-foreground-color: border color of highlighted node
--notegraph-link-color-regular:           color of normal link
--notegraph-link-color-highlighted:       color of highlighted link
```

So it's possible to specify some essential colors of the theme by overriding the CSS variables.

For example, apply the ayu palette to note-graph:

```css
body {
  --notegraph-background: #fff;
  --notegraph-note-color-regular: #fdb05e;
  --notegraph-highlighted-foreground-color: #ff9838;
  --notegraph-link-color-regular: #ffbdbd;
  --notegraph-link-color-highlighted: #ff99bd;
}
```
