import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../breakpoints"
import { motion } from "framer-motion"
import {
  line,
  word,
  textFadeIn,
  textChild,
} from "../../components/textAnimationValues"
import { useInView } from "react-intersection-observer"

const CaseStudy = () => {
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.3,
    triggerOnce: true,
  })

  const [textRef, textInView] = useInView({
    root: null,
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <Wrapper ref={sectionRef}>
      <Inner>
        <motion.h1
          variants={line}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.span variants={word}>Case </motion.span>
          <motion.span variants={word}>Study</motion.span>
        </motion.h1>
        <Content>
          <Image>
            <StaticImage
              src="../../images/Home/caseStudy/traitor.png"
              alt="Thumbnail for Traitor, one of Wonder Works' most popular games."
              quality={100}
              width={620}
              placeholder="blurred"
            />
          </Image>
          <Text
            ref={textRef}
            initial="hidden"
            variants={textFadeIn}
            animate={textInView ? "visible" : "hidden"}
          >
            <motion.h4 variants={textChild}>Traitor</motion.h4>
            <motion.h5 variants={textChild}>
              Our team built Traitor in 3 weeks, a successful test of our
              ability to quickly enter a new genre and take share with
              higher-quality production. Like many of our experiences, Traitor
              leveraged our influencer expertise to drive new player growth. We
              build virality into all of our content and our Traitor influencer
              tournaments generated 4M+ views on YouTube and 18M+ visits to the
              game.
            </motion.h5>
          </Text>
        </Content>
      </Inner>
    </Wrapper>
  )
}

export default CaseStudy

const Wrapper = styled.section`
  background-color: var(--color-green);
`

const Inner = styled.div`
  padding: 10rem 0;
  width: 90%;
  max-width: 1850px;
  margin: 0 auto;

  h1 {
    font-family: "ppwoodland-bold";
    color: black;
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    span:last-of-type {
      margin-right: 0;
    }
    span {
      height: 100%;
      overflow: hidden;
      display: inline-block;
      vertical-align: top;
      padding-bottom: 0.5rem;
      margin-right: 2%;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    padding: 7rem 0;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-top: 3rem;
  }
`

const Image = styled.div`
  position: relative;
  display: block;
  height: auto;
  border-radius: 13px;
  border: 1px solid var(--color-black);
  z-index: 5;
  background-color: var(--color-black);
  box-shadow: 12px 12px 0px #eb2c90;

  @media (max-width: ${breakpoints.s}px) {
    border: none;
    box-shadow: 5px 5px 0px #eb2c90;
  }
`

const Text = styled(motion.div)`
  width: 50%;
  margin-left: 4rem;

  h4,
  h5 {
    color: black;
  }
  h4 {
    font-family: "balgin-bold";
    margin-bottom: 1rem;
  }
  h5 {
    font-family: "calibre-medium";
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    margin-left: 0;
    margin-top: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    h4 {
      font-size: 24px;
    }
  }
`
