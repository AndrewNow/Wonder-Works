import React from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import { motion, useTransform, useViewportScroll } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Circle,
  CircleStroke,
  BlueTriangles,
  PurpleTriangle,
  OrangeTriangle,
  GreenTriangle,
  BlueTriangle,
} from "../../svg/homepage"

const ImaginationSection = () => {
  // ---------- intersection observer logic, Refs ----------
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: true,
  })

  let throttle = require("lodash/throttle")

  const { scrollYProgress } = useViewportScroll({ passive: true })
  const smallParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -350, 10)
  )

  const mediumParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -700, 10)
  )

  const textLineAnimation = {
    visible: {
      transition: {
        duration: 2,
        delayChildren: 0.6,
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  }

  const wordAnimation = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 13,
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  }

  const fadeIn = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 13,
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
    hidden: {
      y: 70,
      opacity: 0,
    },
  }

  return (
    <SectionWrapper ref={sectionRef}>
      <ImaginationText>
        <h2>
          <FirstLine
            variants={textLineAnimation}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            <WordSpan variants={wordAnimation}>Where </WordSpan>
            <WordSpan variants={wordAnimation}>Imagination</WordSpan>
          </FirstLine>
          <SecondLine
            variants={textLineAnimation}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            <WordSpan variants={wordAnimation}>Comes</WordSpan>
            <WordSpan variants={wordAnimation}>to</WordSpan>
            <WordSpan variants={wordAnimation}>Play.</WordSpan>
          </SecondLine>
          <ThirdLineTabletMobile
            variants={textLineAnimation}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            <WordSpan variants={wordAnimation}>to</WordSpan>
            <WordSpan variants={wordAnimation}>Play.</WordSpan>
          </ThirdLineTabletMobile>
        </h2>
        <motion.h3
          variants={fadeIn}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          We use our imagination, collaboration, and innovation to create the
          best experiences on next-generation social gaming platforms like
          Roblox.
        </motion.h3>
      </ImaginationText>
      <ImaginationBG>
        <CircleWrapper>
          <Circle />
        </CircleWrapper>
        <CircleStrokeWrapper style={{ y: smallParallax }}>
          <CircleStroke />
        </CircleStrokeWrapper>
        <LightBlueTriangleWrapper>
          <BlueTriangles />
        </LightBlueTriangleWrapper>
        <PurpleTriangleWrapper style={{ y: mediumParallax }}>
          <PurpleTriangle />
        </PurpleTriangleWrapper>
        <OrangeTriangleWrapper style={{ y: smallParallax }}>
          <OrangeTriangle />
        </OrangeTriangleWrapper>
        <GreenTriangleWrapper style={{ y: smallParallax }}>
          <GreenTriangle />
        </GreenTriangleWrapper>
        <BlueTriangleWrapper style={{ y: mediumParallax }}>
          <BlueTriangle />
        </BlueTriangleWrapper>
      </ImaginationBG>
    </SectionWrapper>
  )
}

export default ImaginationSection

const SectionWrapper = styled.section`
  height: 100vh;
  margin: 0 auto;
  margin-top: 15rem;
  margin-bottom: 5rem;
  text-align: center;
  position: relative;
  max-width: 1850px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  h2,
  p {
    z-index: 2;
    position: relative;
  }
  h2 {
    line-height: 100%;
  }
  p {
    padding-top: 5rem;
    margin: 0 auto;
    width: 45%;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 10rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0rem;
    margin-bottom: 0rem;
    height: 80vh;
  }
`

