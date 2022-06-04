import { cleanupMarkdown, findInMarkdownLines } from './markdown-utils'
import { MdxNode } from './type'

export type References = {
  pages: Reference[]
}

export type Reference = {
  /** target page slug */
  target: string
  targetAnchor?: string
  contextLine: string
  referrerNode?: MdxNode
  label?: string
}

export function rxWikiLink(): RegExp {
  const pattern = '\\[\\[([^\\]]+)\\]\\]' // [[wiki-link-regex]]
  return new RegExp(pattern, 'ig')
}

export function rxBlockLink(): RegExp {
  const pattern = '\\(\\(([^\\]]+)\\)\\)' // ((block-link-regex))
  return new RegExp(pattern, 'ig')
}

export function rxHashtagLink(): RegExp {
  const pattern = '(?:^|\\s)#([^\\s]+)' // #hashtag
  return new RegExp(pattern, 'ig')
}

const getLinkDefinitionPattern = () => /^\[([\d\w-_]+)\]\s+(.*)/ig // [defintion]: target

export function rxMarkdownLink(): RegExp {
  // const pattern = '\\[\\[([^\\]]+)\\]\\]' // [](markdown-link)
  const pattern = /\[(.*)\]\((.*)\)/ig // [](markdown-link)
  return pattern
}

function findReferenceWithPattern(md: string, pattern: RegExp): Reference[] {
  return findInMarkdownLines(md, pattern).map(({ lineContent, matchStr }) => {
    let target = matchStr
    let targetAnchor: string
    const hashIndex = matchStr.indexOf('#')
    if (hashIndex > -1) {
      target = matchStr.substring(0, hashIndex)
      targetAnchor = matchStr.substring(hashIndex + 1)
    }
    const ref: Reference = {
      target,
      contextLine: lineContent,
    }
    if (targetAnchor !== undefined) {
      ref.targetAnchor = targetAnchor
    }
    return ref
  })
}

function findMarkdownLinkReference(md: string) {
  const pattern = rxMarkdownLink()
  return findInMarkdownLines(md, pattern).map(({ lineContent, match }) => {
    let [_, label, target] = match
    const ref: Reference = {
      target,
      contextLine: lineContent,
      label,
    }
    return ref
  })
}

export const getReferences = (string: string, onReferenceAdd?: (ref: Reference) => Reference) => {
  const md = cleanupMarkdown(string)
  onReferenceAdd = onReferenceAdd || ((o) => o)

  const references: References = {
    pages: [
      ...findReferenceWithPattern(md, rxHashtagLink()),
      ...findReferenceWithPattern(md, rxWikiLink()),
      ...findReferenceWithPattern(md, getLinkDefinitionPattern()),
      ...findMarkdownLinkReference(md),
    ].map(o => onReferenceAdd(o)),
  }

  return references
}
