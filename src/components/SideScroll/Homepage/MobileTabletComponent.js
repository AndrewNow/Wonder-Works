import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import breakpoints from "../../breakpoints"
import {
  WWStudioBG,
  WWPartnershipsBG,
  WWCollabBG,
  WWJamsBG,
} from "../../../svg/homepage"
import { useInView } from "react-intersection-observer"
import { useEmblaCarousel } from "embla-carousel/react"
import { StaticImage } from "gatsby-plugin-image"
import { WWJamsStars } from "../../../svg/miscellaneous"

const MobileTabletComponent = () => {
  // ------------------------- 1. Establish refs -------------------------
  const horizontalScroll = useRef()

  // refs for each slide to animate when inView
  const [StudioRef, StudioRefInView] = useInView({
    root: null,
    threshold: 0.6,
    triggerOnce: false,
  })

  const [JamsRef, JamsRefInView] = useInView({
    root: null,
    threshold: 0.8,
    triggerOnce: false,
  })

  const [CollabRef, CollabRefInView] = useInView({
    root: null,
    threshold: 0.8,
    triggerOnce: false,
  })
  const [PartnershipRef, PartnershipRefInView] = useInView({
    root: null,
    threshold: 0.8,
    triggerOnce: false,
  })

  // ------------------- 2. Track component scroll progress -------------------
  // This section handles the side scrolling "Pillars" section.
  // The height of the container (StickyContainer) defines how long the user must scroll to get to the next slide

  // Hook which returns a value between 1-0 depending on how close the bottom of the container is to the top of the viewport. When scrollProgress = 0, the container's bottom is touching top of viewport.
  const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState()
    useLayoutEffect(() => {
      const onScroll = () => {
        // get the component's coordinates
        const horizontalScrollDiv =
          horizontalScroll.current.getBoundingClientRect()
        // divide bottom distance to top of viewport by component height to get a 1-0 value of scroll progress
        setScrollProgress(
          horizontalScrollDiv.bottom / horizontalScrollDiv.height
        )
      }
      window.addEventListener("scroll", onScroll)
      return () => window.removeEventListener("scroll", onScroll)
    }, [])
    return scrollProgress
  }
  const scrollProgress = useScrollProgress()

  // ------------------- 3. Embla Carousel Logic -------------------
  // Configure Embla settings (notably: disabled user touch/click interaction)
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    draggable: false,
    containScroll: "trimSnaps",
    loop: false,
    align: "start",
    speed: 5,
  })

  // Create callback hooks for scrolling each slide into view according to its index
  const scrollToFirstSlide = useCallback(
    () => embla && embla.scrollTo(0),
    [embla]
  )
  const scrollToSecondSlide = useCallback(
    () => embla && embla.scrollTo(1),
    [embla]
  )
  const scrollToThirdSlide = useCallback(
    () => embla && embla.scrollTo(2),
    [embla]
  )
  const scrollToFourthSlide = useCallback(
    () => embla && embla.scrollTo(3),
    [embla]
  )

  // Create rules for when the slides should change according to the returned value from scrollProgress
  useEffect(() => {
    if (scrollProgress > 0.75 && scrollProgress < 1) {
      scrollToFirstSlide()
    } else if (scrollProgress < 0.75 && scrollProgress > 0.5) {
      scrollToSecondSlide()
    } else if (scrollProgress < 0.5 && scrollProgress > 0.25) {
      scrollToThirdSlide()
    } else if (scrollProgress < 0.25 && scrollProgress > 0) {
      scrollToFourthSlide()
    }
  }, [
    scrollProgress,
    scrollToFirstSlide,
    scrollToSecondSlide,
    scrollToThirdSlide,
    scrollToFourthSlide,
  ])

  // prevent excessive scrolling
  const preventEdgeScrolling = embla => {
    const { limit, target, location, scrollTo } = embla.dangerouslyGetEngine()

    return () => {
      if (limit.reachedMax(target.get())) {
        if (limit.reachedMax(location.get())) location.set(limit.max)
        target.set(limit.max)
        scrollTo.distance(0, false)
      }
      if (limit.reachedMin(target.get())) {
        if (limit.reachedMin(location.get())) location.set(limit.min)
        target.set(limit.min)
        scrollTo.distance(0, false)
      }
    }
  }

  // Run Embla
  useEffect(() => {
    if (!embla) return
    embla.on("scroll", preventEdgeScrolling(embla))
  }, [embla])

  // ------------------- 4. Data for slide markup -------------------
  const SideScrollData = [
    {
      ref: StudioRef,
      inView: StudioRefInView,
      title: "Wonder Works Studio",
      titleColor: "#1A1749",
      bodyText:
        "Discover what’s in the works at Wonder Works Studio. We’re always dreaming up new adventures in exciting roleplay games for immersive, imaginative fun for everyone. Check out our ambitious new projects or our latest launches—they all live here. ",
      backgroundSVG: <WWStudioBG />,
      backgroundColor: "#D9E141",
      image: (
        <StaticImage
          src="../../../images/Home/topleft.png"
          alt="Playful text which reads 'Wonder Works Studio"
          placeholder="none"
          quality={100}
        />
      ),
    },
    {
      ref: PartnershipRef,
      inView: PartnershipRefInView,
      title: "Wonder Works Partnership",
      titleColor: "#6653A3",
      bodyText:
        "We love growing and connecting with our community. If you’re interested in partnering with the wonderful world of Wonder Works Studio send us a message—we have big ideas to launch with brands of all sizes. ",
      backgroundSVG: <WWPartnershipsBG />,
      backgroundColor: "#F7F7FC",
      image: (
        <StaticImage
          src="../../../images/Home/bottomleft.png"
          alt="Playful text which reads 'Wonder Works Jams'"
          placeholder="none"
          quality={100}
        />
      ),
    },
    {
      ref: CollabRef,
      inView: CollabRefInView,
      title: "Wonder Works Collab",
      titleColor: "#EB2C90",
      bodyText:
        "Growing our community is important to us and collaborating with optimistic, adventurous individuals pushes our own creativity to new heights. We’re always on the lookout for YouTubers and influencers to help tell our story—let us know if that’s you! ",
      backgroundSVG: <WWCollabBG />,
      backgroundColor: "#1A1749",
      image: (
        <StaticImage
          src="../../../images/Home/bottomright.png"
          alt="Playful text which reads 'Wonder Works Collab, with a pink octogon shaped cartoon character holding the text.'"
          placeholder="none"
          quality={100}
        />
      ),
    },
    {
      ref: JamsRef,
      inView: JamsRefInView,
      title: "Wonder Works Jams",
      titleColor: "#6653A3",
      bodyText:
        "Wonder Works Jams is a space for our junior talent to QA various game genres. It’s a creative hub of mentorship that fosters a lifelong love for exploration and innovation and promotes success on individual and collaborative levels. ",
      backgroundSVG: <WWJamsBG />,
      backgroundColor: "#F7F7FC",
      image: (
        <>
          <StarWrapper>
            <WWJamsStars />
          </StarWrapper>
          <StaticImage
            src="../../../images/Home/bottomleft.png"
            alt="Playful text which reads 'Wonder Works Jams'"
            placeholder="none"
            quality={100}
          />
        </>
      ),
    },
  ]
  // ------------------- 5. Animations -------------------

  const Parent = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: .25,
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  const FadeIn = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 50
    },
    exit: {
       opacity: 0,
      y: -50
    }
  }

  return (
    <StickyContainer ref={horizontalScroll}>
      <Embla>
        <EmblaViewport ref={viewportRef}>
          <EmblaContainer>
            {SideScrollData.map((slide, i) => {
              return (
                <EmblaSlide ref={slide.ref} key={i}>
                  <Background
                    style={{
                      backgroundColor: `${slide.backgroundColor}`,
                    }}
                  >
                    <SlideContentWrapper
                      variants={Parent}
                      initial="hidden"
                      animate={slide.inView ? "visible" : "hidden"}
                      exit="exit"
                    >
                      <motion.h5
                        variants={FadeIn}
                        style={{
                          color: `${slide.titleColor}`,
                          fontFamily: "calibre-semibold",
                        }}
                      >
                        {slide.title}
                      </motion.h5>
                      <ImageWrapper variants={FadeIn}>
                        {slide.image}
                      </ImageWrapper>
                      <motion.p variants={FadeIn}>{slide.bodyText}</motion.p>
                    </SlideContentWrapper>
                    <BackgroundSvgWrapper>
                      {slide.backgroundSVG}
                    </BackgroundSvgWrapper>
                  </Background>
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
      </Embla>
    </StickyContainer>
  )
}

export default MobileTabletComponent

const StickyContainer = styled.div`
  display: none;
  @media (max-width: 1024px) {
    margin-top: 15rem;
    // the height value here determines the "length" of the horizontal scroll carousel
    // higher values = longer distance to initiate slide change
    height: 800vh;
    position: relative;
    display: block;
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 1500vh;
  }
`

const Embla = styled.div`
  margin-left: auto;
  margin-right: auto;

  height: 100vh;
  position: sticky;
  top: 0;
`

const EmblaViewport = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: var(--color-purple);
  position: relative;
  z-index: 10;
`

const EmblaContainer = styled(motion.div)`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  height: 100%;
`

const EmblaSlide = styled(motion.div)`
  width: 100vw;
  height: 100vh;
`

const Background = styled.div`
  width: 100vw;
  height: 100%;
`

const BackgroundSvgWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 100vw;
  height: 100vh;
`

const SlideContentWrapper = styled(motion.div)`
  z-index: 10;
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 90%;
  padding-top: 25%;
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
  grid-template-columns: 1;
  justify-items: center;

  h5 {
    font-size: 35px;
    line-height: 42px;
    text-align: center;
  }
  p {
    font-size: 20px;
    text-align: center;
    width: 62%;
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.s}px) {
    p, h5 {
      width: 90%;
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const ImageWrapper = styled(motion.div)`
  @media (max-width: ${breakpoints.m}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    position: relative;
  }
`

const StarWrapper = styled.div`
  width: 100%;
  height: auto;
  /* height: 100%; */
  position: absolute;
  z-index: 11;
  left: -8%;
  top: -2%;
  /* top: -35%; */
  svg {
    height: auto;
    width: 100%;
  }
`
