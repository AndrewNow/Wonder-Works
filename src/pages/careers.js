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
import emailjs from "emailjs-com"
import breakpoints from "../components/breakpoints"

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

  // +++++++++++++++++++++++++++++++++++++++ FORM LOGIC +++++++++++++++++++++++++++++++++++++++

  // When career plus icon is clicked, expand the career form
  const [expand, setExpand] = useState(false)
  // Then, update the state of the selected career to match the index of the clicked item
  const [selectedCareer, setSelectedCareer] = useState()

  // Logic for the progress messages found next to the submit button
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    resume: "",
  })

  // const max = Object.keys(formdata).length
  // Calculate the number of fields that have been completed, then change the message at the bottom.
  const completedFields = Object.values(formdata).reduce((prev, curr) => {
    if (curr) {
      prev++
    }
    return prev
  }, 0)

  // Event handler for changing the state of each field within {formdata}, depending on what the user types
  const handleChange = attribute => e => {
    setFormData(data => ({ ...data, [attribute]: e.target.value }))
  }

  // list file name within the label when user uploads a file
  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFormData(d => ({ ...d, resume: e.target.files[0].name }))
    }
  }

  // +++++++++++++++++++++ EMAIL JS CONFIG +++++++++++++++++++++
  const sendEmail = e => {
    e.preventDefault()

    emailjs
      .sendForm("service_lcnbclt", "template_i4qgqz5", e.target, "YOUR_USER_ID")
      .then(
        result => {
          console.log(result.text)
        },
        error => {
          console.log(error.text)
        }
      )
  }

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
                <svg
                  width="35"
                  height="454"
                  viewBox="0 0 35 454"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.48 441.64C21.48 436.44 18.68 433 13.48 433C8.24 433 5.44 436.44 5.44 441.64L5.44 451.64H30V446.56H21.48V441.64ZM13.48 438.04C15.6 438.04 17.12 439.32 17.12 441.96V446.56H9.8V441.96C9.8 439.32 11.28 438.04 13.48 438.04ZM21.08 414.112C15.56 414.112 11.72 417.672 11.72 422.872C11.72 428.072 15.56 431.632 21.08 431.632C26.56 431.632 30.4 428.072 30.4 422.872C30.4 417.672 26.56 414.112 21.08 414.112ZM21.08 419.032C24.04 419.032 26.2 420.392 26.2 422.872C26.2 425.352 24.04 426.712 21.08 426.712C18.08 426.712 15.92 425.352 15.92 422.872C15.92 420.392 18.08 419.032 21.08 419.032ZM24.68 412.062C28.32 411.542 30.4 408.462 30.4 404.102C30.4 399.942 28.24 396.782 24.6 396.782C21.88 396.782 20.16 398.422 19.4 401.542L18.56 405.222C18.28 406.342 17.88 406.822 17.16 406.822C16.04 406.822 15.48 405.662 15.48 404.462C15.48 402.822 16.24 401.982 17.24 401.662V396.942C13.88 397.542 11.72 400.022 11.72 404.542C11.72 408.542 14.04 411.662 17.52 411.662C20.52 411.662 21.92 409.742 22.56 407.022L23.36 403.422C23.68 402.182 24.08 401.622 24.88 401.622C26.04 401.622 26.64 402.622 26.64 404.142C26.64 405.622 25.96 406.742 24.68 407.142V412.062ZM12.12 388.482V393.442H30V388.482H12.12ZM6.96 388.042C5.32 388.042 4.12 389.402 4.12 390.962C4.12 392.562 5.32 393.922 6.96 393.922C8.64 393.922 9.8 392.562 9.8 390.962C9.8 389.402 8.64 388.042 6.96 388.042ZM24.6 383.065C28.56 383.065 30.36 380.785 30.36 377.145C30.36 375.825 30.16 374.625 29.8 373.945H25.4C25.76 374.505 26 375.345 26 376.105C26 377.385 25.36 378.145 23.96 378.145H16.12V374.225H12.12V378.145H7.28V383.065H12.12V385.785H16.12V383.065H24.6ZM12.12 365.396V370.356H30L30 365.396H12.12ZM6.96 364.956C5.32 364.956 4.12 366.316 4.12 367.876C4.12 369.476 5.32 370.836 6.96 370.836C8.64 370.836 9.8 369.476 9.8 367.876C9.8 366.316 8.64 364.956 6.96 364.956ZM21.08 344.659C15.56 344.659 11.72 348.219 11.72 353.419C11.72 358.619 15.56 362.179 21.08 362.179C26.56 362.179 30.4 358.619 30.4 353.419C30.4 348.219 26.56 344.659 21.08 344.659ZM21.08 349.579C24.04 349.579 26.2 350.939 26.2 353.419C26.2 355.899 24.04 357.259 21.08 357.259C18.08 357.259 15.92 355.899 15.92 353.419C15.92 350.939 18.08 349.579 21.08 349.579ZM30 341.488V336.528H18.68C17.12 336.128 16.2 334.808 16.2 333.288C16.2 331.328 17.48 330.368 19.36 330.368H30V325.408H18.32C14.36 325.408 11.72 327.688 11.72 331.728C11.72 333.808 12.64 335.568 13.76 336.528H12.12V341.488H30ZM25.48 307.537H9.92V304.137C9.92 299.457 12.92 296.897 17.72 296.897C22.48 296.897 25.48 299.457 25.48 304.137L25.48 307.537ZM30 312.617L30 303.937C30 296.497 25.2 291.817 17.72 291.817C10.24 291.817 5.44 296.497 5.44 303.937V312.617H30ZM24.16 277.405C25.68 277.805 26.4 279.045 26.4 280.725C26.4 282.925 24.8 284.445 22.12 284.605V272.685H20.6C15.36 272.685 11.72 275.565 11.72 280.805C11.72 285.805 15.68 289.405 21.08 289.405C26.6 289.405 30.4 285.925 30.4 280.725C30.4 276.245 27.96 273.445 24.16 272.805V277.405ZM15.76 280.765C15.76 278.725 17.24 277.605 19.12 277.565V284.485C16.92 284.045 15.76 282.685 15.76 280.765ZM24.6 268.455C28.56 268.455 30.36 266.175 30.36 262.535C30.36 261.215 30.16 260.015 29.8 259.335H25.4C25.76 259.895 26 260.735 26 261.495C26 262.775 25.36 263.535 23.96 263.535H16.12V259.615H12.12L12.12 263.535H7.28V268.455H12.12V271.175H16.12V268.455H24.6ZM30 241.34H18.6C14.32 241.34 11.72 244.1 11.72 248.86C11.72 252.94 14.2 255.86 17.44 256.38V251.66C16.4 251.26 15.76 250.42 15.76 249.02C15.76 247.02 17 246.1 18.52 246.1H19.84C19.32 246.82 18.8 248.62 18.8 250.18C18.8 254.06 21.12 257.1 24.52 257.1C28.24 257.1 30.32 254.06 30.32 250.46C30.32 248.5 29.64 246.7 29.04 246.1H30V241.34ZM25.12 246.1C26.08 246.54 26.68 247.9 26.68 249.34C26.68 250.9 26.04 252.5 24.48 252.5C22.96 252.5 22.28 250.9 22.28 249.34C22.28 247.9 22.88 246.54 23.84 246.1H25.12ZM12.12 232.349L12.12 237.309H30V232.349H12.12ZM6.96 231.909C5.32 231.909 4.12 233.269 4.12 234.829C4.12 236.429 5.32 237.789 6.96 237.789C8.64 237.789 9.8 236.429 9.8 234.829C9.8 233.269 8.64 231.909 6.96 231.909ZM4 223.052V228.012H30V223.052H4ZM24.68 219.875C28.32 219.355 30.4 216.275 30.4 211.915C30.4 207.755 28.24 204.595 24.6 204.595C21.88 204.595 20.16 206.235 19.4 209.355L18.56 213.035C18.28 214.155 17.88 214.635 17.16 214.635C16.04 214.635 15.48 213.475 15.48 212.275C15.48 210.635 16.24 209.795 17.24 209.475V204.755C13.88 205.355 11.72 207.835 11.72 212.355C11.72 216.355 14.04 219.475 17.52 219.475C20.52 219.475 21.92 217.555 22.56 214.835L23.36 211.235C23.68 209.995 24.08 209.435 24.88 209.435C26.04 209.435 26.64 210.435 26.64 211.955C26.64 213.435 25.96 214.555 24.68 214.955V219.875Z"
                    fill="#1A1748"
                  />
                  <path
                    d="M18 161.931V0.0415039"
                    stroke="#1A1748"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              </FormTopPositionDetails>
              <div>
                <h3>{CareerData[selectedCareer].title}</h3>
                <h5>
                  To build games for everyone, we need ideas and magic from
                  everywhere. We are made up of an incredibly talented team of
                  individuals from all backgrounds with dynamic life
                  experiences. None of us took the same path to get here but we
                  prioritize progression, growth and strongly believe in the
                  value of cultivating a diverse team.
                </h5>
              </div>
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
            <FillOut onSubmit={sendEmail}>
              <h3>Ok, I’m sold. I’m ready to join.</h3>
              <input type="hidden" name="contact_number" />
              <Line>
                <Input
                  onChange={handleChange("firstName")}
                  type="text"
                  placeholder="First Name *"
                  name="first_name"
                  required
                />
                <Input
                  onChange={handleChange("lastName")}
                  type="text"
                  placeholder="Last Name *"
                  name="last_name"
                  required
                />
              </Line>
              <Line>
                <FullWidthInput
                  onChange={handleChange("email")}
                  type="email"
                  placeholder="Email Address *"
                  name="user_email"
                  required
                />
              </Line>
              <Line>
                <Select
                  name="position"
                  required
                  onChange={handleChange("position")}
                  defaultValue=""
                >
                  <option value="" disabled selected>
                    Position applying for *{" "}
                  </option>
                  {CareerData.map((job, i) => {
                    return (
                      <option key={i} value={job.title}>
                        {job.title}
                      </option>
                    )
                  })}
                </Select>
                <Input type="text" placeholder="City" name="city" />
              </Line>
              <Line>
                <FullWidthInput
                  type="url"
                  placeholder="Linkedin profile link (if applicable)"
                  name="linkedin"
                />
              </Line>
              <Line>
                <FullWidthInput
                  type="url"
                  placeholder="Link to portfolio (if applicable)"
                  name="portfolio"
                />
              </Line>
              <Line>
                <FileLabel htmlFor="myfile">
                  {formdata.resume ? formdata.resume : "Attach resume here *"}
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.40625 11.3838H18.0852"
                      stroke="black"
                      strokeWidth="0.684"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M11.7461 4.9458V17.824"
                      stroke="black"
                      strokeWidth="0.684"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M11.7451 22.302C17.6816 22.302 22.4941 17.4139 22.4941 11.3842C22.4941 5.35439 17.6816 0.466309 11.7451 0.466309C5.8086 0.466309 0.996094 5.35439 0.996094 11.3842C0.996094 17.4139 5.8086 22.302 11.7451 22.302Z"
                      stroke="black"
                      strokeWidth="0.684"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </FileLabel>
                <FileUpload
                  type="file"
                  accept=".pdf"
                  id="myfile"
                  name="myfile"
                  onChange={handleFileChange}
                  required
                />
              </Line>
              <Bottom>
                {!completedFields && <p></p>}

                {completedFields === 1 && <p>Nice to meet you!</p>}
                {completedFields === 2 && <p>Almost there...</p>}
                {completedFields === 3 && <p>Nice to meet you!</p>}
                {completedFields === 4 && <p>Nice to meet you!</p>}
                {completedFields === 5 && (
                  <p>
                    Thank you for your interest! <br /> We'll reach out to you
                    if it's a good fit.
                  </p>
                )}
                <Submit type="submit" value="Apply" whileTap={{ scale: 0.9 }} />
              </Bottom>
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
// ^-- above are the page fade in animation markup styles

