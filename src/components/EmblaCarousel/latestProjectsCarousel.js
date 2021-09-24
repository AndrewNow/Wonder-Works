import React, { useState, useCallback, useEffect, useRef } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { Link } from "gatsby"
import { PressPlaySVG } from "./buttons"
import ReactPlayer from "react-player/file"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import breakpoints from "../breakpoints"
import { Arrow } from "../../svg/miscellaneous"

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
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      light: "https://i.imgur.com/yNmhs4y.png",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      light: false,
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
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
      translateX: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeIn",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      translateY: "-50%",
      translateX: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const rotation = {
    visible: {
      rotate: 360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
    hidden: {
      rotate: 0,
      transition: {
        duration: 1,
        ease: "linear",
      },
    },
  }

  const [hover, setHover] = useState(true)

  const setHoverFalse = useCallback(() => {
    setHover(false)
  }, [])
  const setHoverTrue = useCallback(() => {
    setHover(true)
  }, [])

  const PlayIconReactPlayer = () => {
    return (
      <Playbutton
        onClick={() => {
          setPaused(!paused)
          setHover(false)
        }}
        aria-label="Play video"
        whileTap={{ scale: 0.9 }}
        variants={button}
        initial="hidden"
        // animate={hover ? "visible" : "hidden"}
        animate="visible"
        exit="hidden"
      >
        <TextWrapper variants={rotation}>
          <PressPlaySVG />
        </TextWrapper>
        {!paused ? (
          <PlaySVG>
            <svg
              width="76"
              height="88"
              viewBox="0 0 76 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.7468 0H4.22895C2.29678 0 0.640625 1.56414 0.640625 3.58833V83.9117C0.640625 85.8438 2.20477 87.5 4.22895 87.5H24.6548C26.587 87.5 28.2432 85.9359 28.2432 83.9117V3.58833C28.2432 1.56414 26.679 0 24.7468 0Z"
                fill="#F7F7FC"
              />
              <path
                d="M71.7631 0H51.2452C49.313 0 47.6569 1.56414 47.6569 3.58833V83.9117C47.6569 85.8438 49.221 87.5 51.2452 87.5H71.6711C73.6032 87.5 75.2594 85.9359 75.2594 83.9117V3.58833C75.2594 1.56414 73.6952 0 71.7631 0Z"
                fill="#F7F7FC"
              />
            </svg>
          </PlaySVG>
        ) : (
          <PauseSVG>
            <svg
              width="78"
              height="89"
              viewBox="0 0 78 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8.70153C0 3.89553 3.86997 0 8.64554 0C10.1286 0 11.0687 0.38982 12.7225 1.05198L73.3695 36.563C76.1897 38.2451 77.4959 40.948 78 44.0639V44.9379C77.4959 48.052 76.1897 50.7558 73.3695 52.4388L12.7233 87.9489C11.0687 88.612 10.1286 89 8.64643 89C3.87086 89 0.0008843 85.1045 0.0008843 80.2985L0 8.70153Z"
                fill="#F7F7FC"
              />
            </svg>
          </PauseSVG>
        )}
      </Playbutton>
    )
  }

  const [firstPlayClick, setFirstPlayClick] = useState(false)

  const PlayButtonFirstSlide = () => {
    return (
      <Playbutton
        onClick={() => {
          setPaused(false)
          setHover(false)
          setFirstPlayClick(true)
        }}
        aria-label="Play video"
        whileTap={{ scale: 0.9 }}
        variants={button}
        initial="visible"
        // animate="visible"
        // exit="hidden"
      >
        <TextWrapper variants={rotation} animate="visible">
          <PressPlaySVG />
        </TextWrapper>
        <PlaySVG>
          <svg
            width="78"
            height="89"
            viewBox="0 0 78 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8.70153C0 3.89553 3.86997 0 8.64554 0C10.1286 0 11.0687 0.38982 12.7225 1.05198L73.3695 36.563C76.1897 38.2451 77.4959 40.948 78 44.0639V44.9379C77.4959 48.052 76.1897 50.7558 73.3695 52.4388L12.7233 87.9489C11.0687 88.612 10.1286 89 8.64643 89C3.87086 89 0.0008843 85.1045 0.0008843 80.2985L0 8.70153Z"
              fill="#F7F7FC"
            />
          </svg>
        </PlaySVG>
      </Playbutton>
    )
  }
  // console.log(slidesInView, paused, videoInView)
  console.log(hover)

  return (
    <Wrapper ref={setRefs}>
      <h2>
        Latest <br />
        Projects{" "}
        <svg
          width="134"
          height="2"
          viewBox="0 0 134 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1H134"
            stroke="#F7F7FC"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </h2>
      <ViewAll to="/projects">
        <p>
          View all
          <Arrow />
        </p>
      </ViewAll>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {videoLinks.map((video, index) => {
              return (
                <EmblaSlide
                  key={index}
                  onHoverStart={firstPlayClick && setHoverTrue}
                  onHoverEnd={firstPlayClick && setHoverFalse}
                >
                  {/* Only render this button on the first slide, since we have the
                  playIcon prop button which handles the initial lazy-loaded video  */}
                  {/* {index == !0 && ( */}
                  {firstPlayClick && (
                    <AnimatePresence>
                      {hover && <PlayIconReactPlayer key={`key${index}1`} />}
                    </AnimatePresence>
                  )}
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
                    light={video.light}
                    playIcon={<PlayButtonFirstSlide />}
                  />
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <ProgressContainer>
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

    svg {
      display: none;
    }
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
      fill: var(--color-white);
      margin-left: 0.3rem;
      transition: var(--hover-transition);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-top: 10rem;
    h2 {
      top: 5%;
      left: 1%;
      font-size: 40px;
      line-height: 100%;
      svg {
        display: inline;
        margin-bottom: 0.75rem;
      }
    }
  }
`
const ViewAll = styled(Link)`
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const ViewAllBottom = styled(Link)`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    display: block;

    p {
      position: relative;
      :hover {
        filter: opacity(1);
        svg {
          transform: translate3d(5px, 0.1rem, 0);
        }
      }
      svg {
        transform: translateY(0.1rem);
      }
    }
  }
`
const Embla = styled.div`
  width: 80%;
  position: relative;
  /* background-color: #f7f7f710; */
  margin-left: auto;
  margin-right: auto;

  /* & button:first-of-type {
    left: -5%;
  }

  & button:last-of-type {
    right: -5%;
  } */

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
    content: "Swipe to view more projects!";
    font-family: "calibre-regular";
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
  left: 50%;
  border-radius: 100%;
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
  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 75px;
      height: 75px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 55px;
      height: 55px;
    }
  }
`
const PauseSVG = styled.div`
  margin-left: 1rem;

  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 75px;
      height: 75px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 55px;
      height: 55px;
    }
  }
`
