import React, { useState, useEffect, useCallback } from "react"
import Layout from "../components/layout"
import { graphql, navigate } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { LetsWork } from "../components/letsWork"
import MailchimpComponent from "../components/Mailchimp/component"
import * as Svg from "../svg/contactpage"
import { BlueStars, PurpleStar } from "../svg/miscellaneous"
import { motion } from "framer-motion"
import { useGlobalDispatchContext } from "../context/globalContext"
import breakpoints from "../components/breakpoints"

const Contact = ({ data }) => {
  // Make sure navbar starts in blue on page load
  const dispatch = useGlobalDispatchContext()

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    toggleBlueTheme()
  }, [])

  const siteTitle = data.site.siteMetadata?.title || `Contact`

  const [expandProjectsButton, setExpandProjectsButton] = useState(false)
  const [expandCareersButton, setExpandCareersButton] = useState(false)

  const handleProjectsPageTransition = () => {
    setExpandProjectsButton(true)
    // navigate to projects page after 1.5 seconds (to let the button animation finish)
    setTimeout(() => navigate("/projects"), 500)
  }
  const handleCareersPageTransition = () => {
    setExpandCareersButton(true)
    // navigate to careers page after 1.5 seconds
    setTimeout(() => navigate("/careers"), 1000)
  }

  const currentProjectsButton = {
    expand: {
      scale: 11,
      color: "#F7F7FC",
      backgroundColor: "#1A1748",
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
    hover: {
      color: "#F7F7FC",
      backgroundColor: "#1A1748",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    normal: {
      scale: 1,
      backgroundColor: "#F7F7FC",
      color: "#1A1748",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  }

  const buttonText = {
    expand: {
      opacity: 0,
    },
    normal: {
      opacity: 1,
    },
  }

  return (
    <Layout title={siteTitle}>
      <Seo title="Contact" />
      <LetsWork
        svg={<Svg.BlueGear />}
        currentProjects={
          <CurrentProjects
            onClick={handleProjectsPageTransition}
            variants={currentProjectsButton}
            initial="normal"
            animate={expandProjectsButton ? "expand" : "normal"}
            whileHover="hover"
          >
            <CurrentProjectsText variants={buttonText}>
              <p>Current</p>
              <h4>Projects</h4>
              <p>Check out what we’re up to on the Wonder Works Web! </p>
            </CurrentProjectsText>
          </CurrentProjects>
        }
      />
      <OpenPositonsSection>
        <OpenPositons
          onClick={handleCareersPageTransition}
          variants={currentProjectsButton}
          initial="normal"
          animate={expandCareersButton ? "expand" : "normal"}
          whileHover="hover"
        >
          <OpenPositionsText variants={buttonText}>
            <p>Open</p>
            <h4>Positions</h4>
            <p>
              Join the World of Wonder and create wonderful things with us!{" "}
            </p>
          </OpenPositionsText>
        </OpenPositons>
      </OpenPositonsSection>
      <MailchimpWrapper>
        <PurpleStrokeStarWrapper
          animate={{
            rotate: 360,
            transition: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Svg.PurpleStrokeStar />
        </PurpleStrokeStarWrapper>

        <MailchimpComponent
          smallStarSvg={<BlueStars />}
          bigStarSvg={<PurpleStar />}
        />

        <PinkBackground>
          <Svg.PinkBackground />
        </PinkBackground>
        <PinkBackgroundMobileTablet>
          <Svg.PinkBgMobileTablet />
        </PinkBackgroundMobileTablet>
      </MailchimpWrapper>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const MailchimpWrapper = styled.div`
  background-color: var(--color-green);
  position: relative;

  @media (max-width: ${breakpoints.xl}px) {
    background-color: var(--color-pink);
  }
`

const PinkBackground = styled.div`
  position: absolute;
  z-index: 0;
  bottom: -1px;
  left: 0;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-start;
  svg {
    overflow-x: hidden;
    width: 100%;
    height: auto;
  }
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const PinkBackgroundMobileTablet = styled.div`
  display: none;

  @media (max-width: ${breakpoints.xl}px) {
    display: block;
    position: absolute;
    z-index: 1;
    top: -2px;
    right: 1px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-start;

    svg {
      transform: translateY(-99%);
      overflow-x: hidden;
      width: 100%;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 1px;
  }
`


const CurrentProjects = styled(motion.div)`
  overflow: hidden;
  cursor: pointer;
  border-radius: 100%;

  padding: 2rem;
  width: 265px;
  height: auto;
  aspect-ratio: 1/1;
  text-align: center;
  position: absolute;
  z-index: 10;
  right: 30%;
  top: 25%;

  display: flex;
  justify-content: center;
  align-content: center;

  @media (max-width: 1600px) {
    width: 230px;
    top: 30%;
    right: 35%;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 200px;
    top: 30%;
    right: 38%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 160px;
    top: 26%;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 35%;
    right: 30%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 130px;
    right: 35%;
    top: 32%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 86px;
    right: 30%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 25%;
    right: 28%;
  }
`

const CurrentProjectsText = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  transform: rotate(20deg);
  p {
    color: inherit;
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 0.35rem;
  }

  p:nth-of-type(1) {
    text-align: right;
    padding-right: 1rem;
  }
  p:nth-of-type(2) {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
  }

  h4 {
    color: inherit;
    font-family: "balgin-bold";
    line-height: 28px;
    font-size: 2.08333vw;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    h4 {
      margin-bottom: 1rem;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h4 {
      font-size: 2.5vw;
    }
    p:nth-of-type(1) {
      padding-bottom: 0;
    }
    p:nth-of-type(2) {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h4 {
      font-size: 2.7vw;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    p:nth-of-type(1) {
      font-size: 14px;
      text-align: center;
      padding-right: 0;
    }
    h4 {
      font-size: 14px;
      line-height: 14px;
    }
  }
`

const OpenPositonsSection = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  background-color: var(--color-green);

  @media (max-width: ${breakpoints.xl}px) {
    height: 200px;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 20rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 10rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-top: 0rem;
  }
`

const OpenPositons = styled(motion.div)`
  overflow: hidden;
  cursor: pointer;
  border-radius: 100%;

  left: 25%;
  top: -350%;

  padding: 2rem;
  width: 265px;
  height: auto;
  aspect-ratio: 1/1;
  text-align: center;
  position: absolute;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-content: center;

  @media (max-width: 1600px) {
    width: 230px;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 200px;
    left: 10%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 160px;
    top: -175%;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 20%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 130px;
    top: 10%;
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 20%;
    left: 5%;
    width: 86px;
  }
`

const OpenPositionsText = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  transform: rotate(-20deg);

  p {
    color: inherit;
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 0.35rem;
  }

  p:nth-of-type(1) {
    text-align: left;
    padding-right: 1rem;
  }
  p:nth-of-type(2) {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
  }

  h4 {
    color: inherit;
    font-family: "balgin-bold";
    line-height: 28px;
    font-size: 2.08333vw;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    h4 {
      margin-bottom: 1rem;
    }
    p:nth-of-type(2) {
      font-size: 14px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h4 {
      font-size: 2.5vw;
    }
    p:nth-of-type(1) {
      padding-bottom: 0;
    }
    p:nth-of-type(2) {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h4 {
      font-size: 2.7vw;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    p:nth-of-type(1) {
      font-size: 14px;
      text-align: center;
      padding-right: 0;
    }
    h4 {
      font-size: 14px;
      line-height: 14px;
    }
  }
`

const PurpleStrokeStarWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: -12.5%;
  left: -3%;

  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`
