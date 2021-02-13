import { findInMarkdown, cleanupMarkdown, findInMarkdownLines } from './markdown-utils'
import { MdxNode } from './type'

export type References = {
  blocks: Reference[]
  pages: Reference[]
}

export type Reference = {
  target: string
  contextLine: string
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

function findReferenceWithPattern(md: string, pattern: RegExp): Reference[] {
  return findInMarkdownLines(md, pattern).map(({ lineContent, matchStr }) => {
    return {
      target: matchStr,
      contextLine: lineContent,
    }
  })
}

export const getReferences = (string: string) => {
  const md = cleanupMarkdown(string)

  const references: References = {
    blocks: findReferenceWithPattern(md, rxBlockLink()),
    pages: [
      ...findReferenceWithPattern(md, rxHashtagLink()),
      ...findReferenceWithPattern(md, rxWikiLink()),
      ...findReferenceWithPattern(md, getLinkDefinitionPattern()),
    ],
  }

  return references
}
