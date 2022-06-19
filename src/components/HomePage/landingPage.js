import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import breakpoints from "../breakpoints"
import ReactPlayer from "react-player/youtube"
import { useInView } from "react-intersection-observer"

// Hook for getting coordinates for the opening page animation.
const useCoords = ({ landingTextRef, textTopRef, textBottomRef }) => {
  // Initialize state
  const [coords, setCoords] = useState({ x: 0, y: 0, yTop: 0, yBottom: 0 })

  useEffect(() => {
    if (typeof window == "undefined") {
      return
    }
    // 1. ~~~~~ GET PARENT COMPONENT BOUNDING BOX COORDINATES ~~~~~
    const landingTextArea = landingTextRef.current.getBoundingClientRect()
    // 2. ~~~~~ TOP TEXT & BOTTOM TEXT AREA - ANIMATION DESTINATION COORDS ~~~~~
    // Destination coords AKA the bounds to which the text should animate towards.
    const topBox = textTopRef.current.getBoundingClientRect()
    const bottomBox = textBottomRef.current.getBoundingClientRect()

    // Since the text starts from the centre, set the distance to the top bounds for both top and bottom animations
    const measureBottomTextHeightFromTop =
      textBottomRef.current.offsetTop + textBottomRef.current.offsetHeight

    const bottomTravelDistance =
      window.innerHeight -
      measureBottomTextHeightFromTop +
      textBottomRef.current.offsetHeight

    setCoords({
      x: bottomBox.x - landingTextArea.left,
      y: bottomTravelDistance / 2,
      // Get top text box's distance to top and left of DOM
      yTop: topBox.top - landingTextArea.top,
      xTop: topBox.left - landingTextArea.left,
    })
  }, [landingTextRef, textTopRef, textBottomRef])
  return coords
}

