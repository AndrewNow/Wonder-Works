import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import ReactPlayer from "react-player/file"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import * as Svg from "../../svg/projectspage"
import { Arrow } from "../../svg/miscellaneous"
import breakpoints from "../breakpoints"
import { PlayButtonProjectsPageMobile } from "./playButtons"

const ProjectsPageCarousel = () => {
  // ---------- Initialize Embla Carousel & state ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    inViewThreshold: 1,
    speed: 10,
  })

  const [paused, setPaused] = useState(true)

  // const [selectedIndex, setSelectedIndex] = useState(0)
  const [slidesInView, setSlidesInView] = useState(0)
  // const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
  //   containScroll: "keepSnaps",
  //   selectedClass: "",
  //   dragFree: true,
  // })

  // ---------- Set up embla navigation buttons ----------
  const onThumbClick = useCallback(
    index => {
      if (
        !embla
        // || !emblaThumbs
      )
        return
      // if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
      if (embla.clickAllowed()) embla.scrollTo(index)
      setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
      setPaused(false)
      setHover(false)
      setThumbnailClick(true)
    },

    [
      embla,
      // emblaThumbs
    ]
  )

  // const onSelect = useCallback(() => {
  //   if (!embla || !emblaThumbs) return
  //   setSlidesInView(embla.selectedScrollSnap())
  // }, [embla, emblaThumbs, setSlidesInView])

  // ---------- Set up embla pagination buttons ----------
  // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  // start playing the video if user scrolls to next slide
  const onInView = useCallback(() => {
    if (!embla) return
    setSlidesInView("video" + JSON.stringify(embla.slidesInView()))
    setPaused(false)
    setHover(false)
  }, [embla])

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    // onSelect()
    onInView()
    // embla.on("select", onSelect)
    embla.on("settle", onInView)
  }, [
    embla,
    // onSelect,
    onInView,
  ])

  const videoLinks = [
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      // light: "https://i.imgur.com/yNmhs4y.png",
      light: true,
      trailerbuttontext: "Overlook bay",
      trailerbuttoncolor: "var(--color-green)",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      // light: false,
      light: true,
      trailerbuttontext: "Traitor",
      trailerbuttoncolor: "var(--color-pink)",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      // light: false,
      light: true,
      trailerbuttontext: "Timmeh",
      trailerbuttoncolor: "var(--color-lightblue)",
    },
    // {
    //   Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
    //   light: false,
    //   trailerbuttontext: "World of havoc",
    //   trailerbuttoncolor: "var(--color-orange)",
    // },
  ]

  const [hover, setHover] = useState(true)

  const setHoverTrue = useCallback(() => {
    setHover(true)
  }, [])

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

  const [thumbnailClick, setThumbnailClick] = useState(false)

  return (
    <Wrapper ref={videoRef}>
      <MobileText>
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
                <EmblaSlide key={index} onHoverStart={setHoverTrue}>
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
                    // onPlay={() =>d setTimeout(() => setHover(false), 1000)}
                    // onPause={() => setTimeout(() => setHover(true), 1000)}
                    light={video.light}
                    playIcon={
                      <PlayButtonProjectsPageMobile setPaused={setPaused} />
                    }
                  />
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
              <motion.div>
                <span>
                  {slidesInView === `video[${index}]` && videoInView && (
                    <motion.div
                      variants={thumbnailBlink}
                      initial="hidden"
                      animate={thumbnailClick ? "visible" : "hidden"}
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
              </motion.div>
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

const MobileText = styled.div`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    h2, p {
      color: var(--color-white);
    }
    h2 {
      font-size: 29px;
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
  min-width: 100%;
  min-height: 100%;
  aspect-ratio: 16 / 9;
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
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 65%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 75%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
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
  padding: 0.5rem 2rem;
  margin: 0 0.5rem;
  border-radius: 40px;
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  span {
    display: flex;
    position: relative;

    div {
      left: -20px;
      top: -10%;
      position: absolute;
    }
  }
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
      scale: 0.8;
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
