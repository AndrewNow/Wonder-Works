import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"

export const WonderWorkersComponent = ({
  name,
  index,
  title,
  avatar,
  portal,
}) => {


  return (
    <>
      <Worker key={index}>
        <Avatar>
          <PortalWrapper>
            <AvatarWrapper>
              <GatsbyImage
                image={avatar}
                alt={`Roblox avatar portrait of ${name}`}
                imgStyle={{ width: "100%" }}
              />
            </AvatarWrapper>
            {portal}
          </PortalWrapper>
        </Avatar>
        <h4>{name}</h4>
        <p>{title}</p>
      </Worker>
    </>
  )
}

const Worker = styled.div`
  padding: 5rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 23.5%;
  position: relative;

  h4,
  p {
    text-align: center;
    color: var(--color-white);
  }
  p {
    text-transform: uppercase;
  }

  @media (max-width: ${breakpoints.xl}px) {
    p,
    h4 {
      transform: translateY(-1rem);
    }
    p {
      line-height: 100%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 6rem 0;
    p,
    h4 {
      transform: none;
    }
    width: 100%;
    align-self: center;
    justify-self: center;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 1.5rem 0;

    p,
    h4 {
      transform: translateY(-2rem);
    }
    h4 {
      font-size: 20px;
    }
    p {
      /* font-family: "calibre-semibold"; */
      font-size: 13px;
      letter-spacing: 0.02rem;
    }
  }
`

const Avatar = styled.div`
  position: relative;
  z-index: 1;
  width: 330px;

  @media (max-width: 1600px) {
    width: 250px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 200px;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 280px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 230px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 130px;
  }
`

const AvatarWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 2%;

  @media (max-width: 1600px) {
    bottom: 12%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    bottom: 20%;
  }
  @media (max-width: ${breakpoints.l}px) {
    bottom: 6%;
  }
  @media (max-width: ${breakpoints.m}px) {
    bottom: 15%;
  }
  @media (max-width: ${breakpoints.s}px) {
    bottom: 32%;
  }
`

const PortalWrapper = styled.div`
  z-index: 0;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 1600px) {
    svg {
      width: 250px;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin: 0 auto;
    svg {
      width: 200px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    svg {
      width: 280px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    svg {
      width: 230px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 130px;
    }
  }
`