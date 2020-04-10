import { graphql, Link } from "gatsby"
import React, { useRef } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import Content from "../components/content"
import { useScrollTop } from "../hooks/useScrollTop"
import { WindowLocation } from "@reach/router"
import { MenuType } from "../components/types"
import Markdown from "../components/markdown"

type LocationStateType = {
  prevScrollTop: number
}

type PageType = {
  rawMarkdownBody: string
  fields: {
    slug: string
    parentSlug: string
  }
}

type PageDataType = {
  mainMenu: MenuType
  parent: PageType
  page: PageType
  menu: MenuType
}

type PagePropsType = {
  data: PageDataType
  location: WindowLocation & { state: LocationStateType }
}

export default ({ data, location }: PagePropsType) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const scrollTop = useScrollTop(pageRef, location?.state?.prevScrollTop)

  return (
    <Layout
      MenuItems={() => (
        <>
          {data.mainMenu.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={node.path}>{node.title}</Link>
            </li>
          ))}
        </>
      )}
    >
      <Page ref={pageRef}>
        {data.parent && <Markdown source={data.parent.rawMarkdownBody} />}
        {data.menu.edges.length > 0 && (
          <ul>
            {data.menu.edges.map(({ node }) => (
              <li key={node.id}>
                <Link
                  to={`/${node.parentSlug}${node.path}`}
                  state={{ prevScrollTop: scrollTop }}
                >
                  {node.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Markdown source={data.page.rawMarkdownBody} />
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $parentSlug: String) {
    mainMenu: allMenuJson {
      edges {
        node {
          id
          path
          title
        }
      }
    }
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      rawMarkdownBody
      fields {
        slug
        parentSlug
      }
    }
    parent: markdownRemark(fields: { slug: { eq: $parentSlug, ne: null } }) {
      rawMarkdownBody
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
