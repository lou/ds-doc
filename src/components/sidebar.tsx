import React from "react"
import styled from "styled-components"
import Menu from "./menu"

type MenuPropsType = {
  onChangeTheme: (theme: string) => void
  theme: string
  MenuItems: React.ReactType
}

export default ({ onChangeTheme, theme, MenuItems }: MenuPropsType) => {
  const handleChangeTheme = () => {
    onChangeTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Sidebar>
      <Header>
        <h1>Aloha</h1>
        <div>
          <button onClick={handleChangeTheme}>theme</button>
        </div>
      </Header>
      <Menu>
        <MenuItems />
      </Menu>
    </Sidebar>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

const Sidebar = styled.div`
  background: MediumVioletRed;
  min-width: 280px;
  overflow-y: auto;
`
