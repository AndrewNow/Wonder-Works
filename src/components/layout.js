import React from "react"
import styled, { ThemeProvider } from "styled-components"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { useGlobalStateContext } from "../context/globalContext"


const Layout = ({ children }) => {
  const darkNavTheme = {
    color: "var(--color-black)",
  }

  const lightNavTheme = {
    color: "var(--color-white)",
  }
  const currentTheme = useGlobalStateContext()

  return (
    <ThemeProvider theme={currentTheme === 'blue' ? darkNavTheme : lightNavTheme}>
      <GlobalWrapper>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </GlobalWrapper>
    </ThemeProvider>
  )
}

export default Layout

const GlobalWrapper = styled.div`
  margin: 0 auto;
  background-color: var(--color-white);
  width: 100%;
`
