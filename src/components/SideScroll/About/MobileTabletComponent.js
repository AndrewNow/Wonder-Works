import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import breakpoints from "../../breakpoints"
import {
  PillarsCog,
  StudioPillar,
  PartnershipsPillar,
  CollabPillar,
  JamsPillar,
  PinkGuy,
} from "../../../svg/aboutpage"
import { useInView } from "react-intersection-observer"

const MobileTabletComponent = () => {
  const FadeIn = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
    hidden: {
      opacity: 0,
      y: 80,
    },
  }

  // refs for each slide to animate when inView
  const [StudioRef, StudioRefInView] = useInView({
    root: null,
    threshold: 0.6,
    triggerOnce: true,
  })

  const [PartnershipRef, PartnershipRefInView] = useInView({
    root: null,
    threshold: 0.8,
    triggerOnce: true,
  })
  const [CollabRef, CollabRefInView] = useInView({
    root: null,
    threshold: 0.8,
    triggerOnce: true,
  })
  const [JamsRef, JamsRefInView] = useInView({
    root: null,
    threshold: 0.8,
    triggerOnce: true,
  })

  return (
    <Wrapper>
      <h6>Our Pillars</h6>
      <TopSVG>
        <PillarsCog />
      </TopSVG>
      <Section
        ref={StudioRef}
        initial="hidden"
        variants={FadeIn}
        animate={StudioRefInView ? "visible" : "hidden"}
      >
        <StudioPillar />
        <motion.h6 variants={child} style={{ color: "#D9E141" }}>
          Wonder Works Studio
        </motion.h6>
        <motion.p variants={child}>
          Discover what’s in the works at Wonder Works Studio. We’re always
          dreaming up new adventures in exciting roleplay games for immersive,
          imaginative fun for everyone. Check out our ambitious new projects or
          our latest launches —they all live here.{" "}
        </motion.p>
      </Section>
      <Section
        ref={PartnershipRef}
        initial="hidden"
        variants={FadeIn}
        animate={PartnershipRefInView ? "visible" : "hidden"}
      >
        <PartnershipsPillar />
        <motion.h6 variants={child} style={{ color: "#59C9F3" }}>
          Wonder Works Parterships
        </motion.h6>
        <motion.p variants={child}>
          We love growing and connecting with our community. If you’re
          interested in partnering with the wonderful world of Wonder Works
          Studio send us a message—we have big ideas to launch with brands of
          all sizes.
        </motion.p>
      </Section>
      <Section
        ref={CollabRef}
        initial="hidden"
        variants={FadeIn}
        animate={CollabRefInView ? "visible" : "hidden"}
      >
        <CollabPillar />
        <motion.h6 variants={child} style={{ color: "#1A1749" }}>
          Wonder Works Collab
        </motion.h6>
        <motion.p variants={child}>
          Growing our community is important to us and collaborating with
          optimistic, adventurous individuals pushes our own creativity to new
          heights. We’re always on the lookout for YouTubers and influencers to
          help tell our story—let us know if that’s you!
        </motion.p>
      </Section>
      <Section
        ref={JamsRef}
        initial="hidden"
        variants={FadeIn}
        animate={JamsRefInView ? "visible" : "hidden"}
      >
        <JamsPillar />
        <motion.h6 variants={child} style={{ color: "#F9DB1E" }}>
          Wonder Works Jams
        </motion.h6>
        <motion.p variants={child}>
          Wonder Works Jams is a space for our junior talent to QA various game
          genres. It’s a creative hub of mentorship that fosters a lifelong love
          for exploration and innovation and promotes success on individual and
          collaborative levels.
        </motion.p>
      </Section>
      <TopSVG>
        <PinkGuy />
      </TopSVG>
    </Wrapper>
  )
}

export default MobileTabletComponent

const Wrapper = styled.section`
  display: none;
  h6 {
    color: white;
    font-size: 18px;
    letter-spacing: 0.01rem;
    font-family: "calibre-semibold";
    text-align: center;
    padding-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: block;
    background-color: var(--color-purple);
    width: 100%;
    padding: 10rem 0;
  }
`

const TopSVG = styled.div`
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :last-child {
    padding-top: 2rem;
  }
`

const Section = styled(motion.div)`
  padding: 2.5rem 0;
  text-align: center;
  p {
    color: var(--color-white);
  }
  h6 {
    padding-bottom: 0;
    padding-top: 1rem;
    font-family: "balgin-medium";
    font-size: 18px;
    line-height: 48px;
  }
  h6,
  p {
    margin: 0 auto;
    width: 77%;
  }
  div {
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.xs}px) {
    h6 {
      padding-top: 1rem;
      font-size: 16px;
      line-height: 120%;
      padding-bottom: 2rem;
    }
  }
`
