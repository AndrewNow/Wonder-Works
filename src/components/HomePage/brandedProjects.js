import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import useEmblaCarousel from "embla-carousel-react"
import {
  NextButtonBrandedProjects,
  PrevButtonBrandedProjects,
} from "../../components/EmblaCarousel/buttons"
import { BrandedProjectsGear } from "../../svg/homepage"
import { useAnimation, motion } from "framer-motion"

const BrandedProjects = () => {
  const slideData = [
    {
      brand: `David Guetta`,
      title: `DJ Party`,
      year: `2021`,
      thumbnail: ``,
    },
    {
      brand: `David Guetta2`,
      title: `DJ Party`,
      year: `2021`,
      thumbnail: ``,
    },
    {
      brand: `David Guetta3`,
      title: `DJ Party`,
      year: `2021`,
      thumbnail: ``,
    },
  ]

  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    // slidesToScroll: 3,
    loop: false,
  })

  // ---------- Set up embla pagination buttons ----------
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    onSelect()
  }, [embla, onSelect])

  const [animateGear, setAnimateGear] = useState(false)
  useEffect(() => {
    setAnimateGear(true)
  }, [scrollPrev, scrollNext])


  
  const turnGear = useAnimation()
  // animate gear when left or right buttons are clicked
  useEffect(() => {
    async function animateGear() {
      await turnGear.start({
        rotate: 180,
        transition: { ease: "linear", duration: 4 },
      })
    }
    animateGear()
  }, [])

  return (
    <Wrapper>
      <Title>Branded Projects</Title>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {slideData.map((slide, index) => {
              return (
                <EmblaSlide key={index}>
                  <SlideWrapper>
                    <SlideText>
                      <h3>
                        {slide.brand} <br />
                        {slide.title} <br /> <br />
                        {slide.year}
                      </h3>
                    </SlideText>
                    <SlideMedia></SlideMedia>
                  </SlideWrapper>
                  {/* <ReactPlayer
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
                  /> */}
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <PrevButtonBrandedProjects
          onClick={scrollPrev}
          enabled={prevBtnEnabled}
        />
        <NextButtonBrandedProjects
          onClick={scrollNext}
          enabled={nextBtnEnabled}
        />
      </Embla>
      <GearWrapper animate={turnGear}>
        <BrandedProjectsGear />
      </GearWrapper>
    </Wrapper>
  )
}

export default BrandedProjects

const Wrapper = styled.section`
  background-color: var(--color-black);
  min-height: 100vh;
  padding-bottom: 5rem;
  position: relative;
`

const Title = styled.h1`
  color: var(--color-orange);
  font-family: "ppwoodland-bold";
  padding-top: 10rem;
  padding-bottom: 10rem;
  width: 87.5%;
  margin: 0 auto;
`

const Embla = styled.div`
  width: 80%;
  margin-top: 5rem;
  min-height: 70vh;
  position: relative;
  z-index: 2;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  button:first-of-type {
    left: -3%;
  }

  button:last-of-type {
    right: -3%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    button:first-of-type {
      padding-top: 1rem;
      top: auto;
      bottom: -12%;
      left: 0%;
    }

    button:last-of-type {
      padding-top: 1rem;
      top: auto;
      bottom: -12%;
      right: 3%;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    button:first-of-type {
      padding-top: 1rem;
      top: auto;
      bottom: -10%;
      left: 3%;
    }

    button:last-of-type {
      padding-top: 1rem;
      top: auto;
      bottom: -10%;
      right: 3%;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    button {
      display: none;
    }
  }
`
const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
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
  flex: 0 0 100%;
`

const SlideWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SlideText = styled.div`
  margin-right: 7rem;
  h3 {
    font-family: "calibre-medium";
    color: var(--color-white);
  }
`

const SlideMedia = styled.div`
  aspect-ratio: 16/9;
  width: 720px;
  max-width: 800px;
  background: white;
`

const GearWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 30%;
  right: 10%;
`
