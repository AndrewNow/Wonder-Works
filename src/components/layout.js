import React from "react"
import styled from "styled-components"
import Footer from '../components/footer'
import Navbar from '../components/navbar'

const Layout = ({ children }) => {
  return (
    <GlobalWrapper>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </GlobalWrapper>
  )
}

export default Layout

const GlobalWrapper = styled.div`
  margin: 0 auto;
  background-color: var(--color-white);
  width: 100%;
`