const Span = styled(motion.span)`
  margin-right: 2.5rem;
  display: inline-block;
  position: relative;
  vertical-align: text-top;

  @media (max-width: 1600px) {
    margin-right: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 1.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
`

const Mask = styled(motion.div)`
  overflow: hidden;
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

  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;
  }

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
    padding-top: 10rem;
  }
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
    white-space: nowrap;
    font-size: 6.5vw;
    line-height: 80%;
  }
  @media (max-width: 1600px) {
    width: 65%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    p {
      br:nth-of-type(1) {
        display: none;
      }
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 8vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 70%;
    margin: 0 auto;
    p {
      font-size: 20px;
      line-height: 24px;
    }
    h1 {
      line-height: 100%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 80%;
    h1 {
      font-size: 45px;
    }
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

  @media (max-width: ${breakpoints.l}px) {
    width: 80%;
    margin: 0 auto;
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

  @media (max-width: ${breakpoints.xl}px) {
    left: 1%;
    top: 14%;
    svg {
      width: 110px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    top: 10%;
    left: 3%;
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 10%;
    left: 3%;
    svg {
      width: 65px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    svg {
      width: 65px;
    }
  }
`

const TwoPlusWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  bottom: 14%;
  right: 12%;

  @media (max-width: ${breakpoints.xl}px) {
    bottom: 12%;
    right: 5%;

    svg {
      width: 450px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    bottom: 20%;
    svg {
      width: 400px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    bottom: 25%;
    svg {
      width: 350px;
    }
  }
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

  h3 {
    padding-left: 14rem;
  }
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
  h3 {
    font-family: "ppwoodland-bold";
    padding-left: 0rem;
    height: 8rem;
    width: 150%;
    // height is 8rem, same dimensions as padding-top for the left and right elements.
  }
`

const FormTopPositionDetails = styled.div`
  position: relative;
  padding-right: 6rem;
  padding-left: 3rem;
  padding-top: 8rem;
`

const FormTopShare = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 5rem;
  padding-top: 8rem;
  position: relative;
  svg {
    width: 100px;
    height: auto;
    align-self: flex-end;
  }
  form {
    filter: opacity(0);
    display: inline;
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
  padding-bottom: 7rem;
  h3 {
    padding: 5rem 0;
    font-family: "ppwoodland-bold";
  }
`
const Line = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;

  p {
    font-size: 20px;
    font-family: "calibre-medium";
    text-transform: uppercase;
  }
`

const Input = styled.input`
  width: 45%;
  background: none;
  border: none;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-black);
  box-sizing: border-box;

  font-family: "calibre-regular";
  font-size: 20px;

  ::placeholder {
    font-family: "calibre-regular";
    font-size: 20px;
    color: #42423e;
    text-transform: uppercase;
  }

  :focus {
    outline: none !important;
    border-bottom: 2px solid #b06eab;
  }
  transition: var(--hover-transition);
  :hover {
    border-bottom: 2px solid #b06eab;
  }
`

const FullWidthInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-black);
  font-family: "calibre-regular";
  font-size: 20px;

  ::placeholder {
    font-family: "calibre-regular";
    font-size: 20px;
    text-transform: uppercase;
    color: #42423e !important;
  }
  :focus {
    outline: none !important;
    border-bottom: 2px solid #b06eab;
  }
  transition: var(--hover-transition);
  :hover {
    border-bottom: 2px solid #b06eab;
  }
`

const Select = styled.select`
  width: 45%;
  background: none;
  border: none;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-black);
  box-sizing: border-box;
  font-family: "calibre-regular";
  font-size: 20px;
  text-transform: uppercase;
  color: #42423e;

  ::placeholder {
    font-family: "calibre-regular";
    font-size: 20px;
    text-transform: uppercase;
    color: #42423e;
  }
  :focus {
    outline: none !important;
    border-bottom: 2px solid #b06eab;
  }
  transition: var(--hover-transition);
  :hover {
    border-bottom: 2px solid #b06eab;
  }
`

const FileUpload = styled.input`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
`

const FileLabel = styled.label`
  width: 100%;
  background: none;
  border: none;
  padding-bottom: 1rem;
  color: #42423e;
  border-bottom: 2px solid var(--color-black);
  font-family: "calibre-regular";
  font-size: 20px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :focus {
    outline: none !important;
    border-bottom: 2px solid #b06eab;
  }
  transition: var(--hover-transition);
  :hover {
    border-bottom: 2px solid #b06eab;
  }
`

const Submit = styled(motion.input)`
  align-self: flex-end;
  cursor: pointer;
  background: none;
  border: 2px solid var(--color-black);
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 25px;
  font-family: "calibre-medium";
  cursor: pointer;
  text-transform: uppercase;
  transition: var(--hover-transition);
  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`

const Bottom = styled.div`
  display: flex;
  padding-top: 2rem;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 20px;
    font-family: "calibre-medium";
    text-transform: uppercase;
  }
`
