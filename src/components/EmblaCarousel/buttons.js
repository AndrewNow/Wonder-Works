import React from "react"
import styled from "styled-components"
import {motion} from 'framer-motion'

export const PrevButton = ({ enabled, onClick }) => {
  return (
    <EmblaButton
      onClick={onClick}
      disabled={!enabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        width="51"
        height="58"
        viewBox="0 0 51 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.8"
          d="M49.7869 57.616L50.0081 0L2.53518e-06 28.6169L49.7869 57.616Z"
          fill="#6653A3"
        />
      </svg>
    </EmblaButton>
  )
}

export const NextButton = ({ enabled, onClick }) => {
  return (
    <EmblaButton
      onClick={onClick}
      disabled={!enabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        width="51"
        height="58"
        viewBox="0 0 51 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.8"
          d="M0.221191 0L0 57.616L50.0081 28.999L0.221191 0Z"
          fill="#6653A3"
        />
      </svg>
    </EmblaButton>
  )
}

const EmblaButton = styled(motion.button)`
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  top: 40%;
  /* transform: translateY(-50%); */
  border: 0;
  width: 51px;
  height: 58px;
  justify-content: center;
  align-items: center;
  fill: #1bcacd;
  padding: 0;

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`