const ImaginationBG = styled(motion.div)`
  z-index: 0;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ImaginationText = styled.div`
  text-align: center;
  align-self: center;
  z-index: 10;
  position: relative;
  width: 100%;
  h2,
  h3 {
    z-index: 2;
    position: relative;
  }
  h2 {
    line-height: 110%;
    font-size: 6.5625vw;
    font-family: "ppwoodland-light";
  }
  h3 {
    font-family: "calibre-regular";
    padding-top: 7rem;
    margin: 0 auto;
    width: 80%;
    max-width: 1700px;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    h3 {
      padding-top: 5rem;
      width: 65%;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      line-height: 110%;
      font-size: 8vw;
      margin: 0 auto;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 110px;
      line-height: 90px;
      width: 90%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2 {
      font-size: 75px;
      line-height: 80px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      font-size: 55px;
      line-height: 60px;
    }
    h3 {
      width: 75%;
      padding-top: 2.5rem;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h2 {
      font-size: 35px;
      line-height: 45px;
    }
    h3 {
      width: 85%;
      padding-top: 2.5rem;
    }
  }
`
const FirstLine = styled(motion.div)`
  position: relative;
  z-index: 2;
  overflow: hidden;
`
const SecondLine = styled(motion.div)`
  position: relative;
  z-index: 2;
  overflow: hidden;

  @media (max-width: ${breakpoints.l}px) {
    span:nth-child(2) {
      display: none;
    }
    span:nth-child(3) {
      display: none;
    }
  }
`

const ThirdLineTabletMobile = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    position: relative;
    z-index: 2;
    overflow: hidden;
  }
`

const WordSpan = styled(motion.span)`
  margin-right: 1rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
`

const CircleWrapper = styled(motion.div)`
  position: absolute;
  top: 15%;
  right: 6%;

  @media (max-width: 1600px) {
    svg {
      width: 330px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    svg {
      width: 300px;
      height: 300px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 10%;
    right: 0%;
  }
  @media (max-width: ${breakpoints.l}px) {
    right: 0%;
    top: 10%;
    svg {
      width: 225px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: 2%;
    top: 13%;
  }
  @media (max-width: ${breakpoints.s}px) {
    right: 0%;
    top: 15%;
    svg {
      /* scale: 1; */
      transform: scale(1);
      width: 160px;
      height: auto;
    }
  }
`

const CircleStrokeWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0%;
  left: 12.5%;

  @media (max-width: ${breakpoints.l}px) {
    bottom: 25%;
    left: 5%;
    svg {
      width: 325px;
      height: 325px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    left: -15%;
    bottom: 24%;
    svg {
      width: 200px;
      height: 200px;
    }
  }
`

const LightBlueTriangleWrapper = styled(motion.div)`
  position: absolute;
  bottom: 15%;
  left: 5%;
  margin: 0 auto;
  width: 90vw;
  max-width: 1850px;
  overflow: hidden;
  @media (max-width: 1700px) {
    left: 5%;
    bottom: 10%;
    svg {
      width: 100%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    /* scale: 0.7; */
    transform: scale(0.7);
    top: 5%;
    left: -10%;
    svg {
      width: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    left: -5%;
    bottom: 20%;
  }

  @media (max-width: ${breakpoints.s}px) {
    /* scale: 1; */
    transform: scale(1);
    top: 20%;
    left: 5%;
    bottom: auto;
    svg {
      max-width: 90vw;
    }
  }
`

const BlueTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 46%;
  left: 17%;
  @media (max-width: ${breakpoints.xxl}px) {
    left: 10%;
    /* bottom: 7%; */
  }
  @media (max-width: ${breakpoints.l}px) {
    /* scale: 0.7; */
    transform: scale(0.7);
    bottom: 10%;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const PurpleTriangleWrapper = styled(motion.div)`
  position: absolute;
  bottom: -3%;
  right: 22%;

  @media (max-width: ${breakpoints.xl}px) {
    bottom: 0%;
    right: 15%;
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: 30%;
    right: 15%;
    scale: 0.65;
    /* transform: scale(0.85); */
  }
  @media (max-width: ${breakpoints.s}px) {
    display: none;
    /* transform: scale(0.3); */
  }
`

const GreenTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 10%;
  right: 25%;

  @media (max-width: ${breakpoints.xxl}px) {
    right: 20%;
    top: 5%;
  }
  @media (max-width: ${breakpoints.l}px) {
    scale: 0.8;
    /* transform: scale(0.8); */
    top: 5%;
    right: 25%;
  }
  @media (max-width: ${breakpoints.m}px) {
    top: auto;
    bottom: 0%;
    right: 5%;
    scale: 0.5;
  }
`

const OrangeTriangleWrapper = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: 20%;

  @media (max-width: ${breakpoints.l}px) {
    scale: 0.5;
    /* transform: scale(0.5); */
    top: 0%;
  }

  @media (max-width: ${breakpoints.s}px) {
    left: -3%;
    top: 30%;
    scale: 0.45;
    /* transform: scale(0.45); */
  }
`
