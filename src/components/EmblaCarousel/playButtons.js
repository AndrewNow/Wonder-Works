import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import breakpoints from "../breakpoints"
import { PressPlaySVG } from "./buttons"

export const PlayButtonFirstSlide = ({
  setPaused,
  setFirstPlayClick,
}) => {
  const button = {
    visible: {
      opacity: 1,
      translateY: "-50%",
      translateX: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeIn",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      translateY: "-50%",
      translateX: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const rotation = {
    visible: {
      rotate: 360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
    hidden: {
      rotate: 0,
      transition: {
        duration: 1,
        ease: "linear",
      },
    },
  }
  return (
    <Playbutton
      onClick={() => {
        setPaused(false)
        setFirstPlayClick(true)
      }}
      aria-label="Play video"
      whileTap={{ scale: 0.9 }}
      variants={button}
      initial="visible"
    >
      <TextWrapper variants={rotation} animate="visible">
        <PressPlaySVG />
      </TextWrapper>
      <PlaySVG>
        <svg
          width="78"
          height="89"
          viewBox="0 0 78 89"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8.70153C0 3.89553 3.86997 0 8.64554 0C10.1286 0 11.0687 0.38982 12.7225 1.05198L73.3695 36.563C76.1897 38.2451 77.4959 40.948 78 44.0639V44.9379C77.4959 48.052 76.1897 50.7558 73.3695 52.4388L12.7233 87.9489C11.0687 88.612 10.1286 89 8.64643 89C3.87086 89 0.0008843 85.1045 0.0008843 80.2985L0 8.70153Z"
            fill="#F7F7FC"
          />
        </svg>
      </PlaySVG>
    </Playbutton>
  )
}

export const PlayIconReactPlayer = ({ paused, setPaused, setHover }) => {
  const button = {
    visible: {
      opacity: 1,
      translateY: "-50%",
      translateX: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeIn",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      translateY: "-50%",
      translateX: "-50%",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const rotation = {
    visible: {
      rotate: 360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
    hidden: {
      rotate: 0,
      transition: {
        duration: 1,
        ease: "linear",
      },
    },
  }

  return (
    <Playbutton
      aria-label="Play video"
      onClick={() => {
        setPaused(!paused)
        setHover(false)
      }}
      whileTap={{ scale: 0.9 }}
      variants={button}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <TextWrapper variants={rotation}>
        <PressPlaySVG />
      </TextWrapper>
      {!paused ? (
        <PauseSVG>
          <svg
            width="76"
            height="88"
            viewBox="0 0 76 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7468 0H4.22895C2.29678 0 0.640625 1.56414 0.640625 3.58833V83.9117C0.640625 85.8438 2.20477 87.5 4.22895 87.5H24.6548C26.587 87.5 28.2432 85.9359 28.2432 83.9117V3.58833C28.2432 1.56414 26.679 0 24.7468 0Z"
              fill="#F7F7FC"
            />
            <path
              d="M71.7631 0H51.2452C49.313 0 47.6569 1.56414 47.6569 3.58833V83.9117C47.6569 85.8438 49.221 87.5 51.2452 87.5H71.6711C73.6032 87.5 75.2594 85.9359 75.2594 83.9117V3.58833C75.2594 1.56414 73.6952 0 71.7631 0Z"
              fill="#F7F7FC"
            />
          </svg>
        </PauseSVG>
      ) : (
        <PlaySVG>
          <svg
            width="78"
            height="89"
            viewBox="0 0 78 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8.70153C0 3.89553 3.86997 0 8.64554 0C10.1286 0 11.0687 0.38982 12.7225 1.05198L73.3695 36.563C76.1897 38.2451 77.4959 40.948 78 44.0639V44.9379C77.4959 48.052 76.1897 50.7558 73.3695 52.4388L12.7233 87.9489C11.0687 88.612 10.1286 89 8.64643 89C3.87086 89 0.0008843 85.1045 0.0008843 80.2985L0 8.70153Z"
              fill="#F7F7FC"
            />
          </svg>
        </PlaySVG>
      )}
    </Playbutton>
  )
}

const Playbutton = styled(motion.button)`
  border: none;
  overflow: hidden;
  background: none;
  background-color: #ffffff50;
  cursor: pointer;
  position: absolute;
  z-index: 50;
  width: 240px;
  height: 240px;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    height: 150px;
  }
`

const TextWrapper = styled(motion.div)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 220px;
      height: 220px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 150px;
      height: 150px;
    }
  }
`

const PlaySVG = styled.div`
  margin-left: 0.5rem;
  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 75px;
      height: 75px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 55px;
      height: 55px;
    }
  }
`
const PauseSVG = styled.div`
  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 75px;
      height: 75px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 55px;
      height: 55px;
    }
  }
`
