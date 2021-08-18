import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">
        <StaticImage
          src="../images/wwLogo.png"
          quality={100}
          width={185}
          placeholder="none"
        />
      </Link>
    </Nav>
  )
}
  
export default Navbar

const Nav = styled.nav`
  z-index: 2000;
  position: relative;
  width: 92.5%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 2.5rem;
`
