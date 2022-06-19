import React from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import { OurProjectsGear } from "../../svg/homepage"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  line,
  word,
  textFadeIn,
  textChild,
} from "../../components/textAnimationValues"
import { AttentionArrowSVG } from "../../svg/miscellaneous"
import ReactPlayer from "react-player/lazy"

const StudioOwnedExperiences = () => {
  const [sectionRef, sectionInView] = useInView({
    root: null,
    threshold: 0.3,
    triggerOnce: true,
  })

  const slideData = [
    {
      title: `Puma and the Land of Games`,
      // description: `Make a home, raise a pet, and explore the seaside town with your friends and family! Collect items, pets, and furniture and fully immerse yourself in the town! Attend college, or become the mayor, whatever you desire. What type of citizen would YOU be in Overlook Bay?`,
      url: `https://www.youtube.com/watch?v=Aa3RWM5Q2ds`,
      // year: `2021`,
      color: "#D8E043",
    },
    {
      title: `Overlook RP`,
      // description: `Make a home, raise a pet, and explore the seaside town with your friends and family! Collect items, pets, and furniture and fully immerse yourself in the town! Attend college, or become the mayor, whatever you desire. What type of citizen would YOU be in Overlook Bay?`,
      url: `https://www.youtube.com/watch?v=7BRe0-4WTzI`,
      // year: `2021`,
      color: "#E795BF",
    },
    {
      title: `Timmeh`,
      // description: `KreekCraft and Timmeh need your help to save the universe from a dark destruction. Team up with your friends and defeat evil monsters, all while you solve the universe's biggest mystery. In this horror round based game, players will elude monsters, discover secrets, unlock easter eggs and collect many exciting cosmetics!`,
      // year: `2021`,
      url: `https://www.youtube.com/watch?v=iaKlmpe3dlo`,
      color: "#B06EAB",
    },
    {
      title: `David Guetta DJ Party`,
      // description: `Make a home, raise a pet, and explore the seaside town with your friends and family! Collect items, pets, and furniture and fully immerse yourself in the town! Attend college, or become the mayor, whatever you desire. What type of citizen would YOU be in Overlook Bay?`,
      // year: `2022`,
      url: `https://www.youtube.com/watch?v=pyYjAjB8IrY`,
      color: "#D8E043",
    },
    // {
    //   title: `F21`,
    //   // description: `Make a home, raise a pet, and explore the seaside town with your friends and family! Collect items, pets, and furniture and fully immerse yourself in the town! Attend college, or become the mayor, whatever you desire. What type of citizen would YOU be in Overlook Bay?`,
    //   // year: `2021`,
    //   url: `https://www.youtube.com/watch?v=1bWLL0NgTHo`,
    //   color: "#5BC8F3",
    // },
    {
      title: `EDC - Insomniac World Party`,
      // description: `Make a home, raise a pet, and explore the seaside town with your friends and family! Collect items, pets, and furniture and fully immerse yourself in the town! Attend college, or become the mayor, whatever you desire. What type of citizen would YOU be in Overlook Bay?`,
      // year: `2021`,
      url: `https://www.youtube.com/watch?v=f41TFY--g0Q`,
      color: "#B06EAB",
    },
    {
      title: `Froot Loops`,
      // description: `Make a home, raise a pet, and explore the seaside town with your friends and family! Collect items, pets, and furniture and fully immerse yourself in the town! Attend college, or become the mayor, whatever you desire. What type of citizen would YOU be in Overlook Bay?`,
      // year: `2021`,
      url: `https://www.youtube.com/watch?v=DOrLX8ESrIc`,
      color: "#E795BF",
    },
  ]

  return (
    <Wrapper>
      <Flex>
        <TitleWrapper>
          <Title ref={sectionRef}>
            <motion.h1
              variants={line}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <motion.span variants={word}>Studio </motion.span>
              <motion.span variants={word}>Owned </motion.span>
              <motion.span variants={word}>Experiences</motion.span>
            </motion.h1>
            <motion.h5
              variants={textFadeIn}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <motion.span variants={textChild}>
                We’re always dreaming up new adventures in exciting roleplay
                games for immersive, imaginative fun for everyone. Check out our
                ambitious new projects or our latest launches — they all live
                here.
              </motion.span>
            </motion.h5>
          </Title>
          <GearWrapper
            animate={{
              rotate: 180,
              transition: {
                repeat: "Infinity",
                ease: "linear",
                duration: 15,
              },
            }}
            initial={{ rotate: 0 }}
          >
            <OurProjectsGear />
          </GearWrapper>
        </TitleWrapper>
        <SlideWrapper>
          {slideData.map((slide, index) => {
            return (
              <Slide key={index} style={{ backgroundColor: `${slide.color}` }}>
                <SlideMedia>
                  <ReactPlayer
                    className="react-player"
                    url={slide.url}
                    width="100%"
                    height="100%"
                    controls={true}
                    playsinline={true}
                    config={{
                      youtube: {
                        playerVars: {
                          color: "white",
                          playsinline: 1,
                        },
                      },
                    }}
                  />
                </SlideMedia>
                <br />
                <br />
                <div>
                  <AttentionArrowSVG />
                  <p>
                    <small>Click to play the trailer!</small>
                  </p>
                </div>
                {slide.title && (
                  <h4>
                    {slide.title} <br />
                  </h4>
                )}
                {slide.description && <p>{slide.description}</p>}
              </Slide>
            )
          })}
        </SlideWrapper>
      </Flex>
    </Wrapper>
  )
}

