import React from "react"
import styled from "styled-components"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import { motion } from "framer-motion"

const ContactUs = () => {
  return (
    <Wrapper>
      <Left>
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
        <h1>
          Let’s work <br />
          wonders <br />
          together.
        </h1>
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
      </Left>
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
            for general <br />
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
      </Right>
    </Wrapper>
  )
}

export default ContactUs

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

const Wrapper = styled.div`
  width: 77.5%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10rem;
  padding-top: 5rem;
`

const Left = styled.div`
  h1 {
    width: 60%;
    font-size: 126px;
    line-height: 130px;
    white-space: nowrap;
  }
`

const IconWrapper = styled.div`
  padding-top: 10rem;
  width: 80%;
`

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    &:hover {
      fill: #b16eac;
    }
  }
`

const Right = styled.div`
  align-self: flex-end;
`

const Contact = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem 0;
  
  p, strong, a {
    font-size: 18px;
    line-height: 22px;
  }

  p {
    font-family: 'calibre-regular'
  }
  
  strong {
    font-family: 'calibre-semibold';
  }
  
  a {
    text-decoration: none;
    font-family: 'calibre-regular';
  }
`
