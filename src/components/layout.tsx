import React, { useState, useRef, useEffect } from "react"
import Menu from "./menu"
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

export default ({ children }) => {
  const [theme, setTheme] = useState("light")
  // const contentRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const iframe = contentRef.current.getElementsByClassName(
  //     "iframe-code"
  //   )[0] as HTMLIFrameElement

  //   iframe.style.height = `${iframe.contentWindow.outerHeight}px`
  // }, [])

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
        <Menu onChangeTheme={setTheme} theme={theme} />
        {children}
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
`
