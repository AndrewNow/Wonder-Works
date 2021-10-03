import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "../breakpoints"
import * as Svg from "../../svg/aboutpage"
import { useInView } from "react-intersection-observer"
import { useEmblaCarousel } from "embla-carousel/react"

const OurPillars = () => {


  //+++++++++++++++++++++ Horizontal Scroll Logic +++++++++++++++++++++ */
// This component handles the side scrolling "Pillars" section.
  // The height of the container (StickyContainer) defines how long the user must scroll to get to the next slide

  // ------------------------- 1. Establish refs -------------------------
  const ref = useRef()
  const horizontalScroll = useRef()

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

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      StudioRef(node)
      JamsRef(node)
      CollabRef(node)
    },
    [StudioRef, JamsRef, CollabRef]
  )

  // ------------------- 2. Data for slide markup -------------------
  const SideScrollData = [
    {
      ref: StudioRef,
      inView: StudioRefInView,
      title: "Wonder Works Studio",
      titleColor: "#D9E141",
      bodyText:
        "Discover what’s in the works at Wonder Works Studio. We’re always dreaming up new adventures in exciting roleplay games for immersive, imaginative fun for everyone. Check out our ambitious new projects or our latest launches—they all live here. ",
      headerSVG: <Svg.WWStudioHeader />,
      mainSVG: <Svg.WWStudioMain />,
      rightSVG: <Svg.WWStudioRight />,
    },
    {
      ref: JamsRef,
      inView: JamsRefInView,
      title: "Wonder Works Jams",
      titleColor: "#F9DB1E",
      bodyText:
        "Wonder Works Jams is a space for our junior talent to QA various game genres. It’s a creative hub of mentorship that fosters a lifelong love for exploration and innovation and promotes success on individual and collaborative levels. ",
      headerSVG: <Svg.WWJamsHeader />,
      mainSVG: <Svg.WWJamsMain />,
      rightSVG: <Svg.WWJamsRight />,
    },
    {
      ref: CollabRef,
      inView: CollabRefInView,
      title: "Wonder Works Collab",
      titleColor: "#1A1749",
      bodyText:
        "Discover what’s in the works at Wonder Works Studio. We’re always dreaming up new adventures in exciting roleplay games for immersive, imaginative fun for everyone. Check out our ambitious new projects or our latest launches—they all live here. ",
      headerSVG: <Svg.WWCollabHeader />,
      mainSVG: <Svg.WWCollabMain />,
      rightSVG: <Svg.WWCollabRight />,
    },
  ]

  // ------------------- 3. Track component scroll progress -------------------

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

  // ------------------- 4. Embla Carousel Logic -------------------
  // Configure Embla settings (notably: disabled user touch/click interaction)
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    draggable: false,
    align: "start",
    speed: 2.5,
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

  // Create rules for when the slides should change according to the returned value from scrollProgress
  useEffect(() => {
    if (scrollProgress > 0.8 && scrollProgress < 1) {
      scrollToFirstSlide()
    } else if (scrollProgress < 0.8 && scrollProgress > 0.5) {
      scrollToSecondSlide()
    } else if (scrollProgress < 0.5 && scrollProgress > 0) {
      scrollToThirdSlide()
    }
  }, [scrollProgress])

  // Run Embla
  useEffect(() => {
    if (!embla) return
  }, [embla])

  // ------------------- 5. Framer animation variants -------------------
  const sideScrollHeader = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const sideScrollSVG = {
    visible: {
      opacity: 1,
      // y: 0,
      // scale: 1,
      // rotate: 0,
      transition: {
        // delay: 0.25,
        duration: 0.5,
      },
    },
    hidden: {
      // scale: .7,
      // rotate: 10,
      // y: -50,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const sideScrollBody = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.25,
        duration: 0.5,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const bodyChild = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      x: -100,
      opacity: 0,
    },
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  return (
    <StickyContainer ref={horizontalScroll}>
      <Embla>
        <EmblaViewport ref={viewportRef}>
          <EmblaContainer>
            {SideScrollData.map((frame, i) => {
              return (
                <EmblaSlide ref={frame.ref} key={i}>
                  <AnimatePresence>
                    <SlideWrapper
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <OurPillarsHeader
                        variants={sideScrollHeader}
                        initial="hidden"
                        animate={frame.inView ? "visible" : "hidden"}
                        exit="hidden"
                      >
                        {frame.headerSVG}
                        <h4>Our Pillars</h4>
                        <Svg.HorizontalLine />
                      </OurPillarsHeader>
                      <SlideContainer>
                        <LeftInner>
                          <LeftSVG
                            variants={sideScrollSVG}
                            initial="hidden"
                            animate={frame.inView ? "visible" : "hidden"}
                            exit="hidden"
                          >
                            {frame.mainSVG}
                          </LeftSVG>
                          <motion.div
                            variants={sideScrollBody}
                            initial="hidden"
                            animate={frame.inView ? "visible" : "hidden"}
                            exit="hidden"
                          >
                            <motion.h4
                              style={{ color: `${frame.titleColor}` }}
                              variants={bodyChild}
                            >
                              {frame.title}
                            </motion.h4>
                            <motion.p variants={bodyChild}>
                              {frame.bodyText}
                            </motion.p>
                          </motion.div>
                        </LeftInner>
                        <RightInner
                          variants={sideScrollSVG}
                          initial="hidden"
                          animate={frame.inView ? "visible" : "hidden"}
                          exit="hidden"
                        >
                          {frame.rightSVG}
                        </RightInner>
                      </SlideContainer>
                    </SlideWrapper>
                  </AnimatePresence>
                </EmblaSlide>
              )
            })}
          </EmblaContainer>
        </EmblaViewport>
      </Embla>
    </StickyContainer>
  )
}

