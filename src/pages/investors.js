import React, { useState, useCallback, useEffect } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { AnimateSharedLayout, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import PressCarousel from "../components/EmblaCarousel/pressCarousel"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import { ContactUs } from "../components/contactUs"
import PressCarouselLogos from "../components/AsSeenOn/PressCarouselLogos"
import { Arrow } from "../svg/miscellaneous"
import { useGlobalDispatchContext } from "../context/globalContext"
import breakpoints from "../components/breakpoints"
import EventsCarouselMobile from "../components/EmblaCarousel/eventsCarouselMobile"
import * as Svg from "../svg/investorspage"

const Investors = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Investment Centre`

  // Make sure navbar starts in blue on page load
  const dispatch = useGlobalDispatchContext()

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    toggleBlueTheme()
  }, [toggleBlueTheme])

  // ---------- Refs ----------
  const [countUpRef, countUpInView] = useInView({
    root: null,
    threshold: 0.2,
    triggerOnce: true,
  })
  const [countUpRef2, countUpInView2] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })
  const [countUpRef3, countUpInView3] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })

  const [paragraphRef, paragraphInView] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })

  // ---------- Animation logic ----------

  const headerAnimation = {
    visible: {
      transition: {
        duration: 2,
        delay: 1,
        delayChildren: 0.6,
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  }

  const headerChildren = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hidden: {
      y: 200,
      opacity: 0,
    },
  }

  const paragraphAnimation = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      y: 60,
    },
  }
  const paragraphAnimation2 = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      y: 60,
    },
  }

  const circleAnimation = {
    inView: {
      transition: {
        duration: 0.5,
        delay: 0.25,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
    },
  }

  const circleText = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: -60,
    },
  }
  const eventAnimation = {
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  const PastEventsData = [
    {
      date: "29.04.21 — 12:45PM ET",
      name: "First Event Name",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      date: "29.04.21 — 12:45PM ET",
      name: "Second Event Name",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      date: "29.04.21 — 12:45PM ET",
      name: "Event Name",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      date: "29.04.21 — 12:45PM ET",
      name: "Event Name",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      date: "29.04.21 — 12:45PM ET",
      name: "Event Name",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      date: "29.04.21 — 12:45PM ET",
      name: "Event Name",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
  ]

  // Only display 2 posts from PastEventsData[] at first
  const [visiblePosts, setVisiblePosts] = useState(2)

  // When user clicks on the  button, load 2 more posts (see: MORE_POSTS)
  const MORE_POSTS = 2
  const handleLoadNewPosts = () =>
    setVisiblePosts(visiblePosts => visiblePosts + MORE_POSTS)
  // When we reach the end of the array, load more posts button becomes a "close posts" button
  const handleClosePosts = () => setVisiblePosts(2)

  return (
    <Layout title={siteTitle}>
      <Seo title="Investment Centre" />
      <Header>
        <p>Investment Centre</p>
      </Header>
      <HeaderFlex>
        <Left>
          <motion.h1
            variants={headerAnimation}
            initial="hidden"
            animate="visible"
          >
            <Mask>
              <Span variants={headerChildren}>Why</Span>
              <br />
            </Mask>
            <Mask>
              <Span variants={headerChildren}>Wonder</Span>
              <br />
            </Mask>
            <Mask>
              <Span variants={headerChildren}>Works</Span>
            </Mask>
          </motion.h1>
        </Left>
        <Right>
          <motion.h3
            variants={paragraphAnimation}
            initial="hidden"
            animate="visible"
          >
            At Wonder Works Studio, we are ushering in the new era of immersive
            gaming, where players can express, explore, and expand their
            creativity.
          </motion.h3>
        </Right>
      </HeaderFlex>
      <StatsWrapper>
        <Columns>
          <Column ref={countUpRef}>
            <motion.h5
              variants={circleAnimation}
              animate={countUpInView ? "inView" : "notInView"}
            >
              Roblox
            </motion.h5>
            <Circle
              variants={circleAnimation}
              animate={countUpInView ? "inView" : "notInView"}
            >
              {countUpInView && (
                <h6>
                  <CountUp
                    start={0}
                    end={150}
                    duration={1}
                    delay={1}
                    suffix="M"
                  />
                </h6>
              )}
              <p>MAU</p>
            </Circle>
          </Column>
          <Column ref={countUpRef2}>
            <motion.h5
              variants={circleAnimation}
              animate={countUpInView2 ? "inView" : "notInView"}
            >
              Overlook Bay
            </motion.h5>
            <Circle
              variants={circleAnimation}
              animate={countUpInView2 ? "inView" : "notInView"}
            >
              {countUpInView2 && (
                <h6>
                  <CountUp
                    start={0}
                    end={5}
                    delay={1.15}
                    decimals={0}
                    duration={1}
                    suffix="M"
                  />
                </h6>
              )}
              <p>MAU</p>
            </Circle>
            <Desc
              variants={circleText}
              animate={countUpInView2 ? "visible" : "hidden"}
            >
              <p>4% of Roblox DAU</p>
              <p>
                2.2M+ Total Playing hrs/mo <br />
                MAU 2.74M <br />
                DAU/MAU Ratio 7.79%
              </p>
            </Desc>
          </Column>
          <Column ref={countUpRef3}>
            <motion.h5
              variants={circleAnimation}
              animate={countUpInView3 ? "inView" : "notInView"}
            >
              Timmeh
            </motion.h5>
            <Circle
              variants={circleAnimation}
              animate={countUpInView3 ? "inView" : "notInView"}
            >
              {countUpInView2 && (
                <h6>
                  <CountUp
                    start={0}
                    end={500}
                    delay={1.15}
                    decimals={0}
                    duration={1}
                    suffix="K"
                  />
                </h6>
              )}
              <p>MAU</p>
            </Circle>
            <Desc
              variants={circleText}
              animate={countUpInView3 ? "visible" : "hidden"}
            >
              <p>0.0% of Roblox DAU</p>
              <p>
                0.0M+ Total Playing hrs/mo <br />
                MAU 0.0M <br />
                DAU/MAU Ratio 0.00%
              </p>
            </Desc>
          </Column>
        </Columns>
      </StatsWrapper>
      <ConnectWithUs ref={paragraphRef}>
        <motion.h3
          variants={paragraphAnimation2}
          intial="hidden"
          animate={paragraphInView ? "visible" : "hidden"}
        >
          We build video games that spark imagination, encourage collaboration,
          and push innovation so gamers grow alongside the stories they create.
        </motion.h3>
        <DiscoverMore whileTap={{ scale: 0.9 }}>
          <a
            href="mailto: partnerships@wonderworks.gg"
            target="_blank"
            rel="noreferrer"
          >
            Request a pitchdeck <Arrow />
          </a>
        </DiscoverMore>
        <IconWrapper>
          <h5>Connect with us</h5>
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
        </IconWrapper>
      </ConnectWithUs>
      <PressCarousel
        logos={
          <LogoWrapper>
            <p>As Seen On...</p>
            <PressCarouselLogos />
          </LogoWrapper>
        }
      />
      <WonderWorkersWrapper>
        <WonderWorkers />
      </WonderWorkersWrapper>

      <EventsWrapper>
        <FutureEvents>
          <h2>
            Future <br /> Events
          </h2>
          <h4>Coming Soon...</h4>
        </FutureEvents>
        <PastEvents>
          <h2>
            Past <br />
            Events
          </h2>
          <AnimateSharedLayout>
            <EventsList layout>
              {/* we use .slice() to only render the declared number of events at once */}
              {/* otherwise, .map() would load all posts on the DOM at once */}
              {PastEventsData.slice(0, visiblePosts).map((event, index) => {
                return (
                  <Event
                    key={index}
                    variants={eventAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                  >
                    <EventImage />
                    <EventText>
                      <p>{event.date}</p>
                      <h4>{event.name}</h4>
                      <p>{event.desc}</p>
                    </EventText>
                  </Event>
                )
              })}

              {visiblePosts === PastEventsData.length ? (
                // if user hits end of PastEventsData array, button closes posts
                <EventsButton layout onClick={handleClosePosts}>
                  View less events
                </EventsButton>
              ) : (
                // Button to open more posts
                <EventsButton layout onClick={handleLoadNewPosts}>
                  More past events <Arrow />
                </EventsButton>
              )}
            </EventsList>
          </AnimateSharedLayout>
        </PastEvents>
        <PastEventsMobile>
          <h2>
            Past <br /> Events
          </h2>
          <EventsCarouselMobile PastEventsData={PastEventsData} />
        </PastEventsMobile>
      </EventsWrapper>
      <ContactUsWrapper>
        <LightBlueStarFillWrapper
          animate={{
            rotate: 360,
            transition: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Svg.LightBlueStarFill />
        </LightBlueStarFillWrapper>
        <LightBlueStarStrokeWrapper
          animate={{
            rotate: -360,
            transition: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Svg.LightBlueStarStroke />
        </LightBlueStarStrokeWrapper>
        <ContactUs />
      </ContactUsWrapper>
    </Layout>
  )
}

export default Investors

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Header = styled.header`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  text-transform: uppercase;
  padding-top: 12.5rem;

  @media (max-width: ${breakpoints.xxl}px) {
    padding-top: 10rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-top: 6rem;
    p {
      font-size: 16px;
    }
  }
`

const HeaderFlex = styled.div`
  padding-top: 5rem;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-top: 4rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
    padding-top: 2.5rem;
  }
