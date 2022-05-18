import React, { useRef, useCallback, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import { Staircase, Cog } from "../svg/homepage"
import { Arrow } from "../svg/miscellaneous"
import { AsSeenOnLogosHome } from "../components/AsSeenOn/AsSeenOnLogos"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import breakpoints from "../components/breakpoints"
import LandingPage from "../components/HomePage/landingPage"
import OurProjects from "../components/HomePage/ourProjects"
import OurWonderWorkers from "../components/HomePage/Staff/ourWonderWorkers"
import ImaginationSection from "../components/HomePage/imaginationSection"
import TwitterWidget from "../components/HomePage/twitterWidget"
import ProjectRoadmap from "../components/HomePage/projectRoadmap"
import CaseStudy from "../components/HomePage/caseStudy"

const HomeIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Home`

  // context for the cursor
  const dispatch = useGlobalDispatchContext()
  const { cursorStyles } = useGlobalStateContext()
  const onCursor = cursorType => {
    // cursorType becomes whatever is defined in a hanlder only if what we defined is declared in the cursorStyles array within context
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    // dispatch global state to the declared cursor type in the handler
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }

  // ---------- determine if a blue background section is in view ----------
  // ---------- if in view, update navigation menu text color to white ----------
  const blueSectionRef = useRef()
  const { currentTheme } = useGlobalStateContext()

  const toggleLightTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "light" })
  }, [dispatch])

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    const onScroll = () => {
      const blueBackgroundDiv = blueSectionRef.current.getBoundingClientRect()
      if (blueBackgroundDiv.y <= 150 && blueBackgroundDiv.bottom >= 150) {
        toggleLightTheme()
      } else {
        toggleBlueTheme()
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [toggleLightTheme, toggleBlueTheme])

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme])

  // ----------framer motion animation variants----------
  const StaircaseAnim = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        delay: 2.75,
        type: "spring",
        stiffness: 100,
        damping: 5,
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
    },
  }

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })
  const homeBackground = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * 750
  )

  return (
    <Layout title={siteTitle}>
      <Seo
        title="Home"
        keywords={[
          `Wonder Works`,
          `WonderWorks`,
          `Wonder Works Roblox`,
          `Roblox`,
          `Gaming`,
          `wonder works gaming`,
        ]}
      />
      <Background style={{ y: homeBackground }}>
        <StaircaseWrapper
          variants={StaircaseAnim}
          initial="hidden"
          animate="visible"
        >
          <Staircase />
        </StaircaseWrapper>
        <CogWrapper
          animate={{
            rotate: 360,
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 10,
            },
          }}
        >
          <Cog />
        </CogWrapper>
        {/* <PortalWrapper>
          <Svg.Portal />
        </PortalWrapper> */}
      </Background>
      <div
        style={{
          paddingTop: "12vh",
          position: "relative",
        }}
      >
        <LandingPage onCursor={onCursor} />
      </div>
      <LinkWrapper>
        <LinkTo to="/">
          Partnership inquiries <Arrow />
        </LinkTo>
        <LinkTo to="/">
          Career opportunities <Arrow />
        </LinkTo>
      </LinkWrapper>
      <ImaginationSection />
      <ProjectRoadmap />
      <CaseStudy />
      <div ref={blueSectionRef}>
        <OurProjects />
      </div>
      <OurWonderWorkers />
      <Press>
        <h4>As Seen On...</h4>
        <AsSeenOnLogosHome />
      </Press>
      <TwitterWidget />
      <FooterContact>
        <FooterContactInner>
          <h2>Let's work wonders together.</h2>
          <FooterContactLinkWrapper>
            <LinkTo to="/">
              Partnership inquiries <Arrow />
            </LinkTo>
            <LinkTo to="/">
              Career opportunities <Arrow />
            </LinkTo>
          </FooterContactLinkWrapper>
        </FooterContactInner>
      </FooterContact>
    </Layout>
  )
}

export default HomeIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Background = styled(motion.div)`
  z-index: 0;
  height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;
  background: var(--color-white);

  @media (max-width: 1700px) {
    overflow-x: hidden;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    /* height: 135vh; */
  }
  @media (max-width: ${breakpoints.xl}px) {
    height: 110vh;
  }
`
const StaircaseWrapper = styled(motion.div)`
  position: absolute;
  top: 33%;
  left: 7%;

  @media (max-width: ${breakpoints.xl}px) {
    left: 5%;
    top: 40%;
    svg {
      width: 450px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 33%;
    svg {
      width: 400px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 30%;
    svg {
      width: 300px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    svg {
      width: 250px;
    }
  }
`
const CogWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1999;
  bottom: -2%;
  left: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.xxl}px) {
    top: 40%;
    svg {
      width: 90px;
      height: 90px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 40%;
    svg {
      width: 85px;
      height: 85px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 35%;
    width: 80px;
    height: 80px;
    svg {
      width: 80px;
      height: 80px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 47%;
    svg {
      width: 85px;
      height: 85px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 55vh;
    left: auto;
    right: 20%;
    svg {
      width: 50px;
      height: 50px;
      transform-origin: center;
    }
  }
  @media (max-width: 375px) {
    top: 50vh;
  }
`
const PortalWrapper = styled.div`
  position: absolute;
  top: 35%;
  right: 0%;

  @media (max-width: 1700px) {
    right: -5%;
    svg {
      width: 550px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    right: -10%;
    top: 25%;
    svg {
      width: 550px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 40%;
    right: -10%;
    svg {
      width: 450px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 350px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: -5%;
    svg {
      width: 300px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 45vh;
    right: -25%;
    svg {
      width: 290px;
    }
  }
  @media (max-width: 375px) {
    top: 50vh;
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 45%;
    right: -25%;
    svg {
      width: 230px;
    }
  }
`

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-top: 15vh; */
  margin: 0 auto;
  margin-top: 5rem;
  position: relative;
  z-index: 200;

  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0;
  }
`

const LinkTo = styled(Link)`
  width: 400px;
  padding: 0.5rem 2.25rem;
  margin: 2rem 0.5rem;
  margin-top: 0rem;
  color: var(--color-black);
  border: 2px solid var(--color-black);
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: var(--hover-transition);
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 120%;

  cursor: pointer;

  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
    svg {
      fill: var(--color-white);
      transform: translate3d(0.25rem, 0.15rem, 0);
    }
  }

  svg {
    margin-left: 0.75rem;
    fill: var(--color-black);
    transition: var(--hover-transition);
    transform: translate3d(0rem, 0.15rem, 0);
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding: 0.5rem 1.5rem;
    svg {
      transform: translate3d(0rem, 0.1rem, 0);
      margin-left: 0.25rem;
    }
    :hover {
      svg {
        transform: translate3d(0.25rem, 0.1rem, 0);
      }
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    font-size: 20px;
    padding: 0.5rem 1.5rem;
    width: 350px;

    svg {
      transform: translate3d(0rem, 0.15rem, 0);
      margin-left: 0.25rem;
      scale: 0.8;
    }
    :hover {
      svg {
        transform: translate3d(0.25rem, 0.15rem, 0);
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    font-size: 17px;
    width: 300px;

    svg {
      transform: translate3d(0rem, 0rem, 0);
      margin-left: 0.25rem;
      scale: 0.7;
    }
    :hover {
      svg {
        transform: translate3d(0.25rem, 0rem, 0);
      }
    }
  }
`
const Press = styled.div`
  padding-bottom: 5rem;
  background-color: var(--color-green);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h4 {
    padding-top: 10rem;
    padding-bottom: 5rem;
    font-family: "calibre-semibold";
    color: black;
  }
  @media (max-width: ${breakpoints.xl}px) {
    /* background-color: var(--color-white); */
    h4 {
      padding-top: 5rem;
      padding-bottom: 2.5rem;
    }
  }
`

const FooterContact = styled.section`
  background-color: var(--color-orange);
`

const FooterContactInner = styled.div`
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-family: "balgin-medium";
    text-align: center;
    max-width: 90%;
  }
`

const FooterContactLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 3rem;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
`
