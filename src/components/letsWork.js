import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import { motion } from "framer-motion"
import breakpoints from "./breakpoints"
import { Arrow } from "../svg/miscellaneous"

export const LetsWork = ({ svg, currentProjects }) => {
  return (
    <BgSection>
      <Top>
        <HeadlineMobile>
          <h4>Contact Us</h4>
          <svg
            width="160"
            height="3"
            viewBox="0 0 160 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.84424H159.385"
              stroke="#1A1748"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </HeadlineMobile>
        <Flex>
          <h1>
            Let’s work <br />
            wonders <br />
            together.
          </h1>
          <SVGWrapper>{svg}</SVGWrapper>
        </Flex>
        <CurrentProjectsWrapper>{currentProjects}</CurrentProjectsWrapper>
        <IconWrapper>
          <Icons>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://twitter.com/WonderWorksRB"
              rel="noreferrer"
              target="_blank"
              alt="Twitter social media link"
            >
              <Twitter />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.instagram.com/wonderworksstudio/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.youtube.com/channel/UCxAUri__UiH2K3S8LGDDJuQ/videos"
              rel="noreferrer"
              target="_blank"
              alt="Instagram social media link"
            >
              <TikTok />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.youtube.com/channel/UCxAUri__UiH2K3S8LGDDJuQ/videos"
              rel="noreferrer"
              target="_blank"
              alt="Tik Tok social media link"
            >
              <YouTube />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.roblox.com/groups/6258143/Wonder-Works-Studio#!/about"
              rel="noreferrer"
              target="_blank"
              alt="YouTube social media link"
            >
              <Roblox />
            </motion.a>
          </Icons>
        </IconWrapper>
      </Top>
      <Bottom>
        <Headline>
          <h4>Contact Us</h4>
          <svg
            width="160"
            height="3"
            viewBox="0 0 160 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.84424H159.385"
              stroke="#1A1748"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </Headline>
        <Right>
          <Contact>
            <p>
              <strong>inquiries</strong>
            </p>
            <p>
              for general <br />
              inquiries
            </p>
            <a href="mailto:info@wonderworks.gg">info@wonderworks.gg</a>
          </Contact>
          <Contact>
            <p>
              <strong>press</strong>
            </p>
            <p>
              for press <br />
              inquiries
            </p>
            <a href="mailto:press@wonderworks.gg">press@wonderworks.gg</a>
          </Contact>
          <Contact>
            <p>
              <strong>collabs</strong>
            </p>
            <p>
              influencer <br />
              collaborations
            </p>
            <a href="mailto:collab@wonderworks.gg">collab@wonderworks.gg</a>
          </Contact>
          <Contact>
            <p>
              <strong>careers</strong>
            </p>
            <p>
              applications <br />
              and inquiries
            </p>
            <a href="mailto:careers@wonderworks.gg">careers@wonderworks.gg</a>
          </Contact>
          <Contact>
            <p>
              <strong>partnerships</strong>
            </p>
            <p>
              brand <br />
              partnerships
            </p>
            <a href="mailto:partnerships@wonderworks.gg">
              partnerships@wonderworks.gg
            </a>
          </Contact>
          <MobileContact>
            <Link to="/contact">
              <Arrow />
            </Link>
          </MobileContact>
        </Right>
      </Bottom>
    </BgSection>
  )
}

const BgSection = styled.section`
  padding: 8rem 0;
  background-color: var(--color-green);
  position: relative;

  @media (max-width: ${breakpoints.xxl}px) {
    padding: 6rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 5rem 0;
  }
`

const Top = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 10rem;
  border-bottom: 1px solid var(--color-black);

  @media (max-width: 1600px) {
    padding-bottom: 5rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 85%;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 3rem;
  }
`

const Flex = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: "ppwoodland-light";
    font-size: 6.56vw;
    line-height: 100%;
    white-space: nowrap;
    position: relative;
    z-index: 5;
  }

  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 75px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    display: block;
    h1 {
      font-size: 55px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    display: block;
    h1 {
      font-size: 45px;
    }
  }
`
const CurrentProjectsWrapper = styled.div`
  float: right;
  display: inline;
`


const SVGWrapper = styled.div`
  width: 600px;
  height: auto;
  aspect-ratio: 1/1;
  position: relative;
  svg {
    aspect-ratio: 1/1;
  }
  @media (max-width: 1600px) {
    width: 500px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 400px;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 300px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 250px;
    position: absolute;
    right: 0;
    top: 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    top: 30%;
    /* transform: rotate(90deg); */
  }
`

const IconWrapper = styled.div`
  padding-top: 10rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1600px) {
    padding-top: 5rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    justify-content: flex-start;
    padding-top: 7rem;
  }
`

const Icons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1600px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 70%;
    svg {
      max-height: 25px;
    }
  }
`

const Bottom = styled.div`
  width: 75%;
  padding-top: 5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 3rem;
    width: 85%;
  }
`

const Right = styled.div`
  align-self: flex-end;
  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 0rem;
    width: 100%;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 0rem;
    width: 100%;
    align-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.m}px) {
    align-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media (max-width: ${breakpoints.xs}px) {
    grid-template-columns: 1fr;
  }
`

const Headline = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;

  h4 {
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
    white-space: nowrap;
  }

  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const HeadlineMobile = styled.div`
  display: none;

  @media (max-width: ${breakpoints.xl}px) {
    display: flex;
    align-items: center;
    margin-bottom: 3.5rem;
    h4 {
      margin-right: 1rem;
      font-family: "calibre-semibold";
      padding: 0;
      white-space: nowrap;
    }
    h4 {
      margin-right: 0;
    }
    svg {
      transform: scaleX(0.7);
    }
  }
`

const Contact = styled.div`
  display: grid;
  grid-template-columns: 150px 2fr 2fr;
  margin-top: 2rem;

  p,
  strong,
  a {
    font-size: 18px;
    line-height: 22px;
  }

  p {
    font-family: "calibre-regular";
  }

  strong {
    font-family: "calibre-semibold";
  }

  :last-of-type a {
    width: 100%;
  }

  a {
    text-decoration: none;
    font-family: "calibre-regular";
    text-decoration: none;
    position: relative;
    width: 80%;

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1px;
      bottom: 15px;
      left: 0;
      background-color: var(--color-black);
      transform-origin: bottom right;
      transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    }

    :hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    grid-template-columns: 2fr 2fr 2fr;
    p,
    a,
    strong {
      font-size: 20px;
      line-height: 26px;
    }
    margin-top: 1.5rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    display: flex;
    flex-direction: column;
    width: 85%;
    margin-top: 2rem;
    p,
    a,
    strong {
      font-size: 18px;
      line-height: 22px;
    }
    br {
      display: none;
    }

    a {
      width: 100%;
      text-decoration: underline;

      ::after {
        content: none;
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
  @media (max-width: ${breakpoints.s}px) {
    a,
    p {
      font-size: 15px;
    }
    p {
      white-space: nowrap;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    a,
    p {
      font-size: 18px;
    }
    p {
      margin-top: 0.25rem;
    }
    strong {
      font-size: 20px;
    }
  }
`

const MobileContact = styled.div`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin-bottom: 2rem;
    margin-right: 4rem;
    position: relative;
    a {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-right: .5rem;
  }

  @media (max-width: ${breakpoints.xs}px) {
    margin-top: 2rem;
    a {
      left: 0;
    }
  }
`
