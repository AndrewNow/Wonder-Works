import React from "react"
import styled from "styled-components"
import { MapFounders, MapExecutiveStaff, MapOtherStaff } from "./mapStaffData"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import breakpoints from "../../breakpoints"
import Carousel from "./carousel"
import { line, word, textChild } from "../../../components/textAnimationValues"

const OurWonderWorkers = () => {
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.1,
    triggerOnce: true,
  })
  const [founderRef, founderInView] = useInView({
    root: null,
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <>
      <Wrapper ref={founderRef}>
        <WrapFounders>
          <FounderText>
            <motion.h2
              variants={line}
              initial="hidden"
              animate={founderInView ? "visible" : "hidden"}
              ref={sectionRef}
            >
              <motion.span variants={word}>Meet </motion.span>
              <motion.span variants={word}>the </motion.span> <br />
              <motion.span variants={word}>Founders</motion.span>
            </motion.h2>
            <motion.p
              variants={textChild}
              initial="hidden"
              animate={founderInView ? "visible" : "hidden"}
              ref={sectionRef}
            >
              Utilising the power of new media and their creative minds, Megan
              and Zach founded Wonder Works Studio with a vision to create an
              all-encompassing super studio that can bring any dream into a
              reality. Between this power couple they have over 20+ years of
              industry gaming experience, from entertainment to development,
              each garnering millions of followers in new media and billions of
              impressions. These two understand what this generation of gamers
              really crave and what they find to be entertaining, together this
              pair works wonders.
            </motion.p>
          </FounderText>
          <FlexFounders>
            <MapFounders />
          </FlexFounders>
        </WrapFounders>
      </Wrapper>
      <Wrapper>
        <h1>Our Wonder Workers</h1>
        <InnerWrapper>
          <MapExecutiveStaff />
        </InnerWrapper>
        <JoinOurTeam>
          <motion.h4
            variants={line}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            ref={sectionRef}
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
            maxWidth: "98%!important",
          }}
        >
          <MapOtherStaff />
        </InnerWrapper>
      </Wrapper>
    </>
  )
}

export default OurWonderWorkers

const WrapFounders = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
    align-items: center;
  }
`

const FounderText = styled.div`
  p {
    margin-top: 2rem;
    width: 85%;
  }
  h2 {
    position: relative;
    display: block;
    overflow: hidden;
    span {
      height: 100%;
      overflow: hidden;
      display: inline-block;
      vertical-align: top;
      padding-bottom: 0.5rem;
      margin-right: 2%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    p {
      margin: 2rem auto;
      margin-bottom: 3rem;
      width: 90%;
      text-align: center;
    }
    h2 {
      text-align: center;
      line-height: 110%;
      span {
        padding-bottom: 0rem;
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2 > span {
      padding-bottom: 0.5rem;
    }
  }
`
const FlexFounders = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.xxl}px) {
    /* margin: 0 2rem; */
  }
  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
    align-items: center;
  }
`

const Wrapper = styled.section`
  background: #ffcd30;
  padding: 10rem 0;

  h2 {
    font-family: "balgin-bold";
  }

  h1 {
    font-family: "balgin-medium";
    text-align: center;
    text-transform: uppercase;
    margin: 0 auto;
    padding-bottom: 10rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding: 7.5rem 0;
    h1 {
      width: 80%;
      padding-bottom: 3rem;
    }
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
  padding: 2rem 0;
  max-width: 1900px;

  @media (max-width: ${breakpoints.m}px) {
    /* border: none !important; */
    width: 90%;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 1rem 0;
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
  @media (max-width: ${breakpoints.l}px) {
    h4 {
      width: 65%;
      font-size: 35px;
      line-height: 120%;
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
