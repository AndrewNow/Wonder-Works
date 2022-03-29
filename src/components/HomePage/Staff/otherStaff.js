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
      y: 0,
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
      y: -10,
      x: "-50%",
    },
  }

  const [hovered, setHovered] = useState(false)

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      <TextMobile>
        <p>{name}</p>
        <p>{title}</p>
      </TextMobile>
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
      <ImageWrapper>{imgSrc}</ImageWrapper>
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

const Card = styled.div`
  position: relative;
  padding: 0.5rem;
  margin: 0 1rem;
  display: inline;

  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    :first-child {
      border-top: 1px solid black;
    }

    margin: 0 0.25rem;
    padding-right: 0;
  }
`
const TextMobile = styled.div`
  display: none;

  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75vw;
    margin-right: 1rem;
    p {
      color: black;
      font-family: "calibre-medium";
    }
    p:last-child {
      text-align: right;
      max-width: 65%;
    }
    p:first-child {
      max-width: 35%;
      margin-right: 1rem;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    p:last-child {
      max-width: 65%;
    }
    p:first-child {
      max-width: 20%;
      margin-right: 1rem;
    }
  }
`

const TextTop = styled(motion.p)`
  position: absolute;
  z-index: 2;
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

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const TextBottom = styled(motion.p)`
  position: absolute;
  z-index: 2;
  bottom: 0;
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

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const ImageWrapper = styled(motion.div)`
  margin: 3rem auto;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1/1;
  position: relative;
  z-index: 1;
  > * {
    pointer-events: none;
  }

  @media (max-width: ${breakpoints.m}px) {
    border-radius: 0;
    overflow: visible;
    aspect-ratio: auto;
    max-width: 20vw;
    margin: 1rem auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    max-width: 15vw;
  }
`
