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
    setTimeout(() => navigate("/projects"), 1000)
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
        duration: 1,
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
      <LetsWork svg={<Svg.BlueGear />} />

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
        <MailchimpSVG>
          <Svg.PinkMailchimpBg />
        </MailchimpSVG>
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
`

const MailchimpSVG = styled.div`
  position: absolute;
  bottom: -3%;
  left: 0;
`

const CurrentProjects = styled(motion.div)`
  overflow: hidden;
  cursor: pointer;
  border-radius: 100%;

  padding: 2rem;
  width: 265px;
  height: 265px;
  text-align: center;
  position: absolute;
  z-index: 10;
  left: 45%;
  top: 55%;

  display: flex;
  justify-content: center;
  align-content: center;

  /* background-color: var(--color-white); */
  /* color: var(--color-black); */
  /* transition: var(--hover-transition); */

  /* &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  } */
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
    padding-bottom: .35rem;
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
    margin-bottom: 1.5rem;
  }
`

const OpenPositonsSection = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  background-color: var(--color-green);
`

const OpenPositons = styled(motion.div)`
  overflow: hidden;
  cursor: pointer;
  border-radius: 100%;

  padding: 2rem;
  width: 265px;
  height: 265px;
  text-align: center;
  position: absolute;
  z-index: 10;
  left: 25%;
  top: -350%;

  display: flex;
  justify-content: center;
  align-content: center;

  /* background-color: var(--color-white); */
  /* color: var(--color-black); */
  /* transition: var(--hover-transition); */

  /* &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  } */
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
    margin-bottom: 1.5rem;
  }
`

const PurpleStrokeStarWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: -12.5%;
  left: -3%;
`
