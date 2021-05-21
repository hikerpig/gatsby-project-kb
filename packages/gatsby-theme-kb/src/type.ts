export type PageContext = {
  id: string
}

export type Reference = {
  target: {
    __typename: string
    body: string
    parent: SimpleFileNode
  }
  targetAnchor?: string
  refWord: string
  referrer: {
    parent: SimpleFileNode
  }
  contextLine: string
}

export type SimpleFileNode = {
  id: string
  fields: {
    title: string
    slug: string
  }
}

export type TopicFlie = {
  id: string
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

export type WikiLinkLabelTemplateFn = (data: { refWord: string, title: string }) => string