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
import breakpoints from "../components/breakpoints"

const Projects = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Projects`

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
        (blueBackgroundDiv2.y <= 150 && blueBackgroundDiv2.bottom >= 150)
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

  // ----------------- intersection observer logic -----------------
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

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })

  let throttle = require("lodash/throttle")
  const smallerParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -150, 100)
  )

  const smallParallax = useTransform(
    scrollYProgress,
    scrollYProgress => scrollYProgress * -450
  )

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

  // ------ stay peachy video state -------

  const videoState = {
    loop: true,
    playsinline: true,
    autoplay: true,
    muted: true,
    playing: shopInView ? true : false
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
      <div ref={blueSectionRef2}>
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
              many land and sea creatures, explore the island with your friends
              in this Massively multiplayer online role-playing game. Collect
              pets, rent out your own cottage, and participate daily activities!
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
          <TimmehMobileWrapper
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
              src="../images/Projects/timmehmobile.png"
              alt="Roblox characters laid on the page"
              placeholder="none"
              quality={100}
            />
          </TimmehMobileWrapper>
          <SVGWrapper>
            <BigGearsWrapper style={{ y: smallerParallax }}>
              <Svg.TimmehBigGears />
            </BigGearsWrapper>
            <SmallGearsWrapper style={{ y: smallParallax }}>
              <Svg.TimmehSmallGears />
            </SmallGearsWrapper>
          </SVGWrapper>
        </Timmeh>
      </div>

      <ShopSection>
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
          <ShopVideo ref={shopRef}>
            <VideoWrapper
              href="https://www.staypeachy.shop"
              target="_blank"
              rel="noreferrer"
            >
              <VideoInner>
                <ReactPlayer
                  url="https://ww-peachy.s3.us-west-1.amazonaws.com/StayPeachy+-+Final.mov"
                  playing={videoState.playing}
                  loop={videoState.loop}
                  muted={videoState.muted}
                  width="100%"
                  height="100%"
                  playsinline={videoState.playsinline}
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                />
              </VideoInner>
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
        <h1>{shopInView ? "true" : "false"}</h1>
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
                  imgStyle={{ objectFit: "scale-down" }}
                  style={{ height: "100%", width: "100%" }}
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
                  imgStyle={{ objectFit: "scale-down" }}
                  style={{ height: "100%", width: "100%" }}
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

// ----------------------- Overlook Bay -----------------------
const OverlookBay = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-darkblue);
  padding-bottom: 10rem;
  height: 110vh;

  @media (max-width: ${breakpoints.xs}px) {
    height: 130vh;
  }
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
  @media (max-width: ${breakpoints.xl}px) {
    padding: 15rem 0;
    padding-bottom: 5rem;
    h1 {
      text-align: center;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    z-index: 20;
    padding: 0;
    padding-top: 10rem;
    padding-bottom: 4rem;
    h1 {
      font-size: 70px;
      line-height: 65px;
    }
  }
  @media (max-width: 375px) {
    padding-top: 6.5rem;
    padding-bottom: 2rem;
  }

  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 50px;
      line-height: 50px;
    }
  }
`

const OverlookBayBody = styled(motion.div)`
  width: 32.5%;
  padding-left: 3rem;
  margin: 0 auto;
  position: relative;
  z-index: 20;
  p {
    color: var(--color-white);
    padding-bottom: 5rem;
  }
  @media (max-width: 1650px) {
    width: 38%;
    padding-left: 2rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    text-align: center;
    width: 55%;
    padding-left: 0rem;
  }
  @media (max-width: 1080px) {
    width: 40%;
  }
  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 70%;
    p {
      padding-bottom: 4rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 80%;
    padding-left: 0rem;
    p {
      padding-bottom: 3rem;
    }
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
    transform: translateY(0.15rem);
    fill: var(--color-white);
    transition: var(--hover-transition);
  }

  @media (max-width: ${breakpoints.xl}px) {
    border: 1px solid var(--color-white);
    padding: 0.5rem 1.5rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    border: 1px solid var(--color-white);
    font-size: 16px;
    line-height: 19px;
    padding: 0.5rem 1.5rem;
    background-color: var(--color-white);
    color: var(--color-darkblue);

    svg {
      fill: var(--color-darkblue);
      transform: translateY(0.4rem);
      scale: 0.7;
    }
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
  right: -5%;
  @media (max-width: 1800px) {
    width: 70%;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 60%;
    right: 0%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 50%;
    height: 50%;
    right: 10%;
    bottom: 0%;
    top: auto;
    transform: rotate(90deg);
  }
  @media (max-width: 1080px) {
    width: 90%;
    height: 90%;
    right: -55%;
    bottom: 5%;
    transform: none;
  }
  @media (max-width: 1024px) {
    width: 50%;
    height: 50%;
    right: 10%;
    bottom: 0%;
    transform: rotate(90deg);
  }
  @media (max-width: ${breakpoints.l}px) {
    right: -5%;
    height: auto;
    transform: none !important;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 40%;
    right: -15%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: auto;
    height: auto;
    bottom: 4%;
    right: 4%;
  }

  @media (max-width: ${breakpoints.xs}px) {
    right: -15%;
  }
`
const BigCirclesWrapper = styled.div`
  position: absolute;
  top: 12.5%;
  left: -2.5%;

  svg {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${breakpoints.xl}px) {
    svg {
      width: 120%;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    svg {
      width: 150%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 200%;
    }
  }
`

const LighthouseImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  top: 0;
  @media (max-width: 1850px) {
    div {
      transform: scale(0.9);
    }
  }
  @media (max-width: 1650px) {
    left: -5%;
    div {
      transform: scale(0.8);
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    left: -12%;
    top: auto;
    bottom: 9%;
    div {
      transform: scale(0.7);
    }
  }
  @media (max-width: 1080px) {
    left: -15%;
    bottom: 0%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: 1024px) {
    left: -12%;
    top: auto;
    bottom: 9%;
    div {
      transform: scale(0.7);
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    left: -20%;
    div {
      transform: scale(0.65);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    left: -25%;
    bottom: -5%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    left: -50%;
    bottom: -10%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: 375px) {
    bottom: -17%;
    left: -55%;
    div {
      transform: scale(0.4);
    }
  }
`
const MothImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 13%;

  @media (max-width: 1850px) {
    div {
      transform: scale(0.9);
    }
  }
  @media (max-width: 1650px) {
    left: 8%;
    div {
      transform: scale(0.8);
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    top: 55%;
    div {
      transform: scale(0.75);
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    left: 5%;
    top: auto;
    bottom: -5%;
    div {
      transform: scale(0.7);
    }
  }
  @media (max-width: 1080px) {
    left: 0%;
    top: auto;
    bottom: -15%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: 1024px) {
    left: 5%;
    top: auto;
    bottom: -5%;
    div {
      transform: scale(0.7);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    left: -2%;
    bottom: -12%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    left: -15%;
    bottom: -24%;
    div {
      transform: scale(0.4);
    }
  }
  @media (max-width: 375px) {
    bottom: -30%;
  }
`
const MermaidImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 40%;
  right: 3%;

  @media (max-width: 1850px) {
    right: 0%;
    div {
      transform: scale(0.9);
    }
  }
  @media (max-width: 1600px) {
    right: 0%;
    div {
      transform: scale(0.65);
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    right: -5%;
    div {
      transform: scale(0.6);
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    right: -10%;
    top: 45%;
    div {
      transform: scale(0.7);
    }
  }
  @media (max-width: 1080px) {
    right: -15%;
    top: 35%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: 1024px) {
    right: -10%;
    top: 45%;
    div {
      transform: scale(0.7);
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    right: -15%;
    div {
      transform: scale(0.5);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: -25%;
    top: 45%;
    div {
      transform: scale(0.4);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    right: -55%;
    top: -10%;
    div {
      transform: scale(0.3);
    }
  }
  @media (max-width: 375px) {
    top: -20%;
    div {
      transform: scale(0.25);
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: -10%;
  }
`
const TextLogoWrapper = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 5%;
  right: 3%;

  @media (max-width: ${breakpoints.l}px) {
    transform: scale(0.7);
    bottom: 3%;
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: scale(0.3);
    bottom: 2.5%;
    right: -16%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    right: -28%;
    bottom: 0;
  }
`

// ----------------------- Traitor -----------------------
const Traitor = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-black);
  padding-bottom: 10rem;
  height: 110vh;

  @media (max-width: ${breakpoints.xs}px) {
    height: 130vh;
  }
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
  @media (max-width: ${breakpoints.xl}px) {
    padding: 15rem 0;
    padding-bottom: 5rem;
    h1 {
      text-align: center;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    z-index: 20;
    padding: 0;
    padding-top: 10rem;
    padding-bottom: 4rem;
    h1 {
      font-size: 70px;
      line-height: 65px;
    }
  }
  @media (max-width: 375px) {
    padding-top: 6.5rem;
    padding-bottom: 2rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 50px;
      line-height: 50px;
    }
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

  @media (max-width: ${breakpoints.xl}px) {
    text-align: center;
    width: 48%;
    padding-left: 0rem;
    p {
      width: 100%;
    }
  }
  @media (max-width: 1080px) {
    width: 40%;
  }
  @media (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 70%;
    p {
      padding-bottom: 4rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 80%;
    padding-left: 0rem;
    p {
      padding-bottom: 3rem;
    }
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

  @media (max-width: ${breakpoints.xl}px) {
    border: 1px solid var(--color-white);
    padding: 0.5rem 1.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    border: 1px solid var(--color-white);
    font-size: 16px;
    line-height: 19px;
    padding: 0.5rem 1.5rem;
    background-color: var(--color-white);
    color: var(--color-black);
    svg {
      transform: translateY(0.4rem);
      scale: 0.7;
      fill: var(--color-black);
    }
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
  @media (max-width: 1800px) {
    top: 1px;
  }
`

const TraitorStarsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 50%;
  @media (max-width: ${breakpoints.xxl}px) {
    top: 52%;
    right: -22.5%;
    svg {
      width: 70%;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    top: 14%;
    right: 12%;
    svg {
      width: auto;
    }
  }
  @media (max-width: 1080px) {
    top: 10%;
    right: 9%;
  }
  @media (max-width: 1024px) {
    top: 13%;
    right: 10%;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 15%;
    right: -9%;
    svg {
      height: 80%;
      width: 80%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 55%;
    left: 22%;
    svg {
      height: auto;
      width: auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 13%;
    left: 5%;
  }
  @media (max-width: 375px) {
    top: 3%;
    left: 3%;
  }
`

const TraitorLeftImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: -30%;

  @media (max-width: 1800px) {
    max-width: 700px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    max-width: 500px;
    bottom: -15%;
  }
  @media (max-width: 1080px) {
    max-width: 470px;
    bottom: -20%;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`
const TraitorMiddleImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  left: 35%;
  bottom: 20%;

  @media (max-width: 1800px) {
    max-width: 500px;
    left: 40%;
  }

  @media (max-width: ${breakpoints.xl}px) {
    left: 55%;
    bottom: 15%;
    max-width: 400px;
  }

  @media (max-width: 1080px) {
    max-width: 400px;
    left: 54%;
    bottom: 8%;
  }
  @media (max-width: 1024px) {
    left: -3%;
    bottom: 15%;
    max-width: 550px;
  }
  @media (max-width: ${breakpoints.l}px) {
    max-width: 450px;
    left: -5%;
    bottom: 10%;
  }
  @media (max-width: ${breakpoints.m}px) {
    max-width: 350px;
    left: 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    left: -5%;
    max-width: 225px;
    bottom: 30%;
  }
  @media (max-width: 375px) and (max-height: 850px) {
    left: -9%;
    bottom: 34%;
  }

  @media (max-width: 375px) and (max-height: 700px) {
    left: -9%;
    bottom: 20%;
  }
`
const TraitorRightImageWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  bottom: -35%;
  right: 0;

  @media (max-width: 1800px) {
    max-width: 800px;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    right: -5%;
    bottom: -25%;
  }
  @media (max-width: 1300px) {
    right: -15%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    max-width: 600px;
    right: -15%;
    bottom: -20%;
  }
  @media (max-width: 1080px) {
    max-width: 400px;
    bottom: -20%;
    right: -10%;
  }
  @media (max-width: 1024px) {
    max-width: 800px;
    bottom: -18%;
  }
  @media (max-width: ${breakpoints.l}px) {
    max-width: 630px;
    right: -15%;
  }
  @media (max-width: ${breakpoints.m}px) {
    right: -20%;
    bottom: -15%;
  }
  @media (max-width: ${breakpoints.s}px) {
    max-width: 440px;
    right: -40%;
    bottom: -28%;
  }
  @media (max-width: 375px) and (max-height: 850px) {
    bottom: -28%;
    max-width: 460px;
  }
  @media (max-width: 375px) and (max-height: 700px) {
    bottom: -32%;
    max-width: 460px;
  }
`

// ----------------------- Timmeh -----------------------
const Timmeh = styled.section`
  position: relative;
  overflow: hidden;
  background-color: #000421;
  padding-bottom: 10rem;
  height: 110vh;

  @media (max-width: ${breakpoints.xs}px) {
    height: 130vh;
  }
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
  @media (max-width: ${breakpoints.xl}px) {
    padding: 15rem 0;
    padding-bottom: 5rem;
    h1 {
      text-align: center;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    z-index: 20;
    padding: 0;
    padding-top: 10rem;
    padding-bottom: 4rem;
    h1 {
      font-size: 70px;
      line-height: 65px;
    }
  }
  @media (max-width: 375px) {
    padding-top: 6.5rem;
    padding-bottom: 2rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 50px;
      line-height: 50px;
    }
  }
`
const TimmehBody = styled(motion.div)`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  position: relative;
  z-index: 20;
  p {
    width: 45%;
    color: var(--color-white);
    padding-bottom: 5rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    text-align: center;
    width: 48%;
    padding-left: 0rem;
    p {
      width: 100%;
    }
  }
  @media (max-width: 1080px) {
    width: 40%;
  }
  @media (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 70%;
    p {
      padding-bottom: 4rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 80%;
    padding-left: 0rem;
    p {
      padding-bottom: 3rem;
    }
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
    color: #000421;
    svg {
      fill: #000421;
    }
  }
  svg {
    transform: translateY(0.15rem);
    fill: var(--color-white);
    transition: var(--hover-transition);
  }

  @media (max-width: ${breakpoints.xl}px) {
    border: 1px solid var(--color-white);
    padding: 0.5rem 1.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    border: 1px solid var(--color-white);
    font-size: 16px;
    line-height: 19px;
    padding: 0.5rem 1.5rem;
    background-color: var(--color-white);
    color: #000421;
    svg {
      fill: #000421;
      transform: translateY(0.4rem);
      scale: 0.7;
    }
  }
`
const TimmehTopWrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  top: 5%;
  right: 15%;
  @media (max-width: 1800px) {
    right: 15%;
    top: 10%;
    max-width: 525px;
  }
  @media (max-width: 1400px) {
    right: 10%;
    top: 10%;
    max-width: 500px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const TimmehMiddleWrapper = styled(motion.div)`
  position: absolute;
  z-index: 4;
  top: 10%;
  right: 0;
  @media (max-width: 1800px) {
    right: 4%;
    top: 20%;
    max-width: 600px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const TimmehBottomWrapper = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 50%;
  right: 10%;

  @media (max-width: 1800px) {
    top: 55%;
    max-width: 600px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const TimmehMobileWrapper = styled(motion.div)`
  display: none;
  @media (max-width: ${breakpoints.xl}px) {
    display: block;
    position: absolute;
    z-index: 5;
    bottom: 0%;
    left: 5%;
  }
  @media (max-width: 1080px) {
    bottom: -37%;
    left: 6%;
    width: 86%;
  }
  @media (max-width: 1024px) {
    bottom: 0%;
    left: 5%;
    width: auto;
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: -15%;
  }
  @media (max-width: ${breakpoints.m}px) {
    bottom: 0%;
  }
  @media (max-width: ${breakpoints.s}px) {
    bottom: -18%;
  }
  @media (max-width: 375px) {
    bottom: -23%;
  }
`

const SmallGearsWrapper = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 5%;
  svg {
    width: 100%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 25%;
    left: 2%;
    svg {
      width: auto;
      height: auto;
    }
  }
  @media (max-width: 1080px) {
    top: 25%;
    left: 2%;
  }
  @media (max-width: 1024px) {
    top: 25%;
    left: 2%;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 35%;
    left: -10%;
    svg {
      transform: scale(0.8);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    left: -30%;
    svg {
      transform: scale(0.6);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 24%;
    left: auto;
    right: 1%;
    svg {
      transform: scale(1);
    }
  }
  @media (max-width: 414px) {
    top: 25%;
    right: -1%;
  }
  @media (max-width: 390px) {
    top: 25%;
    right: -1%;
  }
  @media (max-width: 375px) {
    top: 28%;
    right: -3%;
  }
`

const BigGearsWrapper = styled(motion.div)`
  position: absolute;
  top: 35%;
  left: -10%;
  svg {
    width: 100%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    left: -5%;
    top: 40%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: auto;
    bottom: 5%;
    left: 0;
    svg {
      height: auto;
      width: auto;
    }
  }
  @media (max-width: 1080px) {
    top: auto;
    bottom: -25%;
    left: -5%;
  }
  @media (max-width: 1024px) {
    top: auto;
    bottom: 5%;
    left: 0;
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: -15%;
    left: -20%;
    svg {
      transform: scale(0.6);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    bottom: -10%;
  }
  @media (max-width: ${breakpoints.s}px) {
    left: -8%;
    bottom: 5%;
    svg {
      transform: scale(1);
    }
  }
  @media (max-width: 414px) {
    left: -5%;
    bottom: 12%;
  }
  @media (max-width: 410px) {
    left: -8%;
    bottom: 5%;
  }
  @media (max-width: 375px) {
    left: -10%;
    bottom: 0%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    bottom: 0%;
  }
`

const ShopSection = styled.div`
  padding-top: 15rem;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 15rem;
  position: relative;

  @media (max-width: 1700px) {
    width: 80%;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    padding-top: 5rem;
    margin-bottom: 10rem;
  }
`

const ShopFlex = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.s}px) {
    /* height: 80vh; */
  }
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
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 400px;
    height: 400px;
    height: auto;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 600px;
    height: 600px;
    transform: translateY(20%);
    z-index: 3;
    h1 {
      font-size: 150px;
      padding-bottom: 4rem;
    }
    p {
      width: 80%;
      font-size: 24px;
      line-height: 32px;
    }
  }
  @media (max-width: 1080px) {
    width: 550px;
    height: 550px;
    transform: translateY(20%);
    z-index: 3;
    h1 {
      font-size: 126px;
      padding-bottom: 3rem;
    }
    p {
      width: 90%;
      font-size: 24px;
      line-height: 32px;
      padding-bottom: 2rem;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 470px;
    height: 470px;
    transform: translateY(12.5%);
    z-index: 3;
    h1 {
      font-size: 100px;
      padding-bottom: 2rem;
    }
    p {
      width: 90%;
      font-size: 24px;
      line-height: 32px;
      padding-bottom: 0rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 300px;
    height: 300px;
    transform: translateY(25%);
    h1 {
      font-size: 45px;
      padding-bottom: 0.5rem;
    }
    p {
      width: 100%;
      font-size: 16px;
      line-height: 19px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding: 2rem;
  }
`

const PinkStarWrapper = styled(motion.div)`
  position: absolute;
  top: -7%;
  left: -8%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.l}px) {
    top: 4%;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 110px;
    height: 110px;
    left: 0%;
    top: 10%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`

const OrangeStarWrapper = styled(motion.div)`
  position: absolute;
  bottom: -5%;
  left: -5%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    bottom: -10%;
    left: -10%;
  }
  @media (max-width: ${breakpoints.s}px) {
    left: auto;
    bottom: auto;
    right: 10%;
    top: -25%;
    width: 50px;
    height: 50px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`

const ShopVideo = styled.div`
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 475px;

  @media (max-width: ${breakpoints.xl}px) {
    height: auto;
  }

  @media (max-width: ${breakpoints.s}px) {
    justify-content: flex-start;
    align-self: flex-start;
    flex-direction: column;
    margin-top: 3rem;
  }
`

const VideoWrapper = styled.a`
  // aspect ratio corresponds to the pixel width/height of the video
  aspect-ratio: 1918/942;
  position: relative;
  /* padding-top: 49.1136600626%; */
  width: 100%;
  height: auto;
  transition: var(--hover-transition);
  :hover {
    filter: brightness(0.9);
  }

  @media (max-width: ${breakpoints.s}px) {
    min-width: 335px;
  }
`

const VideoInner = styled.div`
  /* box-sizing: content-box; */
  aspect-ratio: 1918/942;
  height: auto;
  border-radius: 10px;
  box-sizing: content-box;
  border: 2px solid var(--color-black);
  z-index: 5;

  :after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: -1;
    background-color: #e795bf;
    border-radius: 10px;
  }

  @media (max-width: ${breakpoints.s}px) {
    :after {
      top: 6px;
      left: 6px;
    }
  }
`

const StayPeachyLink = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  padding-top: 0rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  svg {
    min-width: 16px;
    min-height: 16px;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(-1rem, -120%, 0);
  }
  /* @media (max-width: 1430px) { */
  /* transform: translateY(-50%); */
  /* } */
  @media (max-width: ${breakpoints.xl}px) {
    transform: translateY(50%);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translateY(30%);
    svg {
      margin-right: 0.25rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0.5rem;
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

  @media (max-width: ${breakpoints.xxl}px) {
    padding: 5rem 0;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 2.5rem 0;
  }
`
const Collabs = styled.div`
  padding: 10rem 0;

  @media (max-width: ${breakpoints.xxl}px) {
    padding-bottom: 5rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding: 5rem 0;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 2.5rem 0;
  }
`
const Tiles = styled.div`
  padding-top: 10rem;
  width: 65%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1800px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 85%;
    padding-top: 6rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    width: 70%;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 5rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    padding-top: 2.5rem;
  }
`
const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
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
  @media (max-width: ${breakpoints.l}px) {
    width: 225px;
    height: 225px;
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    padding: 5px;
  }
`
