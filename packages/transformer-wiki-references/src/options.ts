export type PluginOptions = {
  types?: string[]
  extensions?: string[]
  contentPath?: string
  ignore?: string[]
}

const defaultOptions = {
  types: ['Mdx'],
  extensions: ['.md', '.mdx'],
}

export const resolveOptions = (options?: PluginOptions) => {
  return { ...defaultOptions, ...options }
}
