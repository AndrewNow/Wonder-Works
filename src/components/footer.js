import React from "react"
import styled from "styled-components"
import { WOShortLogo } from "../svg/logos"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import { motion } from "framer-motion"
import breakpoints from "./breakpoints"
const Footer = () => {
  return (
    <FooterWrapper>
      <Inner>
        <WOShortLogo />
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
          <p>
            © Wonder Works Studio, Inc. {new Date().getFullYear()}. <br />
            Website by Blanck Studio
          </p>
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
    padding-right: 6rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    p {
      padding-right: 7rem;
    }
    svg:nth-child(1) {
      width: 70px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
    padding: 2rem 0;

    p {
      font-family: "calibre-medium";
      text-align: center;
      padding: 2rem 0;
      padding-bottom: 1rem;
    }
    svg:nth-child(1) {
      width: 50px;
    }
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
  
  @media (max-width: ${breakpoints.xl}px) {
    padding-right: 5rem;

    svg {
      max-height: 25px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-right: 0;
    width: 100%;
    margin: 0 auto;

    svg {
      margin: 0 1rem;
      max-width: 40px!important;
    }
  }

  @media (max-width: ${breakpoints.xs}px) {
    a {
      width: 60px;
    }
  }
  `
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.xs}px) {
    max-width: 90vw;
  }
`
