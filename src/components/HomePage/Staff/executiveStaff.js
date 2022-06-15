import React, { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "../../breakpoints"

const ExecutiveStaff = ({
  title,
  name,
  bio,
  imgSrc,
  rotationTop,
  rotationBottom,
}) => {
  const [clicked, setClicked] = useState(false)

  const bioAnim = {
    visible: {
      height: "96.5%",
      opacity: 1,
      display: "block",
    },
    hidden: {
      height: 0,
      opacity: 0,
      transitionEnd: { display: "none" },
    },
  }

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

  return (
    <Card onClick={() => setClicked(!clicked)}>
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
          animate="visible"
          // animate={hovered ? "visible" : "hidden"}
        >
          <p>{name}</p>
        </TextTop>
      </div>
      <ImageWrapper>{imgSrc}</ImageWrapper>
      <AnimatePresence exitBeforeEnter>
        {clicked && (
          <Bio
            key="modal"
            variants={bioAnim}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p>{bio}</p>
          </Bio>
        )}
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
            // style={{ transform: `rotate(${rotationBottom})` }}
            // animate={hovered ? "visible" : "hidden"}
          >
            <p>{title}</p>
          </TextBottom>
        </div>
      </AnimatePresence>
    </Card>
  )
}

export default ExecutiveStaff

const Card = styled(motion.div)`
  position: relative;
  padding: 0.5rem;
  padding-bottom: 3rem;
  margin: 0 0.5rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  overflow: hidden;
  width: 350px;
  height: 100%;

  @media (max-width: ${breakpoints.xl}px) {
    margin: 1rem 0.5rem;
    border-bottom: none;
  }
  @media (max-width: ${breakpoints.l}px) {
    height: auto;

    :last-child {
      border-bottom: 1px solid black;
    }
  }
`

const Bio = styled(motion.div)`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: 96.5%;
  margin: 0.5rem;
  background: var(--color-black);
  border-radius: 10px;
  cursor: pointer;
  overflow-y: scroll;
  scrollbar-width: none;

  p {
    margin: 0.5rem;
    color: var(--color-white);
  }

  @media (max-width: ${breakpoints.m}px) {
    position: relative;
    background: none;
    overflow: hidden;
    p {
      color: black;
      margin: 0;
    }
  }
`

const ImageWrapper = styled.div`
  margin: 1rem auto;
  /* clip-path: circle(50%); */
  border-radius: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
  max-height: 300px;
  cursor: pointer;
  pointer-events: none;

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
  /* z-index: ; */
  top: -10%;
  left: 50%;
  background: var(--color-black);
  color: white;
  box-sizing: border-box;

  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  /* padding: 0.5rem;
  padding-top: 0; */
  p {
    line-height: 110%;
    font-family: "balgin-bold";
    padding: 0.5rem 1rem;
    padding-top: 0.25rem;
    color: white;
  }
  @media (max-width: ${breakpoints.s}px) {
    white-space: nowrap;
  }
`

const TextBottom = styled(motion.div)`
  position: absolute;
  /* z-index: 2; */
  bottom: 30%;
  left: 50%;
  background: var(--color-black);
  box-sizing: border-box;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  p {
    white-space: nowrap;
    padding: 0.5rem 1rem;
    color: white;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 0.25rem;
  }
`
