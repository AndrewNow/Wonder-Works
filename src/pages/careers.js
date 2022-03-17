import React, { useState, useEffect, useRef, useCallback } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import { BigPlus, TwoPlus, PlusButton } from "../svg/careerspage"
import { ContactUs } from "../components/contactUs"
import { WOShortLogo } from "../svg/logos"
// import emailjs from "emailjs-com"
import breakpoints from "../components/breakpoints"
import { Arrow, ColoredGears, DividingLineSVG } from "../svg/miscellaneous"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const Careers = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Careers`

  const CascadeAnim = {
    visible: {
      zIndex: 6000,
    },
    hidden: {
      zIndex: -1,
      transition: {
        delay: 1.5,
        staggerChildren: 0.15,
      },
    },
  }
  const CascadeChild = {
    visible: {
      x: 0,
    },
    hidden: {
      x: "-100vw",
      transition: {
        duration: 1,
      },
    },
  }

  const line1 = {
    visible: {
      transition: {
        delayChildren: 1.15,
        staggerChildren: 0.2,
      },
    },
  }
  const line2 = {
    visible: {
      transition: {
        delayChildren: 1.55,
        staggerChildren: 0.2,
      },
    },
  }

  const word = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 11,
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  }

  const subtitle = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1.2,
        type: "spring",
        stiffness: 100,
        damping: 13,
      },
    },
    hidden: {
      y: 70,
      opacity: 0,
    },
  }

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })

  let throttle = require("lodash/throttle")
  const smallParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -350, 25)
  )

  // ------------ DATA FOR JOB ENTRIES ------------

  // ---------- Set navbar color back to blue on page change  ----------
  // If the navbar theme is currently "light" (white) and the user clicks to a different page, without this code, the navbar would stay white until the user refreshes. This code resets the theme to blue, our default state.
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    toggleBlueTheme()
  }, [toggleBlueTheme])

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme, toggleBlueTheme])

  return (
    <Layout title={siteTitle}>
      <Seo
        title="Careers"
        keywords={[
          `Wonder Works`,
          `WonderWorks`,
          `Wonder Works Roblox`,
          `Roblox`,
          `Gaming`,
          `wonder works gaming`,
          `wonderworks gaming`,
          `wonder works jobs`,
          `wonderworks jobs`,
          `jobs`,
          `careers`,
          `positions`,
          `wonder works positions`,
          `wonderworks positions`,
          `wonder works info`,
          `wonderworks info`,
        ]}
      />
      {/* loading animation */}
      <Cascade variants={CascadeAnim} initial="visible" animate="hidden">
        <Yellow variants={CascadeChild} />
        <Pink variants={CascadeChild} />
        <Green variants={CascadeChild} />
        <Purple variants={CascadeChild} />
      </Cascade>
      <LandingSection>
        <Flex>
          <Left>
            <h1>
              <Mask variants={line1} initial="hidden" animate="visible">
                <Span variants={word}>Let’s </Span>
                <Span variants={word}>grow</Span>
              </Mask>
              <Mask variants={line2} initial="hidden" animate="visible">
                <Span variants={word}>together.</Span>
              </Mask>
            </h1>
            <motion.p variants={subtitle} initial="hidden" animate="visible">
              At Wonder Works Studio we believe in big dreams and bigger ideas.{" "}
              <br />
              We’re problem solvers, creative leaders, and gaming aficionados.{" "}
              <br /> <br />
              We play first, work second, and always have our eyes set on the
              next big horizon. If you find inspiration in imagination — we want
              to work with you.
            </motion.p>
          </Left>
          <Right>
            <h6>
              wonder <br /> waits
            </h6>
          </Right>
        </Flex>
        <BigPlusWrapper style={{ y: smallParallax }}>
          <BigPlus />
        </BigPlusWrapper>
        <TwoPlusWrapper style={{ y: smallParallax }}>
          <TwoPlus />
        </TwoPlusWrapper>
      </LandingSection>
      <WonderWorkersWrapper>
        <WonderWorkers />
      </WonderWorkersWrapper>
      <CareerSection>
        <CareerWrapper>
          <CareerLeft>
            <h4>
              Love Us? Join Us!
              <svg
                width="160"
                height="4"
                viewBox="0 0 160 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2H159.385"
                  stroke="#1A1748"
                  strokeWidth="2.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </h4>
          </CareerLeft>
          <CareerRight>
            <div>
              <h2>
                Available <br /> Positions
              </h2>
              <h5>
                <strong>We’ve been looking for someone like you. </strong>
                <br />
                Want to join a team of dynamic dreamers?
              </h5>
              <OutboundLink
                href="https://wonder-works-studio-inc.breezy.hr/"
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.9 }}
              >
                See Available Positions <Arrow />
              </OutboundLink>
            </div>
          </CareerRight>
        </CareerWrapper>
      </CareerSection>
      <ContactUsWrapper>
        <SVGWrapper>
          <ColoredGears gearColor={"#f7f7fc"} />
        </SVGWrapper>
        <ContactUs />
      </ContactUsWrapper>
    </Layout>
  )
}

export default Careers

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Cascade = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 6000;
  top: 0;
  left: 0;
`

