import React from "react"
import {
  MobileNavGreen,
  MobileNavWhite,
  MobileNavOrange,
  MobileNavBlue,
  MobileNavBlack,
  MobileNavPurple,
} from "../../src/svg/logos"
import { motion } from "framer-motion"
import styled from "styled-components"

const MobileNavAnimation = () => {
  const SVGs = [
    <MobileNavGreen />,
    <MobileNavWhite />,
    <MobileNavOrange />,
    <MobileNavBlue />,
    <MobileNavBlack />,
    <MobileNavPurple />,
  ]

  return (
    <>
      {SVGs.map((color, index) => {
        return (
          <Wrapper
            key={index}
            animate={{
              y: [0, -35, 35, 0],
              x: [0, -15, 0],
              transition: {
                duration: 3,
                repeatDelay: 1,
                delay: 0.1 * index,
                repeat: "Infinity",
                type: "spring",
                stiffness: 200,
                bounce: 1,
                mass: 50,
                // ease: "easeIn"
              },
            }}
          >
            {color}
          </Wrapper>
        )
      })}
    </>
  )
}

export default MobileNavAnimation

const Wrapper = styled(motion.div)`
  position: absolute;

  :nth-child(1) {
    z-index: 10;
  }
  :nth-child(2) {
    z-index: 9;
  }
  :nth-child(3) {
    z-index: 8;
  }
  :nth-child(4) {
    z-index: 7;
  }
  :nth-child(5) {
    z-index: 6;
  }
  :nth-child(6) {
    z-index: 5;
  }
`
