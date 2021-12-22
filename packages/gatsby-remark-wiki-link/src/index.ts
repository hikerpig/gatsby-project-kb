import * as visit from 'unist-util-visit'
import { Node } from 'unist'
import { LinkReference, Definition, Link, Text, StaticPhrasingContent } from 'mdast'
import slugify from 'slugify'
import * as path from 'path'

interface LinkReferenceNode extends LinkReference {
  url?: string;
  title?: string;
}

/**
 * if title is something like `folder1/folder2/name`,
 * will slugify the name, while keeping the folder names
 */
const defaultTitleToURLPath = (title: string) => {
  const segments = title.split('/')
  let titleCandidate = segments.pop() as string
  const hashIndex = titleCandidate.indexOf('#')
  if (hashIndex > -1) {
    titleCandidate = titleCandidate.substring(0, hashIndex)
  }
  const slugifiedTitle = slugify(titleCandidate)
  return `${segments.join('/')}/${slugifiedTitle}`
}

const processWikiLinks = (
  { markdownAST }: { markdownAST: Node },
  options?: { titleToURLPath?: string; stripBrackets?: boolean, stripDefinitionExts?: string[] }
) => {
  const { stripDefinitionExts } = options
  const titleToURL = options?.titleToURLPath
    ? require(options.titleToURLPath)
    : defaultTitleToURLPath

  const definitions: { [identifier: string]: Definition } = {}

  const getLinkInfo = (definition: Definition) => {
    if (typeof definition.identifier !== 'string') return
    let linkUrl = definition.url
    const isExternalLink = /\/\//.test(linkUrl)
    let shouldReplace = !isExternalLink
    if (shouldReplace && stripDefinitionExts) {
      const extname = path.extname(definition.url || '')
      const matchedExtname = stripDefinitionExts.find((n) => extname === n)
      if (matchedExtname) {
        linkUrl = linkUrl.slice(0, linkUrl.length - matchedExtname.length)
      }
    }
    return {
      linkUrl,
      shouldReplace
    }
  }

  visit(markdownAST, `definition`, (node: Definition) => {
    if (!node.identifier || typeof node.identifier !== 'string') {
      return
    }
    definitions[node.identifier] = node
  })
  visit(markdownAST, `linkReference`, (node: LinkReferenceNode, index, parent) => {
    if (node.referenceType !== 'shortcut') {
      return
    }

    const definition = definitions[node.identifier]
    const linkInfo = definition ? getLinkInfo(definition): null
    const linkUrl = linkInfo ? linkInfo.linkUrl: definition?.url
    if ((linkInfo && !linkInfo.shouldReplace)) {
      // console.log('should not replace', definitions, node.identifier)
      return
    }

    const siblings = parent.children
    if (!siblings || !Array.isArray(siblings)) {
      return
    }
    const previous: StaticPhrasingContent = siblings[index - 1] as any
    const next: StaticPhrasingContent = siblings[index + 1] as any

    if (!(previous && next)) {
      return
    }

    if (!('value' in previous && 'value' in next)) {
      return
    }

    const previousValue = previous.value as string
    const nextValue = next.value as string

    if (
      previous.type !== 'text' ||
      previous.value[previousValue.length - 1] !== '[' ||
      next.type !== 'text' ||
      next.value[0] !== ']'
    ) {
      return
    }

    previous.value = previousValue.replace(/\[$/, '')
    next.value = nextValue.replace(/^\]/, '')

    ;(node as any).type = 'link' // cast it to link
    if (definition) {
      node.url = linkUrl
    } else {
      node.url = titleToURL(node.label as string)
    }
    node.title = node.label
    if (!options?.stripBrackets && Array.isArray(node.children)) {
      const firstChild = node.children[0];
      if (firstChild && 'value' in firstChild) {
        firstChild.value = `[[${firstChild.value}]]`
      }
    }
    delete node.label
    delete node.referenceType
    delete node.identifier
  })
}

// default export may have issue being loaded by gatsby-plugin-mdx
// see https://github.com/gatsbyjs/gatsby/issues/34015
// export default processWikiLinks

export = processWikiLinks
