import { findTopLevelHeading } from '../src/markdown-utils'
import outdent  from 'outdent'

describe('findTopLevelHeading', () => {
  it('get the first h1', () => {
    const text = outdent.string(`
    # n1
    # n2 
    ## l2
    `)
    expect(findTopLevelHeading(text)).toEqual('n1')
  })

  it('get the first settext heading', () => {
    const text = outdent.string(`
    n1
    ===
    # n2
    `)
    expect(findTopLevelHeading(text)).toEqual('n1')
  })

  it('# header should also work', () => {
    const text = outdent.string(`
    # n1
    n2
    ===
    `)
    expect(findTopLevelHeading(text)).toEqual('n1')
  })
})
