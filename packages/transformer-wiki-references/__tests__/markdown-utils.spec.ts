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
})
