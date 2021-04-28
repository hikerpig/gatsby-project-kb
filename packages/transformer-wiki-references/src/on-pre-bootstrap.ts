import { ParentSpanPluginArgs } from 'gatsby'
import * as path from 'path'
import * as fsWalk from '@nodelib/fs.walk'
import { PluginOptions, resolveOptions } from './options'
import { ContentTree, ContentNode, CONTEXT_TREE_CACHE_KEY } from './content-tree'
import anymatch from 'anymatch'

export const onPreBootstrap = async (
  { cache }: ParentSpanPluginArgs,
  _options?: PluginOptions
) => {
  const options = resolveOptions(_options)
  const { contentPath, extensions, ignore } = options
  if (!options.contentPath) return

  const tree = new ContentTree(
    new ContentNode({
      name: contentPath,
      path: contentPath,
      key: contentPath,
    })
  )

  const entries: fsWalk.Entry[] = fsWalk
    .walkSync(contentPath, {
      basePath: '',
      deepFilter: (entry) => {
        return !/\/node_modules\//.test(entry.path)
      },
      entryFilter: (entry) => {
        if (ignore) {
          return !anymatch(ignore, entry.path)
        }
        return true
      }
    })
    .filter((entry) => {
      if (entry.dirent.isDirectory()) return false
      if (!extensions.includes(path.extname(entry.name))) {
        return false
      }
      return true
    })
  // walk the contentPath and collect all possible files,
  //   then write the constructed file tree to gatsby cache for further usage in `setFieldsOnGraphQLNodeType` phase
  entries.forEach((entry) => {
    const node = new ContentNode({
      name: entry.name,
      path: entry.path,
      key: path.basename(entry.name, path.extname(entry.name)),
    })
    tree.add(node)
  })
  const repr = tree.serialize()
  await cache.set(CONTEXT_TREE_CACHE_KEY, repr)
}
