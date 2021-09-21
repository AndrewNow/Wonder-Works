import React, { useRef, useCallback, useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import Typewriter from "typewriter-effect"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as Svg from "../svg/homepage"
import { GreenStars, PurpleStar } from "../svg/miscellaneous"
import CountUp from "react-countup"
import CareerFlip from "../components/CareerFlip/CareerFlip"
import MailchimpComponent from "../components/Mailchimp/component"
import { HomePageAsSeenOn } from "../components/asSeenOn"
import { ContactUsHomePage } from "../components/contactUs"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import LatestProjectsCarousel from "../components/EmblaCarousel/latestProjectsCarousel"
import breakpoints from "../components/breakpoints"

const HomeIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Home`

  // ---------- intersection observer logic, Refs ----------

  const ref = useRef()
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.95,
    triggerOnce: true,
  })
  const [logosRef, logosInView] = useInView({
    root: null,
    threshold: 1,
    triggerOnce: true,
  })
  const [countUpRef, countUpInView] = useInView({
    root: null,
    threshold: 0.25,
    triggerOnce: true,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      sectionRef(node)
      logosRef(node)
      countUpRef(node)
    },
    [sectionRef, logosRef, countUpRef]
  )

  // ---------- determine if a blue background section is in view ----------
  // ---------- if in view, update navigation menu text color to white ----------
  const blueSectionRef = useRef()
  const blueSectionRef2 = useRef()
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleLightTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "light" })
  }, [dispatch])

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    const onScroll = () => {
      const blueBackgroundDiv = blueSectionRef.current.getBoundingClientRect()
      const blueBackgroundDiv2 = blueSectionRef2.current.getBoundingClientRect()
      if (
        (blueBackgroundDiv.y <= 150 && blueBackgroundDiv.bottom >= 150) ||
        (blueBackgroundDiv2.y <= 90 && blueBackgroundDiv2.bottom >= 150)
      ) {
        toggleLightTheme()
      } else {
        toggleBlueTheme()
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [toggleLightTheme, toggleBlueTheme])

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
  const circleAnimation2 = {
    inView: {
      transition: {
        duration: 0.5,
        delay: 1.15,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
    },
  }
  const circleAnimation3 = {
    inView: {
      transition: {
        duration: 0.5,
        delay: 1.3,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
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
        }}>
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
          <DiscoverMore to="/about">DISCOVER MORE</DiscoverMore>
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
          <DiscoverMore to="/about">DISCOVER MORE</DiscoverMore>
        </motion.div>
      </LandingTextMobile>
      {/* end mobile text animation layout */}
      <ImaginationSection ref={sectionRef}>
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
              alt="Playful text which reads 'Wonder Works Studio"
              placeholder="none"
              quality={100}
            />
          </ImageWrapper>
          <Svg.TopLeftPillar />
          <PillarHover
            variants={pillarVariants}
            initial="hidden"
            animate={hover.topLeftHover ? "visible" : "hidden"}
            exit="hidden"
          >
            <PillarHoverInner>
              <p>
                Discover what’s in the works at Wonder Works Studio. We’re
                always dreaming up new adventures in exciting roleplay games for
                immersive, imaginative fun for everyone. Check out our ambitious
                new projects or our latest launches—they all live here.
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
          <Svg.TopRightPillar />
        </TopRight>
        <BottomLeft>
          <TypewriterWrapper>
            <Typewriter
              options={{
                loop: true,
                autoStart: false,
              }}
              onInit={typewriter => {
                typewriter
                  .typeString("Wonder at work.")
                  .pauseFor(2500)
                  .deleteAll()
                  .start()
              }}
            />
          </TypewriterWrapper>
          <Svg.BottomLeftPillar />
        </BottomLeft>
        <BottomRight
          ref={blueSectionRef2}
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
          <Svg.BottomRightPillar />
        </BottomRight>
      </Pillars>
      <Press>
        <h4>As Seen On...</h4>
        <HomePageAsSeenOn />
      </Press>
      <LatestProjects ref={blueSectionRef}>
        <LatestProjectsCarousel />
      </LatestProjects>
      <InvestmentCenter>
        <InvestmentWrapper ref={countUpRef}>
          <Brief
            variants={fadeIn}
            initial="hidden"
            animate={countUpInView ? "visible" : "hidden"}
            exit="hidden"
          >
            <Headline>
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
            <motion.h2 variants={word}>Let’s talk numbers</motion.h2>
            <motion.h4 variants={word}>
              INSIDER INFO FOR OUR INVESTORS
            </motion.h4>
            <motion.p variants={word}>
              See where we’re headed and how we’re growing from <br />
              navigating platform trends to uncovering user desires.
            </motion.p>
            <motion.div variants={word} whileTap={{ scale: 0.9 }}>
              <DiscoverMore to="/investors">LEARN MORE</DiscoverMore>
            </motion.div>
          </Brief>
          <Stats>
            <Columns>
              <Column>
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
                        end={37}
                        duration={1}
                        delay={1.15}
                        suffix="M"
                      />
                    </h6>
                  )}
                  <p>DAU</p>
                </Circle>
              </Column>
              <Column>
                <motion.h5
                  variants={circleAnimation2}
                  animate={countUpInView ? "inView" : "notInView"}
                >
                  Overlook Bay
                </motion.h5>
                <Circle
                  variants={circleAnimation2}
                  animate={countUpInView ? "inView" : "notInView"}
                >
                  {countUpInView && (
                    <h6>
                      <CountUp
                        start={0}
                        end={1.5}
                        delay={1.25}
                        decimals={1}
                        duration={1}
                        suffix="M"
                      />
                    </h6>
                  )}
                  <p>DAU</p>
                </Circle>
                <Desc>
                  <h5>Overlook Bay</h5>
                  <p>4% of Roblox DAU</p>
                  <p>
                    2.2M+ Total Playing hrs/mo <br />
                    MAU 2.74M <br />
                    DAU/MAU Ratio 7.79%
                  </p>
                </Desc>
              </Column>
              <Column>
                <motion.h5
                  variants={circleAnimation3}
                  animate={countUpInView ? "inView" : "notInView"}
                >
                  Timmeh
                </motion.h5>
                <Circle
                  variants={circleAnimation3}
                  animate={countUpInView ? "inView" : "notInView"}
                >
                  <h6>0.0M</h6>
                  <p>DAU</p>
                </Circle>
                <Desc>
                  <h5>Timmeh</h5>
                  <p>0.0% of Roblox DAU</p>
                  <p>
                    0.0M+ Total Playing hrs/mo <br />
                    MAU 0.0M <br />
                    DAU/MAU Ratio 0.00%
                  </p>
                </Desc>
              </Column>
            </Columns>
          </Stats>
        </InvestmentWrapper>
      </InvestmentCenter>
      <CareerFlip />
      <Newsletter>
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
          smallStarSvg={<GreenStars />}
          bigStarSvg={<PurpleStar />}
        />
        <OrangeBackground>
          <Svg.BigOrangeBackground />
        </OrangeBackground>
      </Newsletter>
      <ContactUsWrapper>
        <PinkStarFillWrapper
          animate={{
            rotate: 360,
            transition: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Svg.PinkStarFill />
        </PinkStarFillWrapper>
        <PinkStarStrokeWrapper
          animate={{
            rotate: -360,
            transition: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Svg.PinkStarStroke />
        </PinkStarStrokeWrapper>
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

  overflow-x: hidden;
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
    top: 44%;
    right: 42%;
    svg {
      width: 50px;
      height: 50px;
      transform-origin: center;
    }
  }
`
const PortalWrapper = styled.div`
  position: absolute;
  top: 35%;
  right: 0%;
  overflow-x: hidden;

  @media (max-width: 1700px) {
    right: -5%;
    svg {
      width: 550px;
      height: auto;
      
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    right: -10%;
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
    top: 45%;
    right: -25%;
    svg {
      width: 290px;
    }
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
    margin-right: .75rem;
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
  line-height: 35px;

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  @media (max-width: ${breakpoints.m}px) {
    font-size: 16px;
    line-height: 17px;
  }
`

const ImaginationSection = styled.section`
  height: 100%;
  padding-top: 28rem;
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
    padding-top: 20rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-top: 12.5rem;
    h2 {
      font-size: 45px;
      line-height: 45px;
    }
    p {
      width: 85%;
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
  width: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* overflow: hidden; */

  @media (max-width: ${breakpoints.xl}px) {
    top: 15%;
  }
`

const CircleWrapper = styled(motion.div)`
  position: absolute;
  top: 32%;
  right: 15.5%;

  @media (max-width: 1600px) {
    svg {
      width: 330px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    right: 10%;
    svg {
      width: 300px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    right: 5%;
    top: 18%;
    svg {
      width: 250px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: 2%;
    top: 20%;
    svg {
      width: 160px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    right: 5%;
    top: 15%;
    svg {
      scale: 1;
      width: 160px;
      height: auto;
    }
  }
`

const CircleStrokeWrapper = styled(motion.div)`
  position: absolute;
  top: 75%;
  left: 12.5%;

  @media (max-width: ${breakpoints.s}px) {
    left: -15%;
    top: 90%;
    svg {
      width: 200px;
      height: 200px;
    }
  }
`

const BlueTrianglesWrapper = styled(motion.div)`
  position: absolute;
  bottom: 1%;
  left: 0;
  margin: 0 auto;
  width: 90vw;
  overflow: hidden;
  @media (max-width: 1700px) {
    left: 5%;
    top: 40%;
  }
  @media (max-width: ${breakpoints.l}px) {
    scale: .7;
    top: 10%;
  }
  @media (max-width: ${breakpoints.m}px) {
    left: -5%;
    top: 20%;
  }

  @media (max-width: ${breakpoints.s}px) {
    scale: 0.5;
    top: -5%;
    left: -10%;
  }
`

const BlueTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 60%;
  left: 20%;
  @media (max-width: ${breakpoints.xxl}px) {
    left: 10%;
    top: auto;
    bottom: 5%;
  }

  @media (max-width: ${breakpoints.l}px) {
    scale: .7;
    bottom: 10%;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const PurpleTriangleWrapper = styled(motion.div)`
  position: absolute;
  bottom: -7%;
  right: 22%;

  @media (max-width: ${breakpoints.xl}px) {
    bottom: 5%;
    right: 5%;
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: 5%;
    right: 15%;
    scale: 0.5;
  }
  @media (max-width: ${breakpoints.s}px) {
    bottom: -10%;
    right: 10%;
    scale: 0.3;
  }
`

const GreenTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 30%;
  right: 25%;

  @media (max-width: ${breakpoints.l}px) {
    scale: .8;
    top: 15%;
  }

  @media (max-width: ${breakpoints.s}px) {
    right: -2.5%;
    top: 66%;
    scale: 0.5;
  }
`

const OrangeTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 34%;
  left: 25%;

  @media (max-width: ${breakpoints.l}px) {
    scale: 0.5;
    top: 10%;
  }

  @media (max-width: ${breakpoints.s}px) {
    left: -3%;
    top: 85%;
    scale: 0.5;
  }
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
`

const TypewriterWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  span {
    color: var(--color-purple);
    font-family: "balgin-bold";
    font-size: 76px;
  }

  @media (max-width: ${breakpoints.l}px) {
    span {
      font-size: 3.9vw;
    }
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
  }
  @media (max-width: ${breakpoints.s}px) {
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
`

const InvestmentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* margin: 0 auto; */
  margin-top: 10rem;

  @media (max-width: 1655px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.xl}px) {
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

  @media (max-width: ${breakpoints.xl}px) {
    width: 70%;
  }
  @media (max-width: ${breakpoints.s}px) {
    h2,
    p {
      white-space: normal;
    }

    h2 {
      font-size: 40px;
      line-height: 45px;
    }

    br {
      display: none;
    }
  }
`

const Headline = styled.div`
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
  @media (max-width: ${breakpoints.s}px) {
    flex-basis: 100%;
  }
`

const Columns = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;

  div:nth-child(1) {
    h5 {
      font-family: "calibre-semibold";
    }
  }
  div:nth-child(2) {
    div {
      background-color: var(--color-green);
    }
  }

  div:nth-child(3) {
    div {
      background-color: var(--color-lightpink);
    }
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

  @media (max-width: ${breakpoints.s}px) {
    flex-basis: 100%;
    width: 100%;
    padding: 0rem;
    flex-direction: row;
    justify-content: space-between;
    p {
      white-space: normal;
    }
    h5 {
      margin: 0 auto;
    }

    :nth-child(2) h5 {
      order: 3;
      display: none;
    }
    :nth-child(3) h5 {
      order: 3;
      display: none;
    }
    :nth-child(3) {
      flex-direction: row-reverse;
    }
  }
`

const Circle = styled(motion.div)`
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
      line-height: 60px;
      font-size: 60px;
      font-family: "calibre-medium";
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    height: 150px;
  }
`

const Desc = styled.p`
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  p {
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    :nth-child(2) {
      border-bottom: 1px solid black;
    }
  }

  h5 {
    display: none;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 0 0.5rem;
    h5 {
      margin: 0 auto;
      white-space: nowrap;
      text-align: center;
      order: 0 !important;
      display: block !important;
    }
  }
`

const Newsletter = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const OrangeBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  svg {
    overflow-x: hidden;
    width: 100%;
  }
`

const ContactUsWrapper = styled.div`
  background-color: var(--color-orange);
  position: relative;
`
const PurpleStrokeStarWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: -12.5%;
  left: -3%;

  @media (max-width: ${breakpoints.l}px) {
    display: none;
  }
`
const PinkStarStrokeWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: -15%;
  right: 15%;
  @media (max-width: ${breakpoints.xl}px) {
    right: 20%;
    top: 5%;
    svg {
      width: 250px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    right: 20%;
    top: 15%;
    svg {
      width: 200px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: 10%;
    top: 25%;
    svg {
      width: 150px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    right: 10%;
    top: 27%;
    svg {
      width: 130px;
      height: auto;
    }
  }
`
const PinkStarFillWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 5%;
  right: 25%;

  @media (max-width: ${breakpoints.xl}px) {
    right: 30%;
    top: 17%;
    svg {
      width: 200px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 25%;
    svg {
      width: 150px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 35%;
    right: 20%;
    svg {
      width: 100px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 35%;
    right: 25%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 33%;
    svg {
      width: 80px;
      height: auto;
    }
  }
`
