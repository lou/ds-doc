import React, { useEffect, useState, useCallback } from "react"
import Layout from "../components/layout"
import { graphqlWithAuth } from "../services/auth"
import { branch, owner, repo } from "../config.json"
import Page from "../components/admin/page"
import { Router, Link } from "@reach/router"
import styled from "styled-components"

type MenuItemType = {
  path: string
  title: string
  depth: number
  filePath: string
}

export default () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([])

  const fetchMenu = useCallback(async () => {
    // @ts-ignore
    const { repository } = await graphqlWithAuth(
      `
      query GetFilesQuery($name: String!, $owner: String!) {
        repository(name: $name, owner: $owner) {
          menu: object(expression: "${branch}:pages/menu.json") {
            oid
            ... on Blob {
              text
            }
          }
        }
      }
    `,
      { owner, name: repo, branch }
    )
    setMenuItems(JSON.parse(repository.menu.text))
  }, [])

  useEffect(() => {
    fetchMenu()
  }, [])

  return (
    <Layout
      MenuItems={() => (
        <>
          {menuItems.map(({ title, depth, filePath }) => (
            <li key={filePath} style={{ marginLeft: depth * 20 }}>
              <Link to={`/admin/${filePath}`}>{title}</Link>
            </li>
          ))}
        </>
      )}
    >
      <StyledRouter>
        <Page path="/admin/*filePath" />
      </StyledRouter>
    </Layout>
  )
}

const StyledRouter = styled(Router)`
  overflow-y: auto;
  padding: 2rem;
  flex-basis: 100%;
  iframe {
    width: 100%;
    border: none;
  }
`
