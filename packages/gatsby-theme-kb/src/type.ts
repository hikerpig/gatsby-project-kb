export type PageContext = {
  id: string
}

export type Reference = {
  __typename: string
  body: string
  // parent: Omit<TopicFlie, 'childMax'> | null
  parent: SimpleFileNode
}

export type SimpleFileNode = {
  id: string
  fields: {
    title: string
    slug: string
  }
}

export type TopicFlie = {
  fields: {
    slug: string
    title: string
  }
  childMdx: {
    body: string
    inboundReferences: Reference[]
    outboundReferences: Reference[]
    frontmatter: {
      title: string
    }
  }
}