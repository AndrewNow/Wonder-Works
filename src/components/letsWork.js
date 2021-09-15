import React from "react"
import styled from "styled-components"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import { motion } from "framer-motion"

export const LetsWork = ({ svg }) => {
  return (
    <BgSection>
      <Top>
        <Flex>
          <h1>
            Let’s work <br />
            wonders <br />
            together.
          </h1>
          {svg}
        </Flex>
        <IconWrapper>
          <Icons>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https:/twitter.com/WonderWorksRB"
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
        <div>
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
              press
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
        </div>
      </Bottom>
    </BgSection>
  )
}

export const LetsWorkHomepage = ({ svg }) => {
  return (
    <BgSection>
      <Top>
        <Flex>
          <h1>
            Let’s work <br />
            wonders <br />
            together.
          </h1>
          {svg}
        </Flex>
        <IconWrapper>
          <Icons>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https:/twitter.com/WonderWorksRB"
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
        <div>
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
              press
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
        </div>
      </Bottom>
    </BgSection>
  )
}

const BgSection = styled.section`
  padding: 15rem 0;
  background-color: var(--color-green);
  position: relative;
  h1 {
    font-family: "ppwoodland-light";
  }
`

const BgSectionHomePage = styled.section`
  padding: 15rem 0;
  background-color: var(--color-green);
  h1 {
    font-family: "ppwoodland-light";
  }
`

const Top = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 10rem;
  border-bottom: 1px solid var(--color-black);
`

const Flex = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const IconWrapper = styled.div`
  padding-top: 10rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`

const Icons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Bottom = styled.div`
  width: 75%;
  padding-top: 5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const Headline = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;

  h4 {
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
  }
`

const Contact = styled.div`
  display: grid;
  grid-template-columns: 1.75fr 2fr 2fr;
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
`
