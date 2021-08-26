import React, { useRef, useCallback } from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import { useInView } from "react-intersection-observer"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import * as svg from "../svg/aboutpage"

const About = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `About`

  // ----------framer motion animation variants----------
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
      },
    },
    hidden: {
      y: 200,
      opacity: 0,
    },
  }

  const word2 = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.35,
        type: "spring",
        stiffness: 100,
        damping: 11,
      },
    },
    hidden: {
      y: 200,
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
      y: 100,
      opacity: 0,
    },
  }
  const logoParent = {
    visible: {
      transition: {
        staggerChildren: 0.125,
      },
    },
    hidden: {},
  }
  const logoMask = {
    visible: {
      height: "auto",
    },
    hidden: {
      height: 0,
    },
  }
  const skateboardAnimation = {
    visible: {
      x: "73vw",
      transition: {
        duration: 3,
      },
    },
    hidden: {
      x: 10,
    },
  }
  const bigCircleAnimation = {
    visible: {
      rotate: 360,
      transition: {
        delay: 2.8,
        repeat: Infinity,
        duration: 7,
        ease: "easeInOut",
      },
    },
    hidden: {
      rotate: 0,
    },
  }

  // ---------- Intersection Observer logic ----------

  const ref = useRef()
  const [logosRef, logosInView] = useInView({
    root: null,
    threshold: 0.85,
    triggerOnce: true,
  })
  const [pillarsRef, pillarsInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: true,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      pillarsRef(node)
      logosRef(node)
    },
    [pillarsRef, logosRef]
  )

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })
  const homeBackground = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * 200
  )

  return (
    <Layout title={siteTitle}>
      <Seo title="About" />
      <Background style={{ y: homeBackground }}>
        <SkateboardWrapper
          variants={skateboardAnimation}
          initial="hidden"
          animate="visible"
        >
          <svg.Skateboard />
        </SkateboardWrapper>
        <BigCircleWrapper
          variants={bigCircleAnimation}
          initial="hidden"
          animate="visible"
        >
          <svg.BigCircle />
        </BigCircleWrapper>
        <SmallCircleWrapper
          animate={{
            rotate: -360,
            transition: { duration: 20, ease: "linear", repeat: Infinity },
          }}
        >
          <svg.SmallCircle />
        </SmallCircleWrapper>
        <SmallCirclesWrapper>
          <svg.SmallCircles />
        </SmallCirclesWrapper>
      </Background>
      <OrangeBg>
        <LandingText>
          <h1>
            <First variants={line} initial="hidden" animate="visible">
              <Span variants={word}>Where</Span>
              <Span variants={word}>Imagination</Span>
            </First>
            <Second variants={line} initial="hidden" animate="visible">
              <Span variants={word}>Comes</Span>
              <Span variants={word}>to</Span>
              <Span variants={word}>Play.</Span>
            </Second>
          </h1>
          <motion.p variants={subtitle} initial="hidden" animate="visible">
            At Wonder Works Studio we are ushering in the new era of immersive
            gaming, where players can express, explore, and expand their
            creativity. We build video games that spark imagination, encourage
            collaboration, and push innovation so gamers grow alongside the
            stories they create.
          </motion.p>
        </LandingText>
        <Press>
          <h4>As Seen On...</h4>
          <Logos
            ref={logosRef}
            variants={logoParent}
            initial="hidden"
            animate={logosInView && "visible"}
          >
            <motion.div variants={logoMask}>
              <StaticImage
                src="../images/Home/asSeenOn/Forbes.png"
                alt="Forbes logo"
                placeholder="none"
                quality={100}
                height={35}
              />
            </motion.div>
            <motion.div variants={logoMask}>
              <StaticImage
                src="../images/Home/asSeenOn/CNBC.png"
                alt="CNBC logo"
                placeholder="none"
                quality={100}
                height={35}
              />
            </motion.div>
            <motion.div variants={logoMask}>
              <StaticImage
                src="../images/Home/asSeenOn/npr.png"
                alt="n p r logo"
                placeholder="none"
                quality={100}
                height={35}
              />
            </motion.div>
            <motion.div variants={logoMask}>
              <StaticImage
                src="../images/Home/asSeenOn/edc.png"
                alt="e d c logo"
                placeholder="none"
                quality={100}
                height={35}
              />
            </motion.div>
            <motion.div variants={logoMask}>
              <StaticImage
                src="../images/Home/asSeenOn/Bloomberg.png"
                alt="Forbes logo"
                placeholder="none"
                quality={100}
                height={35}
              />
            </motion.div>
            <motion.div variants={logoMask}>
              <StaticImage
                src="../images/Home/asSeenOn/B2.png"
                alt="B2 logo"
                placeholder="none"
                quality={100}
                height={35}
              />
            </motion.div>
          </Logos>
        </Press>
      </OrangeBg>
      <StudioCollab ref={pillarsRef}>
        <Inner>
          <Top>
            <TopLeft>
              <Mask
                variants={word}
                initial="hidden"
                animate={pillarsInView ? "visible" : "hidden"}
              >
                <motion.span variants={line}>
                  <svg.Studio />
                </motion.span>
              </Mask>
              <GreenStarWrapper>
                <svg.GreenStar />
              </GreenStarWrapper>
              <p>
                Discover what’s in the works at Wonder Works Studio. We’re
                always dreaming up new adventures in exciting roleplay games for
                immersive, imaginative fun for everyone. Check out our ambitious
                new projects or our latest launches—they all live here.
              </p>
            </TopLeft>
            <TopRight>
              <Flex>
                <svg.Stars />
                <JamsWrapper
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    pillarsInView && {
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 1 },
                    }
                  }
                >
                  <svg.Jams />
                </JamsWrapper>
              </Flex>
              <p>
                Wonder Works Jams is a space for our junior talent to QA various
                game genres. It’s a creative hub of mentorship that fosters a
                lifelong love for exploration and innovation and promotes
                success on individual and collaborative levels.
              </p>
            </TopRight>
          </Top>
          <Bottom>
            <svg.Hexagon />
            <BottomWrapper>
              <Mask
                variants={word2}
                initial="hidden"
                animate={pillarsInView ? "visible" : "hidden"}
              >
                <motion.span variants={line}>
                  <svg.Collab />
                </motion.span>
              </Mask>
              <SingleStarWrapper>
                <svg.SingleStar />
              </SingleStarWrapper>
              <p>
                Growing our community is important to us and collaborating with
                optimistic, adventurous individuals pushes our own creativity to
                new heights. We’re always on the lookout for YouTubers and
                influencers to help tell our story—let us know if that’s you!{" "}
              </p>
            </BottomWrapper>
          </Bottom>
        </Inner>
      </StudioCollab>
    </Layout>
  )
}

