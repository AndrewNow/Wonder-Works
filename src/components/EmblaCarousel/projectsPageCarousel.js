import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import ReactPlayer from "react-player/file"
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import * as Svg from "../../svg/projectspage"
import { Arrow } from "../../svg/miscellaneous"
import breakpoints from "../breakpoints"
import {
  PlayButtonProjectsPage,
  PlayIconReactPlayer,
} from "./playButtons"

const ProjectsPageCarousel = () => {
  // ---------- Initialize Embla Carousel & state ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    inViewThreshold: 1,
    speed: 10,
  })

  const [paused, setPaused] = useState(true)
  const [slidesInView, setSlidesInView] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [thumbnailClicked, setThumbnailClicked] = useState(false)

  // start playing the video if user scrolls to next slide
  const onInView = useCallback(() => {
    if (!embla) return
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setPaused(false)
    setHover(false)
    if (slidesInView > 0) {
      setThumbnailClicked(true)
    }
  }, [embla, slidesInView])

  // ---------- Set up embla navigation buttons ----------
  const onThumbClick = useCallback(
    index => {
      if (!embla) return
      if (embla.clickAllowed()) embla.scrollTo(index)
      setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
      setThumbnailClicked(true)
      setPaused(false)
      setHover(false)
      onInView()
    },

    [embla, onInView]
  )

  // ---------- Set up embla pagination buttons ----------
  // scroll to next slide when video ends
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    onInView()
    embla.on("settle", onInView)
  }, [embla, onInView])

  const videoLinks = [
    // {
    //   Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
    //   light: true,
    //   trailerbuttontext: "Overlook bay",
    //   trailerbuttoncolor: "var(--color-green)",
    // },
    // {
    //   Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
    //   light: true,
    //   trailerbuttontext: "Traitor",
    //   trailerbuttoncolor: "var(--color-pink)",
    // },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      light: true,
      trailerbuttontext: "Timmeh",
      trailerbuttoncolor: "var(--color-lightblue)",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/EDC+Format.mp4",
      light: true,
      trailerbuttontext: "EDC",
      trailerbuttoncolor: "var(--color-orange)",
    },
    // {
    //   Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
    //   light: true,
    //   trailerbuttontext: "World of havoc",
    //   trailerbuttoncolor: "var(--color-orange)",
    // },
  ]

  const [hover, setHover] = useState(true)

  // event handlers for displaying pause/play button
  const setHoverTrue = () => {
    setHover(true)
  }
  const setHoverFalse = () => {
    setHover(false)
  }
  // ---------- intersection observer to pause video when not in view ----------

  const [videoRef, videoInView] = useInView({
    root: null,
    threshold: 0.6,
    triggerOnce: false,
  })

  const thumbnailBlink = {
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  return (
    <Wrapper ref={videoRef}>
      <MobileText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        <h2>
          Discover <br /> what’s in the works at Wonder Works Studio.
        </h2>
      </MobileText>

      <Embla
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
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
                    style={{position: "absolute"}}
                    url={video.Src}
                    width="100%"
                    height="100%"
                    playing={
                      slidesInView === `video[${index}]` &&
                      !paused &&
                      videoInView
                    }
                    onEnded={() => setTimeout(() => scrollNext(), 5000)}
                    onProgress={({ played }) =>
                      !paused && setVideoProgress(played * 100)
                    }
                    progressInterval={500}
                    light={thumbnailClicked ? false : video.light}
                    playIcon={
                      <PlayButtonProjectsPage
                        setPaused={setPaused}
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
        <WatchTrailers>
          <h5>Watch Trailers</h5>
        </WatchTrailers>
        <EmblaThumbnails>
          {videoLinks.map((video, index) => (
            <Thumb
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onThumbClick(index)}
              key={index}
              style={{
                color: `${video.trailerbuttoncolor}`,
                border: `2px solid ${video.trailerbuttoncolor}`,
              }}
            >
              <ThumbInner>
                <span>
                  {slidesInView === `video[${index}]` && videoInView && (
                    <motion.div
                      variants={thumbnailBlink}
                      initial="hidden"
                      animate={thumbnailClicked ? "visible" : "hidden"}
                      exit="hidden"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill={`${video.trailerbuttoncolor}`}
                        />
                      </svg>
                    </motion.div>
                  )}
                  <p style={{ color: `${video.trailerbuttoncolor}` }}>
                    {video.trailerbuttontext}
                  </p>
                </span>
              </ThumbInner>
              <Arrow style={{ fill: `${video.trailerbuttoncolor}` }} />
            </Thumb>
          ))}
        </EmblaThumbnails>
      </Embla>
      <KeepGoing>
        <TextWrapper
          animate={{
            rotate: 360,
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Svg.KeepGoingSVG />
        </TextWrapper>
        <ArrowWrapper>
          <Svg.KeepGoingArrow />
        </ArrowWrapper>
      </KeepGoing>
      <MobileText>
        <p>
          We’re always dreaming up new adventures in exciting roleplay games for
          immersive, imaginative fun for everyone. Check out our ambitious new
          projects or our latest launches—they all live here.
        </p>
      </MobileText>
    </Wrapper>
  )
}

export default ProjectsPageCarousel

const Wrapper = styled.div`
  padding: 5rem 0;
  width: 90%;
  margin: 0 auto;
  position: relative;
  svg {
    margin-left: 0.2rem;
    padding-top: 0.1rem;
    transition: var(--hover-transition);
  }
  @media (max-width: ${breakpoints.xxl}px) {
    padding-top: 7rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding: 10rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 0;
  }
`

const MobileText = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    h2,
    p {
      color: var(--color-white);
    }
    h2 {
      font-size: 29px !important;
      line-height: 32px;
      padding-top: 6rem;
      padding-bottom: 2rem;
    }

    p {
      margin-top: 8rem;
      padding-bottom: 3rem;
    }
  }
`

const Embla = styled(motion.div)`
  width: 80%;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 95%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 99%;
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
  min-width: 72vw; // 80% (embla) of 90% (const Embla)

  @media (max-width: ${breakpoints.xxl}px) {
    min-height: 600px;
    min-width: 100%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    min-width: 90vw;
    min-height: 400px;
  }
  @media (max-width: ${breakpoints.l}px) {
    min-height: 380px;
  }
  @media (max-width: ${breakpoints.s}px) {
    min-height: 187px;
    min-width: 90vw;
  }

  @media (max-width: ${breakpoints.xs}px) {
    min-height: 160px;
  }
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

const WatchTrailers = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
  h5 {
    color: var(--color-white);
  }
`

const EmblaThumbnails = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 0 1rem;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 55%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 75%;
    /* display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr; */
    gap: 1.5rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
    padding: 0;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 95%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 99%;
    gap: 0.5rem;
    row-gap: 1rem;
  }
`

const Thumb = styled(motion.button)`
  background: none;
  text-transform: uppercase;
  padding: 0.5rem 1.25rem;
  margin: 0 1.5rem;
  border-radius: 40px;
  box-sizing: border-box;
  cursor: pointer;
  width: 195px;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${breakpoints.xl}px) {
    justify-content: space-between;
    max-width: 280px;
    p {
      font-size: 22px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    p {
      font-size: 20px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 0.5rem 1rem;
    p {
      font-size: 18px;
    }
    span {
      div {
        display: none;
      }
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 0;
    padding: 0.5rem 0.5rem;
    padding-left: 0.7rem;
    max-width: 160px;
    p {
      white-space: nowrap;
      font-size: 16px;
      line-height: 15px;
      font-family: "calibre-medium";
    }
    svg {
      padding-top: 0;
      scale: 0.7;
    }
  }
`

const ThumbInner = styled(motion.div)`
  display: flex;
  width: 100%;
  text-align: center;
  span {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    align-items: center;
    position: relative;

    div {
      left: -5px;
      top: 7px;
      position: absolute;
    }
  }
`

const KeepGoing = styled.div`
  right: 2.5%;
  bottom: 6%;
  width: 71px;
  height: 71px;
  position: absolute;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.m}px) {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    svg {
      /* scale: 0.8; */
      transform: scale(.8);
      padding: 0;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    bottom: 160px;
  }
`

const ArrowWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  svg {
    margin: 0;
    transform: translate3d(-1, -2px, 0);
  }
`

const TextWrapper = styled(motion.div)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  svg {
    width: 71px;
    height: 71px;
    margin: 0;
  }
`
