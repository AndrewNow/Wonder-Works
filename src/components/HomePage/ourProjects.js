import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import useEmblaCarousel from "embla-carousel-react"
import {
  NextButtonOurProjects,
  PrevButtonOurProjects,
} from "../EmblaCarousel/buttons"
import { OurProjectsGear } from "../../svg/homepage"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  line,
  word,
  textFadeIn,
  textChild,
} from "../../components/textAnimationValues"
import ReactPlayer from "react-player/youtube"

const OurProjects = () => {
  const slideData = [
    {
      brand: `David Guetta`,
      title: `DJ Party`,
      year: `2022`,
      thumbnail: ``,
      url: `https://www.youtube.com/watch?v=pyYjAjB8IrY`,
    },
    {
      // brand: `F21`,
      title: `F21`,
      year: `2021`,
      url: `https://www.youtube.com/watch?v=1bWLL0NgTHo`,
    },
    {
      brand: `Insomniac`,
      title: `World Party`,
      year: `2021`,
      url: `https://www.youtube.com/watch?v=f41TFY--g0Q`,
    },
    {
      title: `Timmeh`,
      year: `2021`,
      url: `https://www.youtube.com/watch?v=iaKlmpe3dlo`,
    },
    {
      title: `Froot Loops`,
      year: `2021`,
      url: `https://www.youtube.com/watch?v=DOrLX8ESrIc`,
    },
    {
      title: `Overlook RP`,
      year: `2021`,
      url: `https://www.youtube.com/watch?v=7BRe0-4WTzI`,
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



  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <Wrapper>
      <Title ref={sectionRef}>
        <motion.h1
          variants={line}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.span variants={word}>Our</motion.span>
          <motion.span variants={word}>Projects</motion.span>
        </motion.h1>
        <motion.h3
          variants={textFadeIn}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.span variants={textChild}>
            Ushering global brands into the Metaverse
          </motion.span>
        </motion.h3>
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
                    <SlideMedia>
                      {/* <ReactPlayer
                        className="react-player"
                        url={slide.url}
                        width="100%"
                        height="100%"
                        controls={true}
                        playsinline={true}
                        config={{
                          youtube: {
                            playerVars: {
                              color: "white",
                              playsinline: 1,
                            },
                          },
                        }}
                      /> */}
                    </SlideMedia>
                  </SlideWrapper>
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <PrevButtonOurProjects onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButtonOurProjects onClick={scrollNext} enabled={nextBtnEnabled} />
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
        <OurProjectsGear />
      </GearWrapper>
    </Wrapper>
  )
}

export default OurProjects

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

const Title = styled(motion.div)`
  padding: 10rem 0;
  width: 90%;
  max-width: 1850px;
  margin: 0 auto;

  /* display: flex;
  align-items: center;
  justify-content: space-between; */

  h1,
  h3 {
    color: var(--color-orange);
  }
  h1 {
    font-family: "ppwoodland-bold";
    margin-bottom: 0.5rem;
    display: block;
    overflow: hidden;
    width: auto;
    span:last-of-type {
      margin-right: 0;
    }
    span {
      height: 100%;
      overflow: hidden;
      display: inline-block;
      vertical-align: top;
      padding-bottom: 0.5rem;
      margin-right: 2%;
    }
  }
  h3 {
    font-family: "calibre-regular";
  }

  @media (max-width: ${breakpoints.xxl}px) {
    padding: 7rem 0;
    flex-direction: column;
    align-items: flex-start;
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
      padding-top: 0;
      font-size: 21px;
      line-height: 120%;
    }
  }
`

const Embla = styled.div`
  width: 80%;
  max-width: 1850px;
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
  max-width: 1850px;
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
  min-width: 30%;
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
    margin: 0.75rem;
  }
`

const SlideMedia = styled.div`
  aspect-ratio: 16/9;
  width: 720px;
  max-width: 800px;
  background: transparent;
  position: relative;

  &.react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

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
    aspect-ratio: 1/1;
    width: 100%;
    height: auto;
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
    top: 25%;
    right: 0;
  }
`