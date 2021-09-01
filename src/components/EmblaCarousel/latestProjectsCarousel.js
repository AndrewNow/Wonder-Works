import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { NextButton, PrevButton } from "./buttons"
import ReactPlayer from "react-player/lazy"

const LatestProjectsCarousel = () => {
  // ---------- Initialize Embla Carousel & state ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    inViewThreshold: 1,
    speed: 5,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [slidesInView, setSlidesInView] = useState(0)
  const [paused, setPaused] = useState(true)

  // ---------- Set up embla pagination buttons ----------
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
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
  }, [embla])

  console.log(slidesInView, paused)

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

  return (
    <Wrapper>
      <h2>
        Latest <br />
        Projects
      </h2>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {videoLinks.map((video, index) => {
              return (
                <EmblaSlide key={index}>
                  <ReactPlayer
                    url={video.Src}
                    width="100%"
                    height="100%"
                    playing={slidesInView === `video[${index}]` && !paused}
                    onEnded={() => setTimeout(scrollNext(), 5000)}
                    light={video.light}
                  />
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>

        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        <EmblaProgress>
          <EmblaProgressBar
            style={{ transform: `translateX(calc(${scrollProgress}% * 2))` }}
          />
        </EmblaProgress>
      </Embla>
      <button
        onClick={() => {
          setPaused(!paused)
        }}
      >
        {paused ? "play video" : "pause video"}
      </button>
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
const EmblaSlide = styled.div`
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
  top: 75px;
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
