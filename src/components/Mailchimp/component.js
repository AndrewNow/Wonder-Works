import React from "react"
import styled from "styled-components"
import MailchimpFormContainer from "./mailchimpFormContainer"
import * as svg from "../../svg/miscellaneous"
import { motion } from 'framer-motion'

const MailchimpComponent = () => {
  return (
    <Background>
      <Brief>
        <WordsofWonder>
          <h3>Words of wonder</h3>
        </WordsofWonder>
        <Headline>
          <h4>Stay Up To Date</h4>
          <svg
            width="216"
            height="3"
            viewBox="0 0 216 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.6709H215.766"
              stroke="#1A1748"
              stroke-width="2.5"
              stroke-miterlimit="10"
            />
          </svg>
        </Headline>
        <h2>Sign up for exclusive promos and the latest news</h2>
        <h3>(we won’t be annoying, promise)</h3>
        <MailchimpFormContainer />
        <SvgWrapper>
          <svg.GreenStars />
        </SvgWrapper>
        <SvgStarWrapper
          animate={{
            rotate: 360,
            transition: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <svg.PurpleStar />
        </SvgStarWrapper>
      </Brief>
    </Background>
  )
}

export default MailchimpComponent

const Background = styled.div`
  padding-top: 15rem;
  padding-bottom: 10rem;
  position: relative;
  z-index: 3;
`

const WordsofWonder = styled.div`
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top right;
  right: 1%;
  top: 25%;

  h3 {
    text-transform: uppercase;
    font-family: "calibre-medium" !important;
  }
`
const SvgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
`
const SvgStarWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 10%;
`

const Brief = styled.div`
  width: 80%;
  margin: 0 auto;
  color: var(--color-black);

  h2 {
    padding-bottom: 1rem;
    font-family: "ppwoodland-light";
    width: 70%;
  }
  h3 {
    padding-bottom: 10rem;
    font-family: "ppwoodland-light";
  }
`

const Headline = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;
  padding-top: 2rem;

  h4 {
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
  }
`