export default About

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
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;
`

const SkateboardWrapper = styled(motion.div)`
  position: absolute;
  top: 13rem;
  /* left: 10%; */
`
const BigCircleWrapper = styled(motion.div)`
  position: absolute;
  top: 13rem;
  right: -12.5%;
`
const SmallCircleWrapper = styled(motion.div)`
  position: absolute;
  bottom: 2.5%;
  left: 60%;
`

const SmallCirclesWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0%;
  left: 5%;
`

const OrangeBg = styled.div`
  background-color: var(--color-orange);
`

const LandingText = styled.div`
  z-index: 2;
  position: relative;
  padding-top: 20rem;
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
    color: var(--color-black);
  }

  p {
    z-index: 2;
    padding-left: 15vw;
    align-self: flex-start;
    width: 72.5%;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    color: var(--color-black);
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
  padding-bottom: 2rem;
`
const Press = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h4 {
    padding-top: 5rem;
    padding-bottom: 2rem;
    font-size: 30px;
    font-family: "calibre-semibold";
  }
`

const Logos = styled(motion.div)`
  min-width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5rem;

  div {
    overflow: hidden;
    max-height: 50px;
  }
`

const StudioCollab = styled.section`
  background-color: var(--color-purple);
  padding: 5rem 0;
  p {
    color: var(--color-white);
  }
`

const Inner = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  display: flex;

  div:nth-of-type(2) {
    align-self: flex-end;
    padding-top: 5rem;
  }
  div:nth-of-type(3) {
    align-self: center;
  }
`
const Flex = styled.div`
  display: flex;
`

const TopLeft = styled.div`
  width: 50%;
  position: relative;
  margin-top: 4rem;

  p {
    width: 90%;
    padding-top: 3rem;
  }
`

const Mask = styled(motion.div)`
  height: auto;
  overflow-y: hidden;
`

const TopRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  padding-bottom: 4rem;
  text-align: right;

  svg {
    align-self: flex-end;
  }
  div {
    align-self: flex-end;
    padding-bottom: 2rem;
  }
  p {
    width: 85%;
    align-self: flex-end;
  }
`

const Bottom = styled.div`
  display: flex;
  align-items: flex-start;

  p {
    padding-top: 3rem;
  }
  svg:first-of-type {
    align-self: center;
  }
`

const BottomWrapper = styled.div`
  width: 40%;
  margin-left: 7rem;
  position: relative;
`

const JamsWrapper = styled(motion.div)``

const GreenStarWrapper = styled(motion.div)`
  position: absolute;
  left: -15%;
  top: 45%;
`

const SingleStarWrapper = styled.div`
  position: absolute;
  right: 5%;
  top: -15%;
`
