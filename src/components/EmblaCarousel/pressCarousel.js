import React, { useState, useCallback, useEffect, useRef } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import styled from "styled-components"
import { NextButtonPress, PrevButtonPress } from "./buttons"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { PurpleArrow } from "../../svg/miscellaneous"
import breakpoints from "../breakpoints"

const PressCarousel = () => {
  const [pressRef, pressInView] = useInView({
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
      // y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
      },
    },
    hidden: {
      // y: 20,
      opacity: 0,
    },
  }

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
              layout: FIXED
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
  `)

  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    // slidesToScroll: 3,
    align: "start",
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
      <Embla ref={pressRef}>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer
            variants={parentAnimation}
            initial="hidden"
            animate={pressInView ? "visible" : "hidden"}
          >
            {slides.map((slide, index) => {
              return (
                <EmblaSlide key={index} variants={childAnimation}>
                  <Entry>
                    <Top>
                      <p>{slide.date}</p>
                      <ImageWrapper>
                        <GatsbyImage
                          image={slide.imageSrc}
                          alt={slide.title}
                          imgStyle={{
                            border: "2px solid #6653A3",
                            borderRadius: "10px",
                            objectFit: "cover",
                            minHeight: "100%",
                            aspectRatio: "5/4",
                          }}
                          style={{ height: "100%", width: "100%" }}
                        />
                      </ImageWrapper>
                      <h4>{slide.title}</h4>
                    </Top>
                    <Flex>
                      <p>{slide.author}</p>
                      <a
                        href={slide.link}
                        target="_blank"
                        rel="noreferrer"
                        alt="Link to article"
                      >
                        Read More
                        <PurpleArrow />
                      </a>
                    </Flex>
                  </Entry>
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
        <PrevButtonPress onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButtonPress onClick={scrollNext} enabled={nextBtnEnabled} />
      </Embla>
    </Wrapper>
  )
}

export default PressCarousel

const Wrapper = styled.div`
  background-color: var(--color-white);
  width: 90%;
  padding: 5rem 0;
  margin: 0 auto;
  position: relative;
  z-index: 200;
  h2 {
    padding: 20px;
    padding-bottom: 5rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    padding-bottom: 10rem;
    width: 100%;
    padding-left: 5vw;
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding-left: 0;
    h2 {
      padding-left: 5vw;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 7rem;
    padding-top: 3rem;
    h2 {
      font-size: 45px;
      padding-bottom: 2rem;
    }
  }
`

const Embla = styled.div`
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 0%;
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
    button:first-of-type {
      bottom: -15%;
      left: 3%;
    }

    button:last-of-type {
      bottom: -15%;
      right: 3%;
    }
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
`
const EmblaSlide = styled(motion.div)`
  position: relative;
  width: 100%;
  margin-right: 5%;
  flex: 0 0 30%;

  @media (max-width: ${breakpoints.xxl}px) {
    flex: 0 0 40%;
    margin-right: 4%;
  }
  @media (max-width: ${breakpoints.m}px) {
    flex: 0 0 25%;
    margin-right: 5%;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex: 0 0 50%;
    margin-right: 5%;
  }
`

const Entry = styled.div`
  height: 720px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 1600px) {
    height: auto;
  }
`

const Top = styled.div`
  h4 {
    padding-bottom: 2rem;
  }
  p {
    padding-bottom: 1rem;
    float: right;
  }
  @media (max-width: 1600px) {
    h4 {
      height: 180px;
      font-size: 36px;
      line-height: 40px;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    h4 {
      font-size: 32px;
      height: 150px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h4 {
      height: 200px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    h4 {
      font-size: 26px;
      line-height: 26px;
      height: 120px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h4 {
      height: 130px;
      font-size: 24px;
      line-height: 28px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h4 {
      height: 80px;
      padding-bottom: 0.5rem;
      font-size: 18px;
      line-height: 20px;
    }
    p {
      padding-bottom: 0.5rem;
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  z-index: 10;
  margin: 1rem 0;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  /* aspect-ratio: 5/4; */
  height: 375px;
  div {
    height: 375px;
  }

  @media (max-width: ${breakpoints.xl}px) {
    aspect-ratio: 1/1;
    max-height: 320px;
    div {
      max-height: 320px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    max-height: 300px;
    div {
      max-height: 300px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 245px;
    width: 245px;
    div {
      max-height: 245px;
    }
  }
`
const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  height: 65px;

  p {
    font-family: "calibre-medium";
    width: 50%;
  }

  svg {
    margin-left: 0.5rem;
    padding-top: 0.1rem;
    transition: var(--hover-transition);
  }

  a {
    align-self: flex-start;
    text-decoration: none;
    white-space: nowrap;
    font-family: "calibre-regular";
    color: var(--color-purple);
    font-size: 25px;
    transition: var(--hover-transition);
    filter: opacity(0.5);
    :hover {
      filter: opacity(1);
      svg {
        transform: translate3d(5px, 0, 0);
      }
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    height: 80px;
    a {
      font-size: 18px;
      svg {
        scale: 0.7;
        transform: translate3d(0, 5px, 0);
      }
      :hover {
        filter: opacity(1);
        svg {
          transform: translate3d(5px, 5px, 0);
        }
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    height: 65px;
    p {
      width: 70%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;

    p {
      width: 95%;
      font-size: 16px;
      font-family: "calibre-regular";
    }
    a {
      margin-top: 0.25rem;
      font-size: 16px;
      svg {
        display: none;
      }
    }
  }
`
