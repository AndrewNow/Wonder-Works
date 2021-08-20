import React from "react"
import styled from "styled-components"
import { WOShortLogo } from "../svg/logos"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
const Footer = () => {
  return (
    <FooterWrapper>
      <Inner>
        <p>
          © Wonder Works Studio, Inc. {new Date().getFullYear()}. <br />
          Website by Blanck Studio
        </p>
        <Icons>
          <div>
            <IconWrapper>
              <a
                href="https:/twitter.com/WonderWorksRB"
                rel="noreferrer"
                target="_blank"
              >
                <Twitter />
              </a>
              <a
                href="https://www.instagram.com/wonderworksstudio/"
                rel="noreferrer"
                target="_blank"
              >
                <Instagram />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxAUri__UiH2K3S8LGDDJuQ/videos"
                rel="noreferrer"
                target="_blank"
              >
                <TikTok />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxAUri__UiH2K3S8LGDDJuQ/videos"
                rel="noreferrer"
                target="_blank"
              >
                <YouTube />
              </a>
              <a
                href="https://www.roblox.com/groups/6258143/Wonder-Works-Studio#!/about"
                rel="noreferrer"
                target="_blank"
              >
                <Roblox />
              </a>
            </IconWrapper>
          </div>
        </Icons>
        <WOShortLogo />
      </Inner>
    </FooterWrapper>
  )
}

export default Footer

const FooterWrapper = styled.footer`
  background-color: var(--color-white);
`

const Inner = styled.div`
  margin: 0 auto;
  width: 92.5%;
  padding: 2.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-family: "calibre-regular";
    font-size: 19px;
    line-height: 23px;
  }
`

const Icons = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    width: 25px;
    height: auto;
  }
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
