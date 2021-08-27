import React, { useRef, useEffect, useCallback } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useAnimation } from "framer-motion"
import * as svg from "./SVGs"
import { useInView, InView } from "react-intersection-observer"

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
      opacity: [0, 1, 0],
      y: [-50, 0, 125],
      rotateX: [90, 0, -90],
      transition: {
        delay: i * 2,
        repeatDelay: 10,
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        // ease: [0.5, 0.1, 0.1, 1.0],
      },
    }),
    hidden: {
      opacity: 0,
      visibility: "none"
    }
  }

  const ref = useRef()
  const [careerRef, careerInView] = useInView({
    root: null,
    threshold: 0,
    triggerOnce: false,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      careerRef(node)
    },
    [careerRef]
  )

  {
    console.log(careerInView)
  }
  return (
    <Wrapper ref={careerRef}>
      <Left>
        <h1>Love</h1>
        <Container>
          {data.map((item, i) => (
            <HideText
              variants={textAnim}
              animate={careerInView ? "visible" : "hidden"}
              custom={i}
            >
              <motion.h1 style={{ color: `${item.color}` }}>
                {item.title}
                <SvgWrapper
                // variants={iconAnim} animate="visible" custom={i}
                >
                  {item.icon}
                </SvgWrapper>
              </motion.h1>
            </HideText>
          ))}
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
        <PositionsLink to="/">See available positions</PositionsLink>
      </Right>
    </Wrapper>
  )
}

export default CareerFlip

const Wrapper = styled.div`
  width: 70%;
  height: 80vh;
  margin: 0 auto;
  padding-bottom: 15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Left = styled.div``

const Right = styled.div`
  width: 35%;

  strong {
    display: block;
    font-family: "calibre-medium";
    margin-top: 5rem;
  }
  p {
    margin-bottom: 2rem;
  }
`

const Container = styled.div`
  position: relative;
  white-space: nowrap;
  padding-bottom: 2rem;
  position: relative;
  z-index: 5;
  perspective: 1000px;
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
`

const AdventuresWrapper = styled.div`
  transform: translate3d(-30%, -15%, 0);
`
const GamesWrapper = styled.div`
  transform: translate3d(15%, 0rem, 0);
`
const PingPongWrapper = styled.div`
  transform: translate3d(-25%, 35%, 0);
`
const TechnologyWrapper = styled.div`
  transform: translate3d(-40%, 10%, 0);
`
const AnimalsWrapper = styled.div`
  transform: translate3d(-10%, 10%, 0);
`
const RobloxWrapper = styled.div`
  transform: translate3d(15%, -10%, 0);
`
const UsWrapper = styled.div`
  transform: translate3d(0, 60%, 0);
`

const PositionsLink = styled(Link)`
  color: var(--color-black);
  font-family: "calibre-medium";
  font-size: 25px;
  line-height: 30px;
  text-decoration: none;
  text-transform: uppercase;
  position: relative;

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
`
