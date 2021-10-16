import React, { useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { ScrollToTopText, ScrollToTopArrow } from "../svg/miscellaneous"
import { AnimatePresence, motion } from "framer-motion"
import breakpoints from "./breakpoints"

const ScrollToTop = () => {
  // const toggleVisibility = () => {
  //   if (typeof window !== "undefined") {
  //     if (window.pageYOffset > 1500) {
  //       setIsVisible(true)
  //     } else {
  //       setIsVisible(false)
  //     }
  //   }
  // }
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setIsVisible(false)
    setHovered(false)
  }

  // let debounce = require("lodash/debounce")
  useLayoutEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== "undefined") {
        if (window.pageYOffset > 1500) {
          // debounce(() => setIsVisible(true), 300)
          setIsVisible(true)
        } else {
          // debounce(() => setIsVisible(false), 300)
          setIsVisible(false)
        }
      }
    }
    // Button is displayed after scrolling for 1500 pixels
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // useLayoutEffect(() => {
  //   // Button is displayed after scrolling for 500 pixels
  //   const toggleVisibility = () => {
  //     if (typeof window !== "undefined") {
  //       if (window.pageYOffset > 1500) {
  //         setIsVisible(true)
  //       } else {
  //         setIsVisible(false)
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", debounce(toggleVisibility, 300))
  //   return () =>
  //     window.removeEventListener("scroll", debounce(toggleVisibility, 300))
  // }, [debounce])



  const button = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeIn",
      },
    },
    hidden: {
      y: 300,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const rotation = {
    hovered: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
    nothovered: {
      rotate: 0,
      transition: {
        duration: 1,
        ease: "linear",
      },
    },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollToTopButton
          variants={button}
          onClick={scrollToTop}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          exit="hidden"
          aria-label="Press this button to scroll to top."
          whileTap={{ scale: 0.9 }}
        >
          <TextWrapper
            variants={rotation}
            animate={hovered ? "hovered" : "nothovered"}
          >
            <ScrollToTopText />
          </TextWrapper>
          <ArrowWrapper>
            <ScrollToTopArrow />
          </ArrowWrapper>
        </ScrollToTopButton>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop

const ScrollToTopButton = styled(motion.button)`
  cursor: pointer;
  z-index: 1900;
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  height: 92px;
  width: 92px;
  border-radius: 100%;
  border: none;
  background-color: var(--color-black);
  color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid var(--color-white);

  @media (max-width: ${breakpoints.l}px) {
    width: 70px;
    height: 70px;
  }
  /* filter: drop-shadow(0px 2px 4px rgba(255, 255, 255, 0.25)); */
`

const ArrowWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translateY(-3px);
  @media (max-width: ${breakpoints.l}px) {
    /* width: 70px; */
    /* height: 70px; */
  }
`
const TextWrapper = styled(motion.div)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  @media (max-width: ${breakpoints.l}px) {
    width: 43px;
    height: 43px;
  }
`
