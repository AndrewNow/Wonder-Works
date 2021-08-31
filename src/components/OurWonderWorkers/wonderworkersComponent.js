import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { CloseSVG } from "../../svg/miscellaneous"
import { AnimatePresence, motion } from "framer-motion"
import { TeamCarousel } from "./carousel"
import { workerData } from "./wonderworkersData"

export const WonderWorkersComponent = ({
  name,
  index,
  title,
  avatar,
  portal,
  style,
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
      <Worker key={index} onClick={() => setClick(!click)} style={style}>
        <Avatar>
          <PortalWrapper>
            <AvatarWrapper>
              <GatsbyImage
                image={avatar}
                alt={`Roblox avatar portrait of ${name}`}
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
                Close <CloseSVG />
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
`

const Avatar = styled.div`
  position: relative;
  z-index: 1;
  width: 330px;
  cursor: pointer;
`

const AvatarWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 2%;
  transform: translateX(-1rem);
`

const PortalWrapper = styled.div`
  z-index: 0;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
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
  color: #f7f7fc50;
  display: flex;
  transition: var(--hover-transition);
  svg {
    margin-left: 1rem;
  }

  &:hover {
    color: #f7f7fc;
  }
`
