import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import breakpoints from "../../../breakpoints"

const Founders = ({
  title,
  name,
  imgSrc,
  rotationTop,
  rotationBottom,
}) => {
  const [clicked, setClicked] = useState(false)


  const hoverAnimationTop = {
    visible: {
      opacity: 1,
      y: -30,
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
      y: -5,
      x: "-50%",
    },
  }

  return (
    <Card onClick={() => setClicked(!clicked)}>
      <div
        style={{
          transform: `rotate(${rotationTop})`,
          position: "relative",
          zIndex: "3",
        }}
      >
        <TextTop
          variants={hoverAnimationTop}
          initial="hidden"
          animate="visible"
        >
          <p>{name}</p>
        </TextTop>
      </div>
      <ImageWrapper>{imgSrc}</ImageWrapper>
      <div
        style={{
          transform: `rotate(${rotationBottom})`,
          position: "relative",
          zIndex: "2",
        }}
      >
        <TextBottom
          variants={hoverAnimationBottom}
          initial="hidden"
          animate="visible"
        >
          <p>{title}</p>
        </TextBottom>
      </div>
    </Card>
  )
}

export default Founders

const Card = styled(motion.div)`
  position: relative;
  padding: 3rem 0.5rem;
  margin: 0 0.5rem;
  overflow: hidden;
  width: 420px;
  height: 100%;

  @media (max-width: 1650px) {
    width: 350px;
  }


  @media (max-width: ${breakpoints.xxl}px) {
    width: 300px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 450px;
  }
  @media (max-width: ${breakpoints.l}px) {
    height: auto;
    width: 350px;
    max-width: 550px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 450px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 350px;
  }
`



const ImageWrapper = styled.div`
  margin: 1rem auto;
  /* clip-path: circle(50%); */
  border-radius: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
  max-height: 400px;
  pointer-events: none;

  @media (max-width: ${breakpoints.l}px) {
  
  }
  @media (max-width: ${breakpoints.m}px) {
    /* border-radius: 0; */
    /* overflow: visible; */
    max-width: 75%;
    position: relative;
    z-index: 2;
  }
`

const TextTop = styled(motion.div)`
  position: absolute;
  top: -15%;
  left: 50%;
  background: var(--color-black);
  color: white;
  box-sizing: border-box;

  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 0px 3px #ffcd30;
  margin-top: 1rem;
  p {
    padding-top: 0.35rem;
    vertical-align: super;
    white-space: nowrap;
    line-height: 110%;
    font-family: "balgin-bold";
    padding: 0.5rem 1rem;
    padding-top: 0.45rem;
    color: white;
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 2rem;
    p {
      font-size: 24px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 1rem;
    p {
      font-size: 24px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 1rem;
    white-space: nowrap;

    p {
      font-size: 24px;
    }
  }
`

const TextBottom = styled(motion.div)`
  position: absolute;
  bottom: 30%;
  left: 50%;
  background: var(--color-black);
  box-sizing: border-box;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 0px 3px #ffcd30;

  p {
    white-space: nowrap;
    padding: 0.5rem 1rem;
    color: white;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 0.25rem;
  }
`
