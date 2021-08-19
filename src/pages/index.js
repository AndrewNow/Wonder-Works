import React, { useRef, useCallback, useState } from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
// import TypeWriterEffect from "react-typewriter-effect"
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
  TopLeftPillar,
  TopRightPillar,
  BottomLeftPillar,
  BottomRightPillar,
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
  const [typeWriterRef, typewriterInView] = useInView({
    root: null,
    threshold: 0.85,
    triggerOnce: true,
  })
  const [logosRef, logosInView] = useInView({
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
      typeWriterRef(node)
      logosRef(node)
    },
    [sectionRef1, typeWriterRef, logosRef]
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

  const pillarVariants = {
    visible: {
      height: "100%",
      transition: {
        duration: 0.3,
      },
    },
    hidden: {
      height: 0,
      transition: {
        duration: 0.3,
      },
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

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })
  const homeBackground = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * 200
  )
  const circleStroke = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -50
  )
  const orangeTriangle = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -60
  )
  const greenTriangle = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -50
  )
  const blueTriangle = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -165
  )

  // ---------- Hover state for Pillars ----------
  const [hover, setHover] = useState({
    topLeftHover: false,
    topRightHover: false,
    bottomRightHover: false,
  })

  return (
    <Layout title={siteTitle}>
      <Seo title="Home" />
      <Background style={{ y: homeBackground }}>
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
          <CircleStrokeWrapper style={{ y: circleStroke }}>
            <CircleStroke />
          </CircleStrokeWrapper>
          <BlueTrianglesWrapper>
            <BlueTriangles />
          </BlueTrianglesWrapper>

          <PurpleTriangleWrapper style={{ y: blueTriangle }}>
            <PurpleTriangle />
          </PurpleTriangleWrapper>
          <OrangeTriangleWrapper style={{ y: orangeTriangle }}>
            <OrangeTriangle />
          </OrangeTriangleWrapper>
          <GreenTriangleWrapper style={{ y: greenTriangle }}>
            <GreenTriangle />
          </GreenTriangleWrapper>
          <BlueTriangleWrapper style={{ y: blueTriangle }}>
            <BlueTriangle />
          </BlueTriangleWrapper>
        </ImaginationBG>
      </ImaginationSection>

      <Pillars>
        <TopLeft
          onMouseEnter={() => setHover({ topLeftHover: true })}
          onMouseLeave={() => setHover({ topLeftHover: false })}
        >
          <ImageWrapper>
            <StaticImage
              onMouseEnter={() => setHover({ topLeftHover: true })}
              onMouseLeave={() => setHover({ topLeftHover: false })}
              src="../images/Home/topleft.png"
              alt="Playful text which reads 'Wonder Works Studio'"
              placeholder="none"
              quality={100}
            />
          </ImageWrapper>
          <TopLeftPillar />
          <PillarHover
            variants={pillarVariants}
            initial="hidden"
            animate={hover.topLeftHover ? "visible" : "hidden"}
            exit="hidden"
          >
            <PillarHoverInner>
              <p>
                Growing our community is important to us and collaborating with
                optimistic, adventurous individuals pushes our own creativity to
                new heights. We’re always on the lookout for YouTubers and
                influencers to help tell our story—let us know if that’s you!{" "}
              </p>
            </PillarHoverInner>
          </PillarHover>
        </TopLeft>

        <TopRight
          onMouseEnter={() => setHover({ topRightHover: true })}
          onMouseLeave={() => setHover({ topRightHover: false })}
        >
          <ImageWrapper>
            <StaticImage
              onMouseEnter={() => setHover({ topRightHover: true })}
              onMouseLeave={() => setHover({ topRightHover: false })}
              src="../images/Home/topright.png"
              alt="Playful text which reads 'Wonder Works Jams'"
              placeholder="none"
              quality={100}
            />
          </ImageWrapper>
          <StarWrapper>
            <motion.svg
              animate={{
                scale: 0.6,
                rotate: -10,
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              }}
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.1084 31.9561L21.1016 41.2729L18.0947 31.9561C17.4663 30.0128 16.3858 28.2465 14.9414 26.8025C13.4971 25.3585 11.7296 24.2778 9.78613 23.6499L0.470703 20.6311L9.78613 17.624C11.7295 16.9956 13.4961 15.9148 14.9404 14.4707C16.3847 13.0266 17.4661 11.2602 18.0947 9.31689L21.1016 0.000976562L24.1084 9.31689C24.737 11.26 25.8176 13.0263 27.2617 14.4705C28.7058 15.9146 30.4729 16.9954 32.416 17.624L41.7314 20.6311L32.416 23.6379C30.4732 24.2705 28.7075 25.3541 27.2637 26.7998C25.8199 28.2455 24.7384 30.0124 24.1084 31.9561Z"
                fill="#FADC22"
              />
            </motion.svg>
            <motion.svg
              animate={{
                scale: 0.6,
                rotate: 10,
                delay: 0.1,
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              }}
              width="97"
              height="96"
              viewBox="0 0 97 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55.1426 75.2871L48.4824 95.8979L41.8223 75.2871C40.2736 70.4832 37.6051 66.1162 34.0361 62.5471C30.4672 58.978 26.1007 56.3089 21.2969 54.76L0.685547 48.1001L21.2969 41.4399C26.1007 39.8911 30.4672 37.222 34.0361 33.6528C37.6051 30.0837 40.2736 25.717 41.8223 20.9131L48.4824 0.302002L55.1426 20.9131C56.6912 25.7172 59.3605 30.0842 62.9297 33.6533C66.4988 37.2225 70.8658 39.8914 75.6699 41.4399L96.2793 48.1001L75.6699 54.76C70.8671 56.311 66.5014 58.9807 62.9326 62.5496C59.3638 66.1184 56.6936 70.4843 55.1426 75.2871Z"
                fill="#FADC22"
              />
            </motion.svg>
          </StarWrapper>
          <PillarHover
            variants={pillarVariants}
            initial="hidden"
            animate={hover.topRightHover ? "visible" : "hidden"}
            exit="hidden"
          >
            <PillarHoverInner>
              <p>
                Wonder Works Jams is a space for our junior talent to QA various
                game genres. It’s a creative hub of mentorship that fosters a
                lifelong love for exploration and innovation and promotes
                success on individual andcollaborative levels.{" "}
              </p>
            </PillarHoverInner>
          </PillarHover>
          <TopRightPillar />
        </TopRight>
        <BottomLeft ref={typeWriterRef}>
          {/* <TypeWriterEffect
            scrollArea={typeWriterRef}
            textStyle={{ fontFamily: "balgin-bold" }}
            startDelay={500}
            cursorColor="var(--color-purple)"
            multiText={[
              "Wonder at work.",
              "Wonder at work.",
              "Wonder at work.",
              "Wonder at work.",
              "Wonder at work.",
              "Wonder at work.",
              "Wonder at work.",
              "Wonder at work.",
            ]}
            multiTextDelay={3000}
            typeSpeed={150}
          /> */}
          <BottomLeftPillar />
        </BottomLeft>
        <BottomRight
          onMouseEnter={() => setHover({ bottomRightHover: true })}
          onMouseLeave={() => setHover({ bottomRightHover: false })}
        >
          <ImageWrapper>
            <StaticImage
              onMouseEnter={() => setHover({ bottomRightHover: true })}
              onMouseLeave={() => setHover({ bottomRightHover: false })}
              src="../images/Home/bottomright.png"
              alt="Playful text which reads 'Wonder Works Collab, with a pink octogon shaped cartoon character holding the text.'"
              placeholder="none"
              quality={100}
            />
          </ImageWrapper>
          <PillarHover
            variants={pillarVariants}
            initial="hidden"
            animate={hover.bottomRightHover ? "visible" : "hidden"}
            exit="hidden"
          >
            <PillarHoverInner>
              <p>
                Growing our community is important to us and collaborating with
                optimistic, adventurous individuals pushes our own creativity to
                new heights. We’re always on the lookout for YouTubers and
                influencers to help tell our story—let us know if that’s you!
              </p>
            </PillarHoverInner>
          </PillarHover>
          <BottomRightPillar />
        </BottomRight>
      </Pillars>

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
            />
          </motion.div>
          <motion.div variants={logoMask}>
            <StaticImage
              src="../images/Home/asSeenOn/CNBC.png"
              alt="CNBC logo"
              placeholder="none"
              quality={100}
            />
          </motion.div>
          <motion.div variants={logoMask}>
            <StaticImage
              src="../images/Home/asSeenOn/npr.png"
              alt="n p r logo"
              placeholder="none"
              quality={100}
            />
          </motion.div>
          <motion.div variants={logoMask}>
            <StaticImage
              src="../images/Home/asSeenOn/edc.png"
              alt="e d c logo"
              placeholder="none"
              quality={100}
            />
          </motion.div>
          <motion.div variants={logoMask}>
            <StaticImage
              src="../images/Home/asSeenOn/Bloomberg.png"
              alt="Forbes logo"
              placeholder="none"
              quality={100}
            />
          </motion.div>
          <motion.div variants={logoMask}>
            <StaticImage
              src="../images/Home/asSeenOn/B2.png"
              alt="B2 logo"
              placeholder="none"
              quality={100}
            />
          </motion.div>
        </Logos>
      </Press>
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
  margin: 0 auto;
  position: absolute;
  top: -2.5rem;
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
  padding-top: 13rem;
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
  
  h4 {
    z-index: 2;
    margin-top: 7.5rem;
    margin-bottom: 4rem;
    text-transform: uppercase;
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

const Pillars = styled.section`
  padding-top: 10rem;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
`

const TopLeft = styled.div`
  background-color: var(--color-green);
  width: 50%;
  height: 50%;
  position: relative;
  z-index: 2;
  overflow: hidden;

  svg {
    z-index: 0;
    position: absolute;
    bottom: -1px;
    right: -1px;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TopRight = styled.div`
  background-color: var(--color-white);
  width: 50%;
  height: 50%;
  position: relative;
  overflow: hidden;
  svg {
    position: absolute;
    bottom: -1px;
    left: 0;
  }
`

const StarWrapper = styled.div`
  width: 100%;
  height: 100%;

  & svg:nth-child(even) {
    position: absolute;
    z-index: 0;
    left: 9%;
    top: 17%;
  }
  & svg:nth-child(odd) {
    position: absolute;
    z-index: 6;
    left: 71%;
    bottom: 26.5%;
  }
`

const BottomLeft = styled.div`
  background-color: var(--color-white);
  width: 50%;
  height: 50%;
  position: relative;
  overflow: hidden;
  svg {
    z-index: 0;
    position: absolute;
    top: -1px;
    right: 0;
  }

  h1 {
    color: var(--color-purple);
    position: absolute;
    z-index: 5;
    margin: 0 auto;
    font-size: 76px;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
const BottomRight = styled.div`
  background-color: var(--color-black);
  width: 50%;
  height: 50%;
  position: relative;
  overflow: hidden;
  svg {
    position: absolute;
    top: -1px;
    left: 0;
  }
`

const PillarHover = styled(motion.div)`
  width: 100%;
  /* height: 100%; */
  position: absolute;
  z-index: 10;
  bottom: 0;
  background-color: #1a174999;
  overflow: hidden;
`

const PillarHoverInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #1a174999;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  p {
    width: 70%;
    margin: 0 auto;
    color: var(--color-white);
  }
`

const Press = styled.div`
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
  }
`

const Logos = styled(motion.div)`
  min-width: 70%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10rem;

  div {
    background-color: var(--color-green);
    /* border: 1px solid black; */
    overflow: hidden;
  }
`
