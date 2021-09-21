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

  const [muted, setMuted] = useState(false)

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
      </ViewAll>
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
                    muted={muted}
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
          <ButtonWrapper>
            <GroupButtons>
              {console.log(slidesInView, paused, videoInView)}
              <Play onClick={() => setPaused(!paused)} aria-label="Play button">
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.471324 10.899L11.5651 6.41654C11.63 6.39033 11.6864 6.34402 11.7275 6.28348C11.7685 6.22295 11.7924 6.15085 11.7959 6.07622C11.7994 6.00159 11.7825 5.92775 11.7474 5.86397C11.7122 5.80019 11.6603 5.74929 11.5982 5.71767L0.565105 0.103908C0.511907 0.076835 0.453043 0.0648364 0.39408 0.0690727C0.335117 0.073309 0.277945 0.0936103 0.227839 0.128106C0.177733 0.162601 0.13629 0.210202 0.107466 0.266402C0.0786421 0.322602 0.0634205 0.385602 0.0630266 0.44957L0.00230304 10.5458C0.00190474 10.6069 0.0151515 10.6671 0.0409099 10.7211C0.0666682 10.7752 0.104104 10.8214 0.150169 10.8561C0.196234 10.8908 0.249511 10.9129 0.30542 10.9203C0.361329 10.9278 0.418269 10.9204 0.471324 10.899V10.899Z"
                    fill="white"
                  />
                </svg>
              </Play>
              <Mute onClick={() => setMuted(!muted)} aria-label="Mute button">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6447 8.50781C11.1814 8.48966 11.69 8.271 12.063 7.89791C12.4361 7.52482 12.6447 7.02644 12.6447 6.50781C12.6447 5.98918 12.4361 5.49081 12.063 5.11772C11.69 4.74463 11.1814 4.52597 10.6447 4.50781V8.50781Z"
                    fill="#F7F7FC"
                  />
                  <path
                    d="M10.6447 10.5078V9.44742C11.0307 9.44742 11.4129 9.37138 11.7696 9.22366C12.1262 9.07593 12.4503 8.8594 12.7233 8.58643C12.9962 8.31346 13.2128 7.9894 13.3605 7.63275C13.5082 7.2761 13.5843 6.89385 13.5843 6.50781C13.5843 6.12178 13.5082 5.73952 13.3605 5.38287C13.2128 5.02622 12.9962 4.70216 12.7233 4.4292C12.4503 4.15623 12.1262 3.9397 11.7696 3.79197C11.4129 3.64424 11.0307 3.56821 10.6447 3.56821V2.50781C11.7055 2.50781 12.7229 2.92924 13.4731 3.67939C14.2232 4.42953 14.6447 5.44695 14.6447 6.50781C14.6447 7.56868 14.2232 8.58609 13.4731 9.33624C12.7229 10.0864 11.7055 10.5078 10.6447 10.5078Z"
                    fill="#F7F7FC"
                  />
                  <path
                    d="M9.6743 0.376613C9.67693 0.303307 9.6568 0.230937 9.61654 0.168994C9.57627 0.10705 9.51777 0.0584251 9.44869 0.029496C9.37961 0.000566805 9.30318 -0.00731603 9.22943 0.00688132C9.15568 0.0210787 9.08804 0.0566934 9.0354 0.109055L4.96342 4.093H1.01758C0.91867 4.093 0.823816 4.13134 0.75388 4.19958C0.683943 4.26782 0.644653 4.36037 0.644653 4.45688V8.75654C0.644653 8.85305 0.683943 8.94561 0.75388 9.01385C0.823816 9.08209 0.91867 9.12042 1.01758 9.12042H4.80986C4.86069 9.11862 4.91134 9.12721 4.95857 9.14564C5.00579 9.16407 5.04854 9.19194 5.08407 9.22745L9.0354 13.0963C9.08804 13.1487 9.15568 13.1843 9.22943 13.1985C9.30318 13.2127 9.37961 13.2048 9.44869 13.1759C9.51777 13.147 9.57627 13.0983 9.61654 13.0364C9.6568 12.9745 9.67693 12.9021 9.6743 12.8288V0.376613Z"
                    fill="#F7F7FC"
                  />
                </svg>
              </Mute>
            </GroupButtons>
            <ViewAllBottom to="/projects">
              <p>
                View all{" "}
                <svg
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16.3901L19 9.39014L0 0.390137V16.3901Z"
                    fill="white"
                  />
                </svg>
              </p>
            </ViewAllBottom>
          </ButtonWrapper>
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
      margin-left: 0.2rem;
      padding-top: 0.1rem;
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
          transform: translate3d(5px, .1rem, 0);
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 4rem;

  @media (max-width: ${breakpoints.l}px) {
    max-width: 90%;
  }

  @media (max-width: ${breakpoints.s}px) {
    max-width: 90%;
  }
`

const GroupButtons = styled.div`
  display: flex;
  justify-content: space-between;
`

const Play = styled.button`
  cursor: pointer;
  width: 40px;
  height: auto;
  aspect-ratio: 1/1;
  border: 1px solid var(--color-white);
  background: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    transform: translateX(0.05rem);
  }
`

const Mute = styled.button`
  margin-left: 2rem;
  cursor: pointer;
  width: 40px;
  height: auto;
  aspect-ratio: 1/1;
  border: 1px solid var(--color-white);
  background: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transform: translateX(-.05rem);
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