export default StudioOwnedExperiences

const Wrapper = styled.section`
  background-color: var(--color-black);
  position: relative;
  @media (max-width: ${breakpoints.s}px) {
    min-height: none;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  height: 100%;

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`

const TitleWrapper = styled.div`
  width: 50%;
  height: auto;
  position: sticky;
  top: 10vh;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;

    overflow-x: hidden;
    display: block;
    position: relative;
    top: 0;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 0;
  }
`

const Title = styled.div`
  margin: 0 auto;
  width: 80%;
  position: relative;
  z-index: 2;
  h1,
  h5 {
    color: white;
  }
  h1 {
    font-size: 6.25vw;
    line-height: 110%;
    margin-bottom: 0.25rem;
    display: block;
    overflow: hidden;
    width: auto;
    margin-bottom: 1rem;
    span {
      height: 100%;
      overflow: hidden;
      display: inline-block;
      vertical-align: top;
      padding-bottom: 0.15rem;
      margin-right: 4%;
    }
    span:last-of-type {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h1 {
      font-size: 7vw;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 60%;
    margin: 1rem 3rem;
    h1 {
      font-size: 9vw;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 80%;
    margin: 0 auto;
    h1 {
      font-size: 12vw;
    }
  }
`

const GearWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 5%;
  right: 12%;
  aspect-ratio: 1/1;
  width: 25vw;
  height: auto;
  max-width: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    max-width: 33vw;
    aspect-ratio: 1/1;
    width: 100%;
    height: auto;
  }

  @media (max-width: ${breakpoints.xl}px) {
    right: 5%;
    top: 0%;
    max-width: 270px;
  }
  @media (max-width: ${breakpoints.l}px) {
    top: 5%;
  }
  @media (max-width: ${breakpoints.m}px) {
    right: 5%;
    top: -5%;
    max-width: 260px;
    width: 260px;
    height: auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    right: 0%;
    top: 5%;
    max-width: 350px;
    width: auto;
  }
`

const SlideWrapper = styled.div`
  width: 50%;
  height: auto;

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
`

const Slide = styled.div`
  width: 100%;
  margin: 0rem auto;
  padding: 5rem 0;
  text-align: center;

  h4 {
    font-family: "balgin-bold";
    padding: 1rem 0;
    max-width: 90%;
    margin: 0 auto;
  }
  p {
    max-width: 80%;
    margin: 0 auto;
  }
  small {
    text-transform: uppercase;
    font-family: "calibre-semibold";
    font-size: 14px;
    margin-top: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 3rem 0;
    padding-bottom: 3rem;
    p {
      margin-top: 1rem;
    }
  }
`

const SlideMedia = styled.div`
  aspect-ratio: 16/9;
  width: 80%;
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid black;

  &.react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: ${breakpoints.l}px) {
    max-width: 85vw;
  }
`
