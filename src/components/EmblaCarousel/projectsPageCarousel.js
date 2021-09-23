import React, { useState, useRef, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import ReactPlayer from "react-player/file"
import { useInView } from "react-intersection-observer"
import { AnimatePresence, motion } from "framer-motion"
import * as SVG from "../../svg/projectspage"
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
      light: "https://i.imgur.com/yNmhs4y.png",
      trailerbuttontext: "Traitor",
      trailerbuttoncolor: "var(--color-pink)",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      light: false,
      trailerbuttontext: "Overlook bay",
      trailerbuttoncolor: "var(--color-green)",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      light: false,
      trailerbuttontext: "Timmeh",
      trailerbuttoncolor: "var(--color-lightblue)",
    },
    {
      Src: "https://ww-project-trailers.s3.us-west-1.amazonaws.com/V2+-+TIMMEH+GAMEPLAY+TRAILER.mp4",
      light: false,
      trailerbuttontext: "World of havoc",
      trailerbuttoncolor: "var(--color-orange)",
    },
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

  const ref = useRef()
  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      videoRef(node)
    },
    [videoRef]
  )

  // const overlayParent = {
  //   visible: {
  //     transition: {
  //       duration: 2,
  //       delay: 2.2,
  //       delayChildren: 0.2,
  //       staggerChildren: 0.2,
  //       staggerDirection: 1,
  //     },
  //   },
  // }
  // const overlayChildren = {
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.75,
  //       type: "spring",
  //       stiffness: 100,
  //       damping: 11,
  //     },
  //   },
  //   hidden: {
  //     y: 200,
  //     opacity: 0,
  //   },
  // }

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

  const InitialVideoOverlay = () => {
    return (
      <AnimatePresence>
        <Background>
          <BackgroundText>
            <h2>Discover what’s in the works at Wonder Works Studio.</h2>
            <p>
              We’re always dreaming up new adventures in exciting roleplay games
              for immersive, imaginative fun for everyone. Check out our
              ambitious new projects or our latest launches—they all live here.{" "}
            </p>
          </BackgroundText>
        </Background>
      </AnimatePresence>
    )
  }

  return (
    <Wrapper ref={setRefs}>
      <Embla
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ duration: .75}}
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
                    // onPlay={() => setTimeout(() => setHover(false), 1000)}
                    // onPause={() => setTimeout(() => setHover(true), 1000)}
                    light={video.light}
                    playIcon={<InitialVideoOverlay />}
                  />
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <WatchTrailers>
          <h5>Watch Trailers</h5>
        </WatchTrailers>
        <EmblaThumbnails
        // ref={thumbViewportRef}
        >
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
              <motion.p style={{ color: `${video.trailerbuttoncolor}` }}>
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
                  {video.trailerbuttontext}
                </span>
              </motion.p>
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
          <SVG.KeepGoingSVG />
        </TextWrapper>
        <ArrowWrapper>
          <SVG.KeepGoingArrow />
        </ArrowWrapper>
      </KeepGoing>
    </Wrapper>
  )
}

export default ProjectsPageCarousel

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a174899;
  backdrop-filter: blur(2px);
`

const BackgroundText = styled.span`
  position: absolute;
  top: 40%;
  left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2,
  p {
    color: var(--color-white);
    width: 61%;
  }
  p {
    padding-top: 2rem;
  }
`

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
`

const Embla = styled(motion.div)`
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
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`

const Thumb = styled(motion.button)`
  background: none;
  text-transform: uppercase;
  padding: 1rem 2rem;
  margin: 0 0.5rem;
  border-radius: 40px;
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  /* position: relative; */

  span {
    display: flex;
    position: relative;

    div {
      left: -20px;
      top: -10%;
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
`

const ArrowWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  svg {
    margin: 0;
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
