import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import breakpoints from "../breakpoints"
import { motion } from "framer-motion"
import styled from "styled-components"
import { MoreEventsButton } from "./buttons"
import { useInView } from "react-intersection-observer"

const EventsCarouselMobile = ({ PastEventsData }) => {
  const [eventsRef, eventsInView] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })

  const parentAnimation = {
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
    hidden: {},
  }
  const childAnimation = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
      },
    },
    hidden: {
      y: -50,
      opacity: 0,
    },
  }

  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    // slidesToScroll: 3,
    align: "start",
  })

  // ---------- Set up embla pagination buttons ----------
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const onSelect = useCallback(() => {
    if (!embla) return
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    onSelect()
  }, [embla, onSelect])

  return (
    <Embla ref={eventsRef}>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer
          variants={parentAnimation}
          initial="hidden"
          animate={eventsInView ? "visible" : "hidden"}
        >
          {PastEventsData.map((event, index) => {
            return (
              <EmblaSlide key={index} variants={childAnimation}>
                <Event variants={parentAnimation}>
                  <EventImage />
                  <EventText>
                    <p>{event.date}</p>
                    <h4>{event.name}</h4>
                    <p>{event.desc}</p>
                  </EventText>
                </Event>
              </EmblaSlide>
            )
          })}
        </EmblaContainer>
      </EmblaViewport>
      <MoreEventsButton onClick={scrollNext} enabled={nextBtnEnabled} text={"More past events"}/>
    </Embla>
  )
}

export default EventsCarouselMobile

const Embla = styled.div`
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  margin-left: auto;
  margin-right: auto;
  padding-right: 0%;
  button {
    /* padding-top: 1rem; */
    top: auto;
    bottom: 0%;
    left: 0%;
  }
`
const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
`

const EmblaContainer = styled(motion.div)`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  padding-top: 50px;
`
const EmblaSlide = styled(motion.div)`
  position: relative;
  width: 100%;
  flex: 0 0 50%;
  margin-right: 8%;

  @media (max-width: ${breakpoints.m}px) {
    margin-right: 10%;
  }

  @media (max-width: ${breakpoints.s}px) {
    flex: 0 0 50%;
    margin-right: 15%;
  }
`
const Event = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 4rem;
`

const EventImage = styled.div`
  border-radius: 10px;
  background-color: var(--color-green);
  border: 2px solid var(--color-black);
  box-shadow: 6px 6px 0px #1a1748;
  width: 400px;
  height: 400px;
  min-width: none;
  min-height: none;
  margin-right: 0;
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.m}px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 245px;
    height: 245px;
  }
`
const EventText = styled.div`
  h4 {
    font-size: 40px;
    line-height: 54px;
  }
  @media (max-width: ${breakpoints.m}px) {
    p,
    h4 {
      font-size: 18px;
      line-height: 22px;
      margin: 0.5rem 0;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    p {
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.01rem;
    }
    h4 {
      font-size: 16px;
      line-height: 19px;
    }
  }
`
