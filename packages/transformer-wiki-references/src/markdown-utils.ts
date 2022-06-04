/**
 * Adapted from vscode-markdown/src/util.ts
 * https://github.com/yzhang-gh/vscode-markdown/blob/master/src/util.ts
 */

export const REGEX_FENCED_CODE_BLOCK = /^( {0,3}|\t)```[^`\r\n]*$[\w\W]+?^( {0,3}|\t)``` *$/gm

const SETTEXT_REGEX = /(.*)\n={3,}/

export function markdownHeadingToPlainText(text: string) {
  // Remove Markdown syntax (bold, italic, links etc.) in a heading
  // For example: `_italic_` -> `italic`
  return text.replace(/\[([^\]]*)\]\[[^\]]*\]/, (_, g1) => g1)
}

export function rxMarkdownHeading(level: number): RegExp {
  const pattern = `^#{${level}}\\s+(.+)$`
  return new RegExp(pattern, 'im')
}

export function findTopLevelHeading(md: unknown): string | null {
  if (typeof md !== 'string') {
    return null
  }

  const headingRegex = rxMarkdownHeading(1)
  const headingMatch = headingRegex.exec(md)
  const settextMatch = SETTEXT_REGEX.exec(md)
  let match = headingMatch
  if (settextMatch && (!headingMatch || settextMatch.index < headingMatch.index)) {
    match = settextMatch
  }
  if (match) {
    return markdownHeadingToPlainText(match[1])
  }

  return null
}

export function cleanupMarkdown(markdown: string) {
  const replacer = (foundStr: string) => foundStr.replace(/[^\r\n]/g, '')
  return markdown
    .replace(REGEX_FENCED_CODE_BLOCK, replacer) //// Remove fenced code blocks
    .replace(/<!--[\W\w]+?-->/g, replacer) //// Remove comments
    .replace(/^---[\W\w]+?(\r?\n)---/, replacer) //// Remove YAML front matter
}

export function findInMarkdown(markdown: string, regex: RegExp): string[] {
  const unique = new Set<string>()

  let match
  while ((match = regex.exec(markdown))) {
    const [, name] = match
    if (name) {
      unique.add(name)
    }
  }

  return Array.from(unique)
}

export function findInMarkdownLines(markdown: string, regex: RegExp) {
  const lines = markdown.split('\n')
  const result: {
    matchStr: string
    lineContent: string
    match: RegExpMatchArray | undefined
    lineNum: number
  }[] = []

  lines.forEach((lineContent, lineNum) => {
    let match
    regex.lastIndex = 0
    while ((match = regex.exec(lineContent))) {
      const [, name] = match
      if (name) {
        result.push({ matchStr: name, match, lineContent, lineNum })
      }
    }
  })
  return result
}
