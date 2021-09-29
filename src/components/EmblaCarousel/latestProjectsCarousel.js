import React, { useState, useCallback, useEffect, useRef } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { Link } from "gatsby"
import ReactPlayer from "react-player/file"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import breakpoints from "../breakpoints"
import { Arrow } from "../../svg/miscellaneous"
import { PlayIconReactPlayer, PlayButtonFirstSlide } from "./playButtons"

const LatestProjectsCarousel = () => {
  // -------------------- 1. Initialize Embla Carousel & State --------------------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    inViewThreshold: 1,
    speed: 10,
  })

  const [firstPlayClick, setFirstPlayClick] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [slidesInView, setSlidesInView] = useState(0)
  const [paused, setPaused] = useState(true)
  const [hover, setHover] = useState(true)

  // event handlers for displaying pause/play button
  const setHoverTrue = () => {
    // only execute if first play button has been clicked
    firstPlayClick && setHover(true)
  }
  const setHoverFalse = () => {
    // only execute if first play button has been clicked
    firstPlayClick && setHover(false)
  }

  // ---------- 2. Intersection observer to pause video when not in view ----------
  const [videoRef, videoInView] = useInView({
    root: null,
    threshold: 0.6,
    triggerOnce: false,
  })

  // ----------------------- 3. Set up embla configurations -----------------------

  // Run embla when the scroll snap changes
  const onSelect = useCallback(() => {
    if (!embla) return
  }, [embla])

  // Start playing the video if user scrolls to next slide
  const onInView = useCallback(() => {
    if (!embla) return
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setPaused(false)
  }, [embla])

  // Scroll to next slide after video ends (see onEnded method for <ReactPlayer/> )
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  // Logic for bottom progress bar (pagination)
  const onScroll = useCallback(() => {
    if (!embla) return
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
    setScrollProgress(progress * 100)
    // setFirstPlayClick to true if user scrolls past first slide without clicking the intial "light" play button
    if (embla.canScrollPrev()) {
      setFirstPlayClick(true)
    }
  }, [embla, setScrollProgress])

  // ----------------------- 4. Run embla configurations -----------------------
  useEffect(() => {
    if (!embla) return
    onSelect()
    onScroll()
    onInView()
    embla.on("select", onSelect)
    embla.on("scroll", onScroll)
    embla.on("settle", onInView)
  }, [embla, onScroll, onSelect, onInView])

  // ---------------------------- 5. Video data ----------------------------
  // Light: is the first video's thumbnail, loading react-player in "light mode"

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

  return (
    <Wrapper ref={videoRef}>
      <h2>
        Latest <br />
        Projects
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
            vectorEffect="non-scaling-stroke"
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
                  onHoverStart={setHoverTrue}
                  onHoverEnd={setHoverFalse}
                >
                  {/* Only render this button after the first slide's button has been pressed or if user slides to second/third slide  */}
                  {firstPlayClick && (
                    <AnimatePresence>
                      {hover && (
                        <PlayIconReactPlayer
                          key={`key${index}1`}
                          paused={paused}
                          setPaused={setPaused}
                          setHover={setHover}
                        />
                      )}
                    </AnimatePresence>
                  )}
                  <ReactPlayer
                    light={video.light}
                    url={video.Src}
                    width="100%"
                    height="100%"
                    onEnded={() => setTimeout(() => scrollNext(), 1500)}
                    onProgress={({ played }) =>
                      !paused && setVideoProgress(played * 100)
                    }
                    progressInterval={500}
                    playIcon={
                      <PlayButtonFirstSlide
                        setPaused={setPaused}
                        setFirstPlayClick={setFirstPlayClick}
                      />
                    }
                    playing={
                      slidesInView === `video[${index}]` &&
                      !paused &&
                      videoInView
                    }
                  />
                  <VidProgressContainer>
                    <VideoProgress
                      animate={{ x: `${videoProgress}%` }}
                      transition={{ ease: "linear", duration: 0.5 }}
                    />
                  </VidProgressContainer>
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
        <ViewAllBottom to="/projects">
          <p>
            View all
            <Arrow />
          </p>
        </ViewAllBottom>
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
        margin-left: 1rem;
        margin-bottom: 0.75rem;
      }
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h2 {
      font-size: 32px;
      svg {
        width: 40%;
        margin-bottom: 0.5rem;
      }
    }
  }
`
const ViewAll = styled(Link)`
  @media (max-width: ${breakpoints.xl}px) {
    p {
      :hover {
        filter: opacity(1);
        svg {
          transform: translate3d(5px, 0.2rem, 0);
        }
      }
      svg {
        transform: translateY(0.2rem);
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const ViewAllBottom = styled(Link)`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    display: block;
    float: right;
    position: absolute;
    right: 0%;
    bottom: -20%;
    p {
      position: relative;
      :hover {
        filter: opacity(1);
        svg {
          transform: translate3d(5px, 0.25rem, 0);
        }
      }
      svg {
        scale: 0.8;
        transform: translateY(0.25rem);
      }
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    float: right;
    position: absolute;
    right: 0%;
    bottom: -30%;
    p {
      filter: opacity(1) !important;
      color: var(--color-white);
      position: relative;
      :hover {
        svg {
          transform: translate3d(5px, 0.4rem, 0);
        }
      }
      svg {
        scale: 0.6;
        transform: translateY(0.4rem);
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

const VideoProgress = styled(motion.div)`
  position: absolute;
  background-color: var(--color-white);
  opacity: 0.7;
  width: 100%;
  top: 0px;
  bottom: 0px;
  left: -100%;
`

const VidProgressContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 10;
  margin-top: 20px;
  max-width: 100%;
  width: calc(100% - 40px);
  height: 3px;
  overflow: hidden;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  /* top: 75px; */

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
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
