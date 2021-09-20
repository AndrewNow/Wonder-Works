import React, { useState, useCallback, useEffect, useRef } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { Link } from "gatsby"
import { PressPlaySVG } from "./buttons"
import ReactPlayer from "react-player/file"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import breakpoints from "../breakpoints"

const LatestProjectsCarousel = () => {
  // ---------- Initialize Embla Carousel & state ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    inViewThreshold: 1,
    speed: 10,
  })

  const [scrollProgress, setScrollProgress] = useState(0)
  const [slidesInView, setSlidesInView] = useState(0)
  const [paused, setPaused] = useState(true)

  // ---------- Set up embla pagination buttons ----------
  // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
  }, [embla])

  // logic for scrollbar
  const onScroll = useCallback(() => {
    if (!embla) return
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [embla, setScrollProgress])

  // start playing the video if user scrolls to next slide
  const onInView = useCallback(() => {
    if (!embla) return
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setPaused(false)
    // setHover(false)
  }, [embla])

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    onSelect()
    onScroll()
    onInView()
    embla.on("select", onSelect)
    embla.on("scroll", onScroll)
    embla.on("settle", onInView)
  }, [embla, onScroll, onSelect, onInView])

  const videoLinks = [
    {
      Src: "https://touchdesigner.s3.ca-central-1.amazonaws.com/timelapse.mp4",
      light: "https://i.imgur.com/yNmhs4y.png",
    },
    {
      Src: "https://touchdesigner.s3.ca-central-1.amazonaws.com/timelapse.mp4",
      light: false,
    },
    {
      Src: "https://touchdesigner.s3.ca-central-1.amazonaws.com/timelapse.mp4",
      light: false,
    },
  ]

  // ---------- intersection observer to pause video when not in view ----------

  const [videoRef, videoInView] = useInView({
    root: null,
    threshold: 0.6,
    triggerOnce: false,
  })

  const ref = useRef()
  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      videoRef(node)
    },
    [videoRef]
  )

  // ---------- animation logic ----------

  const button = {
    visible: {
      opacity: 1,
      translateY: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeIn",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      translateY: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const rotation = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
    noRotate: {
      rotate: 0,
      transition: {
        duration: 1,
        ease: "linear",
      },
    },
  }

  // const [hover, setHover] = useState(true)
  // const [rotatingButton, setRotatingButton] = useState(true)

  // const setHoverFalse = useCallback(() => {
  //   setHover(false)
  // }, [])
  // const setHoverTrue = useCallback(() => {
  //   setHover(true)
  // }, [])

  const PlayIconReactPlayer = () => {
    return (
      <Playbutton
        // onClick={() => {
        //   setPaused(!paused)
        //   setHover(false)
        // }}
        // onMouseEnter={stopRotate}
        // onMouseLeave={startRotate}
        // onHoverEnd={() => startRotate()}
        // onHoverStart={() => stopRotate()}
        // animate={hover ? "visible" : "hidden"}
        variants={button}
        initial="visible"
        animate="visible"
        exit="hidden"
        aria-label="Play video"
        whileTap={{ scale: 0.9 }}
      >
        <TextWrapper
          variants={rotation}
          // animate={rotatingButton ? "rotate" : "noRotate"}
        >
          <PressPlaySVG />
        </TextWrapper>
        <PlaySVG>
          <svg
            width="115"
            height="98"
            viewBox="0 0 115 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.95"
              d="M4.88815 97.5635L112.083 58.0707C112.709 57.8398 113.253 57.4287 113.648 56.8896C114.042 56.3505 114.268 55.7072 114.298 55.0401C114.328 54.3729 114.16 53.7119 113.816 53.1397C113.472 52.5676 112.966 52.1097 112.362 51.8238L5.16764 1.04777C4.65078 0.802894 4.07992 0.692506 3.50904 0.727272C2.93817 0.762038 2.38557 0.940539 1.90225 1.24632C1.41892 1.55211 1.02028 1.97554 0.74436 2.47651C0.468442 2.97749 0.324674 3.53997 0.324585 4.11191V94.3812C0.324288 94.9277 0.456103 95.4663 0.708749 95.9508C0.961396 96.4353 1.3267 96.8512 1.77491 97.1637C2.22312 97.4763 2.74046 97.6763 3.28243 97.7459C3.8244 97.8155 4.37551 97.7527 4.88815 97.5635Z"
              fill="white"
            />
          </svg>
        </PlaySVG>
      </Playbutton>
    )
  }

  return (
    <Wrapper ref={setRefs}>
      <h2>
        Latest <br />
        Projects
      </h2>
      <Link to="/projects">
        <p>
          View all{" "}
          <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 16.3901L19 9.39014L0 0.390137V16.3901Z" fill="white" />
          </svg>
        </p>
      </Link>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {videoLinks.map((video, index) => {
              return (
                <EmblaSlide
                  key={index}
                  // onHoverStart={setHoverTrue}
                  // onHoverEnd={setHoverFalse}
                >
                  {/* {index >= 1 && (
                    <AnimatePresence>
                      {hover && <PlayIconReactPlayer key={`key${index}1`} />}
                    </AnimatePresence>
                  )} */}
                  <ReactPlayer
                    url={video.Src}
                    width="100%"
                    height="100%"
                    playing={
                      slidesInView === `video[${index}]` &&
                      !paused &&
                      videoInView
                    }
                    onEnded={() => setTimeout(() => scrollNext(), 5000)}
                    // onPlay={() => setTimeout(() => setHover(false), 1000)}
                    // onPause={() => setTimeout(() => setHover(true), 1000)}
                    light={video.light}
                    playIcon={<PlayIconReactPlayer />}
                  />
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <ProgressContainer>
          {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} /> */}
          {/* <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
          <EmblaProgress>
            <EmblaProgressBar
              style={{ transform: `translateX(calc(${scrollProgress}% * 2))` }}
            />
          </EmblaProgress>
        </ProgressContainer>
      </Embla>
    </Wrapper>
  )
}

export default LatestProjectsCarousel

const Wrapper = styled.div`
  padding: 8rem 0;
  width: 90%;
  margin: 0 auto;
  position: relative;
  h2 {
    position: absolute;
    top: 10%;
    left: -2%;
    z-index: 2;
    color: var(--color-white);
  }
  p {
    position: absolute;
    top: 10%;
    right: 0;
    z-index: 2;
    color: var(--color-white);
    transition: var(--hover-transition);
    filter: opacity(0.5);
    :hover {
      filter: opacity(1);
      svg {
        transform: translate3d(5px, 0, 0);
      }
    }
    svg {
      margin-left: 0.2rem;
      padding-top: 0.1rem;
      transition: var(--hover-transition);
    }
  }
`

const Embla = styled.div`
  width: 80%;
  position: relative;
  /* background-color: #f7f7f710; */
  margin-left: auto;
  margin-right: auto;

  & button:first-of-type {
    left: -5%;
  }

  & button:last-of-type {
    right: -5%;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`
const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
  &.is-dragging {
    cursor: grabbing;
  }
`

const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: grab;
`
const EmblaSlide = styled(motion.div)`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  aspect-ratio: 16 / 9;
`

const EmblaProgress = styled.div`
  position: relative;
  background-color: #f4f4f4;
  /* margin-top: 20px; */
  max-width: 80%;
  width: calc(100% - 40px);
  height: 15px;
  overflow: hidden;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  /* top: 75px; */

  @media (max-width: ${breakpoints.l}px) {
    height: 10px;
    max-width: 90%;
  }

  @media (max-width: ${breakpoints.s}px) {
    height: 8px;
    max-width: 90%;
  }
`

const ProgressContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 3rem;

  ::after {
    cursor: pointer;
    content: "Swipe right to view more videos!";
    font-family: "calibre-regular-italic";
    /* display: none; */
    text-align: center;
    color: var(--color-white);
    padding-top: 1rem;
    width: 100%;
    height: 100px;
    opacity: 0;
    transform: translateY(0.5rem);
    position: absolute;
    transition: all 0.75s;
  }
  :hover::after {
    opacity: 1;
    transform: translateY(0rem);
  }
`

const EmblaProgressBar = styled.div`
  position: absolute;
  background-color: #6753a0;
  top: 0px;
  bottom: 0px;
  width: calc(100% / 3);
  /* left: -100%; */
  border-radius: 50px;
`

const Playbutton = styled(motion.button)`
  border: none;
  overflow: hidden;
  background: none;
  background-color: #ffffff50;
  cursor: pointer;
  position: absolute;
  z-index: 50;
  width: 240px;
  height: 240px;
  top: 50%;
  /* transform: translateY(-50%); */
  border-radius: 100%;
  margin: 0 auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    height: 150px;
  }
`

const TextWrapper = styled(motion.div)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 220px;
      height: 220px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 150px;
      height: 150px;
    }
  }
`

const PlaySVG = styled.div`
  margin-left: 2rem;

  @media (max-width: ${breakpoints.l}px) {
    margin-left: 0rem;

    svg {
      width: 75px;
      height: 75px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-left: 0rem;

    svg {
      width: 55px;
      height: 55px;
    }
  }
`
