import { SourceNodesArgs } from 'gatsby'
import * as path from 'path'
import * as fsWalk from '@nodelib/fs.walk'
import { PluginOptions, resolveOptions } from './options'
import { ContentTree, ContentNode, CONTEXT_TREE_CACHE_KEY } from './content-tree'

export const sourceNodes = async (
  { cache }: SourceNodesArgs,
  _options?: PluginOptions
) => {
  const options = resolveOptions(_options)
  const { contentPath, extensions } = options
  if (!options.contentPath) return

  const tree = new ContentTree(
    new ContentNode(true, {
      name: contentPath,
      path: contentPath,
      key: contentPath,
    })
  )

  const entries: fsWalk.Entry[] = fsWalk
    .walkSync(contentPath, { basePath: '' })
    .filter((entry) => {
      if (!entry.dirent.isDirectory()) {
        if (!extensions.includes(path.extname(entry.name))) {
          return false
        }
      }
      return true
    })
  // walk the contentPath and collect all possible files,
  //   then write the constructed file tree to gatsby cache for further usage in `setFieldsOnGraphQLNodeType` phase
  entries.forEach((entry) => {
    const node = new ContentNode(entry.dirent.isDirectory(), {
      name: entry.name,
      path: entry.path,
      key: path.basename(entry.name, path.extname(entry.name)),
    })
    tree.add(node)
  })
  const repr = tree.serialize()
  await cache.set(CONTEXT_TREE_CACHE_KEY, repr)
}
