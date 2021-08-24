import React from "react"
import styled from "styled-components"
import { WOShortLogo } from "../svg/logos"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <FooterWrapper>
      <Inner>
        <p>
          © Wonder Works Studio, Inc. {new Date().getFullYear()}. <br />
          Website by Blanck Studio
        </p>
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
          <WOShortLogo />
        </IconWrapper>
      </Inner>
    </FooterWrapper>
  )
}

export default Footer

const FooterWrapper = styled.footer`
  background-color: var(--color-white);
  position: relative;
  z-index: 100;
`

const Inner = styled.div`
  margin: 0 auto;
  width: 92.5%;
  padding: 2.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg:last-of-type {
    width: 100px;
  }

  p {
    font-family: "calibre-regular";
    font-size: 19px;
    line-height: 23px;
  }
`

const Icons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-self: flex-end;
  padding-right: 10rem;

  svg {
    &:hover {
      fill: #b16eac;
    }
  }
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`