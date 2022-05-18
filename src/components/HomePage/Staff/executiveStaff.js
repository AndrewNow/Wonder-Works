import React, { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "../../breakpoints"

const ExecutiveStaff = ({ title, name, bio, imgSrc }) => {
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

  return (
    <Card onClick={() => setClicked(!clicked)}>
      <TopText>
        <p>{name}</p>
        <p>{title}</p>
      </TopText>
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
      </AnimatePresence>
    </Card>
  )
}

export default ExecutiveStaff

const Card = styled(motion.div)`
  position: relative;
  padding: 0.5rem;
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

const TopText = styled.div`
  display: flex;
  justify-content: space-between;

  cursor: pointer;

  p {
    color: black;
    font-family: "calibre-medium";
  }
  > p {
    max-width: 40%;
    :nth-child(2) {
      text-align: right;
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
