import { CreateNodeArgs, Node } from 'gatsby'
import { getReferences } from './get-references'
import { PluginOptions, resolveOptions } from './options'
import { clearInboundReferences, setCachedNode } from './cache'
import { findTopLevelHeading } from './markdown-utils'
import { MdxNode } from './type'


function getTitle(node: MdxNode, content: string) {
  if (
    typeof node.frontmatter === 'object' &&
    node.frontmatter &&
    'title' in node.frontmatter &&
    node.frontmatter['title']
  ) {
    return node.frontmatter['title'] as string
  }
  return findTopLevelHeading(content) || ''
}

function getAliases(node: MdxNode) {
  if (
    typeof node.frontmatter === 'object' &&
    node.frontmatter &&
    'aliases' in node.frontmatter &&
    Array.isArray(node.frontmatter['aliases'])
  ) {
    return node.frontmatter['aliases'] as string[]
  }
  return []
}

export const onCreateNode = async (
  { cache, node, loadNodeContent, getNode }: CreateNodeArgs,
  _options?: PluginOptions
) => {
  const options = resolveOptions(_options)

  // if we shouldn't process this node, then return
  if (!options.types.includes(node.internal.type)) {
    return
  }

  const content = await loadNodeContent(node)

  const outboundReferences = getReferences(content, (ref) => {
    ref.referrerNode = node
    return ref
  })

  const title = getTitle(node as MdxNode, content)
  const aliases = getAliases(node as MdxNode)

  await clearInboundReferences(cache)
  await setCachedNode(cache, node.id, {
    node,
    outboundReferences,
    title,
    aliases,
  })
}