const Yellow = styled(motion.div)`
  background-color: var(--color-orange);
  width: 99vw;
  height: 100vh;
  position: fixed;
  z-index: 6004;
  top: 0;
  left: 0;
`
const Pink = styled(motion.div)`
  background-color: var(--color-lightpink);
  width: 97vw;
  height: 100vh;
  position: fixed;
  z-index: 6003;
  top: 0;
  left: 0;
`
const Green = styled(motion.div)`
  background-color: var(--color-green);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 6002;
  top: 0;
  left: 0;
`
const Purple = styled(motion.div)`
  background-color: var(--color-purple);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 6001;
  top: 0;
  left: 0;
`
// ^-- above are the page fade in animation markup styles

const Span = styled(motion.span)`
  margin-right: 2.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;
  vertical-align: baseline;

  @media (max-width: 1600px) {
    margin-right: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 1rem;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
`

const Mask = styled(motion.div)`
  overflow: hidden;
  height: 110%;
`

const LandingSection = styled.section`
  background-color: var(--color-darkblue);
  position: relative;
`

const Flex = styled.div`
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 15rem 0;
  display: flex;
  justify-content: space-between;
  width: 80%;

  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;
  }

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
    padding-top: 10rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 10rem;
    padding-top: 7rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 5rem;
  }
`
const Left = styled.div`
  width: 50%;
  h1,
  p {
    color: var(--color-white);
  }
  h1 {
    padding-bottom: 2rem;
    font-family: "ppwoodland-light";
    white-space: nowrap;
    font-size: 6.5vw;
    line-height: 90%;
  }
  @media (max-width: 1600px) {
    width: 75%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    p {
      br:nth-of-type(1) {
        display: none;
      }
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 8vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 70%;
    margin: 0 auto;
    p {
      font-size: 20px;
      line-height: 24px;
    }
    h1 {
      line-height: 100%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 85%;
    p {
      font-size: 16px;
      line-height: 19px;
    }
    h1 {
      padding-top: 3rem;
      font-size: 45px;
    }
  }
`
const Right = styled.div`
  width: 50%;
  align-self: center;
  position: relative;
  z-index: -1;

  h6 {
    float: right;
    min-width: 80%;
    max-width: 80%;
    white-space: nowrap;
    font-family: "balgin-bold";
    font-size: 3.9vw;
    line-height: 100%;
    text-transform: uppercase;
    text-align: center;
    color: var(--color-lightpink);
    border: 2px solid var(--color-lightpink);
    box-sizing: border-box;
    padding: 4rem 2rem;
    border-radius: 100%;
    transform: rotate(-17deg);
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 75%;
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 7rem;
    h6 {
      padding: 2 rem 1rem;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-top: 5rem;
    margin: 0 auto;
    h6 {
      padding: 2rem;
      font-size: 50px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
    padding-top: 3rem;
    align-self: flex-start;
    h6 {
      padding: 3rem 1rem;
      font-size: 40px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    padding-top: 2rem;
    align-self: flex-start;
    h6 {
      padding: 2rem;
      font-size: 28px;
    }
  }
`

const WonderWorkersWrapper = styled.div`
  padding: 5rem 0;
  background-color: var(--color-purple);
`

const BigPlusWrapper = styled(motion.div)`
  position: absolute;
  z-index: 0;
  top: 16%;
  left: 4.5%;

  @media (max-width: ${breakpoints.xl}px) {
    left: 1%;
    top: 14%;
    svg {
      width: 110px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    top: 10%;
    left: 3%;
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 15%;
    left: 5%;
    svg {
      width: 65px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    top: 10%;
    left: 3%;
    svg {
      width: 65px;
    }
  }
`

const TwoPlusWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  bottom: 15%;
  right: 13%;

  @media (max-width: ${breakpoints.xl}px) {
    bottom: 18%;
    right: 10%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    bottom: 12%;
    right: 5%;

    svg {
      width: 450px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    bottom: 15%;
    right: 10%;
    svg {
      width: 500px;
    }
  }

  @media (max-width: ${breakpoints.x}px) {
    bottom: 10%;
    right: 7%;
    svg {
      width: 270px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    bottom: 5%;
    right: 4%;
    svg {
      width: 270px;
    }
  }
`

const CareerSection = styled.section`
  background-color: var(--color-lightpurple);
  min-height: 90vh;
`

const CareerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding: 10rem 0;

  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 5rem 0;
  }
`
const CareerLeft = styled.div`
  align-self: flex-start;
  height: auto;
  width: 50%;

  h4 {
    font-family: "calibre-semibold";
    color: var(--color-black);
    display: flex;
    align-items: center;
    white-space: nowrap;
    svg {
      padding-left: 1rem;
    }
  }

  div {
    padding-top: 5rem;
    width: 70%;

    h5 {
      font-size: 31px;
      line-height: 100%;
      padding-top: 3rem;
    }
  }

  div > h5 strong {
    font-family: "calibre-medium";
    white-space: nowrap;
    font-weight: 300 !important;
  }

  @media (max-width: 1440px) {
    margin-right: 5rem;
    div {
      width: 100%;
      h5 {
        font-size: 30px;
        line-height: 36px;
      }
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 55%;
    div {
      h5 {
        font-size: 25px;
        line-height: 30px;
      }
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 2rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    position: relative;
    top: 0rem;
    width: 100%;
    margin-right: 0rem;
    div {
      width: 100%;
      h5 {
        font-size: 25px;
      }
    }
  }
`


const CareerRight = styled.div`
  width: 55%;
  display: relative;
  z-index: 1000;

  h5 {
    font-size: 31px;
    line-height: 100%;
    padding-top: 3rem;
  }
  h5 strong {
    font-family: "calibre-medium";
  }

  @media (max-width: 1440px) {
    h5 {
      font-size: 30px;
      line-height: 130%;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 65%;
    margin-top: 4rem;
    h5 {
      font-size: 25px;
      line-height: 30px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 70%;
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      font-size: 45px;
      line-height: 110%;
    }
    div {
      width: 95%;
      padding-top: 0;
      h5 {
        font-size: 20px;
        strong {
          font-weight: 300 !important;
          white-space: nowrap;
        }
      }
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    div {
      h5 {
        br {
          display: none;
        }
        strong {
          white-space: normal;
        }
      }
    }
  }
`


const OutboundLink = styled(motion.a)`
  display: inline-block;
  border: 2px solid var(--color-black);
  color: var(--color-black);
  border-radius: 50px;
  padding: 0.5rem 1.75rem;
  margin-top: 4rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-medium";
  font-size: 20px;
  :hover {
    svg {
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
    line-height: 22px;
    padding: 0.5rem 1.5rem;

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
    font-size: 16px;
    line-height: 19px;
    padding: 0.5rem 1.5rem;

    svg {
      transform: translate3d(0rem, 0.35rem, 0);
      margin-left: 0.25rem;
      scale: 0.7;
    }
    :hover {
      svg {
        transform: translate3d(0.25rem, 0.35rem, 0);
      }
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    svg {
      display: none;
    }
  }
`


const ContactUsWrapper = styled.div`
  background-color: var(--color-orange);
  position: relative;
`

const SVGWrapper = styled.div`
  display: none;
  @media (max-width: ${breakpoints.xl}px) {
    position: absolute;
    z-index: 1;
    transform: rotate(90deg);
    display: block;
    width: 400px;
    height: 400px;
    top: 10%;
    right: 10%;
    svg {
      aspect-ratio: 1/1;
    }
  }
  @media (max-width: 1080px) {
    width: 350px;
    height: 350px;
    top: 10%;
    right: 10%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 250px;
    height: 250px;
    top: 28%;
    right: 15%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 250px;
    height: 250px;
    right: 5%;
    top: 25%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 180px;
    height: 180px;
    top: 31%;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 150px;
    top: 35%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 28%;
  }
`
