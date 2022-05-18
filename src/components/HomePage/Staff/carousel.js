import React, { useEffect, useRef, useCallback } from "react"
import styled from "styled-components"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../../breakpoints"
import { useInView } from "react-intersection-observer"

const Carousel = (options = { loop: true }) => {
  // Intersection observer - only start carousel autoplay when in view
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.3,
    triggerOnce: true,
  })

  // configure Embla Autoplay plugin
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false, playOnInit: false },
      emblaRoot => emblaRoot.parentElement
    )
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current])

  const startAutoplay = useCallback(() => {
    if (sectionInView) {
      autoplay.current.play()
    }
  }, [sectionInView])

  useEffect(() => {
    if (!emblaApi) return
    startAutoplay()
    emblaApi.on("select", startAutoplay)
  }, [emblaApi, startAutoplay])

  const imageData = [
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/0.png"
          alt="Image of the Wonder Works team, all grouped up in front of our office."
          quality={90}
          placeholder="blurred"
          // imgStyle={{ objectFit: "cover" }}
          // style={{height: "100%"}}
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/1.jpg"
          alt="Image of Josh in front of his computer, coding some games."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/2.jpg"
          alt="Image of two people in front of their workstation."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/3.jpg"
          alt="Image of Abby in front of her computer."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/4.jpg"
          alt="Group image of members of the Wonder Works team by their desks."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/5.jpg"
          alt="Image of a spin to win wheel, featuring a bunch of available rewards for employees."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/6.jpg"
          alt="Image of Michael in front of his computer."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/7.jpg"
          alt="Image of Jo in front of her computer."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/8.jpg"
          alt="Image of Morgan manning the front desk, with a Wonder Works mural behind her."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
    {
      imgSrc: (
        <StaticImage
          src="../../../images/Team/candids/9.jpg"
          alt="Group image of all our Wonder Workers in front of their computers inside our office."
          quality={90}
          placeholder="blurred"
        />
      ),
    },
  ]

  return (
    <Embla ref={sectionRef}>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {imageData.map((image, index) => {
            return <EmblaSlide key={index}>{image.imgSrc}</EmblaSlide>
          })}
        </EmblaContainer>
      </EmblaViewport>
    </Embla>
  )
}

export default Carousel

const Embla = styled.div`
  margin: 0 auto;
`

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  @media (max-width: ${breakpoints.m}px) {
    border-radius: 10px;
    -webkit-border-radius: 10px;
  }
`

const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  /* overflow: hidden; */
  /* border: 1px solid; */
`

const EmblaSlide = styled.div`
  position: relative;
  min-width: 100%;
  /* padding-left: 10px; */
  /* height: 750px; */
  cursor: ew-resize;
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  @media (max-width: ${breakpoints.xl}px) {
    /* height: 530px; */
  }
  @media (max-width: ${breakpoints.l}px) {
    /* height: 400px; */
  }
  @media (max-width: ${breakpoints.m}px) {
    /* height: 300px; */
  }
  @media (max-width: ${breakpoints.s}px) {
    /* height: 200px; */
  }
`
// const EmblaSlideInner = styled.div`
//   display: block;
//   height: 100%;
// `
