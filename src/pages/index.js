import React, { useRef, useCallback, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as Svg from "../svg/homepage"
import { Arrow } from "../svg/miscellaneous"
import { GreenStars, ColoredGears } from "../svg/miscellaneous"
import CountUp from "react-countup"
import CareerFlip from "../components/CareerFlip/CareerFlip"
import MailchimpComponent from "../components/Mailchimp/component"
import { AsSeenOnLogosHome } from "../components/AsSeenOn/AsSeenOnLogos"
import { ContactUsHomePage } from "../components/contactUs"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import LatestProjectsCarousel from "../components/EmblaCarousel/latestProjectsCarousel"
import breakpoints from "../components/breakpoints"
import OurPillarsHomepage from "../components/SideScroll/ourPillarsHomepage"

const HomeIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Home`

  // ---------- intersection observer logic, Refs ----------
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: true,
  })
  const [countUpRef, countUpInView] = useInView({
    root: null,
    threshold: 0.25,
    triggerOnce: true,
  })

  const [countUpRef2, countUpInView2] = useInView({
    root: null,
    threshold: 0.2,
    triggerOnce: true,
  })
  const [countUpRef3, countUpInView3] = useInView({
    root: null,
    threshold: 0.2,
    triggerOnce: true,
  })

  // ---------- determine if a blue background section is in view ----------
  // ---------- if in view, update navigation menu text color to white ----------
  const blueSectionRef = useRef()
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleLightTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "light" })
  }, [dispatch])

  useEffect(() => {
    const onScroll = () => {
      const blueBackgroundDiv = blueSectionRef.current.getBoundingClientRect()
      if (blueBackgroundDiv.y <= 150 && blueBackgroundDiv.bottom >= 150) {
        toggleLightTheme()
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [toggleLightTheme])

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme])

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
  const wordMobile = {
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
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
    hidden: {
      y: 70,
      opacity: 0,
    },
  }
  const investorFadeIn = {
    visible: {
      transition: {
        delay: 0.3,
        // type: "spring",
        // stiffness: 100,
        // damping: 13,
        staggerChildren: 0.15,
      },
    },
    hidden: {},
  }
  const investorWords = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      y: 70,
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

  const button = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1.4,
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

  const circleAnimation = {
    inView: {
      transition: {
        duration: 0.5,
        delay: 1,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
    },
  }

  const circleText = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: -60,
    },
  }

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })
  const homeBackground = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * 750
  )

  let throttle = require("lodash/throttle")
  const smallParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -350, 100)
  )

  const mediumParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -700, 100)
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
        <StaircaseWrapper>
          <Svg.Staircase />
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
          <Svg.Cog />
        </CogWrapper>
        <PortalWrapper>
          <Svg.Portal />
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
        <motion.h4 variants={subtitle} initial="hidden" animate="visible">
          The latest in Roblox gaming lives here.
        </motion.h4>
        <motion.div
          variants={button}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.9 }}
        >
          <DiscoverMore to="/about">
            DISCOVER MORE <Arrow />
          </DiscoverMore>
        </motion.div>
      </LandingText>

      {/* start mobile text animation layout */}
      <LandingTextMobile>
        <h1>
          <First variants={line} initial="hidden" animate="visible">
            <Span variants={wordMobile}>dreaming</Span>
            <Span variants={wordMobile}>up</Span>
          </First>
          <Second variants={line} initial="hidden" animate="visible">
            <Span variants={wordMobile}>wonderful</Span>
          </Second>
          <Third variants={line} initial="hidden" animate="visible">
            <Span variants={wordMobile}>works</Span>
            <Span variants={wordMobile}>in</Span>
            <Span variants={wordMobile}>the</Span>
          </Third>
          <Fourth variants={line} initial="hidden" animate="visible">
            <Span variants={wordMobile}>metaverse</Span>
          </Fourth>
        </h1>
        <motion.h4 variants={subtitle} initial="hidden" animate="visible">
          The latest in Roblox gaming lives here.
        </motion.h4>
        <motion.div
          variants={button}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.9 }}
        >
          <DiscoverMore to="/about">
            DISCOVER MORE <Arrow />
          </DiscoverMore>
        </motion.div>
      </LandingTextMobile>
      {/* end mobile text animation layout */}
      <ImaginationSection ref={sectionRef}>
        <ImaginationText>
          <h2>
            <FirstLine
              variants={line2}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <WordSpan variants={word2}>Where </WordSpan>
              <WordSpan variants={word2}>Imagination</WordSpan>
            </FirstLine>
            <SecondLine
              variants={line2}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <WordSpan variants={word2}>Comes</WordSpan>
              <WordSpan variants={word2}>to</WordSpan>
              <WordSpan variants={word2}>Play.</WordSpan>
            </SecondLine>
            <ThirdLineTabletMobile
              variants={line2}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <WordSpan variants={word2}>to</WordSpan>
              <WordSpan variants={word2}>Play.</WordSpan>
            </ThirdLineTabletMobile>
          </h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            At Wonder Works Studio we are ushering in the new era of immersive
            gaming, where players can express, explore, and expand their
            creativity. We build video games that spark imagination, encourage
            collaboration, and push innovation so gamers grow alongside the
            stories they create.
          </motion.p>
        </ImaginationText>
        {/* ==============  */}
        <ImaginationBG>
          <CircleWrapper>
            <Svg.Circle />
          </CircleWrapper>
          <CircleStrokeWrapper style={{ y: smallParallax }}>
            <Svg.CircleStroke />
          </CircleStrokeWrapper>
          <BlueTrianglesWrapper>
            <Svg.BlueTriangles />
          </BlueTrianglesWrapper>
          <PurpleTriangleWrapper style={{ y: mediumParallax }}>
            <Svg.PurpleTriangle />
          </PurpleTriangleWrapper>
          <OrangeTriangleWrapper style={{ y: smallParallax }}>
            <Svg.OrangeTriangle />
          </OrangeTriangleWrapper>
          <GreenTriangleWrapper style={{ y: smallParallax }}>
            <Svg.GreenTriangle />
          </GreenTriangleWrapper>
          <BlueTriangleWrapper style={{ y: mediumParallax }}>
            <Svg.BlueTriangle />
          </BlueTriangleWrapper>
        </ImaginationBG>
      </ImaginationSection>
      {/* ==============  */}
      <OurPillarsHomepage />
      <Press>
        <h4>As Seen On...</h4>
        <AsSeenOnLogosHome />
      </Press>
      <LatestProjects ref={blueSectionRef}>
        <LatestProjectsCarousel />
      </LatestProjects>
      <InvestmentCenter>
        <InvestmentWrapper ref={countUpRef}>
          <Brief
            variants={investorFadeIn}
            initial="hidden"
            animate={countUpInView ? "visible" : "hidden"}
            exit="hidden"
          >
            <Headline variants={investorWords}>
              <h4>Investment Center</h4>
              <svg
                width="160"
                height="3"
                viewBox="0 0 160 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.84424H159.385"
                  stroke="#1A1748"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
            </Headline>
            <motion.h2 variants={investorWords}>Let’s talk numbers</motion.h2>
            <motion.h4 variants={investorWords}>
              INSIDER INFO FOR OUR INVESTORS
            </motion.h4>
            <motion.p variants={investorWords}>
              See where we’re headed and how we’re growing from <br />
              navigating platform trends to uncovering user desires.
            </motion.p>
            <motion.div variants={investorWords} whileTap={{ scale: 0.9 }}>
              <DiscoverMore to="/investors">
                LEARN MORE <Arrow />
              </DiscoverMore>
            </motion.div>
          </Brief>
          <Stats>
            <Columns>
              <Column ref={countUpRef}>
                <motion.h5
                  variants={circleAnimation}
                  animate={countUpInView ? "inView" : "notInView"}
                >
                  Roblox
                </motion.h5>
                <Circle
                  variants={circleAnimation}
                  animate={countUpInView ? "inView" : "notInView"}
                >
                  {countUpInView && (
                    <h6>
                      <CountUp
                        start={0}
                        end={150}
                        duration={1}
                        delay={0.75}
                        suffix="M"
                      />
                    </h6>
                  )}
                  <p>MAU</p>
                </Circle>
              </Column>
              <Column ref={countUpRef2}>
                <motion.h5
                  variants={circleAnimation}
                  animate={countUpInView2 ? "inView" : "notInView"}
                >
                  Overlook Bay
                </motion.h5>
                <Circle
                  variants={circleAnimation}
                  animate={countUpInView2 ? "inView" : "notInView"}
                >
                  {countUpInView2 && (
                    <h6>
                      <CountUp
                        start={0}
                        end={5}
                        delay={0.75}
                        decimals={1}
                        duration={1}
                        suffix="M"
                      />
                    </h6>
                  )}
                  <p>MAU</p>
                </Circle>
                <Desc
                  variants={circleText}
                  animate={countUpInView2 ? "visible" : "hidden"}
                >
                  <motion.p
                    variants={circleText}
                    animate={countUpInView2 ? "visible" : "hidden"}
                  >
                    4% of Roblox MAU
                    <br />
                    26M Unique Users
                  </motion.p>
                </Desc>
              </Column>
              <Column ref={countUpRef3}>
                <motion.h5
                  variants={circleAnimation}
                  animate={countUpInView3 ? "inView" : "notInView"}
                >
                  Timmeh
                </motion.h5>
                <Circle
                  variants={circleAnimation}
                  animate={countUpInView3 ? "inView" : "notInView"}
                >
                  {countUpInView3 && (
                    <h6>
                      <CountUp
                        start={0}
                        end={2}
                        delay={0.75}
                        decimals={1}
                        duration={1}
                        suffix="M"
                      />
                    </h6>
                  )}
                  <p>MAU</p>
                </Circle>
                <Desc
                  variants={circleText}
                  animate={countUpInView3 ? "visible" : "hidden"}
                >
                  <motion.p
                    variants={circleText}
                    animate={countUpInView3 ? "visible" : "hidden"}
                  >
                    2% of Roblox MAU <br />
                    1M Unique Users
                  </motion.p>
                </Desc>
              </Column>
            </Columns>
          </Stats>
        </InvestmentWrapper>
      </InvestmentCenter>
      <CareerFlip />
      <Newsletter>
        <OrangeBackgroundMobileTablet>
          <Svg.BigOrangeBackgroundMobileTablet />
        </OrangeBackgroundMobileTablet>
        <MailchimpComponent smallStarSvg={<GreenStars />} />
        <OrangeBackground>
          <Svg.BigOrangeBackground />
        </OrangeBackground>
      </Newsletter>
      <ContactUsWrapper>
        <SVGWrapper>
          <ColoredGears gearColor={"#eb2c90"} />
        </SVGWrapper>
        <ContactUsHomePage />
      </ContactUsWrapper>
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
  height: 120vh;
  max-width: 100%;
  margin: 0 auto;
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;

  @media (max-width: 1700px) {
    overflow-x: hidden;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    height: 135vh;
  }
  @media (max-width: ${breakpoints.xl}px) {
    height: 110vh;
  }
`
const StaircaseWrapper = styled.div`
  position: absolute;
  top: 23%;
  left: 8%;

  @media (max-width: ${breakpoints.xl}px) {
    left: 5%;
    top: 15%;
    svg {
      width: 450px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    svg {
      width: 400px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
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
  top: 45%;
  right: 40%;
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
    top: 45%;
    svg {
      width: 85px;
      height: 85px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 41vh;
    right: 42%;
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
    font-size: 7.3vw;
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
  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 16rem;
    h1 {
      font-size: 7.8vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h1 {
      font-size: 9vw;
    }
    h4 {
      font-size: 32px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const LandingTextMobile = styled.div`
  display: none;

  @media (max-width: ${breakpoints.m}px) {
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
      font-size: 12vw;
      line-height: 100%;
      color: var(--color-black);
    }

    h4 {
      z-index: 2;
      margin-top: 4.5rem;
      font-size: 22px;
      line-height: 110%;
      margin-bottom: 4rem;
      text-transform: uppercase;
      color: var(--color-black);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1 {
      font-size: 12vw;
    }
    h4 {
      font-size: inherit;
      width: 90%;
      font-size: 16px;
      line-height: 120%;
      text-align: center;
      white-space: nowrap;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding-top: 10.5rem;
    h4 {
      margin-top: 2.5rem;
      width: 85%;
      white-space: normal;
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
  padding-bottom: 0.25rem;
`
const Third = styled(motion.div)`
  overflow: hidden;
  padding-bottom: 0.25rem;
`
const Fourth = styled(motion.div)`
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
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-left: 0.75rem !important;
    transition: var(--hover-transition);
  }
  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
    svg {
      fill: var(--color-white);
      transform: translateX(0.25rem);
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    font-size: 25px;
    padding: 0.5rem 2.5rem;
    svg {
      margin-left: 0.45rem;
      /* scale: 0.8; */
      transform: scale(0.8);
    }
    :hover {
      svg {
        transform: translateX(0.25rem) scale(0.8);
      }
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    font-size: 20px;
    line-height: 17px;
    width: auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    font-size: 18px;
    padding: 0.5rem 1.75rem;
    border: 1px solid var(--color-black);
    svg {
      /* scale: 0.75; */
      transform: scale(0.75);
    }
    :hover {
      svg {
        transform: translateX(0.25rem) scale(0.75);
      }
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 0.5rem 1rem;
    font-size: 16px;
    padding: 0.35rem 1.25rem;
    svg {
      /* scale: 0.85; */
      transform: scale(0.85);
    }
    :hover {
      svg {
        transform: translateX(0.25rem) scale(0.85);
      }
    }
  }
`

const ImaginationSection = styled.section`
  height: 100vh;
  margin-top: 15rem;
  margin-bottom: 5rem;
  text-align: center;
  position: relative;
  h2,
  p {
    z-index: 2;
    position: relative;
  }
  h2 {
    line-height: 100%;
  }
  p {
    padding-top: 5rem;
    margin: 0 auto;
    width: 45%;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 10rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-top: 7rem;
  }
`

const ImaginationText = styled.div`
  text-align: center;
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  h2,
  p {
    z-index: 2;
    position: relative;
  }
  h2 {
    line-height: 110%;
    font-size: 6.5625vw;
    font-family: "ppwoodland-light";
  }
  p {
    padding-top: 3rem;
    margin: 0 auto;
    width: 45%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      line-height: 110%;
      font-size: 8vw;
      margin: 0 auto;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 110px;
      line-height: 90px;
      width: 90%;
    }
    p {
      width: 57%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2 {
      font-size: 75px;
      line-height: 80px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      font-size: 55px;
      line-height: 60px;
    }
    p {
      width: 75%;
      padding-top: 2.5rem;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h2 {
      font-size: 35px;
      line-height: 45px;
    }
    p {
      width: 85%;
      padding-top: 2.5rem;
    }
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

  @media (max-width: ${breakpoints.l}px) {
    span:nth-child(2) {
      display: none;
    }
    span:nth-child(3) {
      display: none;
    }
  }
`

const ThirdLineTabletMobile = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    position: relative;
    z-index: 2;
    overflow: hidden;
  }
`

const WordSpan = styled(motion.span)`
  margin-right: 1rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
`

const ImaginationBG = styled(motion.div)`
  z-index: 0;
  height: 100%;
  /* width: 99vw; */
  margin: 0 auto;
  position: relative;

  @media (max-width: ${breakpoints.xl}px) {
    top: 15%;
  }
`

const CircleWrapper = styled(motion.div)`
  position: absolute;
  top: 27%;
  right: 5%;

  @media (max-width: 1600px) {
    svg {
      width: 330px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    top: 30%;
    svg {
      width: 300px;
      height: 300px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 10%;
    right: 0%;
  }
  @media (max-width: ${breakpoints.l}px) {
    right: 0%;
    top: 10%;
    svg {
      width: 225px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: 2%;
    top: 5%;
    svg {
      width: 160px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    right: 0%;
    top: 4%;
    svg {
      /* scale: 1; */
      transform: scale(1);
      width: 160px;
      height: auto;
    }
  }
  @media (max-width: 390px) {
    top: -5%;
  }
  @media (max-width: 375px) {
    top: -10%;
  }
`

const CircleStrokeWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0%;
  left: 12.5%;

  @media (max-width: ${breakpoints.l}px) {
    bottom: 25%;
    left: 5%;
    svg {
      width: 325px;
      height: 325px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    left: -15%;
    bottom: 24%;
    svg {
      width: 200px;
      height: 200px;
    }
  }
`

const BlueTrianglesWrapper = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  left: 5%;
  margin: 0 auto;
  width: 90vw;
  overflow: hidden;
  @media (max-width: 1700px) {
    left: 5%;
    bottom: 10%;
    svg {
      width: 100%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    /* scale: 0.7; */
    transform: scale(0.7);
    top: 5%;
    left: -10%;
    svg {
      width: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    left: -5%;
    bottom: 20%;
  }

  @media (max-width: ${breakpoints.s}px) {
    /* scale: 1; */
    transform: scale(1);
    top: 20%;
    left: 5%;
    bottom: auto;
    svg {
      max-width: 90vw;
    }
  }
`

const BlueTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 55%;
  left: 15%;
  @media (max-width: ${breakpoints.xxl}px) {
    left: 10%;
    /* bottom: 7%; */
  }
  @media (max-width: ${breakpoints.l}px) {
    /* scale: 0.7; */
    transform: scale(0.7);
    bottom: 10%;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const PurpleTriangleWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0%;
  right: 22%;

  @media (max-width: ${breakpoints.xl}px) {
    bottom: 5%;
    right: 5%;
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: 15%;
    right: 15%;
    scale: 0.85;
    /* transform: scale(0.85); */
  }
  @media (max-width: ${breakpoints.s}px) {
    display: none;
    /* transform: scale(0.3); */
  }
`

const GreenTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 15%;
  right: 25%;

  @media (max-width: ${breakpoints.xxl}px) {
    right: 20%;
    top: 17%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 5%;
  }
  @media (max-width: ${breakpoints.l}px) {
    scale: 0.8;
    /* transform: scale(0.8); */
    top: 5%;
    right: 25%;
  }

  @media (max-width: ${breakpoints.s}px) {
    right: 2%;
    top: 70%;
    scale: 0.5;
    /* transform: scale(0.5); */
  }
`

const OrangeTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 15%;
  left: 20%;

  @media (max-width: ${breakpoints.l}px) {
    scale: 0.5;
    /* transform: scale(0.5); */
    top: 0%;
  }

  @media (max-width: ${breakpoints.s}px) {
    left: -3%;
    top: 30%;
    scale: 0.45;
    /* transform: scale(0.45); */
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
    background-color: var(--color-white);
    h4 {
      padding-top: 5rem;
      padding-bottom: 2.5rem;
    }
  }
`

const LatestProjects = styled.section`
  background-color: var(--color-black);
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    color: white;
  }
`
const InvestmentCenter = styled.section`
  /* height: 100vh; */
  width: 100%;
  position: relative;
  padding-bottom: 5.5rem;
  background-color: var(--color-white);

  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 0rem;
  }
`

const InvestmentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10rem;

  @media (max-width: 1655px) {
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-top: 5rem;
  }
`

const Brief = styled(motion.div)`
  align-self: flex-start;
  /* flex-basis: 30%; */
  width: 30%;
  margin-left: 10vw;

  h2 {
    padding-bottom: 1rem;
    white-space: nowrap;
  }
  h4 {
    padding-bottom: 2.5rem;
    font-family: "calibre-medium";
    white-space: nowrap;
  }
  p {
    padding-bottom: 4rem;
    white-space: nowrap;
  }
  a {
    max-width: 300px;
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 70%;
  }
  @media (max-width: ${breakpoints.l}px) {
    a {
      max-width: 250px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    a {
      max-width: 200px;
    }
    h4 :nth-child(1) {
      font-size: 16px;
    }
    h4 {
      font-size: 20px;
      padding-bottom: 3rem;
    }
    p {
      width: 85%;
      padding-bottom: 2rem;
    }
    h2,
    p {
      white-space: normal;
    }

    h2 {
      font-size: 45px;
      line-height: 48px;
    }

    br {
      display: none;
    }
  }
`

const Headline = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;

  h4 {
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
  }
`

const Stats = styled.div`
  flex-basis: 55%;
  align-self: center;
  margin-top: 17.5rem;

  @media (max-width: 1655px) {
    margin-top: 7.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    flex-basis: 100%;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 5rem;
  }
`

const Columns = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  div:nth-child(2) {
    span {
      background-color: var(--color-green);
    }
  }
  div:nth-child(3) {
    span {
      background-color: var(--color-lightpink);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    justify-content: space-between;
    width: 85vw;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
    align-items: center;
  }
`

const Column = styled(motion.div)`
  flex-basis: 33%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  h5 {
    text-transform: uppercase;
    font-family: "calibre-medium";
    padding-bottom: 2rem;
  }
  p {
    color: var(--color-purple);
    font-family: "calibre-medium";
    white-space: nowrap;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 0rem;
    padding-bottom: 5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-basis: 100%;
    width: 100%;
    p {
      white-space: normal;
    }
    h5 {
      font-size: 20px;
      margin: 0 auto;
      padding-bottom: 1rem;
    }
  }
`

const Circle = styled(motion.span)`
  border-radius: 50%;
  background-color: var(--color-lightblue);
  aspect-ratio: 1/1;
  height: 255px;
  width: 255px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h6 {
    line-height: 84px;
    font-size: 84px;
    font-family: "calibre-medium";
  }
  p {
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 225px;
    height: 225px;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 200px;
    height: 200px;
    h6 {
      line-height: 50px;
      font-size: 50px;
      font-family: "calibre-medium";
    }
  }
  @media (max-width: 800px) {
    width: 150px;
    height: 150px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    height: 150px;
  }
`

const Desc = styled.div`
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  p:nth-of-type(1) {
    /* 
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid black; */
  }
  @media (max-width: 800px) {
    padding-top: 1.5rem;
    p:nth-of-type(1) {
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 0 auto;
    width: 90%;
    p {
      text-align: center;
      font-size: 16px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    margin: 0 0.5rem;
    p {
      width: 40%;
      margin: 0 auto;
    }
  }
  @media (max-width: 420px) {
    p {
      width: 55%;
    }
  }
`

const Newsletter = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */

  @media (max-width: ${breakpoints.xl}px) {
    background-color: var(--color-orange);
    margin-top: 25rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 20rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 15rem;
  }
`

const OrangeBackground = styled.div`
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
const OrangeBackgroundMobileTablet = styled.div`
  display: none;

  @media (max-width: ${breakpoints.xl}px) {
    display: block;
    position: absolute;
    z-index: 1;
    top: 0%;
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
`

const ContactUsWrapper = styled.div`
  background-color: var(--color-orange);
  position: relative;
`

const SVGWrapper = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  z-index: 1;
  top: -5%;
  right: 15%;
  transform: rotate(90deg);
  svg {
    aspect-ratio: 1/1;
  }
  @media (max-width: 1600px) {
    width: 450px;
    height: 450px;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 410px;
    height: 410px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 400px;
    height: 400px;
    top: 10%;
    right: 10%;
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
