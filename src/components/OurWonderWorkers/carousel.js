import React, { useCallback, useEffect, useState } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import { graphql, useStaticQuery } from "gatsby"
import { NextButton, PrevButton } from "../EmblaCarousel/buttons"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { workerData } from "./wonderworkersData"
import breakpoints from "../breakpoints"

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
    align: "center",
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
                <Left>
                  <PortalWrapper>
                    <ImageInner>
                      <GatsbyImage
                        image={
                          data.wwImageCarousel.nodes[dataIndex].childImageSharp
                            .gatsbyImageData
                        }
                        alt={`Roblox avatar portrait of ${workerData[dataIndex].name}`}
                      />
                    </ImageInner>
                    {workerData[dataIndex].portal}
                  </PortalWrapper>
                </Left>
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

  button:first-of-type {
    left: 3%;
  }

  button:last-of-type {
    right: 3%;
  }
  @media (max-width: ${breakpoints.s}px) {
    button:first-of-type {
      left: 10%;
    }

    button:last-of-type {
      right: 10%;
    }
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
  height: 80vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.m}px) {
    justify-content: center;
  }
  }
  @media (max-width: ${breakpoints.s}px) {
    justify-content: flex-start;
  }
  @media (max-width: ${breakpoints.xs}px) {
    justify-content: space-between;
  }
`

const Left = styled.div`
  z-index: 0;
  position: relative;
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  @media (max-width: 1600px) {
    width: 40%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 35%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    max-height: 230px;
    min-height: 200px;
    justify-content: flex-start;
  }
  @media (max-width: ${breakpoints.s}px) {
    min-height: 160px;
    max-height: 160px;
    margin-bottom: 2rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    min-height: 140px;
    max-height: 140px;
  }
`

const PortalWrapper = styled.div`
  z-index: 0;
  margin: 0 auto;
  position: relative;
  /* bottom: 0; */
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  svg {
    align-self: center;
    scale: 1.5;
    transform: translateY(90%);
  }

  @media (max-width: 1600px) {
    svg {
      width: 250px;
      transform: translateY(75%);
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    svg {
      width: 200px;
      transform: translateY(67%);
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 170px;
      transform: translateY(65%);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    min-height: 200px;
    max-height: 230px;
    justify-content: flex-start;
    align-self: flex-start;
    margin: 0;
    left: 0%;
    bottom: 0%;
    svg {
      width: 150px;
      transform: translate3d(15%, 31%, 0);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    min-height: 160px;
    max-height: 160px;
    svg {
      width: 100px;
      transform: translate3d(15%, 31%, 0);
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    min-height: 120px;
    max-height: 120px;
    svg {
      width: 80px;
      transform: translate3d(15%, 30%, 0);
    }
  }
`
const ImageInner = styled.div`
  margin: 0 auto;
  align-self: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1600px) {
    width: 375px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 325px;
    /* width: 50%; */
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 270px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 200px;
    max-height: 230px;
    top: -3%;
    transform: none!important;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    height: 150px;
    top: 0%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    width: 125px;
    height: 125px;
    top: -5%;
  }
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
  @media (max-width: ${breakpoints.xxl}px) {
    flex-basis: auto;
    width: 40vw;
    margin-right: 4rem;
    h1 {
      font-size: 50px;
      line-height: 100%;
    }
    h4 {
      font-size: 30px;
      line-height: 100%;
    }
    p {
      width: 90%;
      font-size: 20px;
      line-height: 110%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: none !important;
    margin-right: 3rem;
    p {
      width: 100%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 62.5vw;
    margin: 0 auto;
    position: relative;
    p {
      overflow: scroll;
      width: 100%;
      max-height: 60%;
      position: relative;
    }
    @media (max-width: ${breakpoints.s}px) {
      width: 70vw;
      h1 {
        font-size: 30px;
        line-height: auto;
        white-space: nowrap;
      }
      h4 {
        font-size: 20px;
        line-height: 100%;
        padding-bottom: 1rem;
      }
      p {
        max-height: 80%;
        font-size: 16px;
        line-height: 115%;
        letter-spacing: 0.03rem;
        max-height: auto;
      }

      /* :after {
        position: absolute;
        pointer-events: none;
        bottom: 0!important;
        left: 0;
        height: 30%;
        width: 100%;
        content: "";
        background: rgb(26, 23, 72);
        background: linear-gradient(
          0deg,
          rgba(26, 23, 72, 1) 0%,
          rgba(26, 23, 72, 1) 50%,
          rgba(255, 255, 255, 0) 100%
        );
      } */
    }
    @media (max-width: 376px) {
      p {
        max-height: 60%;
      }
    }
    @media (max-width: ${breakpoints.xs}px) {
      p {
        max-height: 45%;
      }
    }
  }
`
