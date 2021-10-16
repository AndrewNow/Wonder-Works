import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"
import * as svg from "./SVGs"
import { useInView } from "react-intersection-observer"
import breakpoints from "../breakpoints"

const CareerFlip = () => {
  const data = [
    {
      title: "Adventures?",
      icon: (
        <AdventuresWrapper>
          <svg.Adventures />
        </AdventuresWrapper>
      ),
      color: "#D9E141",
    },
    {
      title: "Games?",
      icon: (
        <GamesWrapper>
          <svg.Games />
        </GamesWrapper>
      ),
      color: "#1764AF",
    },
    {
      title: "Ping-Pong?",
      icon: (
        <PingPongWrapper>
          <svg.PingPong />
        </PingPongWrapper>
      ),

      color: "#E795BF",
    },
    {
      title: "Technology?",
      icon: (
        <TechnologyWrapper>
          <svg.Technology />
        </TechnologyWrapper>
      ),
      color: "#EB2C90",
    },
    {
      title: "Animals?",
      icon: (
        <AnimalsWrapper>
          <svg.Animals />
        </AnimalsWrapper>
      ),
      color: "#59C9F3",
    },
    {
      title: "Roblox?",
      icon: (
        <RobloxWrapper>
          <svg.Roblox />
        </RobloxWrapper>
      ),
      color: "#FABB17",
    },
    {
      title: "Us?",
      icon: (
        <UsWrapper>
          <svg.Us />
        </UsWrapper>
      ),
      color: "#6653A3",
    },
  ]

  const textAnim = {
    visible: i => ({
      visibility: "visible",
      opacity: [0, 1, 1, 0],
      y: [-50, 1, 1, 100],
      rotateX: [90, 0, 0, -90],
      transformPerspective: [5000, 1000, 5000],
      transition: {
        delay: i * 1.75,
        repeatDelay: 9.75,
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        type: "spring",
        bounce: 1,
        // ease: "easeInOut"
      },
    }),
    hidden: {
      opacity: 0,
      visibility: "none",
    },
  }
  const svgAnim = {
    visible: i => ({
      visibility: "visible",
      opacity: [0, 1, 1, 0],
      y: [-50, 0, 0, 30],
      transition: {
        delay: i * 1.75,
        repeatDelay: 9.75,
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        type: "spring",
        // ease: "easeInOut"
      },
    }),
    hidden: {
      opacity: 0,
      visibility: "none",
    },
  }

  const [careerRef, careerInView] = useInView({
    root: null,
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <Wrapper ref={careerRef}>
      <Left>
        <h1>Love</h1>
        <Container>
          <AnimatePresence>
            {careerInView &&
              data.map((item, i) => (
                <HideText
                  key={i}
                  variants={textAnim}
                  animate={careerInView ? "visible" : "hidden"}
                  custom={i}
                >
                  <motion.h1 style={{ color: `${item.color}` }}>
                    {item.title}
                    <SvgWrapper
                      variants={svgAnim}
                      animate={careerInView ? "visible" : "hidden"}
                      custom={i}
                    >
                      {item.icon}
                    </SvgWrapper>
                  </motion.h1>
                </HideText>
              ))}
          </AnimatePresence>
        </Container>
      </Left>
      <Right>
        <p>
          <strong>Let's work together.</strong>
        </p>
        <p>
          Interested in joining a team of imaginative, innovative creatives?
          Click below to see what we’re searching for—maybe it’s you!
        </p>
        <PositionsLink to="/careers">See available positions</PositionsLink>
      </Right>
    </Wrapper>
  )
}

export default CareerFlip

const Wrapper = styled.div`
  width: 70%;
  height: 80vh;
  margin: 0 auto;
  padding-top: 5rem;
  margin-bottom: 15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 75%;
    height: auto;
    padding-top: 15rem;
    margin-bottom: 35rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin-bottom: 40rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 15rem;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-bottom: 10rem;
  }
  
  @media (max-width: ${breakpoints.s}px) {
    padding-top: 10rem;
    margin-bottom: 0rem;
    width: 80%;
    overflow-x: hidden;
  }
`
const Left = styled.div`
  @media (max-width: 1600px) {
    width: 80%;
    h1 {
      position: relative;
      font-size: 7vw;
      line-height: 100%;
      z-index: 6;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 95%;
    h1 {
      font-size: 50px;
      line-height: 50px;
    }
  }
`

const Right = styled.div`
  width: 35%;
  z-index: 100;
  position: relative;
  strong {
    display: block;
    font-family: "calibre-medium";
    margin-top: 5rem;
  }
  p {
    margin-bottom: 2rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 60%;
    transform: translateX(2rem);
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 55%;
    transform: none;
    margin-top: 5rem;
    background: var(--color-white);
    -webkit-box-shadow: 0px -15px 13px 5px #f7f7fc;
    box-shadow: 0px -15px 13px 5px #f7f7fc;
    strong {
      margin-top: 0rem;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 0.5rem;
    margin-top: 2.5rem;
    width: 100%;
    strong {
      margin-top: 0rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 5rem;
    p {
      margin-bottom: 1rem;
      letter-spacing: 0rem;
    }
  }
`

const Container = styled.div`
  position: relative;
  white-space: nowrap;
  padding-bottom: 2rem;
  position: relative;
  z-index: 5;
  /* perspective: 1000px; */
  perspective-origin: center;
`

const HideText = styled(motion.div)`
  position: absolute;
  top: 0%;
  h1 {
    position: relative;
    z-index: 5;
  }

  svg {
    position: relative;
    z-index: -2;
  }
`

const SvgWrapper = styled(motion.div)`
  position: absolute;
  z-index: -2;
  right: -15%;
  top: -70%;

  svg {
    width: 100%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    svg {
      transform: scale(.75);
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    svg {
      transform: scale(.65);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      transform: scale(.5);
    }
  }
`

const AdventuresWrapper = styled.div`
  transform: translate3d(-30%, -15%, 0);
  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(-15%, -25%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(5%, -42%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(5%, -42%, 0);
  }
`
const GamesWrapper = styled.div`
  transform: translate3d(15%, 0rem, 0);

  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(25%, -20%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(25%, -42%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(25%, -42%, 0);
  }
`
const PingPongWrapper = styled.div`
  transform: translate3d(-25%, 35%, 0);
  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(10%, -15%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(25%, -37%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(25%, -37%, 0);
  }
`
const TechnologyWrapper = styled.div`
  transform: translate3d(-40%, 10%, 0);
  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(-20%, -5%, 0);
  }
  @media (max-width: ${breakpoints.xl}px) {
    transform: translate3d(5%, -5%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(10%, -27%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(10%, -27%, 0);
  }
`
const AnimalsWrapper = styled.div`
  transform: translate3d(-10%, 10%, 0);
  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(20%, 0%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(40%, -12%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(40%, -12%, 0);
  }
`
const RobloxWrapper = styled.div`
  transform: translate3d(15%, -10%, 0);
  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(20%, -20%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(40%, -30%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(40%, -30%, 0);
  }
`
const UsWrapper = styled.div`
  transform: translate3d(0, 60%, 0);

  @media (max-width: ${breakpoints.xxl}px) {
    transform: translate3d(5%, 40%, 0);
  }
  @media (max-width: ${breakpoints.xl}px) {
    transform: translate3d(60%, 10%, 0);
  }
  @media (max-width: ${breakpoints.l}px) {
    transform: translate3d(0, 10%, 0);
  }
  @media (max-width: ${breakpoints.s}px) {
    transform: translate3d(0, -5%, 0);
  }
`

const PositionsLink = styled(Link)`
  color: var(--color-black);
  font-family: "calibre-medium";
  font-size: 25px;
  line-height: 30px;
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
  white-space: nowrap;
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: var(--color-black);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  @media (max-width: ${breakpoints.l}px) {
    font-size: 20px;
  }
  @media (max-width: ${breakpoints.s}px) {
    font-size: 18px;
    text-decoration: underline;
  }
`
