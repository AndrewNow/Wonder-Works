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
      <motion.div variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/Forbes.png"
          alt="Forbes logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/CNBC.png"
          alt="CNBC logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/npr.png"
          alt="n p r logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/edc.png"
          alt="e d c logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/Bloomberg.png"
          alt="Forbes logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../../images/Home/asSeenOn/B2.png"
          alt="B2 logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
    </LogosPress>
  )
}

export default PressCarouselLogos

const LogosPress = styled(motion.div)`
  max-width: 60%;
  height: 70px;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  column-gap: 2rem;
  img {
    max-height: 50px;
    min-height: 20px;
  }
  div {
    align-self: center;
    transform-origin: bottom;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    max-width: 60%;
    margin-right: 2rem;
    img {
      max-height: 40px;
      min-height: 15px;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    max-width: 100%;
    width: 100%;
    margin-right: 0rem;
    height: 60px;
    img {
      max-height: 60px;
      min-height: none;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    img {
      max-height: 35px;
      min-height: none;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    grid-template-columns: auto auto auto;
    grid-template-rows: 1fr 1fr;
    column-gap: 0;

    justify-items: center;
    align-items: center;
    min-height: 100px;
    img {
      max-height: 35px;
      min-height: min-content;
    }
  }
`
