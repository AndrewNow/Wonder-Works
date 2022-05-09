import React from "react"
import styled from "styled-components"
import { MapExecutiveStaff, MapOtherStaff } from "./mapStaffData"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import breakpoints from "../../breakpoints"
import Carousel from "./carousel"

const OurWonderWorkers = () => {
  const line = {
    visible: {
      transition: {
        duration: 2,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  }

  const word = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 11,
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  }

  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <Wrapper>
      <h1>Our Wonder Workers</h1>
      <InnerWrapper>
        <MapExecutiveStaff />
      </InnerWrapper>
      <JoinOurTeam ref={sectionRef}>
        <motion.h4
          variants={line}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.span variants={word}>Join </motion.span>
          <motion.span variants={word}>our </motion.span>
          <motion.span variants={word}>wonderful </motion.span>
          <motion.span variants={word}>team </motion.span>
          <motion.span variants={word}>working </motion.span>
          <motion.span variants={word}>under </motion.span>
          <motion.span variants={word}>one </motion.span>
          <motion.span variants={word}>roof!</motion.span>
        </motion.h4>
        <SlideShow>
          <Carousel />
        </SlideShow>
      </JoinOurTeam>
      <InnerWrapper
        style={{
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          maxWidth: "98%!important"
        }}
      >
        <MapOtherStaff />
      </InnerWrapper>
    </Wrapper>
  )
}

export default OurWonderWorkers

const Wrapper = styled.section`
  background: #ffcd30;
  padding: 10rem 0;

  h1 {
    font-family: "balgin-medium";
    text-align: center;
    text-transform: uppercase;
    margin: 0 auto;
    padding-bottom: 10rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 5rem 0;

    h1 {
      padding-bottom: 3rem;
    }
  }
`

const InnerWrapper = styled.div`
  width: 98%;
  margin: 0 auto;
  max-width: 1900px;

  @media (max-width: ${breakpoints.m}px) {
    /* border: none !important; */
    width: 90%;
  }
`

const JoinOurTeam = styled.div`
  padding: 10rem 0;
  margin: 0 auto;
  h4 {
    margin: 0 auto;
    text-align: center;
    font-family: "balgin-bold";
    position: relative;
    display: block;
    overflow: hidden;
    span {
      height: 100%;
      overflow: hidden;
      display: inline-block;
      vertical-align: top;
      padding-bottom: 0.5rem;
      margin-right: 0.5%;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding: 5rem 0;
    h4 {
      width: 55%;
      span {
        margin-right: 1%;
      }
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 3rem 0;
    h4 {
      width: 80%;
      font-size: 21px;
    }
  }
`

const SlideShow = styled.div`
  overflow: hidden;
  border-radius: 30px;
  border: 2px solid var(--color-black);
  box-sizing: border-box;

  display: block;
  margin: 5rem auto;
  max-width: 69%;
  aspect-ratio: 1350/900;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: ${breakpoints.l}px) {
    max-width: 85%;
    border-radius: 20px;
    margin: 2rem auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    max-width: 90%;
    border-radius: 10px;
  }
`
