import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import breakpoints from "../breakpoints"
import ReactPlayer from "react-player/youtube"
import { StaticImage } from "gatsby-plugin-image"

import { PressPlaySVG, PlayIcon } from "../EmblaCarousel/buttons"

const LandingPage = ({ onCursor }) => {
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

  const [modalOpen, setModalOpen] = useState(false)

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const landingTextRef = useRef()

  const textTopRef = useRef()
  const animationTop = useAnimation()

  const textBottomRef = useRef()
  const animationBottom = useAnimation()

  useEffect(() => {
    if (typeof window == "undefined") {
      return
    }
    // 1. ~~~~~ GET PARENT BOUNDING BOX COORDINATES ~~~~~
    const landingTextArea = landingTextRef.current.getBoundingClientRect()
    // 1.1 get each edge of the landing text area's spacing
    // (relative to top and sides of the viewport)

    // 2. ~~~~~ TOP TEXT SECTION ANIMATION DESTINATION COORDS ~~~~~
    const topBox = textTopRef.current.getBoundingClientRect()
    // 2.1 get top text box's distance to top and left of DOM
    const yDistanceTopText = topBox.top - landingTextArea.top
    const xDistanceTopText = topBox.left - landingTextArea.left

    // 3. ~~~~~ BOTTOM TEXT SECTION ANIMATION DESTINATION COORDS ~~~~~
    const bottomBox = textBottomRef.current.getBoundingClientRect()

    const measureBottomTextHeightFromTop =
      textBottomRef.current.offsetTop + textBottomRef.current.offsetHeight

    const bottomTravelDistance =
      window.innerHeight -
      measureBottomTextHeightFromTop +
      textBottomRef.current.offsetHeight

    const yDistanceBottomText = bottomTravelDistance / 2
    const xDistanceBottomText = bottomBox.x - landingTextArea.left

    // 4 ~~~~~ ANIMATIONS ~~~~~

    // 4.1 ANIMATE TOP TEXT
    async function topTextSequence() {
      await animationTop.start({
        y: -yDistanceTopText,
        transition: {
          delay: 1.25,
          duration: 0.75,
          ease: [0.77, 0, 0.175, 1],
        },
      })
      await animationTop.start({
        x: -xDistanceTopText,
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

    // 4.2 ANIMATE BOTTOM TEXT
    async function bottomTextSequence() {
      await animationBottom.start({
        y: yDistanceBottomText,
        transition: {
          delay: 1.25,
          duration: 0.75,
          ease: [0.77, 0, 0.175, 1],
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
    // lock the body for the duration of the animation

    // document.body.style.overflow = "hidden"
    // const unlockBody = () => {
    //   document.body.style.overflow = "visible"
    // }
    // const unlockBodyScroll = () => {
    //   setTimeout(unlockBody, 3000)
    // }
    // unlockBodyScroll()

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // to-do: write the height of the bottom text to state
    // so that the video box can have adequate spacing

    // const bottomBoxHeight = textBottomRef.current.offsetHeight
  }, [animationTop, animationBottom])

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
          onClick={handleModal}
          variants={video}
          initial="initial"
          animate="animate"
        >
          <StaticImage
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
            src="../../images/Home/wwReel.png"
            alt="video reel thumbnail"
            quality={100}
            placeholder="blurred"
          />
          <MobilePlayButton>
            <motion.div
              animate={{
                rotate: 360,
                transition: {
                  repeat: "Infinity",
                  duration: 10,
                  ease: "linear",
                },
              }}
            >
              <PressPlaySVG />
            </motion.div>
            <motion.span>
              <PlayIcon />
            </motion.span>
          </MobilePlayButton>
        </VideoThumbnail>
      </LandingText>
      <Cover variants={loader} initial="initial" animate="animate" />
      <AnimatePresence>
        <Modal
          variants={modal}
          initial="hidden"
          animate={modalOpen ? "visible" : "hidden"}
          onClick={() => setModalOpen(false)}
        >
          <VideoWrapper>
            <ReactPlayer
              className="react-player"
              width="100%"
              height="100%"
              controls={true}
              playsinline={true}
              url="https://www.youtube.com/watch?v=955ll_boJgg"
              // muted={true}
              playing={modalOpen ? true : false}
              // config={{
              //   youtube: {
              //     playerVars: {
              //       color: "white",
              //       playsinline: 1,
              //     },
              //     embedOptions: {
              //       width: 1280,
              //       height: 720,
              //     },
              //   },
              // }}
            />
          </VideoWrapper>
        </Modal>
      </AnimatePresence>
    </>
  )
}

export default LandingPage

const Cover = styled(motion.div)`
  position: absolute;
  /* was: fixed */
  overflow-x: hidden;
  z-index: 998;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--color-black);
`

const Modal = styled(motion.div)`
  position: fixed;
  /* was: fixed */
  overflow-x: hidden;
  z-index: 1998;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #00000060;

  display: flex;
  justify-content: center;
  align-items: center;
`

const VideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  max-width: 90%;
  margin: 0 auto;
  aspect-ratio: 16/9;
  width: 70vw;
  height: auto;

  &.react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 90vw;
  }
`

const VideoThumbnail = styled(motion.div)`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  aspect-ratio: 990/550;
  width: 990px;
  height: auto;
  background-color: #a9f2ed;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10vh;

  /* &.react-player {
    position: absolute;
    top: 0;
    left: 0;
  } */

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
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 17vh;
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
