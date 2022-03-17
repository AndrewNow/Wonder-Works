import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import breakpoints from "../breakpoints"

const LandingPage = () => {
  // ----------framer motion animation variants----------
  // const line = {
  //   visible: {
  //     transition: {
  //       duration: 2,
  //       delay: 1.2,
  //       delayChildren: 0.6,
  //       staggerChildren: 0.2,
  //       staggerDirection: 1,
  //     },
  //   },
  // }

  // const word = {
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 1,
  //       type: "spring",
  //       stiffness: 100,
  //       damping: 11,
  //     },
  //   },
  //   hidden: {
  //     y: 200,
  //     opacity: 0,
  //   },
  // }

  const landingTextRef = useRef()

  const textTopRef = useRef()
  const animationTop = useAnimation()

  const textBottomRef = useRef()
  const animationBottom = useAnimation()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. get the parent's bounds
      const landingTextArea = landingTextRef.current.getBoundingClientRect()

      // 1.1 get each edge's margin spacing
      const landingTextTop = landingTextArea.top
      const landingTextLeft = landingTextArea.left

      // 2. ===TOP TEXT ANIMATION===
      const topBox = textTopRef.current.getBoundingClientRect()

      // 2.1 get top text box's distance to top and left of DOM
      const yDistanceTopText = topBox.y - landingTextTop
      const xDistanceTopText = topBox.x - landingTextLeft

      // 2.2 then, run the top text box animation sequence
      async function topTextSequence() {
        await animationTop.start({
          y: -yDistanceTopText,
          transition: {
            delay: 2,
            ease: "easeInOut",
          },
        })
        await animationTop.start({ x: -xDistanceTopText })
        animationTop.start({ scale: 1 })
      }
      topTextSequence()

      // 3. ===BOTTOM TEXT ANIMATION===
      const bottomBox = textBottomRef.current.getBoundingClientRect()

      // console.log(window.innerHeight)
      // console.log(textBottomRef.current.offsetTop)
      // console.log(textBottomRef.current.offsetHeight)

      // const bottomTextHeight =
      //   textBottomRef.current.offsetTop + textBottomRef.current.offsetHeight

      const yDistanceBottomText = window.innerHeight - bottomTextHeight
      // const yDistanceBottomText = bottomBox.y - landingTextTop
      // const yDistanceBottomText = 265
      const xDistanceBottomText = bottomBox.x - landingTextLeft

      // yDistanceBottomText has to equal ~265px



      const bottomTextHeight =
        textBottomRef.current.offsetTop + textBottomRef.current.offsetHeight

      const bottomSpacing =
        window.innerHeight -
        bottomTextHeight +
        textBottomRef.current.offsetHeight

      const magicNumber = bottomSpacing / 2
      // I DON'T KNOW WHY THIS WORKS BUT IT WORKS LMAOOO


      // 3.1 do the same as above, but adding instead of subtracting the translation
      async function bottomTextSequence() {
        await animationBottom.start({
          y: magicNumber,
          transition: {
            delay: 2,
            ease: "easeInOut",
          },
        })
        await animationBottom.start({ x: xDistanceBottomText })
        animationBottom.start({ scale: 1 })
      }
      bottomTextSequence()

      // const bottomBoxHeight = textBottomRef.current.offsetHeight
    }
  }, [])

  return (
    <>
      <LandingText ref={landingTextRef}>
        <TextBlock
          ref={textTopRef}
          animate={animationTop}
          transition={{
            ease: "easeInOut",
          }}
        >
          <h1>
            <FirstLine>
              <Span>dreaming</Span>
              <Span>up</Span>
            </FirstLine>
            <SecondLine>
              <Span>wonderful</Span>
              <Span>works</Span>
            </SecondLine>
          </h1>
        </TextBlock>
        <TextBlock
          ref={textBottomRef}
          animate={animationBottom}
          transition={{
            ease: "easeInOut",
          }}
        >
          <h1>
            <ThirdLine>
              <Span>in</Span>
              <Span>the</Span>
              <Span>metaverse</Span>
            </ThirdLine>
          </h1>
        </TextBlock>
        <LandingVideo />
      </LandingText>
      {/* <Cover /> */}
    </>
  )
}

export default LandingPage

// const Cover = styled.div`
//   position: fixed;
//   z-index: 1;
//   top: 0;
//   left: 0;
//   height: 100vh;
//   width: 100vw;
//   background-color: var(--color-black);
//   `

const LandingVideo = styled(motion.div)`
  z-index: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 966px;
  height: 547px;
  background-color: #a9f2ed;
  border-radius: 10px;
`

const LandingText = styled.div`
  z-index: 2;
  /* overflow: hidden; */
  position: relative;
  height: 85vh;
  width: 90%;
  transform: translateY(10vh);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`

const TextBlock = styled(motion.div)`
  position: relative;
  //was:
  /* position: absolute; */
  z-index: 10;

  h1 {
    display: block;
    border: 1px dotted red;
    z-index: 2;
    font-family: "balgin-medium";
    font-size: 5.73vw;
    line-height: 50%;
    width: 100%;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 7.8vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h1 {
      font-size: 9vw;
    }
  }
`

const Span = styled(motion.span)`
  // margin-right to simulate word spacing
  margin-right: 2.5rem;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  @media (max-width: ${breakpoints.xl}px) {
    margin-right: 2rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-right: 1.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
`
const FirstLine = styled(motion.div)`
  position: relative;
  padding-bottom: 2rem;
  vertical-align: top;
  overflow: hidden;
`
const SecondLine = styled(motion.div)`
  position: relative;
  overflow: hidden;
  padding-bottom: 0.25rem;
`
const ThirdLine = styled(motion.div)`
  overflow: hidden;
  padding-bottom: 0.25rem;
`
