import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "./breakpoints"

const Navbar = () => {
  return (
    <>
      <HomeLink to="/">
        <StaticImage
          src="../images/wwLogo.png"
          quality={100}
          height={70}
          placeholder="none"
          alt="Wonder Works logo"
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </HomeLink>
    </>
  )
}

export default Navbar

const HomeLink = styled(Link)`
  position: fixed;
  z-index: 1998 !important;
  left: 3.5%;
  top: 0;
  margin-top: 2.5rem;
  height: 70px;
  a {
    height: 100%;
    display: flex;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    height: 60px;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 150px;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 1rem;
    width: 120px;
  }
  @media (max-width: ${breakpoints.s}px) {
    left: 6%;
    width: 100px;
    margin-top: 0.5rem;
  }
`