`

const Mask = styled.div`
  overflow: hidden;
  /* padding-top: .5rem; */
`
const Span = styled(motion.span)`
  display: inline-block;
  position: relative;
`

const Left = styled.div`
  align-self: flex-start;
  h1 {
    font-family: "ppwoodland-light";
    div:nth-of-type(1) {
      font-size: 50px;
      line-height: 60px;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    h1 {
      div:nth-of-type(1) {
        font-size: 45px;
        line-height: 55px;
      }
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1 {
      div:nth-of-type(1) {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 38px;
      line-height: 42px;
    }
  }
`

const Right = styled.div`
  align-self: flex-end;
  margin-top: 23%;
  margin-left: 17%;
  h3 {
    font-family: "calibre-regular";
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin-left: 15%;
  }
  @media (max-width: ${breakpoints.s}px) {
    align-self: flex-start;
    width: 80%;
    margin-left: 0%;
    margin-top: 15%;
  }
`

const StatsWrapper = styled.div`
  width: 50%;
  padding-top: 15rem;
  margin: 0 auto;

  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    padding-top: 12.5rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-top: 5rem;
  }
`

const Columns = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;

  div:nth-child(2) {
    span {
      background-color: var(--color-green);
    }
  }

  div:nth-child(3) {
    span {
      background-color: var(--color-lightpink);
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    /* justify-content: space-between;
    width: 85vw; */
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
    align-items: center;
  }
`

const Column = styled(motion.div)`
  flex-basis: 33%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;

  h5 {
    text-transform: uppercase;
    font-family: "calibre-medium";
    padding-bottom: 2rem;
  }
  p {
    color: var(--color-purple);
    font-family: "calibre-medium";
    white-space: nowrap;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 0rem;
    padding-bottom: 5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-basis: 100%;
    width: 100%;
    padding-bottom: 5rem;
    p {
      white-space: normal;
    }
    h5 {
      padding-bottom: 1rem;
      font-size: 20px;
      margin: 0 auto;
    }
  }
`

const Circle = styled(motion.span)`
  border-radius: 50%;
  background-color: var(--color-lightblue);
  aspect-ratio: 1/1;
  height: 255px;
  width: 255px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h6 {
    line-height: 84px;
    font-size: 84px;
    font-family: "calibre-medium";
  }
  p {
    color: var(--color-black);
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 225px;
    height: 225px;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 200px;
    height: 200px;
    h6 {
      line-height: 60px;
      font-size: 60px;
      font-family: "calibre-medium";
    }
  }
  @media (max-width: 800px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    height: 150px;
    h6 {
      font-size: 50px;
    }
  }
`

const Desc = styled(motion.div)`
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  p:nth-of-type(1) {
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid black;
  }

  @media (max-width: 800px) {
    padding-top: 1.5rem;

    p:nth-of-type(1) {
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 0 auto;
    width: 90%;
    p {
      text-align: center;
      font-size: 16px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    margin: 0 0.5rem;
    p {
      width: 40%;
      margin: 0 auto;
    }
  }
  @media (max-width: 420px) {
    p {
      width: 55%;
    }
  }
`

const ConnectWithUs = styled.section`
  padding: 10rem 0;
  margin: 0 auto;
  width: 55%;

  h3 {
    font-family: "calibre-regular";
    padding-bottom: 10rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 65%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 70%;
    h3 {
      padding-bottom: 7rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 4rem 0;
    width: 80%;
    h3 {
      padding-bottom: 4rem;
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const DiscoverMore = styled(motion.div)`
  margin: 0 auto;
  border: 2px solid var(--color-black);
  border-radius: 50px;
  cursor: pointer;
  background-color: var(--color-white);
  transition: var(--hover-transition);
  /* width: 350px; */
  width: 380px;
  a {
    transition: var(--hover-transition);
    padding: 0.75rem 2.75rem;
    padding-bottom: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: var(--color-black);
    font-family: "calibre-medium";
    font-size: 25px;
    line-height: 35px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }
  &:hover {
    background-color: var(--color-black);
    a {
      color: var(--color-white);
    }
    svg {
      fill: var(--color-white);
      transform: translatex(0.3rem);
    }
  }
  svg {
    margin-left: 10px;
    fill: var(--color-black);
    transition: var(--hover-transition);
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 350px;
    a {
      padding: 0.6rem 0.1rem;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 300px;
    a {
      padding: 0.6rem 0.1rem;
      font-size: 20px;
      line-height: 100%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    border: 1px solid var(--color-black);
    width: 225px;
    a {
      padding: 0.5rem 0.1rem;
      font-size: 16px;
      line-height: 19px;
      svg {
        scale: 0.7;
        margin-left: 5px;
      }
    }
  }
`
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  h5 {
    padding-top: 10rem;
    padding-bottom: 4rem;
    text-align: center;
    font-family: "calibre-regular";
  }
  @media (max-width: ${breakpoints.l}px) {
    h5 {
      padding-top: 7rem;
      padding-bottom: 3rem;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    h5 {
      padding-top: 4rem;
      padding-bottom: 1.5rem;
      font-family: "calibre-medium";
      font-size: 16px;
    }
  }
`

const Icons = styled.div`
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    &:hover {
      fill: #b16eac;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 65%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 85%;
    svg {
      height: 25px;
    }
  }
`

const WonderWorkersWrapper = styled.section`
  background-color: var(--color-darkblue);
  padding: 5rem 0;
`

const LogoWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 4rem;

  p {
    align-self: center;
    padding-right: 2rem;
    font-size: 20px;
    line-height: 20px;
    font-family: "calibre-regular";
    color: black;
  }

  @media (max-width: ${breakpoints.xl}px) {
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;

    p {
      align-self: flex-start;
      font-size: 35px;
      line-height: 42px;
      padding-bottom: 2rem;
      font-family: "calibre-medium";
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    max-width: 80%;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    p {
      align-self: center;
      text-align: center;
      padding-right: 0;
      padding-bottom: 1rem;
      font-size: 16px;
      line-height: 20px;
      font-family: "calibre-medium";
    }
  }
`

const EventsWrapper = styled.section`
  display: flex;
  width: 80%;
  margin: 10rem auto;
  margin-bottom: 10rem;
  h2 {
    padding-bottom: 5rem;
  }
  br {
    display: none;
  }
  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 93%;
    right: 0;
    margin-left: 7%;
    margin-bottom: 4rem;
    h2 {
      padding-bottom: 2rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    br {
      display: block;
    }
  }
`

const FutureEvents = styled.div`
  width: 50%;
  h4 {
    font-family: "calibre-medium";
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
  }
`

const PastEvents = styled.div`
  width: 50%;
  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    h2 {
      margin-top: 5rem;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 5rem;
    display: none;
  }
`

const PastEventsMobile = styled.div`
  display: none;
  width: 100%;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    overflow: hidden;
    h2 {
      margin-top: 5rem;
      padding-bottom: 0;
    }
  }
`

const EventsList = styled(motion.div)``

const Event = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;

  p:first-child {
    font-size: 20px;
  }

  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
  }
`

const EventImage = styled.div`
  width: 240px;
  height: 240px;
  min-width: 240px;
  min-height: 240px;
  border-radius: 10px;
  margin-right: 4rem;
  background-color: var(--color-green);
  border: 2px solid var(--color-black);
  box-shadow: 6px 6px 0px #1a1748;

  @media (max-width: ${breakpoints.l}px) {
    width: 180px;
    height: 180px;
    min-width: none;
    min-height: none;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`
const EventText = styled.div``

const EventsButton = styled(motion.button)`
  cursor: pointer;
  width: 370px;
  border-radius: 50px;
  border: 2px solid var(--color-black);
  background-color: var(--color-white);
  color: var(--color-black);
  font-family: "calibre-medium";
  font-size: 25px;
  line-height: 100%;
  margin-top: 3rem;
  padding: 0.75rem 2.75rem;
  padding-bottom: 0.9rem;
  text-align: center;
  text-transform: uppercase;
  transition: var(--hover-transition);
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
    svg {
      fill: var(--color-white);
    }
  }
  svg {
    margin-left: 0.25rem;
    fill: var(--color-black);
    transition: var(--hover-transition);
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding: 0.5rem 0.5rem;
    width: 320px;
    svg {
      scale: 0.8;
      margin-left: 0.35rem;
    }
  }
`

const ContactUsWrapper = styled.div`
  position: relative;
`

const LightBlueStarStrokeWrapper = styled(motion.div)`
  display: none;
  @media (max-width: ${breakpoints.xl}px) {
    position: absolute;
    z-index: 1;
    display: block;
    right: 20%;
    top: 18%;
    svg {
      width: 270px;
      height: 270px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    right: 20%;
    top: 21%;
    svg {
      width: 220px;
      height: 220px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    right: 10%;
    top: 18%;
    svg {
      width: 175px;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    top: 26%;
    right: 10%;
    svg {
      width: 140px;
      height: auto;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 25%;
    right: 10%;
    svg {
      width: 130px;
      height: auto;
    }
  }
`
const LightBlueStarFillWrapper = styled(motion.div)`
  display: none;

  @media (max-width: ${breakpoints.xl}px) {
    display: block;
    position: absolute;
    z-index: 1;
    right: 30%;
    top: 30%;
    svg {
      width: 200px;
      height: 200px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    top: 35%;
    svg {
      width: 150px;
      height: 150px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 30%;
    right: 22%;
    svg {
      width: 125px;
      height: 125px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 36%;
    right: 29%;
    svg {
      width: 85px;
      height: 85px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    top: 32%;
    right: 30%;
    svg {
      width: 80px;
      height: 80px;
    }
  }
`
