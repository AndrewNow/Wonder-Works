import React, { useState } from "react"
import { Link } from "gatsby"
import styled, {keyframes} from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { Squash as Hamburger } from "hamburger-react"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "./breakpoints"
import MobileNavAnimation from "./mobileNavAnimation"
import { ActiveLinkSVG } from "../svg/miscellaneous"

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  const navAnimation = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
    },
  }
  const navAnimationMobile = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.35,
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  const navAnimationMobileBody = {
    visible: {
      x: 0,
      translateX: "-50%",
      translateY: "-50%",
      opacity: 1,
      transition: {
        duration: 0.75,
        delayChildren: 1,
      },
    },
    hidden: {
      x: 300,
      translateX: "-50%",
      translateY: "-50%",
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
  }

  const navItem = {
    visible: {
      opacity: 1,
      y: 30,
    },
    hidden: {
      y: 0,
      opacity: 0,
    },
  }

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
      <HamburgerIcon>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          label="Show menu"
          rounded
          // color={theme}
        />
      </HamburgerIcon>
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <Dropdown
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            exit="hidden"
            variants={navAnimation}
          >
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/">Home</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/about">About</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/projects">Projects</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/investors">Investors</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/careers">Careers</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/contact">Contact</Link>
            </motion.div>
          </Dropdown>
        )}
      </AnimatePresence>
      {/* Mobile nav below here */}
      <AnimatePresence>
        {isOpen && (
          <>
            <BackgroundBlur
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              exit="hidden"
              variants={navAnimation}
            >
              <DropdownMobile
                initial="hidden"
                animate={isOpen ? "visible" : "hidden"}
                exit="hidden"
                variants={navAnimationMobileBody}
              >
                <MobileAnimation>
                  <MobileNavAnimation />
                </MobileAnimation>

                <MobileNav
                  initial="hidden"
                  animate={isOpen ? "visible" : "hidden"}
                  exit="hidden"
                  variants={navAnimationMobile}
                >
                  <MobileNavElement variants={navItem}>
                    <Link to="/" activeClassName="active">
                      <ActiveLinkSVG />
                      Home
                    </Link>
                  </MobileNavElement>
                  <MobileNavElement variants={navItem}>
                    <Link to="/about" activeClassName="active">
                      <ActiveLinkSVG />
                      About
                    </Link>
                  </MobileNavElement>
                  <MobileNavElement variants={navItem}>
                    <Link to="/projects" activeClassName="active">
                      <ActiveLinkSVG />
                      Projects
                    </Link>
                  </MobileNavElement>
                  <MobileNavElement variants={navItem}>
                    <Link to="/investors" activeClassName="active">
                      <ActiveLinkSVG />
                      Investors
                    </Link>
                  </MobileNavElement>
                  <MobileNavElement variants={navItem}>
                    <Link to="/careers" activeClassName="active">
                      <ActiveLinkSVG />
                      Careers
                    </Link>
                  </MobileNavElement>
                  <MobileNavElement variants={navItem}>
                    <Link to="/contact" activeClassName="active">
                      <ActiveLinkSVG />
                      Contact
                    </Link>
                  </MobileNavElement>
                </MobileNav>
              </DropdownMobile>
            </BackgroundBlur>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

const Nav = styled.nav`
  position: fixed;
  z-index: 1998;
  width: 92.5%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  height: 70px;
  div {
    color: ${props => props.theme.color}!important;
  }
  a {
    height: 100%;
    display: flex;
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    a {
      width: 120px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0rem;
    width: 88%;
    z-index: 2002;
  }
`
const HamburgerIcon = styled.div`
  z-index: 2002 !important;
  position: fixed;
  right: 3.5%;
  top: 0;
  margin-top: 2.5rem;
  height: 70px;
  div {
    color: ${props => props.theme.color}!important;
  }

  @media (max-width: ${breakpoints.m}px) {
    margin-top: 1rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    right: 6%;
    div {
      color: ${props => props.theme.color};
    }
  }
`

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

  @media (max-width: ${breakpoints.m}px) {
    margin-top: 1rem;
    width: 120px;
  }
  @media (max-width: ${breakpoints.s}px) {
    left: 6%;
  }
`

const Dropdown = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: flex-end;
  z-index: 2000;
  right: 3.5%;
  margin-right: 0.5rem;
  transform: translateY(37.5%);

  a {
    color: ${props => props.theme.color}!important;
    transition: color 0.4s cubic-bezier(0, 0.2, 0.7, 1);
    transition-delay: 0.2s;
    text-decoration: none;
  }

  div {
    cursor: pointer;
    text-align: right;
    font-family: "calibre-regular";
    padding-bottom: 1rem;
    font-size: 18px;
  }
  & div:hover {
    a {
      font-weight: 900;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    a {
      width: auto !important;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`

const BackgroundBlur = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    backdrop-filter: blur(20px);
    z-index: 2001;
  }
`

const DropdownMobile = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    z-index: 2001;
    position: absolute;
    display: flex;
    flex-direction: column;
    /* align-items: flex-end; */
    background-color: var(--color-white);
    width: 90%;
    height: 95vh;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    border: 1px solid black;
    justify-content: space-between;
  }
`

const MobileAnimation = styled(motion.div)`
  height: 10%;
  margin-top: 5rem;
  width: 90%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const MobileNav = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 90%;
  width: 90%;
  margin: 0 auto;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const MobileNavElement = styled(motion.div)`
  font-size: 34px;
  line-height: 37px;
  font-family: "calibre-medium";
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid var(--color-black);
  width: 100%;
  display: flex;
  justify-content: flex-end;
  
  a {
    text-align: right;
    width: 100%;
    justify-self: flex-end;
    align-self: flex-end;
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
    
    svg {
      display: none;
    }
    &.active {
      svg {
        display: block;
        position: absolute;
        left: 1rem;
        justify-self: flex-start;
        align-self: center;
        height: 15px;
        width: 15px;
        animation: ${rotate} 10s linear infinite;
      }
    }
  }
  `
