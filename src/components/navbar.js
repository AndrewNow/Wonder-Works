import React, { useState, useCallback, useEffect } from "react"
import { Link } from "gatsby"
import styled, { keyframes } from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { Squash as Hamburger } from "hamburger-react"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "./breakpoints"
import MobileNavAnimation from "./mobileNavAnimation"
import { ActiveLinkSVG } from "../svg/miscellaneous"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const [isOpenMobile, setOpenMobile] = useState(false)

  // Use global state context so that when a mobile users' nav state is 'light' and they open the menu,
  // the hamburger icon turns 'blue' (to not blend against the white nav modal)
  const dispatch = useGlobalDispatchContext()
  const { currentTheme } = useGlobalStateContext()

  const toggleLightTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "light" })
  }, [dispatch])

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    if (isOpenMobile && currentTheme === "light") {
      toggleBlueTheme()
    } else if (!isOpenMobile && currentTheme === "light") {
      toggleLightTheme()
    }
  }, [toggleLightTheme, toggleBlueTheme, isOpenMobile, currentTheme])

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
      translateY: "-10%",
      opacity: 1,
      transition: {
        duration: 0.75,
        delayChildren: 1,
      },
    },
    hidden: {
      x: 300,
      translateX: "-50%",
      translateY: "-10%",
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
          label="Toggle navigation menu."
          rounded
        />
      </HamburgerIcon>
      <HamburgerIconMobile>
        <Hamburger
          toggled={isOpenMobile}
          toggle={setOpenMobile}
          label="Toggle navigation menu."
          rounded
        />
      </HamburgerIconMobile>
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <Dropdown
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            exit="hidden"
            variants={navAnimation}
          >
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </motion.div>
            {/* <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/careers" activeClassName="active">
                Careers
              </Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link to="/contact" activeClassName="active">
                Contact
              </Link>
            </motion.div> */}
          </Dropdown>
        )}
      </AnimatePresence>
      {/* Mobile nav below here */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            <BackgroundBlur
              initial="hidden"
              animate={isOpenMobile ? "visible" : "hidden"}
              exit="hidden"
              variants={navAnimation}
            >
              <DropdownMobile
                initial="hidden"
                animate={isOpenMobile ? "visible" : "hidden"}
                exit="hidden"
                variants={navAnimationMobileBody}
              >
                <MobileAnimation>
                  <MobileNavAnimation />
                </MobileAnimation>
                <MobileNav
                  initial="hidden"
                  animate={isOpenMobile ? "visible" : "hidden"}
                  exit="hidden"
                  variants={navAnimationMobile}
                >
                  <MobileNavElement variants={navItem}>
                    <Link to="/" activeClassName="active">
                      <ActiveLinkSVG />
                      Home
                    </Link>
                  </MobileNavElement>
                  {/* <MobileNavElement variants={navItem}>
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
                  </MobileNavElement> */}
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
    display: none;
  }
`
const HamburgerIconMobile = styled.div`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    z-index: 2002 !important;
    position: fixed;
    right: 3.5%;
    top: 0;
    margin-top: 2.5rem;
    height: 70px;
    div {
      color: ${props => props.theme.color}!important;
    }
    margin-top: 1rem;
    right: 6%;
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

const Dropdown = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 2000;
  position: fixed;
  right: 3.5%;
  margin-right: 0.5rem;
  /* transform: translateY(37.5%); */
  transform: translateY(60%);

  a {
    color: ${props => props.theme.color}!important;
    transition: color 0.4s cubic-bezier(0, 0.2, 0.7, 1);
    transition-delay: 0.2s;
    text-decoration: none;

    .active {
      font-family: "calibre-semibold";
    }
  }

  div {
    cursor: pointer;
    text-align: right;
    font-family: "calibre-regular";
    padding-bottom: 1rem;
    font-size: 18px;
  }
  div:hover {
    a {
      font-family: "calibre-semibold";
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
    background-color: var(--color-white);
    width: 90%;
    height: calc(96vh - 70px);
    top: 10%;
    left: 50%;
    border-radius: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }
`

const MobileAnimation = styled(motion.div)`
  width: 90%;
  height: 10%;
  margin: 0 auto;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  position: relative;
`

const MobileNav = styled(motion.div)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
  margin-top: 2rem;
  width: 90%;

  /* justify-content: flex-start; */
`

const MobileNavElement = styled(motion.div)`
  font-family: "calibre-medium";
  border-bottom: 1px solid var(--color-black);
  width: 100%;
  display: flex;
  padding-bottom: 0.85rem;
  padding-top: 0.85rem;
  justify-content: flex-end;

  &:last-child {
    border: none;
    margin-bottom: 2rem;
  }

  a {
    text-align: right;
    width: 100%;
    justify-self: flex-end;
    align-self: flex-end;
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
    transition: 0.3s ease-out all;
    font-size: 34px !important;
    line-height: 40px !important;
    svg {
      display: none;
    }
    &.active {
      svg {
        fill: var(--color-black);
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

  :hover {
    a {
      margin-right: 1rem;
    }
  }

  @media (max-width: 383px) {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  @media (max-width: 375px) {
    a {
      font-size: 32px;
    }
  }

  @media (max-width: ${breakpoints.xs}px) {
    a {
      font-size: 26px !important;
      line-height: 105% !important;
    }
  }
`
