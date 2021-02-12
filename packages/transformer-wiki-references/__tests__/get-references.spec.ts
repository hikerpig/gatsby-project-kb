import { getReferences } from '../src/get-references'
import outdent  from 'outdent'

describe('getReferences', () => {
  it('get linkDefinition and wiki-links', () => {
    const text = outdent.string(`
    # Title
    [[link-to-1]]
    [[link-to-2]]

    [link-to-1] target-page
    `)
    const result = getReferences(text)
    expect(result.pages).toEqual([
      'link-to-1',
      'link-to-2',
    ])
  })
})
