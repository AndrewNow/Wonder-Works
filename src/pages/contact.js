import React, { useState } from "react"
import Layout from "../components/layout"
import { graphql, navigate } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { LetsWork } from "../components/letsWork"
import MailchimpComponent from "../components/Mailchimp/component"
import * as SVG from "../svg/contactpage"
import { BlueStars, PurpleStar } from "../svg/miscellaneous"
import { motion } from "framer-motion"

const Contact = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Contact`

  const [expandButton, setExpandButton] = useState(false)

  const handleProjectsPageTransition = () => {
    setExpandButton(true)
    // navigate to projects page after 1500 seconds, the time it takes for the animation to finish
    setTimeout(() => navigate("/projects"), 500)
  }
  const handleCareersPageTransition = () => {
    setExpandButton(true)
    // navigate to projects page after 1500 seconds, the time it takes for the animation to finish
    setTimeout(() => navigate("/careers"), 1000)
  }

  const currentProjectsButton = {
    expand: {
      scale: 15,
      backgroundColor: "#1A1748",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    normal: {
      scale: 1,
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
      <LetsWork svg={<SVG.BlueGear />} />

      <CurrentProjects
        onClick={handleProjectsPageTransition}
        variants={currentProjectsButton}
        initial="normal"
        animate={expandButton ? "expand" : "normal"}
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
          animate={expandButton ? "expand" : "normal"}
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
          <SVG.PurpleStrokeStar />
        </PurpleStrokeStarWrapper>
        <MailchimpComponent
          smallStarSvg={<BlueStars />}
          bigStarSvg={<PurpleStar />}
        />
        <MailchimpSVG>
          <SVG.PinkMailchimpBg />
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

  background-color: var(--color-white);
  color: var(--color-black);
  transition: var(--hover-transition);

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
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

  background-color: var(--color-white);
  color: var(--color-black);
  transition: var(--hover-transition);

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
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
