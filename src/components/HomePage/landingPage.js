import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import breakpoints from "../breakpoints"

const LandingPage = () => {
  // ----------framer motion animation variants----------
  const line = {
    visible: {
      transition: {
        duration: 2,
        delay: 0.5,
        // delay: 1.2,
        // delayChildren: 0.6,
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

  const whiteToBlack = {
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
      // opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
    },
    animate: {
      // y: "-100vh",
      // opacity: 0,
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
      // opacity: 0,
      // y: 0,
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      // opacity: 1,
      // y: "-100%",
      transition: {
        delay: 2.9,
        duration: 1,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  }

  const landingTextRef = useRef()

  const textTopRef = useRef()
  const animationTop = useAnimation()

  const textBottomRef = useRef()
  const animationBottom = useAnimation()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. get the parent's bounds
      const landingTextArea = landingTextRef.current.getBoundingClientRect()

      // 1.1 get each edge's margin spacing
      const landingTextTop = landingTextArea.top
      const landingTextLeft = landingTextArea.left

      // 2.=============== TOP TEXT ANIMATION COORDS ===============
      // 2.=============== TOP TEXT ANIMATION COORDS ===============
      const topBox = textTopRef.current.getBoundingClientRect()
      // 2.1 get top text box's distance to top and left of DOM
      const yDistanceTopText = topBox.y - landingTextTop
      const xDistanceTopText = topBox.x - landingTextLeft

      // 3. =============== BOTTOM TEXT ANIMATION COORDS ===============
      // 3. =============== BOTTOM TEXT ANIMATION COORDS ===============
      const bottomBox = textBottomRef.current.getBoundingClientRect()
      const measureBottomTextHeightFromTop =
        textBottomRef.current.offsetTop + textBottomRef.current.offsetHeight
      const bottomTravelDistance =
        window.innerHeight -
        measureBottomTextHeightFromTop +
        textBottomRef.current.offsetHeight

      const yDistanceBottomText = bottomTravelDistance / 2
      const xDistanceBottomText = bottomBox.x - landingTextLeft

      // 4 =============== ANIMATIONS ===============
      // 4 =============== ANIMATIONS ===============

      // 4.1 ANIMATE BOTTOM TEXT
      async function topTextSequence() {
        await animationTop.start({
          y: -yDistanceTopText,
          transition: {
            delay: 1.25,
            duration: 0.75,
            ease: [0.77, 0, 0.175, 1],
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        })
        await animationTop.start({
          x: -xDistanceTopText,
          transition: {
            duration: 0.4,
            ease: [0.77, 0, 0.175, 1],
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        })
        animationTop.start({ scale: 1 })
      }
      topTextSequence()

      // 4.2 ANIMATE BOTTOM TEXT
      async function bottomTextSequence() {
        await animationBottom.start({
          y: yDistanceBottomText,
          transition: {
            delay: 1.25,
            duration: 0.75,
            ease: [0.77, 0, 0.175, 1],
            type: "spring",
            stiffness: 125,
            damping: 20,
          },
        })
        await animationBottom.start({
          x: xDistanceBottomText,
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

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // to-do: write the height of the bottom text to state
      // so that the video box can have adequate spacing

      // const bottomBoxHeight = textBottomRef.current.offsetHeight
    }
  }, [])

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
            variants={whiteToBlack}
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
            variants={whiteToBlack}
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
        <LandingVideo variants={video} initial="initial" animate="animate" />
      </LandingText>
      <Cover variants={loader} initial="initial" animate="animate" />
    </>
  )
}

export default LandingPage

const Cover = styled(motion.div)`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-black);
`

const LandingVideo = styled(motion.div)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 966px;
  height: 547px;
  background-color: #a9f2ed;
  border-radius: 10px;
  margin-bottom: 10vh;
`

const LandingText = styled.div`
  z-index: 9999;

  overflow-x: hidden;
  position: relative;
  height: 85vh;
  width: 90%;
  transform: translateY(12vh);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TextBlock = styled(motion.div)`
  position: relative;
  //was:
  /* position: absolute; */
  z-index: 10;

  h1 {
    display: block;
    z-index: 2;
    font-family: "balgin-medium";
    font-size: 5.73vw;
    line-height: 50%;
    width: 100%;
    /* color: var(--color-black); */
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
`

const Span = styled(motion.span)`
  // margin-right to simulate word spacing
  margin-right: 2.5rem;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  :last-child {
    margin-right: 0;
  }

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
const FirstLine = styled(motion.div)`
  position: relative;
  padding-bottom: 2rem;
  vertical-align: top;
  overflow: hidden;
`
const SecondLine = styled(motion.div)`
  position: relative;
  overflow: hidden;
  padding-bottom: 0.25rem;
`
const ThirdLine = styled(motion.div)`
  overflow: hidden;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 1rem;
`
