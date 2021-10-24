Show Table Of Contents
===

`gatsby-theme-kb` can be configured to have different placements of auto-generated table of contents. 

Suported option type is `false \| Array<'inline' | 'sidebar'>`.

By default, the value is `['sidebar']`, so if you want to enable the `inline` behavior, please apply the respective option.

For example: 

```js
{
  resolve: 'gatsby-theme-kb',
  options: {
    tocTypes: ['inline', 'sidebar'],
  },
}
```


## sidebar

Position the TOC in the sidebar.

![sidebar-toc](https://i.loli.net/2021/10/24/W1BMmUQZOyk8ixS.png)

The TOC sidebar can also be triggered in mobile mode.

![sidebar-mobile-toc](https://i.loli.net/2021/10/24/J7TiNrv43xePb9U.png)

## inline

Some people would prefer to see the table of contents inline content on top of the page.

![inline-toc](https://i.loli.net/2021/10/24/TfoKMuxWIEbipXV.png)
