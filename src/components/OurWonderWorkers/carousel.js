import React, { useCallback, useEffect, useState } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import { graphql, useStaticQuery } from "gatsby"
import { NextButton, PrevButton } from "../EmblaCarousel/buttons"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { workerData } from "./wonderworkersData"

export const TeamCarousel = ({ index }) => {
  const [Index, setIndex] = useState(0)
  const data = useStaticQuery(graphql`
    query WonderWorkersCarousel {
      wwImageCarousel: allFile(
        filter: { relativeDirectory: { eq: "Team" } }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          childImageSharp {
            gatsbyImageData(
              width: 450
              placeholder: TRACED_SVG
              quality: 80
              blurredOptions: { width: 80 }
              formats: WEBP
            )
          }
        }
      }
    }
  `)

  //configure carousel for the team member modal
  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    startIndex: Index,
    align: "start",
    //here is where we pass in
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


  // ---------- Scale slides on scroll effect ----------
  const SCALE_FACTOR = 5

  const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max)

  const [parallaxValues, setParallaxValues] = useState([])

  const onScroll = useCallback(() => {
    if (!embla) return

    const engine = embla.dangerouslyGetEngine()
    const scrollProgress = embla.scrollProgress()

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach(loopItem => {
          const target = loopItem.getTarget()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      const scale = 1 - Math.abs(diffToTarget * SCALE_FACTOR)
      return numberWithinRange(scale, 0, 1)
    })
    setParallaxValues(styles)
  }, [embla, setParallaxValues])

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    embla.on("scroll", onScroll)
    embla.on("resize", onScroll)
    onSelect()
    setIndex(index)
  }, [embla, onSelect, onScroll, index])

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {workerData.map((slide, dataIndex) => {
            return (
              <EmblaSlide
                key={dataIndex}
                style={{ transform: `scale(${parallaxValues[dataIndex]})` }}
              >
                <PortalWrapper>
                  <AvatarWrapper>
                    <GatsbyImage
                      image={
                        data.wwImageCarousel.nodes[dataIndex].childImageSharp
                          .gatsbyImageData
                      }
                      alt={`Roblox avatar portrait of ${workerData[dataIndex].name}`}
                    />
                  </AvatarWrapper>
                  {workerData[dataIndex].portal}
                </PortalWrapper>
                <Text>
                  <h1>{slide.name}</h1>
                  <h4>{slide.title}</h4>
                  <p>{slide.bio}</p>
                </Text>
              </EmblaSlide>
            )
          })}
        </EmblaContainer>
      </EmblaViewport>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Embla>
  )
}

const Embla = styled.div`
  width: 100%;
  position: relative;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;

  & button:first-of-type {
    left: 3%;
  }

  & button:last-of-type {
    right: 5%;
  }
`
const EmblaViewport = styled.div`
  width: 100%;
`

const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
`
const EmblaSlide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Text = styled.div`
  flex-basis: 50%;
  width: 50vw;
  p {
    width: 70%;
  }
  h1,
  h4 {
    color: var(--color-white);
  }
  h1 {
    font-size: 75px;
    line-height: 80px;
    font-family: "ppwoodland-bold";
    padding-bottom: 1rem;
  }
  h4 {
    padding-bottom: 2rem;
  }
`

const AvatarWrapper = styled.div`
  position: absolute;
  z-index: 2;
  transform: translateY(6.5%);
`

const PortalWrapper = styled.div`
  z-index: 0;
  position: relative;
  transform: translate3d(5%, 100%, 0);
  width: 50vw;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  svg {
    transform: scale(1.5);
  }
`
