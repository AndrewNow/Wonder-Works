import React, { useCallback, useRef, useState, useEffect, useLayoutEffect } from "react"
import styled from "styled-components"
import {
  motion,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"
import breakpoints from "../breakpoints"
import * as Svg from "../../svg/aboutpage"
import { useInView } from "react-intersection-observer"

const OurPillars = () => {

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

  // const [pillarsRef, pillarsInView] = useInView({
  //   root: null,
  //   threshold: 0.65,
  //   triggerOnce: true,
  // })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      // pillarsRef(node)
      StudioRef(node)
      JamsRef(node)
      CollabRef(node)
    },
    [
      // pillarsRef,
      StudioRef,
      JamsRef,
      CollabRef,
    ]
  )
  //+++++++++++++++++++++ Horizontal Scroll Logic +++++++++++++++++++++ */

  // This component handles the side scrolling "Pillars" section.
  // The component must be as tall as it is wide, because as the user scrolls down this same progress interval
  // is used to scroll the fixed component sideways. These dimensions must absolutely be respected, otherwise
  // the component will not function as intended.

  // Data for the slides' markup
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

  // ------------------- 1. Calculate viewport width & height -------------------
  const getWindowDimensions = () => {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window
      return { width, height }
    } else {
      return {}
    }
  }

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )
    useEffect(() => {
      if (typeof window !== "undefined") {
        const handleResize = () => {
          setWindowDimensions(getWindowDimensions())
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    }, [])

    return windowDimensions
  }

  // {width} is the user's maximum viewport width.
  const { width } = useWindowDimensions()

  // ------------------- 2. "Assign" vertical scroll to horizontal scroll -------------------

  // Take viewport width * 3 because there are 3 slides 100vw wide
  const maxWidth = width * 3
  // create a Framer MotionValue to give the component an x-transform
  const xRightRange = useMotionValue(0)
  // state for when a slide is in view. if so, animate it in
  const [sideScrollInView, setSideScrollInView] = useState(false)

  useLayoutEffect(() => {
    const onScroll = () => {
      // get the component's coordinates (only when horizontalScroll Ref is in view)
      const horizontalScrollDiv =
        horizontalScroll.current?.getBoundingClientRect()
      const scrollProgress = horizontalScrollDiv?.bottom / maxWidth
      // use MotionValue to move the component sideways on vertical scroll without re-rendering
      xRightRange.set(scrollProgress)

      // If horizontalScroll is in view, fade the entire component in (using variants in 4.)
      if (
        // maxWidth in this case is also the height of the component (300vh), which is what we're targeting here.
        horizontalScrollDiv?.bottom < maxWidth &&
        horizontalScrollDiv?.bottom > 0
      ) {
        setSideScrollInView(true)
      } else setSideScrollInView(false)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ------------------- 3. Framer animation variants -------------------
  // Normalize scrollProgress to translate the component horizontally.
  // xRightRange returns a value between 1 and 0 (distance between bottom of Ref and the top of the viewport),
  // but we need a value between 0 and 300vw to move the slides accurately.
  const usexRightRange = useTransform(xRightRange, [1, 0], [0, -maxWidth])
  // more info here on the useTransform hook: https://www.framer.com/docs/motionvalue/##usetransform

  // ------------------- 4. Framer animation variants -------------------
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
      y: 0,
      transition: {
        delay: 0.25,
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

  const sideSrollAnim = {
    visible: {
      opacity: 1,
      // zIndex: 10,
      transition: {
        duration: 0.5,
        staggerChildren: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      // zIndex: 0,

      transition: {
        duration: 0.5,
        staggerChildren: 0.5,
      },
    },
  }

  const sideScrollBody = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
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
    <Container>
      <OurPillarsDiv ref={horizontalScroll}>
        {sideScrollInView && (
          <SideScrollInner
            style={{ x: usexRightRange }}
            variants={sideSrollAnim}
            initial="hidden"
            animate={sideScrollInView ? "visible" : "hidden"}
            exit="hidden"
          >
            {SideScrollData.map((frame, i) => {
              return (
                <Frame ref={frame.ref} key={i}>
                  <AnimatePresence>
                    {frame.inView && (
                      <FrameWrapper
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <FrameHeader
                          variants={sideScrollHeader}
                          initial="hidden"
                          animate={frame.inView ? "visible" : "hidden"}
                          exit="hidden"
                        >
                          {frame.headerSVG}
                          <h4>Our Pillars</h4>
                          <Svg.HorizontalLine />
                        </FrameHeader>
                        <FrameContainer>
                          <FrameLeft>
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
                          </FrameLeft>
                          <FrameRight
                            variants={sideScrollSVG}
                            initial="hidden"
                            animate={frame.inView ? "visible" : "hidden"}
                            exit="hidden"
                          >
                            {frame.rightSVG}
                          </FrameRight>
                        </FrameContainer>
                      </FrameWrapper>
                    )}
                  </AnimatePresence>
                </Frame>
              )
            })}
          </SideScrollInner>
        )}
      </OurPillarsDiv>
    </Container>
  )
}

export default OurPillars

const Container = styled(motion.div)`
  /* overflow: hidden; */
`

const OurPillarsDiv = styled(motion.div)`
  height: 300vw;
  position: relative;
  top: 0;
  background-color: var(--color-purple);

  ::-webkit-scrollbar {
    width: 0;
    display: none;
    height: 0;
  }
`

const SideScrollInner = styled(motion.div)`
  position: fixed;
  top: 0;
  // width must be same as height for OurPillars
  width: 300vw;
  height: 100vh;
  z-index: 0;
  background-color: var(--color-purple);
  display: flex;

  ::-webkit-scrollbar {
    width: 0;
    display: none;
    height: 0;
  }
`

const Frame = styled(motion.div)`
  width: 100vw;
  height: 100%;

  h1 {
    margin: 0 auto;
  }
`

const FrameWrapper = styled(motion.div)`
  width: 100vw;
`

const FrameHeader = styled(motion.div)`
  width: 80%;
  margin: 0 auto;
  padding-top: 7.5%;
  display: flex;
  align-items: center;

  h4 {
    margin: 0 1rem;
  }

  @media (max-width: 1600px) {
    padding-top: 10%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    /* padding-top: 20%; */
  }
`
const FrameContainer = styled.div`
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
const FrameLeft = styled.div`
  margin-top: 3rem;
  height: 60%;
  width: 65%;
  padding-left: 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  svg {
    max-height: 350px;
  }
  h4 {
    margin-top: 5rem;
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
`

const LeftSVG = styled(motion.div)`
  height: 100%;
  width: max-content;
  svg {
    max-height: 350px;
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
`

const FrameRight = styled(motion.div)`
  margin-top: 5rem;
  height: 60%;
  /* width: 35%; */
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
`
