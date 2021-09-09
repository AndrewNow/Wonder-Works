import React, { useState, useEffect, useRef, useCallback } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import { BigPlus, TwoPlus, PlusButton } from "../svg/careerspage"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import { ContactUs } from "../components/contactUs"
import { WOShortLogo } from "../svg/logos"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const Careers = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Careers`

  const CascadeAnim = {
    visible: {
      zIndex: 6000,
    },
    hidden: {
      zIndex: 1,
      transition: {
        delay: 1.5,
        staggerChildren: 0.15,
      },
    },
  }
  const CascadeChild = {
    visible: {
      x: 0,
    },
    hidden: {
      x: "-100vw",
      transition: {
        duration: 1,
      },
    },
  }

  const line1 = {
    visible: {
      transition: {
        delayChildren: 1.15,
        staggerChildren: 0.2,
      },
    },
  }
  const line2 = {
    visible: {
      transition: {
        delayChildren: 1.55,
        staggerChildren: 0.2,
      },
    },
  }

  const word = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 11,
      },
    },
    hidden: {
      y: 200,
      opacity: 0,
    },
  }

  const subtitle = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1.2,
        type: "spring",
        stiffness: 100,
        damping: 13,
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  }

  // ---------- Parrallax scroll logic using Framer  ----------
  const { scrollYProgress } = useViewportScroll({ passive: true })

  let throttle = require("lodash/throttle")
  const smallParallax = useTransform(
    scrollYProgress,
    throttle(scrollYProgress => scrollYProgress * -350, 25)
  )

  // ------------ DATA FOR JOB ENTRIES ------------

  const CareerData = [
    {
      title: "Game developer",
      desc: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    },
    {
      title: "Game developer Two",
      desc: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    },
    {
      title: "Game developer Three",
      desc: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    },
  ]

  // ------------ FORM LOGIC ------------

  // When career plus icon is clicked, expand the career form
  const [expand, setExpand] = useState(false)
  // Then, update the state of the selected career to match the index of the clicked item
  const [selectedCareer, setSelectedCareer] = useState()

  const [formdata, setFormData] = useState({})

  const DEFAULT = {
    firstName: "",
    lastName: "",
  }

  const max = Object.keys(data).length
  const done = Object.values(data).reduce((prev, curr) => {
    if (curr) {
      prev++
    }
  }, 0)

  // ------------ END FORM LOGIC ------------

  //  Scroll to clicked career option on click
  let formRef = useRef()
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (formRef.current) {
        setTimeout(
          () =>
            window.scrollTo({
              behavior: "smooth",
              top: formRef.current.offsetTop,
            }),
          100
        )
      }
    }
  }, [selectedCareer])

  // ------------ logic for copying share link to clipboard ------------
  const [copySuccess, setCopySuccess] = useState("")
  const [animateSuccess, setAnimateSuccess] = useState(false)
  const textAreaRef = useRef(null)

  const copyToClipboard = e => {
    textAreaRef.current.select()
    document.execCommand("copy")
    setAnimateSuccess(true)
    setTimeout(() => {
      setAnimateSuccess(false)
    }, 2000)
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    // e.target.focus()
    setCopySuccess("Link copied to clipboard!")
  }

  // ---------- Set navbar color back to blue on page change  ----------
  // If the navbar theme is currently "light" (white) and the user clicks to a different page, without this code, the navbar would stay white until the user refreshes. This code resets the theme to blue, our default state.
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    toggleBlueTheme()
  }, [])

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme])

  return (
    <Layout title={siteTitle}>
      <Seo title="Careers" />
      {/* loading animation */}
      <Cascade variants={CascadeAnim} initial="visible" animate="hidden">
        <Yellow variants={CascadeChild} />
        <Pink variants={CascadeChild} />
        <Green variants={CascadeChild} />
        <Purple variants={CascadeChild} />
      </Cascade>
      <LandingSection>
        <Flex>
          <Left>
            <h1>
              <Mask variants={line1} initial="hidden" animate="visible">
                <Span variants={word}>let’s </Span>
                <Span variants={word}>grow</Span>
              </Mask>
              <Mask variants={line2} initial="hidden" animate="visible">
                <Span variants={word}>together.</Span>
              </Mask>
            </h1>
            <motion.p variants={subtitle} initial="hidden" animate="visible">
              At Wonder Works Studio we believe in big dreams and bigger ideas.{" "}
              <br />
              We’re problem solvers, creative leaders, and gaming aficionados.{" "}
              <br /> <br />
              We play first, work second, and always have our eyes set on the
              next big horizon. If you find inspiration in imagination — we want
              to work with you.
            </motion.p>
          </Left>
          <Right>
            <h6>
              wonder <br /> waits
            </h6>
          </Right>
        </Flex>
        <BigPlusWrapper style={{ y: smallParallax }}>
          <BigPlus />
        </BigPlusWrapper>
        <TwoPlusWrapper style={{ y: smallParallax }}>
          <TwoPlus />
        </TwoPlusWrapper>
      </LandingSection>
      <WonderWorkersWrapper>
        <WonderWorkers />
      </WonderWorkersWrapper>
      <CareerSection>
        <CareerWrapper>
          <CareerLeft>
            <h4>
              Love Us? Join Us!
              <svg
                width="160"
                height="4"
                viewBox="0 0 160 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2H159.385"
                  stroke="#1A1748"
                  strokeWidth="2.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </h4>
            <div>
              <h2>
                Available <br /> Positions
              </h2>
              <h5>
                <strong>We’ve been looking for someone like you. </strong>
                <br />
                Want to join a team of dynamic dreamers? Click on the right to
                find something that fits.
              </h5>
            </div>
          </CareerLeft>
          <CareerRight>
            {CareerData.length > 0 ? (
              CareerData.map((career, index) => {
                const handleClick = () => {
                  // When clicked, open the form dropdown and rotate the button
                  if (!expand) {
                    setExpand(true)
                    setSelectedCareer(index)
                  }
                  // if button has already been clicked, a second click will close the form and rotate the button back to 0deg
                  else if (index === selectedCareer) {
                    setExpand(false)
                    setSelectedCareer(null)
                  }
                  // When one item is toggled but the user clicks another, open that item instead
                  else {
                    setSelectedCareer(index)
                  }
                }
                return (
                  <CareerEntry key={index}>
                    <Title>
                      <h4>{career.title}</h4>
                      <Button
                        onClick={handleClick}
                        whileHover={{ opacity: 1 }}
                        animate={{
                          rotate: index === selectedCareer ? 45 : 0,
                        }}
                      >
                        <PlusButton />
                      </Button>
                    </Title>
                    <p>{career.desc}</p>
                  </CareerEntry>
                )
              })
            ) : (
              <h4>There are no positions currently available, sorry!</h4>
            )}
          </CareerRight>
        </CareerWrapper>
      </CareerSection>
      {expand && (
        <FormBg ref={formRef}>
          <FormContent>
            <FormTop>
              <FormTopPositionDetails>
                <h4>
                  Position Details{" "}
                  <svg
                    width="2"
                    height="162"
                    viewBox="0 0 2 162"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 161.931V0.0415039"
                      stroke="#1A1748"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </h4>
              </FormTopPositionDetails>
              <h5>
                To build games for everyone, we need ideas and magic from
                everywhere. We are made up of an incredibly talented team of
                individuals from all backgrounds with dynamic life experiences.
                None of us took the same path to get here but we prioritize
                progression, growth and strongly believe in the value of
                cultivating a diverse team.
              </h5>
              <FormTopShare>
                <WOShortLogo />
                <ShareSection>
                  {/* this form element below is necessary for the copy to clipboard function */}
                  {/* we hide it in CSS with opacity instead of "visibility: hidden" or "display: none" (these prevent it from functioning for some reason) */}
                  <form>
                    {/* the value prop is where the copied link resides */}
                    <textarea ref={textAreaRef} value="This is a test link!" />
                  </form>
                  <SharePosting onClick={copyToClipboard}>
                    Share Posting
                  </SharePosting>
                  <LinkCopiedAlert
                    // animate the alert in and out according to the timeout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animateSuccess ? 1 : 0 }}
                  >
                    {copySuccess}
                  </LinkCopiedAlert>
                </ShareSection>
              </FormTopShare>
            </FormTop>
            <FormContentSection>
              {/* <h5>{CareerData[`${selectedCareer}`].title}</h5> */}
              <h5>Our Values</h5>
              <p>Passion, Collaboration & Innovation</p>
            </FormContentSection>
            <FormContentSection>
              <h5>Benefits</h5>
              <p>
                401K options, Health, Medical and Vision, Generous Holiday
                Leaves, Workshops, Pet-Friendly Office, Team Lunches, Enriching
                Office Culture (Company Social Events, Team Lunches, Weekly
                Catered Lunches, Snack-Filled Pantry, Lounge with Games),
                Company Offisite Trips, Birthdays and Anniversary Treats,
                Wellness Talks
              </p>
            </FormContentSection>
            <FormContentSection>
              <h5>Qualifications</h5>
              <p>
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
                · Job Descriptions blah blah blah <br />
              </p>
            </FormContentSection>

            <FillOut>
              <h3>Ok, I’m sold. I’m ready to join.</h3>

              <Line>
                <form>
                  <input
                    type="text"
                    value={formdata.firstName}
                    placeholder={DEFAULT.firstName}
                  />
                  <input type="text" value={formdata.lastName} />
                  <span>
                    {done} out of {max} completed.
                    {console.log({ formdata })}
                  </span>
                  <input
                    type="submit"
                    onClick={e => setFormData(e)}
                    value="Submit form"
                  />
                </form>
              </Line>
            </FillOut>
          </FormContent>
        </FormBg>
      )}
      <ContactUsWrapper>
        <ContactUs />
      </ContactUsWrapper>
    </Layout>
  )
}

export default Careers

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Span = styled(motion.span)`
  margin-right: 2.5rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;
