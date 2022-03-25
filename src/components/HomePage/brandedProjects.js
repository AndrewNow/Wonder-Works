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
      brand: `Insomniac`,
      title: `World Party`,
      year: `2021`,
      thumbnail: ``,
    },
    {
      title: `Froot Loops`,
      year: `2021`,
      thumbnail: ``,
    },
    {
      title: `Timmeh`,
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
    // animateGear()
  }, [embla, onSelect])

  // const turnGear = useAnimation()
  // // animate gear when left or right buttons are clicked
  // async function animateGear() {
  //   await turnGear.start({
  //     rotate: 180,
  //     transition: { ease: "linear", duration: 0.25 },
  //   })
  // }

  return (
    <Wrapper>
      <Title>
        <h1>Branded Projects</h1>
        <h3>Ushering global brands into the Metaverse</h3>
      </Title>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {slideData.map((slide, index) => {
              return (
                <EmblaSlide key={index}>
                  <SlideWrapper>
                    <SlideText>
                      <h3>
                        {slide.brand && (
                          <>
                            {slide.brand} <br />
                          </>
                        )}
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
      <GearWrapper
        // animate={turnGear}
        animate={{
          rotate: 180,
          transition: {
            repeat: "Infinity",
            ease: "linear",
            duration: 15,
          },
        }}
        initial={{ rotate: 0 }}
      >
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
  overflow-x: hidden;

  @media (max-width: ${breakpoints.s}px) {
    min-height: none;
  }
`

const Title = styled.div`
  padding-top: 10rem;
  padding-bottom: 10rem;
  width: 87.5%;
  margin: 0 auto;
  h1,
  h3 {
    color: var(--color-orange);
  }
  h1 {
    font-family: "ppwoodland-bold";
  }
  h3 {
    font-family: "calibre-regular";
  }
  @media (max-width: ${breakpoints.l}px) {
    h3 {
      padding-top: 1rem;
    }
    padding-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-top: 5rem;
    padding-bottom: 3.5rem;
    h3 {
      padding-top: 2rem;
      font-size: 21px;
      line-height: 120%;
    }
  }
`

const Embla = styled.div`
  width: 80%;
  margin-top: 5rem;
  margin-bottom: 20vh;
  position: relative;
  top: 25%;
  z-index: 2;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  button {
    top: 50%;
  }
  button:first-of-type {
    left: -3%;
  }

  button:last-of-type {
    right: -3%;
  }

  @media (max-width: ${breakpoints.xl}px) {
    button:first-of-type {
      left: -7.5%;
    }

    button:last-of-type {
      right: -7.5%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    button:first-of-type {
      left: -9.5%;
    }

    button:last-of-type {
      right: -9.5%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 2rem;
    margin-bottom: 2rem;

    button:first-of-type {
    top: 110%;
    left: 0%;
  }
  
  button:last-of-type {
    top: 110%;
    right: 0%;
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

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`

const SlideText = styled.div`
  margin-right: 10rem;
  h3 {
    white-space: nowrap;
    font-family: "calibre-medium";
    color: var(--color-white);
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin-right: 5rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin: 2rem;
    align-self: flex-start;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: .75rem;
  }
`

const SlideMedia = styled.div`
  aspect-ratio: 16/9;
  width: 720px;
  max-width: 800px;
  background: white;

  @media (max-width: ${breakpoints.l}px) {
    max-width: 85vw;
  }
`

const GearWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 30%;
  right: 10%;
  aspect-ratio: 1/1;
  width: 33vw;
  height: 33vw;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    max-width: 33vw;
  }

  @media (max-width: ${breakpoints.xl}px) {
    right: 5%;
    width: 40vw;
    height: 40vw;
    svg {
      max-width: 40vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 25%;
    right: 3%;
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 27.5%;
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 33%;
    right: 0;
  }
`
