import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { NextButton, PrevButton } from "./buttons"
import { StaticImage } from "gatsby-plugin-image"

const PressCarousel = () => {
  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 3,
    // containScroll: "trimSnaps",
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  // ---------- Run configurations ----------
  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    onSelect()
  }, [embla, onSelect])

  const slides = [
    {
      date: "29.04.21",
      imageSrc: "../../images/Press/Forbes.jpg",
      title:
        "Exclusive: How YouTuber MeganPlays turned Roblox videos into a million-dollar business",
      author: "Danny Konstantinovic, Ivan De Luce — B2",
      link: "https://www.forbes.com/sites/mikestubbs/2021/01/27/how-roblox-star-meganplays-diversified-her-business-to-bring-in-millions/",
      alt: "",
    },
    {
      date: "27.04.21",
      imageSrc: "../../../images/Press/Forbes.jpg",
      title:
        "Roblox Queen MeganPlays Is Making Millions With a Blocky Digital Empire",
      author: "Jennifer Zabasajja, Olga Kharif — Bloomberg",
      link: "https://www.bloomberg.com/news/articles/2021-04-27/how-meganplays-built-a-multimillion-dollar-roblox-rblx-gaming-empire",
      alt: "",
    },
    {
      date: "10.03.21",
      imageSrc: "../../../images/Press/Forbes.jpg",
      title: "Roblox content creator MeganPlays on the platform’s popularity",
      author: "Squawk Alley — CNBC",
      link: "https://www.cnbc.com/video/2021/03/10/roblox-content-creator-meganplays-on-the-platforms-popularity.html",
      alt: "",
    },
    {
      date: "4.29.21",
      imageSrc: "../../../images/Press/Forbes.jpg",
      title:
        "Exclusive: How YouTuber MeganPlays turned Roblox videos into a million-dollar business",
      author: "Danny Konstantinovic, Ivan De Luce — B2",
      link: "https://www.businessofbusiness.com/videos/meganplays-interview-megan-letter-roblox-youtube/",
      alt: "",
    },
  ]

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {slides.map((slide, index) => (
            <EmblaSlide key={index}>
              <Entry>
                <div>
                  <p>{slide.date}</p>
                  <ImageWrapper>
                    <StaticImage
                      src={"../../images/Press/Forbes.jpg"}
                      alt="Forbes logo"
                      layout="constrained"
                      height={370}
                      quality={100}
                    />
                  </ImageWrapper>
                  <h4>{slide.title}</h4>
                </div>
                <Flex>
                  <p>{slide.author}</p>
                  <a href={slide.link} target="_blank" alt="Link to article">
                    Read More
                  </a>
                </Flex>
              </Entry>
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Embla>
  )
}

export default PressCarousel

const Embla = styled.div`
  width: 90%;
  position: relative;
  background-color: #f7f7f7;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;

  & button:first-of-type {
    left: -3%;
  }

  & button:last-of-type {
    right: -1%;
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
`

const Entry = styled.div`
  width: 27vw;
  height: 650px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid red;

  h4 {
    padding-bottom: 2rem;
  }
  div > p {
    padding-bottom: 1rem;
    float: right;
  }
`

const ImageWrapper = styled.div`
  border: 2px solid var(--color-purple);
  margin: 1rem 0;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    font-family: "calibre-medium";
    width: 60%;
  }
`
