import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ScrollToTopText, ScrollToTopArrow } from "../svg/miscellaneous"
import { AnimatePresence, motion, controls } from "framer-motion"

const ScrollToTop = () => {
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

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (typeof window !== "undefined") {
        if (window.pageYOffset > 1500) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

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
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
    nothovered: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
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
          whileTap={{scale: .9}}
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
  z-index: 3000;
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

  filter: drop-shadow(0px 2px 4px rgba(255, 255, 255, 0.25));
`

const ArrowWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translateY(-3px);
`
const TextWrapper = styled(motion.div)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`