`

const Mask = styled(motion.div)`
  overflow: hidden;
`

const Cascade = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 6000;
  top: 0;
  left: 0;
`

const Yellow = styled(motion.div)`
  background-color: var(--color-orange);
  width: 99vw;
  height: 100vh;
  position: absolute;
  z-index: 6004;
  top: 0;
  left: 0;
`
const Pink = styled(motion.div)`
  background-color: var(--color-lightpink);
  width: 97vw;
  height: 100vh;
  position: absolute;
  z-index: 6003;
  top: 0;
  left: 0;
`
const Green = styled(motion.div)`
  background-color: var(--color-green);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 6002;
  top: 0;
  left: 0;
`
const Purple = styled(motion.div)`
  background-color: var(--color-purple);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 6001;
  top: 0;
  left: 0;
`

const LandingSection = styled.section`
  background-color: var(--color-darkblue);
  position: relative;
`

const Flex = styled.div`
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 15rem 0;
  display: flex;
  justify-content: space-between;
  width: 80%;
`
const Left = styled.div`
  width: 50%;
  h1,
  p {
    color: var(--color-white);
  }
  h1 {
    padding-bottom: 2rem;
    font-family: "ppwoodland-bold";
  }
`
const Right = styled.div`
  width: 50%;
  align-self: center;
  position: relative;
  z-index: -1;

  h6 {
    float: right;
    min-width: 80%;
    max-width: 80%;
    white-space: nowrap;
    font-family: "balgin-bold";
    font-size: 3.9vw;
    line-height: 3.9vw;
    text-transform: uppercase;
    text-align: center;
    color: var(--color-lightpink);
    border: 2px solid var(--color-lightpink);
    box-sizing: border-box;
    padding: 4rem 2rem;
    border-radius: 100%;
    transform: rotate(-17deg);
  }
`

