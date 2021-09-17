import React from "react"
import styled, { ThemeProvider } from "styled-components"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { useGlobalStateContext } from "../context/globalContext"
import ScrollToTop from "./scrollToTop"
import breakpoints from "./breakpoints"

const Layout = ({ children }) => {
  const darkNavTheme = {
    color: "var(--color-black)",
  }

  const lightNavTheme = {
    color: "var(--color-white)",
  }

  const { currentTheme } = useGlobalStateContext()

  return (
    <ThemeProvider
      theme={currentTheme === "blue" ? darkNavTheme : lightNavTheme}
    >
      <GlobalWrapper>
        <Navbar />
        <main>{children}</main>
        <ScrollToTop />
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

  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-family: "ppwoodland-light";
      font-size: 126px;
      line-height: 130.5px;
    }

    h2 {
      font-family: "ppwoodland-bold";
      font-size: 75px;
      line-height: 80px;
    }

    h3 {
      font-family: "ppwoodland-light";
      font-size: 50px;
      line-height: 60px;
    }

    h4 {
      font-family: "calibre-medium";
      font-size: 40px;
      line-height: 48px;
    }

    h5 {
      font-family: "calibre-regular";
      font-size: 30px;
      line-height: 33px;
    }

    h6 {
      font-family: "calibre-regular";
      font-size: 28px;
      line-height: 35px;
    }

    p,
    ul,
    li {
      font-family: "calibre-regular";
      font-size: 25px;
      line-height: 30px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h1 {
      font-size: 30px;
      line-height: 32px;
    }

    h2 {
      font-size: 22px;
      line-height: 24px;
    }

    h3 {
      font-size: 18px;
      line-height: 20px;
    }

    h4 {
      font-size: 16px;
      line-height: 20px;
    }

    h5 {
      font-size: 30px;
      line-height: 33px;
    }

    h6 {
      font-size: 28px;
      line-height: 35px;
    }

    p,
    ul,
    li {
      font-size: 16px;
      line-height: 17px;
    }
  }
`
