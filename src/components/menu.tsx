import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

export default ({ onChangeTheme, theme }) => {
  const data = useStaticQuery(graphql`
    query {
      allMenuJson {
        edges {
          node {
            id
            path
            title
          }
        }
      }
    }
  `)

  const handleChangeTheme = () => {
    onChangeTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Menu>
      <Header>
        <h1>Aloha</h1>
        <div>
          <button onClick={handleChangeTheme}>theme</button>
        </div>
      </Header>
      <ul>
        {data.allMenuJson.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.path}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </Menu>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

const Menu = styled.div`
  background: MediumVioletRed;
  min-width: 280px;
  overflow-y: auto;
`
