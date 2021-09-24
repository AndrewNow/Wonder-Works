import React from "react"
import styled from "styled-components"
import MailchimpFormContainer from "./mailchimpFormContainer"
import { motion } from 'framer-motion'
import breakpoints from "../breakpoints"

const MailchimpComponent = ({ smallStarSvg, bigStarSvg }) => {
  return (
    <Background>
      <Brief>
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
              strokeWidth="2.5"
              strokeMiterlimit="10"
            />
          </svg>
        </Headline>
        <h2>Sign up for exclusive promos and the latest news</h2>
        <h3>(we won’t be annoying, promise)</h3>
        <MailchimpFormContainer />
        <SvgWrapper>
          {smallStarSvg}
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
          {bigStarSvg}
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

  @media (max-width: ${breakpoints.xl}px) {
    padding: 5rem 0;
  }
`

const SvgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5%;

  @media (max-width: ${breakpoints.xl}px) {
    top: 10%;
    display: flex;
    justify-content: flex-end;
    svg {
      width: 60%;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    top: -5%;
    svg {
      width: 40%;
    }
  }
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

  @media (max-width: ${breakpoints.l}px) {
    h3 {
      padding-bottom: 3.5rem;
    }
    h2 {
      width: 90%;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 85%;
    h2 {
      width: 85%;
      font-size: 34px;
      line-height: 38px;
    }
    h3 {
      font-size: 20px;
      padding-bottom: 5rem;
    }
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
