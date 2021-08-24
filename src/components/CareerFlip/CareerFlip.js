import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useMotionValue, useSpring } from "framer-motion"
import * as svg from "./SVGs"

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

  const [dataIndex, setDataIndex] = useState(0)

  useEffect(() => {
    if (dataIndex < data.length - 1) {
      setTimeout(() => setDataIndex(dataIndex + 1), 4000)
    } else {
      setTimeout(() => setDataIndex(0), 4000)
    }
    return (
      <div>
        <h1>{data[dataIndex].title}</h1>
      </div>
    )
  }, [dataIndex])


  return (
    <Wrapper>
      <Left>
        <h1>Love</h1>
        <HideText
          animate={{
            opacity: [0, 1],
            y: [20, 0],
            transition: {
              delay: 1,
              duration: 1,
              repeatDelay: 1,
              repeat: Infinity,
              repeatType: "mirror",
            },
          }}
        >
          <motion.h1 style={{ color: `${data[dataIndex].color}` }}>
            {data[dataIndex].title}
            <SvgWrapper
              animate={{
                opacity: [0, 1],
                y: [20, 0],
                transition: {
                  delay: 1,
                  duration: 1,
                  repeatDelay: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              }}
            >
              {data[dataIndex].icon}
            </SvgWrapper>
          </motion.h1>
        </HideText>
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
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 2rem;
  }
`

const HideText = styled(motion.div)`
  width: auto;
  transform-origin: 0% 0%;
  padding-bottom: 2rem;
  position: relative;
  z-index: 5;

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