import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { CloseSVG } from "../../svg/miscellaneous"
import { AnimatePresence, motion } from "framer-motion"
import { TeamCarousel } from "./carousel"
import breakpoints from "../breakpoints"

export const WonderWorkersComponent = ({
  name,
  index,
  title,
  avatar,
  portal,
}) => {
  // Configure animations
  const ModalAnimation = {
    visible: {
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
      translateY: "-50%",
      opacity: 1,
    },
    hidden: {
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
      translateY: "100%",
      opacity: 0,
    },
  }

  const [click, setClick] = useState(false)

  // Close modal with Esc key
  useEffect(() => {
    const onKeyDown = e => {
      if (e.keyCode === 27) {
        console.log(e)
        setClick(false)
      } else {
        return
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Worker key={index} onClick={() => setClick(!click)}>
        <Avatar>
          <PortalWrapper>
            <AvatarWrapper whileHover={{ scale: 1.02, y: -5 }}>
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
      <AnimatePresence exitBeforeEnter>
        {click ? (
          <Modal
            variants={ModalAnimation}
            initial="hidden"
            animate={click ? "visible" : "hidden"}
            exit="hidden"
          >
            <BackdropColor>
              <TeamCarousel index={index} />
              <Close onClick={() => setClick(!click)}>
                <p>Close</p> <CloseSVG />
              </Close>
            </BackdropColor>
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  )
}

const Worker = styled.div`
  padding: 5rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 23.5%;
  cursor: pointer;
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
  cursor: pointer;

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

const AvatarWrapper = styled(motion.div)`
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

const Modal = styled(motion.span)`
  position: fixed;
  top: 50%;
  z-index: 5001;
  width: 95%;
  height: 95vh;
  background-color: #1a174899;
  backdrop-filter: blur(6px);
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  p {
    color: var(--color-white);
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
    height: 90vh;
    /* left: 50%; */
    /* top: 50%; */
    margin: 0 auto;
  }
`

const BackdropColor = styled.div`
  overflow: hidden;
  border-radius: 12px;
  background-color: #1a174899;
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Close = styled.button`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-family: "calibre-regular";
  display: flex;
  transition: var(--hover-transition);
  display: flex;
  align-items: center;
  svg {
    margin-left: 1rem;
  }
  p {
    color: #f7f7fc50;
  }
  :hover p {
    color: #f7f7fc;
  }

  @media (max-width: ${breakpoints.s}px) {
    bottom: 92.5%;
    p {
      display: none;
    }
  }
`
