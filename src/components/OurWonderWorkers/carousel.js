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
        sort: { fields: childrenImageSharp___fixed___originalName, order: ASC }
      ) {
        nodes {
          childImageSharp {
            gatsbyImageData(
              width: 450
              placeholder: TRACED_SVG
              quality: 80
              blurredOptions: { width: 80 }
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

  // ---------- Run embla configurations ----------
  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    onSelect()
    setIndex(index)
  }, [embla, onSelect, index])

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {workerData.map((slide, dataIndex) => {
            return (
              <EmblaSlide key={dataIndex}>
                <ImageWrapper>
                  <GatsbyImage
                    image={
                      data.wwImageCarousel.nodes[dataIndex].childImageSharp
                        .gatsbyImageData
                    }
                    alt={`Roblox avatar portrait of ${slide.name}`}
                  />
                </ImageWrapper>
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
  overflow: hidden;
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
  position: relative;
  width: 100%;
  margin-right: 50px;
  //
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

const ImageWrapper = styled.div`
  flex-basis: 50%;
  width: 50vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`
