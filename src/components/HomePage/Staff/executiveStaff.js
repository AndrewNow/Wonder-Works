import React, { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

const ExecutiveStaff = ({ title, name, bio, imgSrc }) => {
  const [clicked, setClicked] = useState(false)

  const bioAnim = {
    visible: {
      y: "0",
      opacity: 1,
      transitionEnd: { display: "block" },
    },
    hidden: {
      y: "-100%",
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
      <AnimatePresence>
        <Bio
          variants={bioAnim}
          initial="hidden"
          animate={clicked ? "visible" : "hidden"}
          exit="hidden"
        >
          <p>{bio}</p>
        </Bio>
      </AnimatePresence>
    </Card>
  )
}

export default ExecutiveStaff

const Card = styled.div`
  position: relative;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  overflow: hidden;
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

  p {
    margin: 0.5rem;
    color: var(--color-white);
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
`
