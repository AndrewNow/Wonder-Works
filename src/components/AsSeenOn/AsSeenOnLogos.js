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
      </LogosHomepage>
      <LogosHomepageMobile
        ref={homepagelogoRefMobile}
        variants={logoParent}
        initial="hidden"
        animate={homepagelogoMobileInView && "visible"}
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
        <motion.span variants={logoMask}>
          <StaticImage
            // height={40}
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
            // height={40}
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
            // height={40}
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
            // height={40}
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
            // height={40}
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
            // height={40}
            src="../../images/Home/asSeenOn/B2.png"
            alt="B2 logo"
            placeholder="none"
            quality={100}
            style={{ height: "100%", width: "100%" }}
            imgStyle={{ objectFit: "contain" }}
          />
        </motion.span>
      </LogosAboutpage>
      <LogosAboutpageMobile
        ref={aboutpagelogoRefMobile}
        variants={logoParent}
        initial="hidden"
        animate={aboutpagelogoMobileInView && "visible"}
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
      </LogosAboutpageMobile>
    </>
  )
}

const LogosHomepage = styled(motion.div)`
  position: relative;
  max-width: 85%;
  display: flex;
  margin-bottom: 5rem;
  span {
    width: 195px;
    align-self: center;
    margin: 0 auto;
    transform-origin: bottom;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    max-width: 80%;
    span {
      width: 200px;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 0;
    row-gap: 0.5rem;
    margin: 0 auto;
    justify-items: center;
    align-items: center;
    width: auto;
    span {
      width: 250px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    span {
      width: 225px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`
const LogosHomepageMobile = styled(motion.div)`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 0.5rem;
    span {
      width: 205px;
      height: auto;
      align-self: center;
      margin: 0 auto;
      transform-origin: bottom;
      overflow: hidden;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 95vw;
    span {
      width: 120px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    width: 90vw;
    span {
      width: 90px;
    }
  }
`

const LogosAboutpage = styled(motion.div)`
  position: relative;
  max-width: 65%;
  display: flex;
  span {
    width: 175px;
    align-self: center;
    margin: 0 auto;
    transform-origin: bottom;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    max-width: 65%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    max-width: 80%;
    height: 85px;
  }
  @media (max-width: ${breakpoints.l}px) {
    max-width: 85%;
    margin-bottom: 3rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`
const LogosAboutpageMobile = styled(motion.div)`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    margin-bottom: 3rem;
    /* width: 90%; */
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 0.5rem;
    span {
      width: 150px;
      height: auto;
      align-self: center;
      margin: 0 auto;
      transform-origin: bottom;
      overflow: hidden;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 95vw;
    span {
      width: 120px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    width: 90vw;
    span {
      width: 90px;
    }
  }
`
