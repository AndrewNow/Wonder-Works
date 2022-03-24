import React, { useCallback, useEffect } from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import { useInView } from "react-intersection-observer"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import {
  motion,
  useViewportScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import * as Svg from "../svg/aboutpage"
import { GreenStars, PinkStar, KeepScrollingSVG } from "../svg/miscellaneous"
import CareerFlip from "../components/CareerFlip/CareerFlip"
import PressCarousel from "../components/EmblaCarousel/pressCarousel"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import { LetsWork } from "../components/letsWork"
import MailchimpComponent from "../components/Mailchimp/component"
import { AsSeenOnLogosAbout } from "../components/AsSeenOn/AsSeenOnLogos"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import breakpoints from "../components/breakpoints"
import OurPillarsAboutPage from "../components/SideScroll/ourPillarsAboutpage"
import { ColoredGears } from "../svg/miscellaneous"

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
  const skateboardAnimation = {
    visible: {
      x: "105vw",
      transition: {
        duration: 4,
        repeat: "Infinity",
        repeatType: "loop",
        repeatDelay: 5,
      },
    },
    hidden: {
      x: "-25vw",
    },
  }
  const skateboardAnimationBottom = {
    visible: {
      x: "-25vw",
      transition: {
        duration: 4,
        delay: 3.25,
        repeat: "Infinity",
        repeatType: "loop",
        repeatDelay: 5,
      },
    },
    hidden: {
      x: "110vw",
    },
  }

  const bigCircleAnimation = {
    visible: {
      rotate: 360,
      transition: {
        delay: 1.75,
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

  const meganZachSvg = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  }

  // ---------- Intersection Observer logic ----------

  const [meganzachRef, meganzachInView] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })

  // ---------- Parrallax scroll logic using Framer  ----------
  let throttle = require("lodash/throttle")

  const { scrollYProgress } = useViewportScroll({ passive: true })
  const smallParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * 1050, 50)
  )
  const mediumParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * 1750, 50)
  )

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
  }, [currentTheme])

  return (
    <Layout title={siteTitle}>
      <Seo
        title="About"
        keywords={[
          `Wonder Works`,
          `WonderWorks`,
          `Wonder Works Roblox`,
          `Roblox`,
          `Gaming`,
          `wonder works gaming`,
          `wonderworks gaming`,
          `wonder works about`,
          `wonderworks about`,
          `about`,
          `wonder works info`,
          `wonderworks info`,
        ]}
      />
      <Background style={{ y: mediumParallax }}>
        <SkateboardWrapper
          variants={skateboardAnimation}
          initial="hidden"
          animate="visible"
        >
          <Svg.Skateboard />
        </SkateboardWrapper>
        <BigCircleWrapper
          variants={bigCircleAnimation}
          initial="hidden"
          animate="visible"
        >
          <Svg.BigCircle />
        </BigCircleWrapper>
        <SmallCircleWrapper
          animate={{
            rotate: -360,
            transition: { duration: 20, ease: "linear", repeat: Infinity },
          }}
        >
          <Svg.SmallCircle />
        </SmallCircleWrapper>
        <SmallCirclesWrapper>
          <Svg.SmallCircles />
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
              <br />
              <Span variants={word}>to</Span>
              <Span variants={word}>Play.</Span>
            </Second>
          </h1>
          <motion.p variants={subtitle} initial="hidden" animate="visible">
            At Wonder Works Studio, we are ushering in the new era of immersive
            gaming, where players can express, explore, and expand their
            creativity. We build video games that spark imagination, encourage
            collaboration, and push innovation so gamers grow alongside the
            stories they create.
          </motion.p>
          <SkateboardWrapperBottom
            variants={skateboardAnimationBottom}
            initial="hidden"
            animate="visible"
          >
            <Svg.Skateboard />
          </SkateboardWrapperBottom>
        </LandingText>
        <KeepScrolling>
          <p>Keep scrolling!</p>
          <KeepScrollingSVG />
        </KeepScrolling>
        <Logos>
          <h4>As Seen On...</h4>
          <AsSeenOnLogosAbout />
        </Logos>
      </OrangeBg>
      <OurPillarsAboutPage />
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
        <AnimatePresence>
          <CirclesWrapper
            style={{ y: mediumParallax }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={meganZachSvg}
          >
            <Svg.Circles />
          </CirclesWrapper>
          <PinkShapesWrapper
            style={{ y: smallParallax }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={meganZachSvg}
          >
            <Svg.PinkShapes />
          </PinkShapesWrapper>
        </AnimatePresence>
        <BlueSquigglyWrapper>
          <Svg.BlueSquiggly />
        </BlueSquigglyWrapper>
      </MeganZach>
      <PressCarousel />
      <WonderWorkersWrapper>
        <WonderWorkers />
      </WonderWorkersWrapper>
      <LetsWork svg={<ColoredGears gearColor={"#eb2c90"} />} />
      <CareerFlip />
      <Newsletter>
        <BlueBackgroundMobileTablet>
          <Svg.BigBlueBackgroundMobileTablet />
        </BlueBackgroundMobileTablet>
        <MailchimpComponent
          smallStarSvg={<GreenStars />}
          bigStarSvg={<PinkStar />}
        />
        <BlueBackground>
          <Svg.BigBlueBackground />
        </BlueBackground>
      </Newsletter>
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
  height: 110vh;
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;

  @media (max-width: ${breakpoints.m}px) {
    height: 100vh;
  }
`

const BigCircleWrapper = styled(motion.div)`
  position: absolute;
  top: 21.5%;
  right: -12.5%;

  svg {
    max-width: 590px;
    height: auto;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    svg {
      max-width: 500px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    svg {
      max-width: 450px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 15%;
    svg {
      max-width: 400px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    svg {
      max-width: 370px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    right: -25%;
    top: 10%;
    svg {
      max-width: 275px;
    }
  }
`
const SmallCircleWrapper = styled(motion.div)`
  position: absolute;
  bottom: 4%;
  left: 5%;
  overflow: visible;

  svg {
    width: 310px;
    height: auto;
  }

  @media (max-width: 1600px) {
    left: 2%;
    bottom: 5%;
    svg {
      width: 250px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    left: 3%;
    bottom: 2%;
    svg {
      width: 220px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    bottom: 25%;
    left: -15%;
    svg {
      width: 150px;
    }
  }
`

const SmallCirclesWrapper = styled(motion.div)`
  position: absolute;
  bottom: 6.5%;
  right: 12.5%;

  svg {
    width: 280px;
    height: auto;
  }

  @media (max-width: 1600px) {
    bottom: 0%;
    right: 20%;
  }

  @media (max-width: ${breakpoints.xl}px) {
    right: 10%;
    bottom: 5%;
  }
  @media (max-width: ${breakpoints.m}px) {
    svg {
      width: 230px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`

const OrangeBg = styled.div`
  background-color: var(--color-orange);
`
const SkateboardWrapper = styled(motion.div)`
  position: absolute;
  z-index: 200;
  /* top: 21.5%; */
  top: calc(35vh - 55px);
  svg {
    height: 150px;
    width: auto;
  }
  @media (max-width: 1600px) {
    top: calc(37.5vh - 75px);
    svg {
      height: 125px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: calc(37.5vh - 75px);
  }
  @media (max-width: 1025px) {
    top: calc(30vh - 50px);
    svg {
      height: 110px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 20%;
    top: calc(30vh - 50px);
  }
  @media (max-width: ${breakpoints.m}px) {
    top: calc(30vh - 35px);
    svg {
      height: 100px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: calc(27.5vh - 30px);
    svg {
      height: 80px;
    }
  }
`
const SkateboardWrapperBottom = styled(motion.div)`
  position: relative;

  svg {
    height: 140px;
    width: auto;
  }

  @media (max-width: ${breakpoints.xl}px) {
    svg {
      height: 125px;
    }
  }
  @media (max-width: 1025px) {
    svg {
      height: 110px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    svg {
      height: 125px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    svg {
      height: 100px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      margin-top: 1rem;
      height: 80px;
    }
  }
`

const LandingText = styled.div`
  z-index: 2;
  position: relative;
  top: 35vh;
  width: 100%;
  height: 110vh;
  margin: 0 auto;
  overflow-x: hidden;

  h1 {
    z-index: 2;
    font-family: "balgin-medium";
    font-size: 7.29vw;
    line-height: 100%;
    color: var(--color-black);
    text-transform: lowercase;
    padding-left: 12vw;
    br {
      display: none;
    }
  }
  p {
    z-index: 2;
    padding-left: 12vw;
    align-self: flex-start;
    width: 65%;
    margin-top: 3rem;
    margin-bottom: 2.5rem;
    color: var(--color-black);
  }

  @media (max-width: 1600px) {
    top: 37.5vh;
    p {
      width: 75%;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 7.8vw;
    }
  }

  @media (max-width: 1025px) {
    top: 30vh;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 30vh;
    h1 {
      font-size: 9vw;
    }
    h4 {
      font-size: 32px;
    }
    p {
      width: 90%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 30vh;
  }
  @media (max-width: ${breakpoints.s}px) {
    overflow: hidden;
    top: 27.5vh;
    h1 {
      padding-left: 10vw;
      font-size: 45px;
      line-height: 48px;
    }
    p {
      padding-left: 10vw;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  @media (max-width: 400px) {
    h1 {
      br {
        display: block;
      }
    }
  }

  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 36px;
      line-height: 100%;
    }
  }
`

const Span = styled(motion.span)`
  margin-right: 2.5rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  @media (max-width: ${breakpoints.xl}px) {
    margin-right: 2rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-right: 1.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
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

const KeepScrolling = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 3.5rem;

  p {
    font-family: "calibre-semibold";
    text-transform: uppercase;
    font-size: 18px;
    margin-bottom: 0.5rem;
  }
`

const Logos = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 5rem;
  position: relative;
  z-index: 80;
  background-color: var(--color-white);
  h4 {
    padding-top: 3rem;
    padding-bottom: 2rem;
    font-size: 30px;
    font-family: "calibre-semibold";
    color: black;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-bottom: 0;
    h4 {
      padding-bottom: 1rem;
      font-size: 26px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    h4 {
      font-size: 16px;
      line-height: 19px;
    }
  }
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
  @media (max-width: ${breakpoints.xl}px) {
    p {
      width: 55%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    p {
      width: 60%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    p {
      width: 70%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    p {
      padding-top: 4rem;
      width: 85%;
    }
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
    font-size: 6.5625vw;
    line-height: 100%;
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

  @media (max-width: 1600px) {
    h4 {
      left: 15%;
      top: 5%;
    }

    h1:first-of-type {
      left: 15%;
      top: 10%;
    }
    h1:last-of-type {
      right: 15%;
      top: 55%;
      svg {
        transform: translate3d(-15px, 10px, 0);
      }
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h1:last-of-type {
      svg {
        scale: 0.8;
        transform: scale(0.8);
      }
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h4 {
      left: 15%;
      top: 2%;
    }
    h1 {
      font-size: 74px;
    }

    h1:first-of-type {
      left: 15%;
      top: 5%;
    }
    h1:last-of-type {
      right: 15%;
      top: 60%;
      svg {
        scale: 0.6;
        transform: translate3d(-15px, 10px, 0) scale(0.6);
      }
    }
    p {
      position: relative;
      z-index: 10;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h1 {
      font-size: 55px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    p {
      width: 72%;
    }
    h1 {
      font-size: 45px;
    }
    h4 {
      left: 10%;
      top: -6%;
    }
    h1:first-of-type {
      left: 10%;
      top: -3%;
    }
    h1:last-of-type {
      right: 5%;
      top: 45%;
      svg {
        scale: 0.5;
        transform: translate3d(15px, 5px, 0) scale(0.5);
      }
    }
  }
`

const ImageWrapper = styled.div`
  filter: drop-shadow(20px 1px 0px var(--color-purple));
  border-radius: 100%;
  border: 2px solid var(--color-black);
  width: 615px;
  height: auto;
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 3;

  @media (max-width: ${breakpoints.xl}px) {
    width: 500px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 375px;
    filter: drop-shadow(15px 1px 0px var(--color-purple));
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 275px;
    filter: drop-shadow(10px 1px 0px var(--color-purple));
  }
  @media (max-width: ${breakpoints.xs}px) {
    width: 225px;
  }
`

const CirclesWrapper = styled(motion.div)`
  z-index: 2;
  position: absolute;
  top: -65%;
  right: 20%;

  @media (max-width: ${breakpoints.xxl}px) {
    right: 5%;
    top: -85%;
  }

  @media (max-width: ${breakpoints.xl}px) {
    top: -90%;
    right: 10%;
    width: 80%;
    svg {
      width: 100%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    top: -100%;
  }

  @media (max-width: ${breakpoints.s}px) {
    right: 0%;
    top: -80%;
    width: 100%;
    height: 100%;
    svg {
      width: 95vw;
      height: auto;
    }
  }
`
const PinkShapesWrapper = styled(motion.div)`
  z-index: 2;
  position: absolute;
  z-index: 5;
  top: -45%;
  left: 13%;
  aspect-ratio: 1/1;
  @media (max-width: 1700px) {
    margin: 0 auto;
    top: -30%;
    width: 80%;
    svg {
      width: 80%;
    }
  }

  @media (max-width: ${breakpoints.xxl}px) {
    top: -35%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: -50%;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: -50%;
    left: 5%;
    width: 95%;
    svg {
      width: 95%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: -30%;
  }
  @media (max-width: ${breakpoints.s}px) {
    top: -45%;
    left: 0;
    svg {
      scale: 1;
      width: 95vw;
    }
  }
`

const BlueSquigglyWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  top: 21%;
  right: 20%;

  @media (max-width: ${breakpoints.xl}px) {
  }

  @media (max-width: ${breakpoints.s}px) {
    right: 0%;
    top: 10%;
    svg {
      width: 95vw;
      height: auto;
    }
  }
`

const WonderWorkersWrapper = styled.section`
  background-color: var(--color-lightpink);
  width: 100%;
  position: relative;
  padding: 5rem 0;
`

const Newsletter = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: ${breakpoints.xl}px) {
    background-color: var(--color-lightblue);
    margin-top: 25rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 20rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 15rem;
    padding-bottom: 8rem;
  }
`

const BlueBackgroundMobileTablet = styled.div`
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
      width: calc(100% + 1px);
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: -1px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    top: 1px;
  }
`

const BlueBackground = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -15%;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  svg {
    overflow-x: hidden;
    width: 100%;
  }

  @media (max-width: 1600px) {
    top: -35%;
    left: -15%;
    height: auto;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    top: -35%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`
