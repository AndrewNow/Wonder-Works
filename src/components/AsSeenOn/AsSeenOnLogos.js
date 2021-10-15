import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../breakpoints"

// We have a separate component for the home page (AsSeenOnHomepage) because the logos are larger on only the homepage
// Since we're using gatsby-image, it's easier to just create another component for these rather than dynamically passing a size value to the image

export const AsSeenOnLogosHome = () => {
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
    <>
      <LogosHomepage
        ref={homepagelogoRef}
        variants={logoParent}
        initial="hidden"
        animate={homepagelogoInView && "visible"}
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
      </LogosHomepage>
      <LogosHomepageMobile
        ref={homepagelogoRefMobile}
        variants={logoParent}
        initial="hidden"
        animate={homepagelogoMobileInView && "visible"}
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
      </LogosHomepageMobile>
    </>
  )
}

export const AsSeenOnLogosAbout = () => {
  const [aboutpagelogoRef, aboutpagelogoInView] = useInView({
    root: null,
    threshold: 0.75,
    triggerOnce: true,
  })
  const [aboutpagelogoRefMobile, aboutpagelogoMobileInView] = useInView({
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
    <>
      <LogosAboutpage
        ref={aboutpagelogoRef}
        variants={logoParent}
        initial="hidden"
        animate={aboutpagelogoInView && "visible"}
      >
        <motion.div variants={logoMask}>
          <StaticImage
            height={40}
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
            height={40}
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
            height={40}
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
            height={40}
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
            height={40}
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
            height={40}
            src="../../images/Home/asSeenOn/B2.png"
            alt="B2 logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.div>
      </LogosAboutpage>
      <LogosAboutpageMobile
        ref={aboutpagelogoRefMobile}
        variants={logoParent}
        initial="hidden"
        animate={aboutpagelogoMobileInView && "visible"}
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
      </LogosAboutpageMobile>
    </>
  )
}

const LogosHomepage = styled(motion.div)`
  max-width: 70%;
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
    height: 150px;
    padding-bottom: 0;
    margin-bottom: 5rem;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    /* grid-template-rows: 1fr 1fr; */
    gap: 3rem;
  }
  
  @media (max-width: ${breakpoints.xl}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
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
      /* min-width: 50px; */
    }
  }
`

const LogosAboutpage = styled(motion.div)`
  max-width: 50%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  div {
    align-self: center;
    margin: 0 auto;
    transform-origin: bottom;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    max-width: 60%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    max-width: 70%;
  }
  @media (max-width: ${breakpoints.l}px) {
    max-width: 80%;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
    gap: 1rem;
  }
`
const LogosAboutpageMobile = styled(motion.div)`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 1rem;
    img {
      max-height: 40px;
      /* min-width: 50px; */
    }
  }
`