export default OurPillars

// the height value here determines the "length" of the horizontal scroll carousel
// higher values = longer distance to initiate slide change
const StickyContainer = styled.div`
  height: 400vh;
  position: relative;

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
  h1 {
    margin: 0 auto;
  }
`

const SlideWrapper = styled(motion.div)`
  width: 100vw;
`

const OurPillarsHeader = styled(motion.div)`
  width: 80%;
  margin: 0 auto;
  padding-top: 7.5%;
  display: flex;
  align-items: center;

  h4 {
    margin: 0 1rem;
    white-space: nowrap;
  }

  @media (max-width: 1600px) {
    padding-top: 10%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    /* padding-top: 20%; */
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-top: 25%;

    svg:first-of-type {
      max-width: 30px;
    }
  }
`
const SlideContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;

  @media (max-width: ${breakpoints.xl}px) {
    align-items: center;
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`
const LeftInner = styled.div`
  margin-top: 3rem;
  height: 55vh;
  width: 65%;
  padding-left: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  svg {
    max-height: 350px;
  }
  h4 {
    font-family: "balgin-bold";
  }
  p {
    margin-top: 1rem;
    width: 85%;
    color: var(--color-white);
  }

  @media (max-width: 1600px) {
    h4 {
      margin-top: 2rem;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding-left: 0rem;
    h4 {
      margin-top: 1rem;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-left: 0;
    margin-top: 0;
    width: 100%;
    p {
      width: 100%;
    }
    h4 {
      margin-top: 0;
    }
  }
`

const LeftSVG = styled(motion.div)`
  height: 100%;
  width: max-content;
  display: flex;
  svg {
    max-height: 340px;
    align-self: center;
  }

  @media (max-width: 1600px) {
    max-height: 260px;
    svg {
      height: max-content;
      max-width: 500px;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    max-height: 260px;
    svg {
      max-width: 500px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    max-height: 200px;
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      max-width: 70vw;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    /* max-height: 100px; */
    align-self: flex-start;
    svg {
      max-height: 150px;
    }
  }
`

const RightInner = styled(motion.div)`
  margin-top: 5rem;
  height: 60%;
  align-self: center;
  margin: 0 auto;

  display: flex;
  justify-content: center;

  @media (max-width: 1600px) {
    svg {
      max-width: 200px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    svg {
      max-width: 180px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    svg {
      max-width: 170px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 0;
    align-self: flex-end;
    svg {
      max-width: 100px;
    }
  }
`
