import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../breakpoints"

const PressCarouselLogos = () => {
  const [logosRef, logosInView] = useInView({
    root: null,
    threshold: 0.75,
    triggerOnce: true,
  })

  const logoParent = {
    visible: {
      transition: {
        staggerChildren: 0.125,
      },
    },
    hidden: {},
  }
  const logoMask = {
    visible: {
      y: 0,
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.15,
      },
    },
    hidden: {
      y: 20,
      opacity: 0,
      scaleY: 0,
    },
  }
  return (
    <LogosPress
      ref={logosRef}
      variants={logoParent}
      initial="hidden"
      animate={logosInView && "visible"}
    >
      <motion.span variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/FORBES.png"
          alt="Forbes logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.span>
      <motion.span variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/CNBC.png"
          alt="CNBC logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.span>
      <motion.span variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/NPR.png"
          alt="n p r logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.span>
      <motion.span variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/EDC.png"
          alt="e d c logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.span>
      <motion.span variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/BLOOMBERG.png"
          alt="Forbes logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.span>
      <motion.span variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/B2.png"
          alt="B2 logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.span>
    </LogosPress>
  )
}

export default PressCarouselLogos

const LogosPress = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  span {
    width: 150px;
    align-self: center;
    transform-origin: bottom;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    margin-right: 2rem;
    height: auto;
    span {
      width: 130px;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    max-width: 100%;
    margin-right: 0rem;
    span {
      max-width: auto;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    span {
      width: 120px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 0;
    row-gap: 0.5rem;
    margin: 0 auto;
    justify-items: center;
    align-items: center;
    width: auto;
    span {
      width: 150px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    span {
      width: 90px;
      height: auto;
    }
  }
`