const LandingPage = () => {
  // ----------framer motion animation variants----------
  const line = {
    visible: {
      transition: {
        duration: 2,
        delay: 0.5,
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

  const whiteToBlackText = {
    initial: {
      color: "#f7f7fc", // white
      transition: {
        duration: 2,
      },
    },
    animate: {
      color: "#1a1748", // black
      transition: {
        delay: 2.4,
        duration: 0.3,
      },
    },
  }

  const loader = {
    initial: {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    animate: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        delay: 2.4,
        duration: 0.75,
        ease: [0.77, 0, 0.175, 1],
      },
      transitionEnd: { display: "none" },
    },
  }

  const video = {
    initial: {
      clipPath: "inset(100% 0% 0% 0%)",
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        delay: 2.9,
        duration: 1,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  }

  const modal = {
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    visible: {
      opacity: 1,
      display: "block",
    },
  }

  // Refs for the useCoords hook. We need these to identify the animation destination distance.
  const landingTextRef = useRef()
  const textTopRef = useRef()
  const textBottomRef = useRef()

  // Declare useAnimation for Framer
  const animationTop = useAnimation()
  const animationBottom = useAnimation()

  // Get the coords from our hook
  const { x, y, yTop, xTop } = useCoords({
    landingTextRef,
    textTopRef,
    textBottomRef,
  })

  useEffect(() => {
    // 4.1 ANIMATE TOP TEXT TOWARDS TOP LEFT BOUNDS
    async function topTextSequence() {
      await animationTop.start({
        y: -yTop,
        transition: {
          delay: 1.25,
          duration: 0.75,
          ease: [0.77, 0, 0.175, 1],
        },
      })
      await animationTop.start({
        x: -xTop,
        transition: {
          duration: 0.4,
          ease: [1, 0.175, 0, 0.77],
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      })
      animationTop.start({ scale: 1 })
    }
    topTextSequence()

    // 4.2 ANIMATE BOTTOM TEXT TOWARDS BOTTOM RIGHT BOUNDS
    async function bottomTextSequence() {
      await animationBottom.start({
        y: y,
        transition: {
          delay: 1.25,
          duration: 0.75,
          ease: [0.77, 0, 0.175, 1],
        },
      })
      await animationBottom.start({
        x: x,
        transition: {
          duration: 0.4,
          ease: [0.77, 0, 0.175, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      })
      animationBottom.start({ scale: 1 })
    }
    bottomTextSequence()
  }, [animationTop, animationBottom, x, y, yTop, xTop])

  // Intersection observer to pause the video when no longer in view.
  const [videoRef, videoInView] = useInView({
    threshold: 0.2,
    root: null,
    triggerOnce: false,
    initialInView: true
  })

  return (
    <>
      <LandingText ref={landingTextRef}>
        <TextBlock
          ref={textTopRef}
          animate={animationTop}
          transition={{
            ease: "easeInOut",
          }}
        >
          <motion.h1
            variants={whiteToBlackText}
            initial="initial"
            animate="animate"
          >
            <FirstLine variants={line} initial="hidden" animate="visible">
              <Span variants={word}>dreaming</Span>
              <Span variants={word}>up</Span>
            </FirstLine>
            <SecondLine variants={line} initial="hidden" animate="visible">
              <Span variants={word}>wonderful</Span>
              <Span variants={word}>works</Span>
            </SecondLine>
          </motion.h1>
        </TextBlock>
        <TextBlock
          ref={textBottomRef}
          animate={animationBottom}
          transition={{
            ease: "easeInOut",
          }}
        >
          <motion.h1
            variants={whiteToBlackText}
            initial="initial"
            animate="animate"
          >
            <ThirdLine variants={line} initial="hidden" animate="visible">
              <SpanBottom variants={word}>in</SpanBottom>
              <SpanBottom variants={word}>the</SpanBottom>
              <SpanBottom variants={word}>metaverse</SpanBottom>
            </ThirdLine>
          </motion.h1>
        </TextBlock>
        <VideoThumbnail
          variants={video}
          initial="initial"
          animate="animate"
          ref={videoRef}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=955ll_boJgg"
            className="react-player"
            width="100%"
            height="100%"
            playsinline={true}
            muted={true}
            playing={videoInView ? true : false}
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  color: "white",
                  modestbranding: 1,
                },
              },
            }}
          />
        </VideoThumbnail>
      </LandingText>
      <Cover variants={loader} initial="initial" animate="animate" />
    </>
  )
}

export default LandingPage

const Cover = styled(motion.div)`
  position: absolute;
  overflow-x: hidden;
  z-index: 998;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--color-black);
`

const VideoThumbnail = styled(motion.div)`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  aspect-ratio: 16/9;
  width: 1000px;
  height: auto;
  background-color: #a9f2ed;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12vh;

  &.react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 1600px) {
    width: 53vw;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 55vw;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-bottom: 15vh;
    width: 90%;
  }
  @media (max-width: ${breakpoints.s}px) {
    border-radius: 5px;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20vh;
  }
`

const LandingText = styled.div`
  z-index: 999;
  overflow-x: hidden;
  position: relative;
  min-height: 89vh;
  // was: height: 85vh;
  /* height: calc(100vh - 2.5rem * 2); */
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.s}px) {
    width: 97%;
  }
`

const TextBlock = styled(motion.div)`
  position: relative;
  z-index: 10;

  h1 {
    display: block;
    z-index: 2;
    font-family: "balgin-medium";
    font-size: 5.73vw;
    /* line-height: 50%; */
    line-height: 80%;
    width: 100%;
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
  }

  @media (max-width: ${breakpoints.s}px) {
    h1 {
      font-size: 40px;
      line-height: 100%;
      white-space: nowrap;
    }
  }
`

const FirstLine = styled(motion.div)`
  position: relative;
  height: 100%;
  padding-bottom: 1rem;
  vertical-align: top;
  /* padding-bottom: 2rem; */
  /* overflow: hidden; */

  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 0.5rem;
  }
`
const SecondLine = styled(motion.div)`
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-bottom: 0.25rem;

  @media (max-width: ${breakpoints.xl}px) {
  }
`
const ThirdLine = styled(motion.div)`
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 1rem;

  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 0.75rem;
    padding-top: 0rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0rem;
  }
`

const Span = styled(motion.span)`
  // margin-right to simulate word spacing
  margin-right: 2rem;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  :last-child {
    margin-right: 0;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    margin-right: 1.75rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin-right: 1.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.5rem;
  }
`
const SpanBottom = styled(motion.span)`
  // margin-right to simulate word spacing
  margin-right: 1.5rem;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  :last-child {
    margin-right: 0;
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin-right: 1.25rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 0.75rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.25rem;
  }
`

const MobilePlayButton = styled.div`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 105px;
    height: 105px;
    background-color: #1a174998;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      svg {
        max-width: 90%;
        max-height: 90%;
      }
    }
    span {
      position: absolute;
      top: 50%;
      left: 52%;
      transform: translate(-50%, -50%);
    }
  }
`
