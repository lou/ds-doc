export type MenuNodeType = {
  node: {
    id: string
    path: string
    title: string
    parentSlug: string
  }
}

export type MenuType = {
  edges: MenuNodeType[]
}
