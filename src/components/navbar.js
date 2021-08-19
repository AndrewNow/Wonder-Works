import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { Squash as Hamburger } from "hamburger-react"

import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  const navAnimation = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  const navItem = {
    visible: {
      opacity: 1,
      y: 30,
    },
    hidden: {
      y: 0,
      opacity: 0,
    },
  }

  return (
    <Nav>
      <Link to="/">
        <StaticImage
          src="../images/wwLogo.png"
          quality={100}
          width={185}
          placeholder="none"
        />
      </Link>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        label="Show menu"
        rounded
        color="var(--color-black)"
      />
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <Dropdown
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          exit="hidden"
          variants={navAnimation}
          >
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link>About</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link>Projects</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link>Investors</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link>Careers</Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ x: -15 }}>
              <Link>Contact</Link>
            </motion.div>
          </Dropdown>
        )}
      </AnimatePresence>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  z-index: 2000;
  position: fixed;
  width: 92.5%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 2.5rem;
`

const Dropdown = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2000;
  right: 0.5%;
  transform: translateY(30%);
  div {
    cursor: pointer;
    text-align: right;
    font-family: "calibre-regular";
    margin-bottom: 1rem;
    font-size: 18px;
    & > a:hover {
      font-weight: 900;
    }
  }
`
