const path = require(`path`)

const nodeSlugMap = {}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` && node.frontmatter.slug) {
    const parentNode = getNode(node.parent)
    const nodeSlug = node.frontmatter.slug
    const pathDir = parentNode.relativeDirectory
    let slug
    let parentSlug

    nodeSlugMap[parentNode.relativeDirectory] = nodeSlug

    if (pathDir.includes("/sections")) {
      parentSlug = nodeSlugMap[pathDir.split("/sections")[0]]
      slug = `${parentSlug}/${nodeSlug}`
    } else {
      slug = nodeSlug
    }
    createNodeField({
      node,
      name: `parentSlug`,
      value: parentSlug,
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              parentSlug
            }
          }
        }
      }
    }
  `)

  if (result.data) {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fields && node.fields.slug) {
        createPage({
          path: `/${node.fields.slug}/`,
          component: path.resolve(`./src/templates/page.tsx`),
          context: {
            slug: node.fields.slug,
            parentSlug: node.fields.parentSlug,
          },
        })
      }
    })
  }

  createPage({
    path: `/admin/`,
    component: path.resolve(`./src/templates/admin-page.tsx`),
    matchPath: "/admin/*",
  })
}
