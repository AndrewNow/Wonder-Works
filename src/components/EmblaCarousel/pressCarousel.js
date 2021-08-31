import React, { useState, useCallback, useEffect } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { NextButton, PrevButton } from "./buttons"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const PressCarousel = () => {
  const data = useStaticQuery(graphql`
    query pressCarousel {
      press: allFile(
        filter: { relativeDirectory: { eq: "Press" } }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          childImageSharp {
            gatsbyImageData(
              width: 570
              placeholder: BLURRED
              quality: 100
              blurredOptions: { width: 80 }
              formats: WEBP
              layout: CONSTRAINED
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
  `)

  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    slidesToScroll: 3,
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

  const slides = [
    {
      date: "29.04.21",
      imageSrc: data.press.nodes[0].childImageSharp.gatsbyImageData,
      title:
        "Exclusive: How YouTuber MeganPlays turned Roblox videos into a million-dollar business",
      author: "Danny Konstantinovic, Ivan De Luce — B2",
      link: "https://www.businessofbusiness.com/videos/meganplays-interview-megan-letter-roblox-youtube/",
    },
    {
      date: "27.04.21",
      imageSrc: data.press.nodes[1].childImageSharp.gatsbyImageData,
      title:
        "Roblox Queen MeganPlays Is Making Millions With a Blocky Digital Empire",
      author: "Jennifer Zabasajja, Olga Kharif — Bloomberg",
      link: "https://www.bloomberg.com/news/articles/2021-04-27/how-meganplays-built-a-multimillion-dollar-roblox-rblx-gaming-empire",
    },
    {
      date: "10.03.21",
      imageSrc: data.press.nodes[2].childImageSharp.gatsbyImageData,
      title: "Roblox content creator MeganPlays on the platform’s popularity",
      author: "Squawk Alley — CNBC",
      link: "https://www.cnbc.com/video/2021/03/10/roblox-content-creator-meganplays-on-the-platforms-popularity.html",
    },
    {
      date: "09.03.21",
      imageSrc: data.press.nodes[4].childImageSharp.gatsbyImageData,
      title: "Roblox Goes Public — What's Roblox? Ask Anyone With Kids.",
      author: "Mandalita Del Barco — NPR",
      link: "https://www.npr.org/2021/03/09/974893374/roblox-goes-public-whats-roblox-ask-anyone-with-kids",
    },
    {
      date: "27.01.21",
      imageSrc: data.press.nodes[3].childImageSharp.gatsbyImageData,
      title:
        "How 'Roblox' Star MeganPlays Diversified Her Business To Bring In Millions",
      author: "Mike Stubbs — Forbes",
      link: "https://www.forbes.com/sites/mikestubbs/2021/01/27/how-roblox-star-meganplays-diversified-her-business-to-bring-in-millions/",
    },
  ]

  return (
    <Wrapper>
      <h2>Press</h2>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {slides.map((slide, index) => {
              return (
                <EmblaSlide key={index}>
                  <Entry>
                    <Top>
                      <p>{slide.date}</p>
                      <ImageWrapper>
                        <GatsbyImage image={slide.imageSrc} alt={slide.title} />
                      </ImageWrapper>
                      <h4>{slide.title}</h4>
                    </Top>
                    <Flex>
                      <p>{slide.author}</p>
                      <a
                        href={slide.link}
                        target="_blank"
                        alt="Link to article"
                      >
                        Read More
                        <svg
                          width="20"
                          height="17"
                          viewBox="0 0 20 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.490234 16.5632L19.4902 9.56323L0.490234 0.563232V16.5632Z"
                            fill="#6653A3"
                          />
                        </svg>
                      </a>
                    </Flex>
                  </Entry>
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </Embla>
    </Wrapper>
  )
}

export default PressCarousel

const Wrapper = styled.div`
  padding: 5rem 0;
  width: 90%;
  margin: 0 auto;
  h2 {
    padding: 20px;
    padding-bottom: 5rem;
  }
`

const Embla = styled.div`
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;

  & button:first-of-type {
    left: -3%;
  }

  & button:last-of-type {
    right: -3%;
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
  height: 720px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Top = styled.div`
  h4 {
    padding-bottom: 2rem;
  }
  p {
    padding-bottom: 1rem;
    float: right;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  z-index: 10;
  margin: 1rem 0;
  height: 370px;
  width: 100%;
  border: 2px solid var(--color-purple);
  overflow: hidden;
  border-radius: 10px;
  box-sizing: border-box;
`
const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  height: 65px;

  & p {
    font-family: "calibre-medium";
    width: 50%;
  }

  svg {
    margin-left: 0.5rem;
    padding-top: 0.1rem;
    transition: var(--hover-transition);
  }

  a {
    transition: var(--hover-transition);
    align-self: flex-start;
    text-decoration: none;
    white-space: nowrap;
    font-family: "calibre-regular";
    color: var(--color-purple);
    font-size: 25px;
    filter: opacity(0.5);
    :hover {
      filter: opacity(1);
      svg {
        transform: translate3d(5px, 0, 0);
      }
    }
  }
`
