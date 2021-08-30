import React, { useRef, useCallback } from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import { useInView, InView } from "react-intersection-observer"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import * as svg from "../svg/aboutpage"
import CareerFlip from "../components/CareerFlip/CareerFlip"
import PressCarousel from "../components/EmblaCarousel/pressCarousel"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"

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

  const meganzachAnim = {
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
  const meganzachWord = {
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
  const [meganzachRef, meganzachInView] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      logosRef(node)
      pillarsRef(node)
      meganzachRef(node)
    },
    [pillarsRef, logosRef, meganzachRef]
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
                variants={line}
                initial="hidden"
                animate={pillarsInView && "visible"}
              >
                <motion.div variants={word2}>
                  <svg.Studio />
                </motion.div>
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
                variants={line}
                initial="hidden"
                animate={pillarsInView && "visible"}
              >
                <motion.div variants={word}>
                  <svg.Collab />
                </motion.div>
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
      <MeganZach ref={meganzachRef}>
        <TextContent
          variants={meganzachAnim}
          animate={meganzachInView && "visible"}
          initial="hidden"
        >
          <motion.h4 variants={meganzachWord}>
            Meet <br />
          </motion.h4>
          <motion.h1 variants={meganzachWord}>Megan</motion.h1>
          <ImageWrapper>
            <StaticImage
              src="../images/About/meganzach.png"
              alt="A portrait of Megan and Zach against a light purple background. Megan is behind Zach and has her arm around his shoulders."
              quality={100}
            />
          </ImageWrapper>
          <motion.h1 variants={meganzachWord}>
            <svg
              width="62"
              height="61"
              viewBox="0 0 62 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.78115 24.8479L23.4661 24.9919C23.5626 24.9925 23.6583 24.974 23.7477 24.9375C23.8371 24.901 23.9185 24.8474 23.9871 24.7795C24.0557 24.7117 24.1102 24.631 24.1476 24.542C24.185 24.453 24.2046 24.3575 24.2051 24.261L24.3051 1.09204C24.3059 0.897893 24.3836 0.711955 24.5211 0.574952C24.6587 0.437948 24.8449 0.360839 25.0391 0.360841H35.5312C35.6278 0.360707 35.7236 0.379721 35.8129 0.416749C35.9022 0.453776 35.9833 0.508158 36.0515 0.576661C36.1198 0.645164 36.1737 0.726459 36.2104 0.815919C36.247 0.905378 36.2657 1.00122 36.2652 1.0979L36.1652 24.2668C36.1641 24.4607 36.2398 24.6473 36.3759 24.7854C36.5119 24.9235 36.6973 25.0021 36.8911 25.0039L60.4322 25.2449C60.6248 25.2467 60.809 25.3243 60.9448 25.4609C61.0807 25.5976 61.1573 25.7822 61.1581 25.9749L61.2031 36.418C61.2035 36.5151 61.1847 36.6114 61.1476 36.7012C61.1105 36.791 61.0559 36.8726 60.9871 36.9412C60.9182 37.0097 60.8365 37.0639 60.7466 37.1006C60.6567 37.1373 60.5603 37.1558 60.4632 37.155L36.6991 36.9629C36.6021 36.9621 36.506 36.9805 36.4162 37.0171C36.3263 37.0537 36.2447 37.1079 36.1759 37.1763C36.1071 37.2446 36.0525 37.3257 36.0153 37.4153C35.9781 37.5048 35.959 37.601 35.9591 37.698L36.0071 59.3721C36.0074 59.4688 35.9885 59.5646 35.9516 59.6541C35.9146 59.7435 35.8603 59.8247 35.7918 59.8931C35.7233 59.9614 35.6419 60.0153 35.5524 60.052C35.4629 60.0887 35.3669 60.1075 35.2702 60.1069L24.6321 60.062C24.5355 60.0615 24.4401 60.0419 24.3511 60.0044C24.2621 59.9669 24.1814 59.9122 24.1136 59.8435C24.0457 59.7748 23.9922 59.6932 23.956 59.6038C23.9197 59.5143 23.9013 59.4186 23.9021 59.322L24.0932 37.6951C24.094 37.5983 24.0756 37.5022 24.0392 37.4126C24.0028 37.323 23.949 37.2416 23.881 37.1729C23.813 37.1041 23.7321 37.0493 23.6428 37.012C23.5536 36.9746 23.4578 36.9551 23.3611 36.9548L1.68411 36.907C1.58738 36.9067 1.49171 36.8872 1.40249 36.8499C1.31328 36.8125 1.23236 36.758 1.16433 36.6892C1.09631 36.6204 1.04254 36.5388 1.00613 36.4492C0.969721 36.3596 0.951382 36.2637 0.952173 36.167L1.04214 25.5759C1.04372 25.3814 1.12245 25.1956 1.26101 25.0591C1.39957 24.9226 1.58665 24.8466 1.78115 24.8479Z"
                fill="#F7F7FC"
              />
            </svg>
            Zach
          </motion.h1>
          <motion.p variants={meganzachWord}>
            Game-developers by day and creatives at heart, Megan & Zach dreamed
            up Wonder Works Studio while balancing brand start-ups, YouTube
            channels, and the launch of their dreamy joint endeavour: the game
            Overlook Bay on Roblox. Together, this pair works wonders.
          </motion.p>
        </TextContent>
        <CirclesWrapper>
          <svg.Circles />
        </CirclesWrapper>
        <PinkShapesWrapper>
          <svg.PinkShapes />
        </PinkShapesWrapper>
        <BlueSquigglyWrapper>
          <svg.BlueSquiggly />
        </BlueSquigglyWrapper>
      </MeganZach>
      <PressCarousel />
      <WonderWorkersWrapper>
        <WonderWorkers />
      </WonderWorkersWrapper>
      <CareerFlip />
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
  padding-top: 2rem;
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

const MeganZach = styled.section`
  padding: 10rem 0;
  position: relative;
  background-color: var(--color-orange);

  p {
    margin: 0 auto;
    padding-top: 6rem;
    text-align: center;
    width: 41%;
  }
`

const TextContent = styled(motion.div)`
  color: var(--color-white);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  h4,
  h1 {
    position: absolute;
    z-index: 4;
    color: var(--color-white);
  }

  h1 {
    font-family: "ppwoodland-bold";
  }
  h4 {
    left: 20%;
    top: 10%;
  }

  h1:first-of-type {
    left: 20%;
    top: 15%;
  }
  h1:last-of-type {
    right: 20%;
    top: 55%;
    svg {
      transform: translate3d(-15px, 10px, 0);
    }
  }
`

const ImageWrapper = styled.div`
  filter: drop-shadow(20px 1px 0px var(--color-purple));
  border-radius: 100%;
  border: 2px solid var(--color-black);
  width: 615px;
  height: 615px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 3;
`

const CirclesWrapper = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: 15%;
`
const PinkShapesWrapper = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 14%;
  left: 13%;
`

const BlueSquigglyWrapper = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 21%;
  left: 10%;
`

const WonderWorkersWrapper = styled.section`
  background-color: var(--color-lightpink);
  width: 100%;
  position: relative;
  padding: 5rem 0;
`