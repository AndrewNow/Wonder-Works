import React, { useRef, useCallback } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "./breakpoints"

// We have a separate component for the home page (HomePageAsSeenOn) because the logos are larger on only the homepage
// Since we're using gatsby-image, it's easier to just create another component for these rather than dynamically passing a size value to the image

export const HomePageAsSeenOn = () => {
  const ref = useRef()
  const [homepagelogoRef, homepagelogoInView] = useInView({
    root: null,
    threshold: 0.75,
    triggerOnce: true,
  })
  const [homepagelogoRefMobile, homepagelogoMobileInView] = useInView({
    root: null,
    threshold: 0.75,
    triggerOnce: true,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      homepagelogoRef(node)
      homepagelogoRefMobile(node)
    },
    [homepagelogoRef, homepagelogoRefMobile]
  )

  const logoParent = {
    visible: {
      transition: {
        staggerChildren: 0.125,
        // delayChildren: .2,
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
    <>
      <LogosHomepage
        ref={homepagelogoRef}
        variants={logoParent}
        initial="hidden"
        animate={homepagelogoInView && "visible"}
      >
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/Forbes.png"
            alt="Forbes logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/CNBC.png"
            alt="CNBC logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/npr.png"
            alt="n p r logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/edc.png"
            alt="e d c logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/Bloomberg.png"
            alt="Forbes logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/B2.png"
            alt="B2 logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
      </LogosHomepage>
      <LogosHomepageMobile
        ref={homepagelogoRefMobile}
        variants={logoParent}
        initial="hidden"
        animate={homepagelogoMobileInView && "visible"}
      >
        {/* <div> */}
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/Forbes.png"
            alt="Forbes logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/CNBC.png"
            alt="CNBC logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/npr.png"
            alt="n p r logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        {/* </div> */}
        {/* <div> */}
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/edc.png"
            alt="e d c logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/Bloomberg.png"
            alt="Forbes logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div variants={logoMask}>
          <StaticImage
            src="../images/Home/asSeenOn/B2.png"
            alt="B2 logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
        {/* </div> */}
      </LogosHomepageMobile>
    </>
  )
}

export const AsSeenOn = () => {
  const [logosRef, logosInView] = useInView({
    root: null,
    threshold: 0.9,
    triggerOnce: true,
  })

  const logoParent = {
    visible: {
      transition: {
        staggerChildren: 0.125,
        // delayChildren: .2,
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
    <Logos
      ref={logosRef}
      variants={logoParent}
      initial="hidden"
      animate={logosInView && "visible"}
    >
      <motion.div variants={logoMask}>
        <StaticImage
          src="../images/Home/asSeenOn/Forbes.png"
          alt="Forbes logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../images/Home/asSeenOn/CNBC.png"
          alt="CNBC logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../images/Home/asSeenOn/npr.png"
          alt="n p r logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../images/Home/asSeenOn/edc.png"
          alt="e d c logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../images/Home/asSeenOn/Bloomberg.png"
          alt="Forbes logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.div variants={logoMask}>
        <StaticImage
          src="../images/Home/asSeenOn/B2.png"
          alt="B2 logo"
          placeholder="none"
          quality={100}
          style={{ height: "100%", width: "100%" }}
          imgStyle={{ objectFit: "contain" }}
        />
      </motion.div>
    </Logos>
  )
}

const LogosHomepage = styled(motion.div)`
  max-width: 70%;
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  padding-bottom: 5rem;
  height: 200px;

  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  div {
    align-self: center;
    margin: 0 auto;
    transform-origin: bottom;
    overflow: hidden;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    max-width: 80%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    max-width: 90%;
    gap: 4rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
    gap: 1rem;
  }
`
const LogosHomepageMobile = styled(motion.div)`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    min-height: 100px;
    img {
      max-height: 40px;
      min-width: 50px;
    }
  }
`
const Logos = styled(motion.div)`
  min-width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-bottom: 5rem; */
  height: 200px;

  div {
    transform-origin: bottom;
    overflow: hidden;
    /* max-height: 50px; */
    height: 50px;
    margin: 0 .25rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    min-width: 80%;
    img {
      max-height: 45px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    min-height: 100px;
    img {
      max-height: 40px;
      min-width: 50px;
    }
  }
`
