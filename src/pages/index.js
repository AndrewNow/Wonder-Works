import React, { useRef, useCallback } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Staircase,
  Cog,
  Portal,
  Circle,
  CircleStroke,
  BlueTriangles,
  BlueTriangle,
  PurpleTriangle,
  OrangeTriangle,
  GreenTriangle,
} from "../svg/homepage"

const HomeIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Home`

  // intersection observer logic
  const ref = useRef()
  const [sectionRef1, sectionInView1] = useInView({
    root: null,
    threshold: 0.85,
    triggerOnce: true,
  })

  const setRefs = useCallback(
    //assign multiple refs
    node => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      sectionRef1(node)
    },
    [sectionRef1]
  )

  //framer motion landing page animation variants
  const line = {
    visible: {
      transition: {
        duration: 2,
        delay: 1.2,
        delayChildren: 0.6,
        staggerChildren: 0.2,
        staggerDirection: 1,
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
        // ...transition
      },
    },
    hidden: {
      y: 200,
      opacity: 0,
    },
  }
  const line2 = {
    visible: {
      transition: {
        duration: 2,
        delay: 1.2,
        delayChildren: 0.6,
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  }

  const word2 = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 13,
        // ...transition
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  }

  const fadeIn = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 13,
        // ...transition
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  }

  // ---------- PARRALLAX SCROLL LOGIC USING FRAMER ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })
  const y = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -50
  )
  const y1 = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -60
  )
  const y2 = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -50
  )
  const y3 = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -135
  )

  return (
    <Layout title={siteTitle}>
      <Seo title="Home" />
      <Background>
        <StaircaseWrapper>
          <Staircase />
        </StaircaseWrapper>
        <CogWrapper>
          <Cog />
        </CogWrapper>
        <PortalWrapper>
          <Portal />
        </PortalWrapper>
      </Background>
      <LandingText>
        <h1>
          <First variants={line} initial="hidden" animate="visible">
            <Span variants={word}>dreaming</Span>
            <Span variants={word}>up</Span>
          </First>
          <Second variants={line} initial="hidden" animate="visible">
            <Span variants={word}>wonderful</Span>
            <Span variants={word}>works</Span>
          </Second>
          <Third variants={line} initial="hidden" animate="visible">
            <Span variants={word}>in</Span>
            <Span variants={word}>the</Span>
            <Span variants={word}>metaverse</Span>
          </Third>
        </h1>
        <h4>The latest in Roblox gaming lives here.</h4>
        <DiscoverMore to="/">DISCOVER MORE</DiscoverMore>
      </LandingText>
      <ImaginationSection ref={sectionRef1}>
        <h2>
          <FirstLine
            variants={line2}
            initial="hidden"
            animate={sectionInView1 ? "visible" : "hidden"}
          >
            <WordSpan variants={word2}>Where </WordSpan>
            <WordSpan variants={word2}>Imagination</WordSpan>
          </FirstLine>
          <SecondLine
            variants={line2}
            initial="hidden"
            animate={sectionInView1 ? "visible" : "hidden"}
          >
            <WordSpan variants={word2}>Comes</WordSpan>
            <WordSpan variants={word2}>to</WordSpan>
            <WordSpan variants={word2}>Play.</WordSpan>
          </SecondLine>
        </h2>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={sectionInView1 ? "visible" : "hidden"}
        >
          At Wonder Works Studio we are ushering in the new era of immersive
          gaming, where players can express, explore, and expand their
          creativity. We build video games that spark imagination, encourage
          collaboration, and push innovation so gamers grow alongside the
          stories they create.
        </motion.p>
        <ImaginationBG>
          <CircleWrapper>
            <Circle />
          </CircleWrapper>
          <CircleStrokeWrapper style={{ y: y }}>
            <CircleStroke />
          </CircleStrokeWrapper>
          <BlueTrianglesWrapper>
            <BlueTriangles />
          </BlueTrianglesWrapper>

          <PurpleTriangleWrapper style={{ y: y3 }}>
            <PurpleTriangle />
          </PurpleTriangleWrapper>
          <OrangeTriangleWrapper style={{ y: y1 }}>
            <OrangeTriangle />
          </OrangeTriangleWrapper>
          <GreenTriangleWrapper style={{ y: y2 }}>
            <GreenTriangle />
          </GreenTriangleWrapper>
          <BlueTriangleWrapper style={{ y: y3 }}>
            <BlueTriangle />
          </BlueTriangleWrapper>
        </ImaginationBG>
      </ImaginationSection>
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

const Background = styled.div`
  z-index: 0;
  height: 100vh;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const StaircaseWrapper = styled.div`
  position: absolute;
  top: 23%;
  left: 8%;
`
const CogWrapper = styled.div`
  position: absolute;
  top: 53%;
  right: 40%;
`
const PortalWrapper = styled.div`
  position: absolute;
  top: 35%;
  right: 0%;
`

const LandingText = styled.div`
  z-index: 2;
  position: relative;
  padding-top: 9rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    z-index: 2;
    font-family: "balgin-medium";
    font-size: 140px;
    line-height: 100%;
    color: black;
  }

  h4 {
    z-index: 2;
    margin-top: 7.5rem;
    margin-bottom: 4rem;
    text-transform: uppercase;
    color: black;
  }
`

const Span = styled(motion.span)`
  margin-right: 2.5rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;
`
const First = styled(motion.div)`
  position: relative;
  z-index: 2;
  padding-bottom: 2rem;
  vertical-align: top;
  display: inline;
  overflow: hidden;
`
const Second = styled(motion.div)`
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding-bottom: 0.25rem;
`
const Third = styled(motion.div)`
  overflow: hidden;
  padding-bottom: 0.25rem;
`

const DiscoverMore = styled(Link)`
  border: 2px solid var(--color-black);
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  background-color: var(--color-white);
  text-decoration: none;
  color: var(--color-black);
  font-family: "calibre-medium";
  font-size: 28px;
  line-height: 35px;

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`

const ImaginationSection = styled.section`
  height: 100vh;
  padding-top: 28rem;
  /* margin: 0 auto; */
  text-align: center;
  position: relative;

  h2,
  p {
    z-index: 2;
    position: relative;
  }
  h2 {
    line-height: 95%;
  }
  p {
    padding-top: 5rem;
    margin: 0 auto;
    width: 45%;
  }
`
const FirstLine = styled(motion.div)`
  position: relative;
  z-index: 2;
  overflow: hidden;
`
const SecondLine = styled(motion.div)`
  position: relative;
  z-index: 2;
  overflow: hidden;
`

const WordSpan = styled(motion.span)`
  margin-right: 1rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;
`

const ImaginationBG = styled(motion.div)`
  z-index: 0;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const CircleWrapper = styled(motion.div)`
  position: absolute;
  top: 32%;
  right: 15.5%;
`

const CircleStrokeWrapper = styled(motion.div)`
  position: absolute;
  top: 75%;
  left: 12.5%;
`

const BlueTrianglesWrapper = styled(motion.div)`
  position: absolute;
  bottom: 1%;
  left: 0;
  width: 100%;
`

const BlueTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 60%;
  left: 20%;
`

const PurpleTriangleWrapper = styled(motion.div)`
  position: absolute;
  bottom: -10%;
  right: 25%;
`

const GreenTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 30%;
  right: 25%;
`

const OrangeTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 34%;
  left: 25%;
`
