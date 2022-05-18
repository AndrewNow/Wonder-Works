import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import breakpoints from "../../breakpoints"

const OtherStaff = ({ title, name, imgSrc, rotationTop, rotationBottom }) => {
  const hoverAnimationTop = {
    visible: {
      opacity: 1,
      y: 0,
      x: "-50%",
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 50,
        damping: 8,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      x: "-50%",
    },
  }
  const hoverAnimationBottom = {
    visible: {
      opacity: 1,
      y: -5,
      x: "-50%",
      transition: {
        delay: 0.1,
        duration: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 11,
      },
    },
    hidden: {
      opacity: 0,
      y: 0,
      x: "-50%",
    },
  }

  const [hovered, setHovered] = useState(false)

  return (
    <Card onClick={() => setHovered(!hovered)}>
      <div
        style={{
          transform: `rotate(${rotationTop})`,
          position: "relative",
          zIndex: "2",
        }}
      >
        <TextTop
          variants={hoverAnimationTop}
          initial="hidden"
          animate={hovered ? "visible" : "hidden"}
        >
          {name}
        </TextTop>
      </div>
      <ImageWrapper
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {imgSrc}
      </ImageWrapper>
      <div
        style={{
          transform: `rotate(${rotationTop})`,
          position: "relative",
          zIndex: "2",
        }}
      >
        <TextBottom
          variants={hoverAnimationBottom}
          initial="hidden"
          animate={hovered ? "visible" : "hidden"}
          style={{ transform: `rotate(${rotationBottom})` }}
        >
          {title}
        </TextBottom>
      </div>
    </Card>
  )
}

export default OtherStaff

const Card = styled(motion.div)`
  position: relative;
  padding: 0.5rem;
  margin: 0 2rem;
  /* display: inline; */
  cursor: pointer;

  @media (max-width: ${breakpoints.s}px) {
    margin: 0 0.25rem;
  }
`

const TextTop = styled(motion.p)`
  position: absolute;
  z-index: 20;
  top: 0;
  left: 50%;
  background: var(--color-black);
  color: white;
  font-family: "balgin-bold";
  text-align: center;
  box-sizing: border-box;
  /* border: 2px solid #ffcd30; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  padding-top: 0;

  @media (max-width: ${breakpoints.s}px) {
    white-space: nowrap;
  }
`

const TextBottom = styled(motion.p)`
  position: absolute;
  z-index: 2;
  bottom: 30%;
  left: 50%;
  width: 100%;
  background: var(--color-black);
  color: white;
  text-align: center;
  box-sizing: border-box;
  /* border: 2px solid #ffcd30; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  @media (max-width: ${breakpoints.s}px) {
    padding: 0.25rem;
  }
`

const ImageWrapper = styled.div`
  margin: 1rem auto;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1/1;
  position: relative;
  z-index: 1;
  max-height: 250px;
  > * {
    pointer-events: none;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 0 auto;
    max-height: 150px;
  }
`
