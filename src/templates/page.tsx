import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import Content from "../components/content"

export default ({ data }) => {
  return (
    <Layout>
      <Page>
        {data.parent && <Content html={data.parent.html} />}
        {data.menu.edges.length > 0 && (
          <ul>
            {data.menu.edges.map(({ node }) => (
              <li key={node.id}>
                <Link to={`/${node.parentSlug}${node.path}`}>{node.title}</Link>
              </li>
            ))}
          </ul>
        )}
        <Content html={data.page.html} />
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $parentSlug: String) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
        parentSlug
      }
    }
    parent: markdownRemark(fields: { slug: { eq: $parentSlug, ne: null } }) {
      html
      fields {
        slug
        parentSlug
      }
    }
    menu: allSectionMenuJson(filter: { parentSlug: { eq: $parentSlug } }) {
      edges {
        node {
          id
          path
          title
          parentSlug
        }
      }
    }
  }
`

const Page = styled.div`
  overflow-y: auto;
  padding: 2rem;
  flex-basis: 100%;
  iframe {
    width: 100%;
    border: none;
    overflow: visible;
    flex-basis: 100%;
  }
`
