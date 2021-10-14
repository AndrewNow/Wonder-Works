import React, { useState, useCallback, useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"
import styled from "styled-components"
import * as Svg from "../../../svg/homepage"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../../../context/globalContext"
import breakpoints from "../../breakpoints"

const DesktopComponent = () => {
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

  // ---------- Hover state for Pillars ----------
  const [hover, setHover] = useState({
    topLeftHover: false,
    topRightHover: false,
    bottomRightHover: false,
    bottomLeftHover: false,
  })

  // ---------- determine if a blue background pillar is in view ----------
  // ---------- if in view, update navigation menu text color to white ----------
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
      const blueBackgroundDiv2 = blueSectionRef2.current.getBoundingClientRect()
      if (blueBackgroundDiv2.y <= 90 && blueBackgroundDiv2.bottom >= 150) {
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

  return (
    <Pillars>
      <TopLeft
        onMouseEnter={() => setHover({ topLeftHover: true })}
        onMouseLeave={() => setHover({ topLeftHover: false })}
      >
        <ImageWrapper>
          <StaticImage
            onMouseEnter={() => setHover({ topLeftHover: true })}
            onMouseLeave={() => setHover({ topLeftHover: false })}
            src="../../../images/Home/topleft.png"
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
              Discover what’s in the works at Wonder Works Studio. We’re always
              dreaming up new adventures in exciting roleplay games for
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
            src="../../../images/Home/topright.png"
            alt="Playful text which reads 'Wonder Works Parterships"
            placeholder="none"
            quality={100}
          />
        </ImageWrapper>
        <Svg.TopRightPillar />
        <PillarHover
          variants={pillarVariants}
          initial="hidden"
          animate={hover.topRightHover ? "visible" : "hidden"}
          exit="hidden"
        >
          <PillarHoverInner>
            <p>
              We love growing and connecting with our community. If you’re
              interested in partnering with the wonderful world of Wonder Works
              Studio send us a message—we have big ideas to launch with brands
              of all sizes.
            </p>
          </PillarHoverInner>
        </PillarHover>
      </TopRight>
      <BottomLeft
        onMouseEnter={() => setHover({ bottomLeftHover: true })}
        onMouseLeave={() => setHover({ bottomLeftHover: false })}
      >
        <ImageWrapper>
          <StaticImage
            onMouseEnter={() => setHover({ bottomLeftHover: true })}
            onMouseLeave={() => setHover({ bottomLeftHover: false })}
            src="../../../images/Home/bottomleft.png"
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
          animate={hover.bottomLeftHover ? "visible" : "hidden"}
          exit="hidden"
        >
          <PillarHoverInner>
            <p>
              Wonder Works Jams is a space for our junior talent to QA various
              game genres. It’s a creative hub of mentorship that fosters a
              lifelong love for exploration and innovation and promotes success
              on individual and collaborative levels.{" "}
            </p>
          </PillarHoverInner>
        </PillarHover>
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
            src="../../../images/Home/bottomright.png"
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
  )
}

export default DesktopComponent

const Pillars = styled.section`
  /* margin-top: 10rem; */
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    display: none;
  }
`

const TopLeft = styled.div`
  background-color: var(--color-green);
  width: 50%;
  height: 50vh;
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
  width: 80%;
  height: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  

  @media (max-width: 1440px) {
    max-width: 70%;
  }
`

const TopRight = styled.div`
  background-color: var(--color-white);
  width: 50%;
  height: 50vh;
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

  svg:nth-of-type(2) {
    position: absolute;
    z-index: 1;
    left: 9% !important;
    top: 20% !important;
  }
  svg:nth-child(1) {
    position: absolute;
    z-index: 6;
    left: 71%;
    top: 63%;
  }

  @media (max-width: 1740px) {
    svg:nth-of-type(2) {
      left: 5% !important;
    }
    svg:nth-of-type(1) {
      position: absolute;
      z-index: 6;
      left: 73% !important;
      top: 60% !important;
    }
  }

  @media (max-width: 1440px) {
    svg:nth-of-type(2) {
      left: 9% !important;
      top: 26% !important;
      scale: 0.7;
    }
    svg:nth-of-type(1) {
      left: 67% !important;
      top: 58% !important;
      scale: 0.7;
    }
  }
`

const BottomLeft = styled.div`
  background-color: var(--color-white);
  width: 50%;
  height: 50vh;
  position: relative;
  overflow: hidden;
  svg:last-of-type {
    z-index: 0;
    position: absolute;
    top: -1px;
    right: 0;
  }
`

const BottomRight = styled.div`
  background-color: var(--color-black);
  width: 50%;
  height: 50vh;
  position: relative;
  z-index: 2;
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
