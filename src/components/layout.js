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

  @media (max-width: ${breakpoints.xxl}px) {
    h1 {
      font-size: 110px;
      line-height: 126px;
    }

    h2 {
      font-size: 70px;
      line-height: 76px;
    }

    h3 {
      font-size: 45px;
      line-height: 50px;
    }

    h4 {
      font-size: 32px;
      line-height: 40px;
    }

    h5 {
      font-size: 30px;
      line-height: 34px;
    }

    h6 {
      font-size: 28px;
      line-height: 32px;
    }

    p,
    ul,
    li {
      font-size: 20px;
      line-height: 26px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 100px;
      line-height: 90px;
    }

    h2 {
      font-size: 65px;
      line-height: 72px;
    }

    h3 {
      font-size: 35px;
      line-height: 42px;
    }

    h4 {
      font-size: 32px;
      line-height: 40px;
    }

    h5 {
      font-size: 28px;
      line-height: 32px;
    }

    h6 {
      font-size: 26px;
      line-height: 30px;
    }

    p,
    ul,
    li {
      font-size: 20px;
      line-height: 26px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    h1 {
      font-size: 75px;
      line-height: 82px;
    }

    h2 {
      font-size: 50px;
      line-height: 54px;
    }

    h3 {
      font-size: 30px;
      line-height: 34px;
    }

    h4 {
      font-size: 28px;
      line-height: 26px;
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
      font-size: 18px;
      line-height: 24px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h1 {
      font-size: 52px;
      line-height: 46px;
    }

    h2 {
      font-size: 42px;
      line-height: 40px;
    }

    h3 {
      font-size: 28px;
      line-height: 32px;
    }

    h4 {
      font-size: 24px;
      line-height: 28px;
    }

    h5 {
      font-size: 22px;
      line-height: 26px;
    }

    h6 {
      font-size: 20px;
      line-height: 26px;
    }

    p,
    ul,
    li {
      font-size: 18px;
      line-height: 22px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    h1 {
      font-size: 45px;
      line-height: 48px;
    }

    h2 {
      font-size: 45px;
      line-height: 48px;
    }

    h3 {
      font-size: 16px;
      line-height: 19px;
    }

    h4 {
      font-size: 18px;
      line-height: 20px;
    }

    h5 {
      font-size: 20px;
      line-height: 22px;
    }

    h6 {
      font-size: 28px;
      line-height: 35px;
    }

    p,
    ul,
    li,
    a {
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.01rem;
    }
  }

  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 28px;
      line-height: 31px;
    }

    h2 {
      font-size: 20px;
      line-height: 22px;
    }

    h3 {
      font-size: 18px;
      line-height: 20px;
    }

    h4 {
      font-size: 18px;
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
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.01rem;
    }
  }
`
