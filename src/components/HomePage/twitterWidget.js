import React from "react"
import styled from "styled-components"
import { Timeline } from "react-twitter-widgets"
import breakpoints from "../breakpoints"
import { line, word } from "../../components/textAnimationValues"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const TwitterWidget = () => {
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <Wrapper ref={sectionRef}>
      <Inner>
        <motion.h2
          variants={line}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.span variants={word}>What </motion.span>
          <motion.span variants={word}>we're</motion.span>
          <motion.span variants={word}>up </motion.span>
          <motion.span variants={word}>to</motion.span>
        </motion.h2>
        <Placeholder>
          {sectionInView && (
            <Timeline
              dataSource={{
                sourceType: "profile",
                screenName: "WonderWorksRB",
              }}
              options={{
                width: "500",
                height: "530",
                tweetLimit: 3
              }}
            />
          )}
        </Placeholder>
      </Inner>
    </Wrapper>
  )
}

export default TwitterWidget

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  background: var(--color-pink);
`

const Placeholder = styled.div`
  min-height: 100vh;
  max-width: 80vw;
  /* height: 530px; */
  /* overflow-y: scroll; */
  /* border-radius: 12px; */
  display: block;
  position: relative;
  @media (max-width: ${breakpoints.s}px) {
    max-width: 90vw;
    /* height: 530px; */
  }
`

const Inner = styled.div`
  padding: 7.5rem 0;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-family: "balgin-medium";
    color: white;
    margin-bottom: 5rem;
    font-size: 5.2vw;
    line-height: 120%;
    text-align: center;
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
      padding-bottom: 0.25rem;
      margin-right: 1%;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    h2 {
      font-size: 70px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      font-size: 65px;
      span {
        margin-right: 1rem;
      }
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 50px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2 {
      font-size: 42px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 3.5rem 0;
    max-width: 90%;
    h2 {
      margin-bottom: 3rem;
      font-size: 50px;
      span {
        margin-right: 0.75rem;
      }
    }
  }
`
