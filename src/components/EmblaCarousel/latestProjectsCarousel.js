import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { Link } from "gatsby"
import ReactPlayer from "react-player/file"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import breakpoints from "../breakpoints"
import { Arrow } from "../../svg/miscellaneous"
import { PlayIconReactPlayer, PlayButtonLatestProjects } from "./playButtons"
import { NextButtonLatestProjects, PrevButtonLatestProjects } from "./buttons"

const LatestProjectsCarousel = () => {
  // -------------------- 1. Initialize Embla Carousel & State --------------------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    inViewThreshold: 1,
    speed: 10,
  })

  const [scrollProgress, setScrollProgress] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [slidesInView, setSlidesInView] = useState(0)
  const [paused, setPaused] = useState(true)
  const [hover, setHover] = useState(true)
  const [thumbnailClicked, setThumbnailClicked] = useState(false)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  // event handlers for displaying pause/play button
  const setHoverTrue = () => {
    setHover(true)
  }
  const setHoverFalse = () => {
    setHover(false)
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
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  // Start playing the video if user scrolls to next slide
  const onInView = useCallback(() => {
    if (!embla) return
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setPaused(false)
    setHover(false)
    if (slidesInView > 0) {
      setThumbnailClicked(true)
    }
  }, [embla, slidesInView])

  // Scroll to next slide after video ends (see onEnded method for <ReactPlayer/> )
  // also controls left/right buttons
  const scrollNext = useCallback(() => {
    if (!embla) return
    if (!videoInView) return
    if (embla.clickAllowed()) embla.scrollNext()
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setThumbnailClicked(true)
  }, [embla, videoInView])

  const scrollPrev = useCallback(() => {
    if (!embla) return
    if (!videoInView) return
    if (embla.clickAllowed()) embla.scrollPrev()
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setThumbnailClicked(true)
  }, [embla, videoInView])

  // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])

  // Logic for bottom progress bar (pagination)
  const onScroll = useCallback(() => {
    if (!embla) return
    if (!videoInView) return
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
    setScrollProgress(progress * 100)
    // setThumbnailClicked to true if user scrolls past first slide without clicking the intial "light" play button
    if (embla.canScrollPrev()) {
      setThumbnailClicked(true)
    }
  }, [embla, videoInView, setScrollProgress])

  // ----------------------- 4. Run embla configurations -----------------------
  useEffect(() => {
    if (!embla) return
    if (!videoInView) return
    onSelect()
    onScroll()
    onInView()
    embla.on("select", onSelect)
    embla.on("scroll", onScroll)
    embla.on("settle", onInView)
  }, [embla, videoInView, onScroll, onSelect, onInView])

  // ---------------------------- 5. Video data ----------------------------
  // Light: is the first video's thumbnail, loading react-player in "light mode"

  const videoLinks = [
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      // light: "https://i.imgur.com/yNmhs4y.png",
      light: true,
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/EDC+Format.mp4",
      light: true,
    },
    // {
    //   Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
    //   light: "false",
    // },
  ]

  return (
    <Wrapper ref={videoRef}>
      <Title>
        <h2>
          Latest <br />
          Projects
        </h2>
        <svg
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
      </Title>
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
                  onHoverStart={thumbnailClicked && setHoverTrue}
                  onHoverEnd={thumbnailClicked && setHoverFalse}
                >
                  {/* Only render this button after the first slide's button has been pressed or if user slides to second/third slide  */}
                  {thumbnailClicked && (
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
                    url={video.Src}
                    width="100%"
                    height="100%"
                    playing={
                      slidesInView === `video[${index}]` &&
                      !paused &&
                      videoInView
                    }
                    onEnded={() => setTimeout(() => scrollNext(), 1500)}
                    onProgress={({ played }) =>
                      !paused && setVideoProgress(played * 100)
                    }
                    progressInterval={500}
                    light={thumbnailClicked ? false : video.light}
                    playIcon={
                      <PlayButtonLatestProjects
                        setPaused={setPaused}
                        paused={paused}
                        setThumbnailClicked={setThumbnailClicked}
                      />
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
              // style={{ transform: `translateX(calc(${scrollProgress}% * 2))` }}
              style={{ transform: `translateX(calc(${scrollProgress}% * 1))` }}
            />
          </EmblaProgress>
          <PrevButtonLatestProjects
            onClick={scrollPrev}
            enabled={prevBtnEnabled}
          />
          <NextButtonLatestProjects
            onClick={scrollNext}
            enabled={nextBtnEnabled}
          />
        </ProgressContainer>
        <ViewAllBottom to="/projects">
          <p>
            View all
            <Arrow />
          </p>
        </ViewAllBottom>
      </Embla>
      {console.log("paused:" + !paused, "videoInView:" + videoInView)}
    </Wrapper>
  )
}

export default LatestProjectsCarousel

const Wrapper = styled.div`
  padding: 8rem 0;
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin-bottom: 5rem;
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

  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 20rem;
    padding-bottom: 25rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding: 15rem 0;
    padding-bottom: 20rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 15rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding-bottom: 10rem;
    padding-top: 10rem;
  }
`

const Title = styled.div`
  position: absolute;
  top: 10%;
  left: -2%;
  z-index: 2;
  color: var(--color-white);

  svg {
    display: none;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    top: 8%;
  }

  @media (max-width: ${breakpoints.xl}px) {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    top: 6.5%;
    left: 0%;
    h2 {
      font-size: 100px;
      line-height: 100%;
    }
    svg {
      width: 100%;
      align-self: flex-end;
      margin-bottom: 2rem;
      border: 1px solid var(--color-white);
      margin-left: 1rem;
      display: inline;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 80px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 10%;
    h2 {
      font-size: 60px;
    }
    svg {
      margin-bottom: 1.25rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      font-size: 45px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h2 {
      font-size: 32px;
    }
    svg {
      margin-bottom: 0.65rem;
    }
  }
  /* @media (max-width: ${breakpoints.s}px) {
    top: 15%;
    h2 {
      font-size: 45px;
      line-height: 100%;
    }
    svg {
      margin-bottom: .85rem;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h2 {
      font-size: 32px;
    }
    svg {
      margin-bottom: 0.5rem;
    }
  } */
`

const ViewAll = styled(Link)`
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const ViewAllBottom = styled(Link)`
  display: none;
  @media (max-width: ${breakpoints.xl}px) {
    display: block;
    float: right;
    position: absolute;
    right: 8%;
    /* bottom: -18.5%; */
    bottom: -55%;
    p {
      filter: opacity(1);
      font-size: 24px;
      position: relative;
      :hover {
        filter: opacity(1);
        svg {
          transform: translate3d(5px, 0.15rem, 0);
        }
      }
      svg {
        margin-left: 20px;
        transform: translateY(0.15rem);
      }
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: -65%;
    p {
      font-size: 22px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    float: right;
    position: absolute;
    right: 5%;
    bottom: -90%;
    p {
      font-size: 16px;
      filter: opacity(1) !important;
      color: var(--color-white);
      position: relative;
      :hover {
        svg {
          transform: translate3d(5px, 0.4rem, 0);
        }
      }
      svg {
        margin-left: 5px;
        scale: 0.7;
        transform: translateY(0.4rem);
      }
    }
  }
  @media (max-width: 470px) {
    bottom: -100%;
  }
  @media (max-width: 400px) {
    bottom: -85%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    bottom: -70%;
  }
`
const Embla = styled.div`
  width: 80%;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${breakpoints.xl}px) {
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
  aspect-ratio: 16 / 9;
  width: 100%;
  height: 100%;
  min-height: 600px;
  min-width: 72vw;
  min-width: calc(80vw * 90% / 100); // 80% (const Embla) of 90% (const Wrapper)

  @media (max-width: ${breakpoints.xxl}px) {
    min-height: 600px;
    min-width: 100%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    min-width: 90vw;
    min-height: 500px;
  }
  @media (max-width: ${breakpoints.l}px) {
    min-height: 410px;
  }
  @media (max-width: ${breakpoints.m}px) {
    min-height: 200px;
  }
  @media (max-width: ${breakpoints.s}px) {
    min-height: 187px;
    min-width: 90vw;
  }

  @media (max-width: ${breakpoints.xs}px) {
    min-height: 160px;
  }
`

const EmblaProgress = styled.div`
  position: relative;
  background-color: #f4f4f4;
  max-width: 80%;
  width: calc(100% - 40px);
  height: 15px;
  overflow: hidden;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;

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

  /* ::after {
    cursor: pointer;
    content: "Swipe to view more projects!";
    font-family: "calibre-regular";
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
  } */

  & button:nth-child(2) {
    left: 33%;
    bottom: -100px;
    position: absolute;
  }
  & button:nth-child(3) {
    bottom: -100px;
    right: 33%;
    position: absolute;
  }
  & button {
    border: 2px solid var(--color-white);
    border-radius: 50%;
    width: 65px;
    height: 65px;
  }
  @media (max-width: ${breakpoints.s}px) {
    button {
      border: 1px solid var(--color-white);
      width: 50px;
      height: 50px;
    }
    & button:nth-child(2) {
      left: 25%;
    }
    & button:nth-child(3) {
      right: 25%;
    }
  }
`

const EmblaProgressBar = styled.div`
  position: absolute;
  background-color: #6753a0;
  top: 0px;
  bottom: 0px;
  width: calc(100% / 2);
  //divided by number of total slides
  /* width: calc(100% / 3); */
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

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`
