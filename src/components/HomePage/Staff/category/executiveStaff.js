import React, { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "../../../breakpoints"

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
      <Clicky
        initial={{ opacity: 1 }}
        animate={{
          opacity: clicked ? 0 : 1,
          transition: {
            delay: 0.1,
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="24"
          height="23"
          viewBox="0 0 24 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12.0469" x2="12.0469" y2="23" stroke="#F7F7FC" />
          <line
            x1="23.5469"
            y1="11.5"
            x2="0.546875"
            y2="11.5"
            stroke="#F7F7FC"
          />
        </svg>
      </Clicky>
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
      </AnimatePresence>
    </Card>
  )
}

export default ExecutiveStaff

const Card = styled(motion.div)`
  position: relative;
  padding: 3rem 0.5rem;
  margin: 0 1rem;
  width: 350px;
  max-width: 20vw;
  height: 100%;
  cursor: pointer;

  @media (max-width: ${breakpoints.xxl}px) {
    margin: 0 1.5rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin: 0 .5rem;
    height: auto;
    width: 300px;
    max-width: 300px;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin: 0 .5rem;
    height: auto;
    width: 350px;
    max-width: 550px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 400px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 350px;
  }
`

const Clicky = styled(motion.div)`
  cursor: pointer;
  color: white;
  background-color: var(--color-black);
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  position: absolute;
  bottom: -0.5rem;
  left: -0.5rem;

  @media (max-width: ${breakpoints.s}px) {
    right: 1.5rem;
    bottom: 1rem;
    left: auto;
    width: 35px;
    height: 35px;
  }
`

const Bio = styled(motion.div)`
  z-index: 4;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: 96.5%;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  padding-bottom: 1.5rem;
  background: var(--color-black);
  border-radius: 10px;
  cursor: pointer;
  overflow-y: scroll;
  scrollbar-width: none;

  p {
    margin: 0.5rem;
    color: var(--color-white);
    user-select: none;
  }

  @media (max-width: ${breakpoints.s}px) {
    p {
      font-size: 20px;
      line-height: 130%;
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
  @media (max-width: ${breakpoints.xl}px) {
    max-height: 350px;
  }

  @media (max-width: ${breakpoints.m}px) {
    max-height: 300px;
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
  /* padding: 0.5rem;
  padding-top: 0; */
  p {
    line-height: 110%;
    font-family: "balgin-bold";
    padding: 0.5rem 1rem;
    padding-top: 0.35rem;
    vertical-align: super;
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