const WonderWorkersWrapper = styled.div`
  padding: 5rem 0;
  background-color: var(--color-purple);
`

const BigPlusWrapper = styled(motion.div)`
  position: absolute;
  z-index: 0;
  top: 16%;
  left: 4.5%;
`

const TwoPlusWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  bottom: 14%;
  right: 12%;
`

const CareerSection = styled.section`
  background-color: var(--color-lightpurple);
`

const CareerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding: 10rem 0;
`
const CareerLeft = styled.div`
  position: sticky;
  top: 10rem;
  align-self: flex-start;
  height: auto;
  width: 50%;

  h4 {
    color: var(--color-black);
    display: flex;
    align-items: center;
    svg {
      padding-left: 1rem;
    }
  }

  div {
    padding-top: 5rem;
    width: 70%;

    h5 {
      padding-top: 3rem;
    }
  }

  div > h5 strong {
    font-family: "calibre-medium";
  }
`

const CareerRight = styled.div`
  width: 50%;
  display: relative;
  z-index: 5000;
`

const CareerEntry = styled.div`
  width: 80%;
  margin-bottom: 4rem;
`

const Title = styled.div`
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    text-transform: uppercase;
  }
`

const Button = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 100%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  cursor: pointer;
  svg {
    margin: 0 auto;
  }
`

const FormBg = styled.div`
  background-color: var(--color-green);
  padding: 15rem 0;
`

const FormContent = styled.div`
  width: 70%;
  margin: 0 auto;
  background-color: var(--color-white);
  border-radius: 40px;
`

const FormTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5rem;
  padding-top: 7rem;
  h5 {
    font-family: "ppwoodland-light";
    font-size: 33px;
    line-height: 42px;
  }
`

const FormTopPositionDetails = styled.div`
  writing-mode: sideways-lr;
  white-space: nowrap;
  padding-right: 6rem;
  padding-left: 3rem;
  h4 {
    font-family: "calibre-semibold";
    display: flex;
    align-items: center;
    svg {
      margin-bottom: 2rem;
    }
  }
`

const FormTopShare = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 5rem;
  position: relative;
  svg {
    width: 100px;
    height: auto;
    align-self: flex-end;
  }
  form {
    filter: opacity(0);
    display: inline;
    /* visibility: hidden; */
  }
`
const ShareSection = styled.div`
  align-self: flex-end;
  position: relative;
  width: 300px;
`

const LinkCopiedAlert = styled(motion.p)`
  position: absolute;
  font-family: "calibre-regular-italic";
  font-size: 18px;
  bottom: 5rem;
  margin: 0 auto;
  text-align: center;
  width: 100%;
`

const SharePosting = styled.button`
  align-self: flex-start;
  border: 2px solid var(--color-black);
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  background-color: var(--color-white);
  text-decoration: none;
  color: var(--color-black);
  font-family: "calibre-medium";
  font-size: 25px;
  line-height: 35px;
  width: 100%;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`

const ContactUsWrapper = styled.div`
  background-color: var(--color-orange);
`

const FormContentSection = styled.div`
  padding: 2.5rem 0;
  width: 60%;
  margin: 0 auto;

  h5 {
    font-family: "calibre-semibold";
    padding-bottom: 1rem;
  }
  p {
    font-size: 30px;
    line-height: 33px;
  }
`

const FillOut = styled.form`
  width: 60%;
  margin: 0 auto;
  h3 {
    padding: 10rem 0;
    font-family: "ppwoodland-bold";
  }
`
const Line = styled.div``
