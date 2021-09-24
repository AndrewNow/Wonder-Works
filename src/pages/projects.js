import React, { useCallback, useEffect, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import ProjectsPageCarousel from "../components/EmblaCarousel/projectsPageCarousel"
import { StaticImage } from "gatsby-plugin-image"
import * as Svg from "../svg/projectspage"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import ReactPlayer from "react-player/file"
import { Arrow } from "../svg/miscellaneous"

const Projects = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Projects`

  // ---------- determine if a blue background section is in view ----------
  // ---------- if in view, update navigation menu text color to white ----------
  const blueSectionRef = useRef()
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
      if (blueBackgroundDiv.y <= 150 && blueBackgroundDiv.bottom >= 150) {
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

  // ----------------- intersection observer logic -----------------

  const ref = useRef()
  const [overlookBayRef, overlookBayInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: true,
  })
  const [timmehRef, timmehInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: true,
  })
  const [traitorRef, traitorInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: true,
  })
  const [shopRef, shopInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: false,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      overlookBayRef(node)
      timmehRef(node)
      shopRef(node)
    },
    [overlookBayRef, timmehRef, traitorRef, shopRef]
  )

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })

  let throttle = require("lodash/throttle")
  const smallerParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -150, 100)
  )

  const smallParallax = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -500
  )

  // const smallParallaxSpring = useSpring(smallParallax, {
  //   stiffness: 125,
  //   damping: 50,
  // })

  // const mediumParallax = useTransform(
  //   scrollYProgress,
  //   throttle(scrollYProgress => scrollYProgress * -700, 100)
  // )

  // ----------------- animation variants -----------------

  const parent = {
    visible: {
      transition: {
        duration: 2,
        delay: 0.2,
        delayChildren: 0.2,
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  }

  const title = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
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

  const body = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.75,
        duration: 0.75,
        type: "spring",
        stiffness: 100,
        damping: 11,
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
    },
  }

  return (
    <Layout title={siteTitle}>
      <Seo title="Projects" />
      <CarouselWrapper ref={blueSectionRef}>
        <ProjectsPageCarousel />
      </CarouselWrapper>
      <OverlookBay ref={overlookBayRef}>
        <OverlookBayTitle
          variants={parent}
          initial="hidden"
          animate={overlookBayInView ? "visible" : "hidden"}
        >
          <h1>
            <motion.div variants={title}>
              Overlook <br />
            </motion.div>
            <motion.div variants={title}>Bay</motion.div>
          </h1>
        </OverlookBayTitle>
        <OverlookBayBody
          variants={parent}
          initial="hidden"
          animate={overlookBayInView ? "visible" : "hidden"}
        >
          <motion.p variants={body}>
            Are you ready to jump into Overlook Bay with your friends? Home to
            many land and sea creatures, explore the island with your friends in
            this Massively multiplayer online role-playing game. Collect pets,
            rent out your own cottage, and participate daily activities!
          </motion.p>
          <OverlookRobloxLink
            variants={body}
            href=""
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.9 }}
          >
            Play now on Roblox <Arrow />
          </OverlookRobloxLink>
        </OverlookBayBody>
        <LighthouseImageWrapper>
          <StaticImage
            src="../images/Projects/lighthouse.png"
            alt="Image of one of Overlook Bay's characters"
            placeholder="none"
            quality={100}
          />
        </LighthouseImageWrapper>
        <MothImageWrapper style={{ y: smallParallax }}>
          <StaticImage
            src="../images/Projects/moth.png"
            alt="Image of one of Overlook Bay's characters"
            placeholder="none"
            quality={100}
          />
        </MothImageWrapper>
        <MermaidImageWrapper style={{ y: smallParallax }}>
          <StaticImage
            src="../images/Projects/mermaid.png"
            alt="Image of one of Overlook Bay's characters"
            placeholder="none"
            quality={100}
          />
        </MermaidImageWrapper>
        <TextLogoWrapper>
          <StaticImage
            src="../images/Projects/OverlookBayText.png"
            alt="Overlook Bay's text logo, with playful balloon-style typography."
            placeholder="none"
            quality={100}
          />
        </TextLogoWrapper>
        <SVGWrapper>
          <BigCirclesWrapper>
            <Svg.OverlookBayBigCircles />
          </BigCirclesWrapper>
          <SmallCirclesWrapper style={{ y: smallerParallax }}>
            <Svg.OverlookBaySmallCircles />
          </SmallCirclesWrapper>
        </SVGWrapper>
      </OverlookBay>
      <Timmeh ref={timmehRef}>
        <TimmehTitle
          variants={parent}
          initial="hidden"
          animate={timmehInView ? "visible" : "hidden"}
        >
          <h1>
            <motion.div variants={title}>Timmeh</motion.div>
          </h1>
        </TimmehTitle>
        <TimmehBody
          variants={parent}
          initial="hidden"
          animate={timmehInView ? "visible" : "hidden"}
        >
          <motion.p variants={body}>
            Are you ready to jump into Overlook Bay with your friends? Home to
            many land and sea creatures, explore the island with your friends in
            this Massively multiplayer online role-playing game. Collect pets,
            rent out your own cottage, and participate daily activities!
          </motion.p>
          <TimmehRobloxLink
            variants={body}
            href=""
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.9 }}
          >
            Play now on Roblox <Arrow />
          </TimmehRobloxLink>
        </TimmehBody>
        <TextLogoWrapper>
          <StaticImage
            src="../images/Projects/TimmehText.png"
            alt="Timmeh's text logo, with horror-style typography."
            placeholder="none"
            quality={100}
          />
        </TextLogoWrapper>
        <TimmehTopWrapper
          initial={{ scale: 0 }}
          animate={{
            scale: timmehInView ? 1 : 0,
            transition: {
              delay: 0.5,
              duration: 1,
            },
          }}
        >
          <StaticImage
            src="../images/Projects/timmehTop.png"
            alt="Roblox characters laid on the page"
            placeholder="none"
            quality={100}
          />
        </TimmehTopWrapper>
        <TimmehMiddleWrapper
          initial={{ scale: 0 }}
          animate={{
            scale: timmehInView ? 1 : 0,
            transition: {
              delay: 0.35,
              duration: 1,
            },
          }}
        >
          <StaticImage
            src="../images/Projects/timmehMiddle.png"
            alt="Roblox characters laid on the page"
            placeholder="none"
            quality={100}
          />
        </TimmehMiddleWrapper>
        <TimmehBottomWrapper
          initial={{ scale: 0 }}
          animate={{
            scale: timmehInView ? 1 : 0,
            transition: {
              delay: 0.15,
              duration: 1,
            },
          }}
          style={{ y: smallParallax }}
        >
          <StaticImage
            src="../images/Projects/timmehBottom.png"
            alt="Roblox characters laid on the page"
            placeholder="none"
            quality={100}
          />
        </TimmehBottomWrapper>
        <SVGWrapper>
          <BigGearsWrapper style={{ y: smallerParallax }}>
            <Svg.TimmehBigGears />
          </BigGearsWrapper>
          <SmallGearsWrapper style={{ y: smallParallax }}>
            <Svg.TimmehSmallGears />
          </SmallGearsWrapper>
        </SVGWrapper>
      </Timmeh>
      <Traitor ref={traitorRef}>
        <TraitorTitle
          variants={parent}
          initial="hidden"
          animate={traitorInView ? "visible" : "hidden"}
        >
          <h1>
            <motion.div variants={title}>Traitor</motion.div>
          </h1>
        </TraitorTitle>
        <TraitorBody
          variants={parent}
          initial="hidden"
          animate={traitorInView ? "visible" : "hidden"}
        >
          <motion.p variants={body}>
            Test out your intuition in this game of social deduction. Can you
            figure who the traitor is among your friends?
          </motion.p>
          <TraitorRobloxLink
            variants={body}
            href=""
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.9 }}
          >
            Play now on Roblox <Arrow />
          </TraitorRobloxLink>
        </TraitorBody>
        <SVGWrapper>
          <TriangleWrapper />
          <TraitorStarsWrapper>
            <Svg.TraitorStars />
          </TraitorStarsWrapper>
        </SVGWrapper>
        <TraitorLeftImageWrapper style={{ y: smallerParallax }}>
          <StaticImage
            src="../images/Projects/traitorleft.png"
            alt="Image of a Roblox character with a knife sneaking up on another character, who is preoccupied with an electrical task"
            placeholder="none"
            quality={100}
          />
        </TraitorLeftImageWrapper>
        <TraitorMiddleImageWrapper>
          <StaticImage
            src="../images/Projects/traitormiddle.png"
            alt="Character with a gun pointed at them"
            placeholder="none"
            quality={100}
          />
        </TraitorMiddleImageWrapper>
        <TraitorRightImageWrapper style={{ y: smallParallax }}>
          <StaticImage
            src="../images/Projects/traitorright.png"
            alt="Image of a Roblox character, back facing the viewer, with a gun pointed at another character."
            placeholder="none"
            quality={100}
          />
        </TraitorRightImageWrapper>
        <TextLogoWrapper>
          <StaticImage
            src="../images/Projects/traitorTextLogo.png"
            alt="Traitor logo in a metallic styled font."
            placeholder="none"
            quality={100}
          />
        </TextLogoWrapper>
      </Traitor>

      <ShopSection ref={shopRef}>
        <ShopFlex>
          <ShopText>
            <ShopBubble>
              <h1>SHOP</h1>
              <p>
                It’s never a dull moment at the{" "}
                <a
                  href="https://www.staypeachy.shop/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Peachy Shop
                </a>
                . Be a part of the Stay Peachy community with custom merch from
                Megan and Overlook Bay, more to come!{" "}
              </p>
            </ShopBubble>
            <PinkStarWrapper
              animate={{
                rotate: -360,
                transition: {
                  duration: 90,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <Svg.PinkStar />
            </PinkStarWrapper>
          </ShopText>
          <ShopVideo>
            <VideoWrapper
              href="https://www.staypeachy.shop"
              target="_blank"
              rel="noreferrer"
            >
              <ReactPlayer
                url="https://ww-peachy.s3.us-west-1.amazonaws.com/StayPeachy+-+Final.mov"
                playing={shopInView}
                loop={true}
                muted={true}
                width="100%"
                height="100%"
              />
            </VideoWrapper>
            <OrangeStarWrapper
              animate={{
                rotate: 360,
                transition: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <Svg.OrangeStar />
            </OrangeStarWrapper>
          </ShopVideo>
        </ShopFlex>
        <StayPeachyLink>
          <Svg.LinkStar />
          <UnderlinedLink
            href="https://www.staypeachy.shop/"
            target="_blank"
            rel="noreferrer"
          >
            www.staypeachy.shop
          </UnderlinedLink>
        </StayPeachyLink>
      </ShopSection>
      <CollabSection>
        <Collabs>
          <h2>Collabs</h2>
          <Tiles>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              ></Image>
              <p>KREEKCRAFT</p>
            </Tile>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              ></Image>
              <p>TBA</p>
            </Tile>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              ></Image>
              <p>TBA</p>
            </Tile>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              ></Image>
              <p>TBA</p>
            </Tile>
          </Tiles>
        </Collabs>
        <Collabs>
          <h2>Partnerships</h2>
          <Tiles>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              >
                <StaticImage
                  src="../images/Projects/logo-juniper.png"
                  alt="Juniper Play's logo"
                  placeholder="tracedSVG"
                  quality={80}
                />
              </Image>
              <p>Juniper Play</p>
            </Tile>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              >
                <StaticImage
                  src="../images/Projects/logo-phatmojo.png"
                  alt="Phat Mojo's logo."
                  placeholder="tracedSVG"
                  quality={80}
                />
              </Image>
              <p>Phat Mojo</p>
            </Tile>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              ></Image>
              <p>TBA</p>
            </Tile>
            <Tile>
              <Image
                initial={{
                  boxShadow: "6px 6px 0px #1a1748",
                }}
                whileHover={{
                  boxShadow: "16px 16px 0px #1a1748",
                  y: -10,
                  x: -10,
                }}
              ></Image>
              <p>TBA</p>
            </Tile>
          </Tiles>
        </Collabs>
      </CollabSection>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const CarouselWrapper = styled.section`
  background-color: var(--color-black);
`

const OverlookBay = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-darkblue);
  padding-bottom: 10rem;
  height: 110vh;
`

const OverlookBayTitle = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
  padding: 5rem;
  position: relative;
  z-index: 2;
  h1 {
    font-family: "calibre-semibold";
    font-size: 10.93vw;
    line-height: 8.85vw;
    text-transform: uppercase;
    text-align: right;
    color: var(--color-white);
    overflow: hidden;
  }
`

// ----------------------- Overlook Bay -----------------------

const OverlookBayBody = styled(motion.div)`
  width: 32.5%;
  padding-left: 3rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  p {
    color: var(--color-white);
    padding-bottom: 5rem;
  }
`

const OverlookRobloxLink = styled(motion.a)`
  border: 2px solid var(--color-white);
  width: 50%;
  color: var(--color-white);
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 30px;
  &:hover {
    background-color: var(--color-white);
    color: var(--color-darkblue);
    svg {
      fill: var(--color-darkblue);
    }
  }
  svg {
    transform: translateY(.15rem);
    fill: var(--color-white);
    transition: var(--hover-transition);
  }
`

const SVGWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const SmallCirclesWrapper = styled(motion.div)`
  position: absolute;
  top: 10%;
  right: 0;
`
const BigCirclesWrapper = styled.div`
  position: absolute;
  top: 12.5%;
  left: -2.5%;
`

const LighthouseImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  top: 0;
`
const MothImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 13%;
`
const MermaidImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 40%;
  right: 3%;
`
const TextLogoWrapper = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 5%;
  right: 3%;
`

// ----------------------- Timmeh -----------------------
const Timmeh = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-purple);
  padding-bottom: 10rem;
  height: 110vh;
`

const TimmehTitle = styled(motion.div)`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  padding-bottom: 5rem;
  padding-top: 15%;
  position: relative;
  z-index: 2;
  h1 {
    font-family: "calibre-semibold";
    font-size: 10.93vw;
    line-height: 8.85vw;
    text-transform: uppercase;
    text-align: left;
    color: var(--color-white);
  }
`
const TimmehBody = styled(motion.div)`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  position: relative;
  z-index: 2;
  p {
    width: 45%;
    color: var(--color-white);
    padding-bottom: 5rem;
  }
`

const TimmehRobloxLink = styled(motion.a)`
  border: 2px solid var(--color-white);
  width: 50%;
  color: var(--color-white);
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 30px;
  &:hover {
    background-color: var(--color-white);
    color: var(--color-purple);
    svg {
      fill: var(--color-purple);
    }
  }
  svg {
    transform: translateY(0.15rem);
    fill: var(--color-white);
    transition: var(--hover-transition);
  }
`
const TimmehTopWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  top: 5%;
  right: 15%;
`
const TimmehMiddleWrapper = styled(motion.div)`
  position: absolute;
  z-index: 4;
  top: 10%;
  right: 0;
`

const TimmehBottomWrapper = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 50%;
  right: 10%;
`

const BigGearsWrapper = styled(motion.div)`
  position: absolute;
  top: 35%;
  left: -10%;
`
const SmallGearsWrapper = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 5%;
`

// ----------------------- Traitor -----------------------
const Traitor = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-black);
  padding-bottom: 10rem;
  height: 110vh;
`

const TraitorTitle = styled(motion.div)`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  padding-bottom: 2rem;
  padding-top: 5%;
  position: relative;
  z-index: 2;
  h1 {
    font-family: "calibre-semibold";
    font-size: 10.93vw;
    line-height: 8.85vw;
    text-transform: uppercase;
    text-align: left;
    color: var(--color-white);
  }
`
const TraitorBody = styled(motion.div)`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  position: relative;
  z-index: 5;
  p {
    width: 35%;
    color: var(--color-white);
    padding-bottom: 5rem;
  }
`

const TraitorRobloxLink = styled(motion.a)`
  border: 2px solid var(--color-white);
  color: var(--color-white);
  width: 50%;
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 30px;
  &:hover {
    background-color: var(--color-white);
    color: var(--color-black);
    svg {
      fill: var(--color-black);
    }
  }
  svg {
    transform: translateY(0.15rem);
    fill: var(--color-white);
    transition: var(--hover-transition);
  }
`

const TriangleWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 0;
  background-color: var(--color-purple);
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
`

const TraitorStarsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 50%;
`

const TraitorLeftImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: -30%;
`
const TraitorMiddleImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  left: 35%;
  bottom: 20%;
`
const TraitorRightImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  bottom: -35%;
  right: 0;
`

const ShopSection = styled.div`
  padding-top: 15rem;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 15rem;
  position: relative;
`

const ShopFlex = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShopText = styled.div`
  position: relative;
`

const ShopBubble = styled.div`
  position: relative;
  z-index: 5;
  transform: translateX(12%);
  background-color: var(--color-white);
  border: 2px solid var(--color-black);
  border-radius: 100%;
  width: 460px;
  height: 460px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem;
`

const PinkStarWrapper = styled(motion.div)`
  position: absolute;
  top: -7%;
  left: -8%;
`

const OrangeStarWrapper = styled(motion.div)`
  position: absolute;
  bottom: -5%;
  left: -5%;
`

const ShopVideo = styled.div`
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  /* aspect-ratio: 16/9; */
  height: 475px;
`

const VideoWrapper = styled.a`
  // aspect ratio corresponds to the pixel width/height of the video 
  aspect-ratio: 1918/942;
  width: 100%;
  height: auto;

  transition: var(--hover-transition);
  :hover {
    filter: brightness(0.9);
  }

  div {
    box-sizing: content-box;
    aspect-ratio: 1918/942;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid var(--color-black);
    border-radius: 10px;
    filter: drop-shadow(12px 12px 0px #e795bf);
  }
`

const StayPeachyLink = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  padding-top: 2rem;

  svg {
    margin-right: 1rem;
    min-width: 16px;
    min-height: 16px;
  }
`

const UnderlinedLink = styled.a`
  text-decoration: none;
  font-family: "calibre-regular";
  font-size: 25px;
  text-decoration: none;
  position: relative;
  width: 80%;
  right: 0;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: var(--color-black);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const CollabSection = styled.section`
  background-color: var(--color-green);
  padding: 5rem 0;

  h2 {
    font-family: "ppwoodland-light";
    text-transform: uppercase;
    text-align: center;
  }
`
const Collabs = styled.div`
  padding: 10rem 0;
`
const Tiles = styled.div`
  padding-top: 10rem;
  width: 65%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`
const Tile = styled.div`
  display: flex;
  flex-direction: column;

  p {
    padding-top: 1rem;
    text-align: center;
    font-family: "calibre-medium";
  }
`

const Image = styled(motion.div)`
  width: 250px;
  height: 250px;
  border: 2px solid var(--color-black);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
