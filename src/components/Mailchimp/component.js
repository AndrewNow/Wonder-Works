import React from "react"
import styled from "styled-components"
import MailchimpFormContainer from "./mailchimpFormContainer"
import { motion } from "framer-motion"
import breakpoints from "../breakpoints"
import { WordsOfWonderSVG } from "../../svg/miscellaneous"

const MailchimpComponent = ({ smallStarSvg, bigStarSvg }) => {
  return (
    <Background>
      <Brief>
        <KeepScrolling>
          <p>Keep scrolling!</p>
          <motion.svg
            animate={{
              y: 7,
              transition: {
                repeat: "Infinity",
                repeatType: "reverse",
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            width="20"
            height="32"
            viewBox="0 0 20 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6822 31.0008L10.683 31.0009L10.683 30.9884C10.683 24.5945 12.1429 19.9019 14.873 17.3953L14.873 17.3953C15.8941 16.4573 16.9241 15.9805 17.7001 15.738C18.0882 15.6168 18.4127 15.5542 18.6407 15.5219C18.7547 15.5058 18.8445 15.4972 18.906 15.4927C18.9648 15.4884 18.9971 15.4878 18.9998 15.4878L19 15.4878L19.1 15.4878L19.1 15.3878L19.1 14.0586L19.1 13.9586L19 13.9586C18.8611 13.9586 15.8835 13.9906 13.2475 16.983C12.1734 18.1953 11.3182 19.7173 10.6844 21.5172L10.6844 1L10.6844 0.9L10.5844 0.9L9.41559 0.9L9.31559 0.9L9.31559 1L9.31558 21.533C8.68132 19.7346 7.82755 18.2217 6.75277 16.9965L6.75262 16.9963C4.11073 13.9989 1.14031 13.9719 0.999999 13.9719L0.899999 13.9719L0.899999 14.0719L0.899999 15.4011L0.899999 15.5011L0.999999 15.5011C0.999809 15.5011 1.00229 15.5011 1.00754 15.5012L1.02987 15.5019C1.04939 15.5027 1.07805 15.5041 1.11516 15.5069C1.18938 15.5124 1.29737 15.5232 1.4337 15.5442C1.70639 15.586 2.09222 15.6685 2.54785 15.8307C3.45869 16.1549 4.64938 16.7982 5.77414 18.0756L5.77415 18.0756C8.11433 20.7317 9.31266 25.0732 9.31266 31L9.31266 31.1L9.41266 31.1L10.5815 31.1L10.6697 31.1L10.6807 31.0125L10.6822 31.0008Z"
              fill="#1A1749"
              stroke="#1A1749"
              strokeWidth="0.2"
            />
          </motion.svg>
        </KeepScrolling>
        <WordsOfWonder
          animate={{
            rotate: 360,
            transition: {
              repeat: "Infinity",
              ease: "linear",
              duration: 25,
            },
          }}
        >
          <WordsOfWonderSVG />
        </WordsOfWonder>

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
        <SvgWrapper>{smallStarSvg}</SvgWrapper>
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

  @media (max-width: 1600px) {
    padding-top: 10rem;
    padding-bottom: 8rem;
  }
`

const SvgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  @media (max-width: 1600px) {
    svg {
      max-width: 500px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const SvgStarWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 10%;
  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const Brief = styled.div`
  width: 80%;
  margin: 0 auto;
  color: var(--color-black);

  h2 {
    font-size: 3.9vw;
    line-height: 100%;
    padding-bottom: 1rem;
    font-family: "ppwoodland-light";
    width: 70%;
  }
  h3 {
    font-size: 2.6vw;
    line-height: 100%;
    padding-bottom: 10rem;
    font-family: "ppwoodland-light";
  }

  @media (max-width: 1600px) {
    h3 {
      padding-bottom: 7rem;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      width: 90%;
      font-size: 50px;
    }
    h3 {
      font-size: 30px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 42px;
    }
    h3 {
      padding-bottom: 3.5rem;
      font-size: 28px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 85%;
    h2 {
      width: 95%;
      font-size: 34px;
      line-height: 38px;
    }
    h3 {
      font-size: 20px;
      padding-bottom: 5rem;
    }
  }
  
  
  @media (max-width: 374px) {
    h2 {
      font-size: 30px;
      line-height: 105%;
    }
  }
`

const KeepScrolling = styled.div`
  display: none;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 3.5rem;
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    p {
      font-family: "calibre-semibold";
      text-transform: uppercase;
      font-size: 18px;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    top: -15%;
  }

  @media (max-width: ${breakpoints.m}px) {
    top: -20%;
  }

  @media (max-width: ${breakpoints.s}px) {
    top: -10%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: -5%;
  }
`

const WordsOfWonder = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.xl}px) {
    display: block;
    aspect-ratio: 1/1;
    width: 100px;
    float: right;
    svg {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 90px;
    position: absolute;
    right: 5%;
    top: 0%;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 75px;
    top: 10%;
    right: 6.5%;
  }
`

const Headline = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;
  padding-top: 2rem;

  h4 {
    white-space: nowrap;
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
  }
  svg {
    width: 30%;
  }
`
