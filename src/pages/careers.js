import React, { useState, useEffect, useRef, useCallback } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import { BigPlus, TwoPlus, PlusButton } from "../svg/careerspage"
import { ContactUs } from "../components/contactUs"
import { WOShortLogo } from "../svg/logos"
import emailjs from "emailjs-com"
import breakpoints from "../components/breakpoints"
import { Arrow, ColoredGears, DividingLineSVG } from "../svg/miscellaneous"
import {
  motion,
  useViewportScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion"
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
      zIndex: -1,
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
      y: 100,
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
      y: 70,
      opacity: 0,
    },
  }

  const bottomMessage = {
    visible: {
      y: 0,
      opacity: 1,
    },
    hidden: {
      y: 20,
      opacity: 0,
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  }
  const fileSizeMsg = {
    visible: {
      y: 0,
      opacity: 1,
    },
    hidden: {
      y: -20,
      opacity: 0,
    },
    exit: {
      y: 20,
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
      title: "Senior Developer",
      link: "https://wonder-works-studio.rippling-ats.com/job/331269/senior-developer",
      brief:
        "We are looking for game developers with at least 8-10 years of professional game development experience, with at least 2 shipped games on any platform.",
      description: [
        "Wonder Works is building a wide range of games for a variety of audiences. If you want to work in a fast-paced, agile and diverse environment, with the opportunity to reach new audiences with new experiences, please consider applying.",
        "The role is primarily gameplay development across various genres and expressions, with some light tools and UI development. Additional skills, like art, design and production, are also valuable, but this position is primarily development.",
      ],
      talkToUs: [
        "Want to work for a young company, but a financially stable one with a strong business plan",
        "Want to help mentor less experienced developers while making large contributions to code",
        "Want to work on a different kind of game with a different kind of audience",
      ],
      lastMessage:
        "We are especially seeking people with experience developing for and deploying to Roblox.",
    },
    {
      title: "Junior Developer",
      link: "https://wonder-works-studio.rippling-ats.com/job/331264/junior-developer",
      brief:
        "We are looking for developers who have built student game projects, independent games, or even graphically intensive apps on different platforms, and who now want to turn that into a career.",
      description: [
        "Wonder Works is building a wide range of games for a variety of audiences. If you want to work in a fast-paced, agile and diverse environment, with the opportunity to learn new skills and technologies, please consider applying.",
        "Minimum requirements are a significant development role in at least one finished game project on any platform, with the ability to clearly articulate your role. Please provide links to your portfolio on your resume. Additional skills, like art, design and production, are also valuable, but this position is primarily development.",
      ],
      lastMessage:
        "We are especially seeking people with experience developing for and deploying to Roblox.",
    },
    {
      title: "3D Modeler",
      link: "https://wonder-works-studio.rippling-ats.com/job/331272/3d-modeler",
      brief:
        "Reporting to the Wonder Works Studio Creative Director, the 3D Modeler is a full-time position that participates in all phases of the product life cycle and translates the studio vision as the project takes into place.",
      description: [
        "Wonder Works Studio, creator of Overlook Bay and Traitor on the Roblox platform and is committed to enriching players’ lives to new gaming realities and simulating unforgettable entertainment experiences. ",
        "· The 3D Modeler will work with the internal art team to ensure the technical specifications of 3D assets are followed by the external partners and enforce the proper engine implementation of the assets. The 3D Modeler must have a pristine eye for a playful and artful mind with efficiency to develop and launch new incredible experiences for players. ",
        "· You will be responsible for ideating, sculpting, and crafting your talent from concept to delivering the game’s vision. We’d like you to have experience making aesthetically beautiful performant 3D assets and game art optimization and conducting internal QA on the asset source files from the external partners, as well as ensuring assets are implemented with correct file structures, hierarchy, naming and meet all other tech requirements. Also experience creating high-quality 3D and 2D assets to meet tight deadlines. ",
      ],
      lastMessage:
        "Please ensure that a link to your portfolio / website is included on your resume. ",
    },
    {
      title: "Marketing Strategist",
      link: "https://wonder-works-studio.rippling-ats.com/job/331345/marketing-strategist",
      brief:
        "We are on the lookout for a bright-and-bushy-tailed Marketing Strategist. This position is responsible for setting realistic fast, paced objectives, and strategizing with company goals in mind and is able to advance the WWS online presence as a whole through many outlets such as our social media platforms, website, content campaigns, and so on.",
      description: [
        "Wonder Works Studio, creator of Overlook Bay and Traitor on the Roblox platform is committed to enriching players’ lives to new gaming realities and simulating unforgettable entertainment experiences. We work with a team of world class engineers, designers and artists to deliver them to players of all ages. ",
        "The scope of work is largely to produce effective and efficient marketing strategies for our company and our clientele. You will design strategically planned marketing campaigns and lead market research efforts. Success in this role will be determined by your ability to bolster the company’s market share while remaining consistent with the brand’s identity. We’d like you to have a degree in marketing or a similar field, and a few years of experience, along with data to showcase your skills. ",
      ],
    },
    {
      title: "Animator",
      link: "https://wonder-works-studio.rippling-ats.com/job/331270/animator",
      brief:
      "The Animator will breathe life into our vibrant new fantasy universe and loves to design anything thrown at them. Whether it's characters or critters, you will create iconic animations that set the tone and style of our game. ",
      description: [
        "Wonder Works Studio, creator of Overlook Bay and Traitor on the Roblox platform is committed to enriching players’ lives to new gaming realities and simulating unforgettable entertainment experiences. We work with a team of world class engineers, designers, and artists to deliver them to players of all ages. ",
        "Located in Arlington, Texas and reporting to the Wonder Works Studio CEO and Creative Director, the Animator is a full-time wanderlust position that participates in all phases of the product life cycle and translates the studio vision as the project takes into place.",
        "You will work closely with a team of highly talented people to develop gameplay experiences that surprise and blow the minds of players. As an early member of the team, you’ll have the unique opportunity to explore broad areas of game development, learn new skills, and shape the game as it goes. ",
      ],
      lastMessage:
      "Please ensure that a link to your portfolio / website is included on your resume. ",
    },
    {
      title: "Environmental Artist",
      link: "https://wonder-works-studio.rippling-ats.com/job/331344/environmental-artist",
      brief: "The ideal candidate will have some experience with asset creation, high poly/low poly modeling, and PBR texture creation, in addition to world building knowledge. This job is a very versatile position that will use all aspects of your industry knowledge to create props, textures, and environments that stride to set the new industry standard in visuals.",
      responsibilities: [
        "Work collaboratively with art director, concept artists and environment artists to create the game environments.",
        "Create models, textures and set pieces, based on concept art and the need of the project.",
      ],
      qualifications: [
        "Work collaboratively with art director, concept artists and environment artists to create the game environments.",
        "2+ years of game or film industry experience as an Environment Artist",
        "Familiarity with working on futuristic hard surface modeling",
        "Some experience with world building, texturing and lighting inside a game editor such as Radiant Unreal or comparable editor",
        "Some experience in environment asset creation using contemporary, real-time rendering methods",
        "Understanding of modern 3D modeling packages",
      ],
      lastMessage:
        "Please ensure that a link to your portfolio / website is included on your resume. ",
    },
  ]

  // +++++++++++++++++++++++++++++++++++++++ FORM LOGIC +++++++++++++++++++++++++++++++++++++++

  // When career plus icon is clicked, expand the career form
  const [expand, setExpand] = useState(false)
  // Then, update the state of the selected career to match the index of the clicked item
  const [selectedCareer, setSelectedCareer] = useState()


  //  Scroll to clicked career option on click
  const formRef = useRef()
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

  // ---------- Set navbar color back to blue on page change  ----------
  // If the navbar theme is currently "light" (white) and the user clicks to a different page, without this code, the navbar would stay white until the user refreshes. This code resets the theme to blue, our default state.
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    toggleBlueTheme()
  }, [toggleBlueTheme])

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme, toggleBlueTheme])

  return (
    <Layout title={siteTitle}>
      <Seo
        title="Careers"
        keywords={[
          `Wonder Works`,
          `WonderWorks`,
          `Wonder Works Roblox`,
          `Roblox`,
          `Gaming`,
          `wonder works gaming`,
          `wonderworks gaming`,
          `wonder works jobs`,
          `wonderworks jobs`,
          `jobs`,
          `careers`,
          `positions`,
          `wonder works positions`,
          `wonderworks positions`,
          `wonder works info`,
          `wonderworks info`,
        ]}
      />
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
                <Span variants={word}>Let’s </Span>
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
                Want to join a team of dynamic dreamers? Click the available
                positions to find something that fits.
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
                    <p>{career.brief}</p>
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
              <FormTopText>
                <h3>{CareerData[selectedCareer].title}</h3>
                <h5>
                  To build games for everyone, we need ideas and magic from
                  everywhere. We are made up of an incredibly talented team of
                  individuals from all backgrounds with dynamic life
                  experiences. None of us took the same path to get here but we
                  prioritize progression, growth and strongly believe in the
                  value of cultivating a diverse team.
                </h5>
              </FormTopText>
              <WOLogo>
                <WOShortLogo />
              </WOLogo>
              <SharePostingWrapper>
                <ApplyLink
                  href={CareerData[selectedCareer].link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Click here to view this job position's application form."
                >
                  Apply <Arrow />
                </ApplyLink>
              </SharePostingWrapper>
            </FormTop>
            {CareerData[`${selectedCareer}`].brief ? (
              <FormContentSection>
                <p>
                  <strong>{CareerData[`${selectedCareer}`].brief}</strong>
                </p>
              </FormContentSection>
            ) : null}
            {CareerData[`${selectedCareer}`].description ? (
              <FormContentSection>
                {CareerData[`${selectedCareer}`].description?.map((item, i) => (
                  <p key={i}>
                    {item} <br />
                    <br />
                  </p>
                ))}
              </FormContentSection>
            ) : null}
            {CareerData[`${selectedCareer}`].talkToUs ? (
              <FormContentSection>
                <h5>
                  <strong>Talk to us if you:</strong>
                </h5>
                <ul>
                  {CareerData[`${selectedCareer}`].talkToUs?.map((item, i) => (
                    <li key={i}>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </FormContentSection>
            ) : null}
            {CareerData[`${selectedCareer}`].responsibilities ? (
              <FormContentSection>
                <h5>
                  <strong>Responsibilities:</strong>
                </h5>
                <ul>
                  {CareerData[`${selectedCareer}`].responsibilities?.map(
                    (item, i) => (
                      <li key={i}>
                        <p>{item}</p>
                      </li>
                    )
                  )}
                </ul>
              </FormContentSection>
            ) : null}
            {CareerData[`${selectedCareer}`].qualifications ? (
              <FormContentSection>
                <h5>
                  <strong>Qualifications:</strong>
                </h5>
                <ul>
                  {CareerData[`${selectedCareer}`].qualifications?.map(
                    (item, i) => (
                      <li key={i}>
                        <p>{item}</p>
                      </li>
                    )
                  )}
                </ul>
              </FormContentSection>
            ) : null}
            {CareerData[`${selectedCareer}`].lastMessage ? (
              <FormContentSection>
                <p>
                  <strong>{CareerData[`${selectedCareer}`].lastMessage}</strong>
                </p>
              </FormContentSection>
            ) : null}

            {/*  */}
            <DividingLine>
              <DividingLineSVG />
            </DividingLine>
            <FormContentSection>
              <h5>Location</h5>
              <p>
                This is a full-time, on-site position in our new office in
                Arlington TX.
              </p>
            </FormContentSection>
            <FormContentSection>
              <h5>Wonder Works Studio Offers</h5>
              <ul>
                <li>
                  Plenty of opportunities to learn, grow your career, and wear
                  lots of hats.
                </li>
                <li>
                  Startup life – flexible, relaxed, yet high stakes work
                  environment.
                </li>
                <li>
                  Awesome coworkers who care about their work and each other’s
                  growth.
                </li>
                <li>
                  Competitive benefits include medical, dental, vision coverage,
                  401K options, FSA, and more!
                </li>
              </ul>
            </FormContentSection>
            <FormContentSection>
              <h5>Equal Opportunities Employer</h5>
              <p>
                Diversity and inclusion are an integral part of Wonder Works
                Studio’s work culture. We offer many on site perks to help
                foster a sense of community, such as: Arcade Games, Other gaming
                equipment, weekly catered lunches, many opportunities for
                bonuses and recognition, holiday parties and celebrations,
                monthly birthday parties, and more.
                <br />
                <br />
                Wonder Works Studio is an Equal Opportunity Employer. All
                qualified applicants will receive consideration for employment
                without regard to race, color, religion, sex, sexual
                orientation, gender identity, gender expression, national
                origin, protected veteran status, or any other basis protected
                by applicable law, and will not be discriminated against on the
                basis of disability.
              </p>
            </FormContentSection>
            <FormContentSection>
              <h5>COVID-19</h5>
              <p>
                Wonder Works Studio is a 100% Vaccinated office against
                Covid-19. All employees and new hires are required to present
                proof of vaccination upon hire.{" "}
              </p>
            </FormContentSection>
          </FormContent>
        </FormBg>
      )}
      <ContactUsWrapper>
        <SVGWrapper>
          <ColoredGears gearColor={"#f7f7fc"} />
        </SVGWrapper>
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
  position: fixed;
  z-index: 6000;
  top: 0;
  left: 0;
`

const Yellow = styled(motion.div)`
  background-color: var(--color-orange);
  width: 99vw;
  height: 100vh;
  position: fixed;
  z-index: 6004;
  top: 0;
  left: 0;
`
const Pink = styled(motion.div)`
  background-color: var(--color-lightpink);
  width: 97vw;
  height: 100vh;
  position: fixed;
  z-index: 6003;
  top: 0;
  left: 0;
`
const Green = styled(motion.div)`
  background-color: var(--color-green);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 6002;
  top: 0;
  left: 0;
`
const Purple = styled(motion.div)`
  background-color: var(--color-purple);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 6001;
  top: 0;
  left: 0;
`
// ^-- above are the page fade in animation markup styles

const Span = styled(motion.span)`
  margin-right: 2.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;
  vertical-align: baseline;

  @media (max-width: 1600px) {
    margin-right: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 1rem;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.75rem;
  }
`

const Mask = styled(motion.div)`
  overflow: hidden;
  height: 110%;
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
  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 10rem;
    padding-top: 7rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 5rem;
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
    font-family: "ppwoodland-light";
    white-space: nowrap;
    font-size: 6.5vw;
    line-height: 90%;
  }
  @media (max-width: 1600px) {
    width: 75%;
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
    width: 85%;
    p {
      font-size: 16px;
      line-height: 19px;
    }
    h1 {
      padding-top: 3rem;
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
    line-height: 100%;
    text-transform: uppercase;
    text-align: center;
    color: var(--color-lightpink);
    border: 2px solid var(--color-lightpink);
    box-sizing: border-box;
    padding: 4rem 2rem;
    border-radius: 100%;
    transform: rotate(-17deg);
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 75%;
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 7rem;
    h6 {
      padding: 2 rem 1rem;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-top: 5rem;
    margin: 0 auto;
    h6 {
      padding: 2rem;
      font-size: 50px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
    padding-top: 3rem;
    align-self: flex-start;
    h6 {
      padding: 3rem 1rem;
      font-size: 40px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    padding-top: 2rem;
    align-self: flex-start;
    h6 {
      padding: 2rem;
      font-size: 28px;
    }
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
    top: 15%;
    left: 5%;
    svg {
      width: 65px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    top: 10%;
    left: 3%;
    svg {
      width: 65px;
    }
  }
`

const TwoPlusWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  bottom: 15%;
  right: 13%;

  @media (max-width: ${breakpoints.xl}px) {
    bottom: 18%;
    right: 10%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    bottom: 12%;
    right: 5%;

    svg {
      width: 450px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    bottom: 15%;
    right: 10%;
    svg {
      width: 500px;
    }
  }

  @media (max-width: ${breakpoints.x}px) {
    bottom: 10%;
    right: 7%;
    svg {
      width: 270px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    bottom: 5%;
    right: 4%;
    svg {
      width: 270px;
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

  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;
  }
  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 5rem 0;
  }
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
    white-space: nowrap;
    svg {
      padding-left: 1rem;
    }
  }

  div {
    padding-top: 5rem;
    width: 70%;

    h5 {
      font-size: 31px;
      line-height: 100%;
      padding-top: 3rem;
    }
  }

  div > h5 strong {
    font-family: "calibre-medium";
    white-space: nowrap;
    font-weight: 300!important;
  }

  @media (max-width: 1440px) {
    margin-right: 5rem;
    div {
      width: 100%;
      h5 {
        font-size: 30px;
        line-height: 36px;
      }
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 55%;
    div {
      h5 {
        font-size: 25px;
        line-height: 30px;
      }
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 2rem;
    div {
      h5 {
        font-size: 21px;
        line-height: 25px;
      }
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    position: relative;
    top: 0rem;
    width: 100%;
    margin-right: 0rem;
    div {
      width: 100%;
      h5 {
        font-size: 25px;
      }
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    h2 {
      font-size: 40px;
      line-height: 42.5px;
    }
    div {
      width: 95%;
      padding-top: 3rem;
      h5 {
        font-size: 17px;
        line-height: 20px;
        strong {
    font-weight: 300!important;

          white-space: nowrap;
        }
      }
    }
  }
`

const CareerRight = styled.div`
  width: 50%;
  display: relative;
  z-index: 1000;

  @media (max-width: ${breakpoints.xl}px) {
    width: 60%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 70%;
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    margin-top: 4rem;
  }
`

const CareerEntry = styled.div`
  width: 80%;
  margin-bottom: 4rem;

  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    /* position: relative; */
    /* height: 5em;  */
    /* exactly three lines */
  }
  /* p:after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20%;
      height: 1.2em;
      background: linear-gradient(
        to right,
        rgba(177, 110, 172, 0),
        rgba(177, 110, 172, 1) 50%
      );
    }
  } */
  @media (max-width: ${breakpoints.xxl}px) {
    width: 100%;
  }

  @media (max-width: ${breakpoints.m}px) {
    /* width: 70%; */
    p {
      width: 70%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    p {
      width: 80%;
    }
  }
`

const Title = styled.div`
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    text-transform: uppercase;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 0.5rem;
  }
`

const Button = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 100%;
  width: 35px;
  height: 35px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  cursor: pointer;
  svg {
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 31px;
    height: 31px;
  }
`

const FormBg = styled.div`
  background-color: var(--color-green);
  padding: 15rem 0;

  @media (max-width: ${breakpoints.l}px) {
    padding: 10rem 0;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
  }
`

const FormContent = styled.div`
  width: 70%;
  margin: 0 auto;
  background-color: var(--color-white);
  border-radius: 40px;
  padding-bottom: 5rem;

  h3 {
    padding-left: 14rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.m}px) {
    border-radius: 20px;
  }
`

const FormTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5rem;
  padding-top: 7rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 5;
  h5 {
    font-family: "ppwoodland-light";
    font-size: 33px;
    line-height: 42px;
    /* line-height: 125%; */
    width: 60%;
  }
  h3 {
    font-family: "ppwoodland-bold";
    padding-left: 0rem;
    height: 8rem;
    width: 100%;
    // height is 8rem, same dimensions as padding-top for the left and right elements.
  }

  @media (max-width: 1700px) {
    h5 {
      width: 83%;
    }
  }

  @media (max-width: ${breakpoints.xxl}px) {
    padding-bottom: 0rem;
    h5 {
      width: 70%;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding-bottom: 2rem;
    h5 {
      width: 90%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-left: 2rem;
    padding-right: 2rem;
    h3 {
      width: 90%;
      height: 4rem;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    h3 {
      line-height: 100%;
      font-size: 30px;
    }
    h5 {
      font-size: 28px;
      line-height: 36px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
    padding-top: 5rem;
    padding-bottom: 0rem;
    padding-left: 0rem;
    padding-right: 0rem;
    margin: 0 auto;
    width: 80%;
    h3 {
      font-size: 20px;
      line-height: 22px;
      width: 85%;
      height: auto;
      padding-bottom: 2rem;
    }
    h5 {
      font-size: 16px;
      line-height: 20px;
      width: 100%;
    }
  }
`

const FormTopPositionDetails = styled.div`
  position: absolute;
  padding-right: 6rem;
  left: 7rem;
  top: 8rem;

  @media (max-width: ${breakpoints.xxl}px) {
    left: 6rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding-right: 4rem;
    left: 5rem;
    top: 10rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-right: 3rem;
    top: 3rem;
    left: 3rem;
    max-width: 110px;
    min-width: 110px;
    svg {
      transform: scale(0.7);
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`

const FormTopText = styled.div`
  margin-left: 20%;
  h5 {
    max-width: 56%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    margin-bottom: 5rem;
    h5 {
      max-width: 60%;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h5 {
      max-width: 70%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-left: 15%;
    h3 {
      font-size: 36px;
    }
    h5 {
      max-width: 90%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h3 {
      font-size: 32px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 2rem;
    margin-left: 0%;
    h3 {
      padding: 2rem 0;
      font-size: 22px;
      line-height: 110%;
    }
  }
`

const WOLogo = styled.div`
  position: absolute;
  z-index: 1;
  right: 7%;
  top: 33%;

  svg {
    width: 100px;
    height: auto;
  }

  @media (max-width: ${breakpoints.xl}px) {
    display: none;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: block;
    top: 5%;
    right: 5%;
    svg {
      width: 70px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    display: block;
    top: 10%;
    right: 0%;
    svg {
      width: 40px;
    }
  }
`
const SharePostingWrapper = styled.div`
  position: absolute;
  right: 7%;
  bottom: 10%;
  @media (max-width: 1750px) {
    bottom: 3%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    left: 20%;
  }
  @media (max-width: ${breakpoints.l}px) {
    left: 18%;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: block;
    position: relative;
    left: 0%;
  }
`

const ApplyLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  background: none;
  border: 2px solid var(--color-black);
  color: var(--color-black);
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-size: 25px;
  font-family: "calibre-medium";
  cursor: pointer;
  text-transform: uppercase;
  transition: var(--hover-transition);
  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
    svg {
      fill: var(--color-white);
      transform: translate3d(5px, 0rem, 0);
    }
  }
  svg {
    margin-left: 0.2rem;
    transition: var(--hover-transition);
  }
  @media (max-width: ${breakpoints.xxl}px) {
    padding: 0.5rem 1.5rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 0.35rem 1.5rem;
    font-size: 22px;
    :hover {
      svg {
        fill: var(--color-white);
        transform: translate3d(5px, 0.2rem, 0);
      }
    }
    svg {
      transform: translate3d(0, 0.2rem, 0);
      transition: var(--hover-transition);
      width: 30px;
      scale: 0.8;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    padding: 0.5rem 1.25rem;
    font-size: 20px;

    :hover {
      svg {
        fill: var(--color-white);
        transform: translate3d(5px, 0.2rem, 0);
      }
    }
    svg {
      transform: translate3d(0, 0.2rem, 0);
      transition: var(--hover-transition);
      width: 30px;
      scale: 0.75;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 3rem;
    bottom: 0;
    left: 0;
    min-width: 100px;
    max-width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.35rem 0.5rem;
    font-size: 16px;
    border: 1px solid var(--color-black);

    :hover {
      svg {
        transform: translate3d(5px, 0rem, 0);
      }
    }
    svg {
      margin-left: 5px;
      transform: translate3d(0, 0rem, 0);
    }
  }
`

const ContactUsWrapper = styled.div`
  background-color: var(--color-orange);
  position: relative;
`

const FormContentSection = styled.div`
  padding: 1.5rem 0;
  width: 60%;
  margin: 0 auto;
  white-space: pre-wrap;
  strong {
    font-weight: 300 !important;
    font-family: "calibre-semibold";
  }
  ul {
    color: var(--color-black);
    padding-left: 1.5rem !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    li {
      font-size: 30px;
      line-height: 110%;
      padding-bottom: 0.75rem;
    }
    li ::marker {
      /* font-size: 85%; */
      color: var(--color-black);
    }
  }

  h5 {
    font-family: "calibre-semibold";
    padding-bottom: 1rem;
  }
  p {
    font-size: 30px;
    line-height: 33px;
  }

  @media (max-width: ${breakpoints.xxl}px) {
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 65%;
    ul {
      padding-left: 1rem !important;
    }
    li,
    p,
    h5 {
      font-size: 26px !important;
      line-height: 30px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    li,
    p {
      font-size: 18px !important;
      line-height: 115%;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 0.75rem 0;
    width: 80%;
    margin: 0 auto;
    h5,
    li,
    p {
      font-size: 16px !important;
      line-height: 115%;
    }
    p {
      /* font-family: "calibre-medium"; */
    }
    h5 {
      padding-bottom: 0.75rem;
    }
    ul {
      padding-left: 0.8rem !important;
    }
  }
`

const SVGWrapper = styled.div`
  display: none;
  @media (max-width: ${breakpoints.xl}px) {
    position: absolute;
    z-index: 1;
    transform: rotate(90deg);
    display: block;
    width: 400px;
    height: 400px;
    top: 10%;
    right: 10%;
    svg {
      aspect-ratio: 1/1;
    }
  }
  @media (max-width: 1080px) {
    width: 350px;
    height: 350px;
    top: 10%;
    right: 10%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 250px;
    height: 250px;
    top: 28%;
    right: 15%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 250px;
    height: 250px;
    right: 5%;
    top: 25%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 180px;
    height: 180px;
    top: 31%;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 150px;
    top: 35%;
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 28%;
  }
`

const DividingLine = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`
