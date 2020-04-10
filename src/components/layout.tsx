import React, { useState } from "react"
import Sidebar from "./sidebar"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import lightTheme from "../themes/light"
import darkTheme from "../themes/dark"

const GlobalStyle = createGlobalStyle`
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  body {
    color: ${props => props.theme.colors.color};
    background-color: ${props => props.theme.colors.background};
    margin: 0;
  }

`

type LayoutPropsType = {
  MenuItems: React.ComponentType
}

export default ({
  children,
  MenuItems,
}: React.PropsWithChildren<LayoutPropsType>) => {
  const [theme, setTheme] = useState("light")

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.shoelace.style/1.0.0-beta.25/shoelace.css"
        />
      </Helmet>
      <GlobalStyle />
      <Container>
        <Sidebar onChangeTheme={setTheme} theme={theme} MenuItems={MenuItems} />
        {children}
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
`
