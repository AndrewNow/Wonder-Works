import React, { useState, useRef, useCallback } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Twitter, Instagram, TikTok, YouTube, Roblox } from "../svg/socialmedia"
import PressCarousel from "../components/EmblaCarousel/pressCarousel"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import ContactUs from "../components/contactUs"
import { AsSeenOn } from "../components/asSeenOn"

const Investors = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Investment Centre`

  // ---------- intersection observer logic, Refs ----------

  const ref = useRef()

  const [countUpRef, countUpInView] = useInView({
    root: null,
    threshold: 0.2,
    triggerOnce: true,
  })

  const [paragraphRef, paragraphInView] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      countUpRef(node)
      paragraphRef(node)
    },
    [countUpRef, paragraphRef]
  )

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
        duration: .85,
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
        delay: .5,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
    },
  }
  const circleAnimation2 = {
    inView: {
      transition: {
        duration: 0.5,
        delay: .65,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
    },
  }
  const circleAnimation3 = {
    inView: {
      transition: {
        duration: 0.5,
        delay: .8,
      },
      scale: 1,
    },
    notInView: {
      scale: 0,
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

  // When user clicks on the load more button, load 2 more posts (see: MORE_POSTS)
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
      <StatsWrapper ref={countUpRef}>
        <Columns>
          <Column>
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
                    end={37}
                    duration={1}
                    delay={1.15}
                    suffix="M"
                  />
                </h6>
              )}
              <p>DAU</p>
            </Circle>
          </Column>
          <Column>
            <motion.h5
              variants={circleAnimation2}
              animate={countUpInView ? "inView" : "notInView"}
            >
              Overlook Bay
            </motion.h5>
            <Circle
              variants={circleAnimation2}
              animate={countUpInView ? "inView" : "notInView"}
            >
              {countUpInView && (
                <h6>
                  <CountUp
                    start={0}
                    end={1.5}
                    delay={1.25}
                    decimals={1}
                    duration={1}
                    suffix="M"
                  />
                </h6>
              )}
              <p>DAU</p>
            </Circle>
            <Desc>4% of Roblox DAU</Desc>
            <p>
              2.2M+ Total Playing hrs/mo <br />
              MAU 2.74M <br />
              DAU/MAU Ratio 7.79%
            </p>
          </Column>
          <Column>
            <motion.h5
              variants={circleAnimation3}
              animate={countUpInView ? "inView" : "notInView"}
            >
              Timmeh
            </motion.h5>
            <Circle
              variants={circleAnimation3}
              animate={countUpInView ? "inView" : "notInView"}
            >
              <h6>0.0M</h6>
              <p>DAU</p>
            </Circle>
            <Desc>0.0% of Roblox DAU</Desc>
            <p>
              0.0M+ Total Playing hrs/mo <br />
              MAU 0.0M <br />
              DAU/MAU Ratio 0.00%
            </p>
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
            href="mailto: info@wonderworks.gg"
            target="_blank"
            rel="noreferrer"
          >
            Request a pitchdeck
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
      <LogoWrapper>
        <p>As Seen On...</p>
        <AsSeenOn />
      </LogoWrapper>
      <PressCarousel />
      <WonderWorkersWrapper>
        <WonderWorkers />
      </WonderWorkersWrapper>

      <EventsWrapper>
        <FutureEvents>
          <h2>Future Events</h2>
          <h4>Coming Soon...</h4>
        </FutureEvents>
        <PastEvents>
          <h2>Past Events</h2>
          <AnimateSharedLayout>
            {/* <AnimatePresence exitBeforeEnter> */}
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
                  More past events
                </EventsButton>
              )}
            </EventsList>
            {/* </AnimatePresence> */}
          </AnimateSharedLayout>
        </PastEvents>
      </EventsWrapper>
      <ContactUs />
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
`

const HeaderFlex = styled.div`
  padding-top: 5rem;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const Left = styled.div`
  align-self: flex-start;
  h1 {
    font-family: "ppwoodland-bold";
    div:nth-of-type(1) {
      font-size: 50px;
      line-height: 60px;
    }
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

const Right = styled.div`
  align-self: flex-end;
  margin-top: 20rem;
  margin-left: 15rem;
  h3 {
    font-family: "calibre-regular";
  }
`

const StatsWrapper = styled.div`
  width: 50%;
  padding-top: 15rem;
  margin: 0 auto;
`

const Columns = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;

  div:nth-child(1) {
    h5 {
      font-family: "calibre-semibold";
    }
  }
  div:nth-child(2) {
    div {
      background-color: var(--color-green);
    }
  }

  div:nth-child(3) {
    div {
      background-color: var(--color-lightpink);
    }
  }
`

const Column = styled(motion.div)`
  flex-basis: 33%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
`

const Circle = styled(motion.div)`
  border-radius: 50%;
  background-color: var(--color-lightblue);
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
`

const Desc = styled.p`
  padding-top: 2.5rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid black;
`

const ConnectWithUs = styled.section`
  padding: 10rem 0;
  margin: 0 auto;
  width: 55%;

  h3 {
    font-family: "calibre-regular";
    padding-bottom: 10rem;
  }
`

const DiscoverMore = styled(motion.div)`
  margin: 0 auto;
  border: 2px solid var(--color-black);
  border-radius: 50px;
  transition: var(--hover-transition);
  cursor: pointer;
  background-color: var(--color-white);
  width: 350px;
  a {
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
    font-family: "calibre-regular-italic";
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
`

const WonderWorkersWrapper = styled.section`
  background-color: var(--color-darkblue);
  padding: 5rem 0;
`

const LogoWrapper = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  transform: translateY(10rem);

  p {
    align-self: flex-end;
    padding-right: 2rem;
    font-size: 20px;
    line-height: 20px;
    font-family: "calibre-regular";
  }
`

const EventsWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 80%;
  margin-top: 10rem;
  h2 {
    padding-bottom: 5rem;
  }
`

const FutureEvents = styled.div`
  width: 50%;
`

const PastEvents = styled.div`
  width: 50%;
`

const EventsList = styled(motion.div)``

const Event = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;

  p:first-child {
    font-size: 20px;
  }
`

const EventImage = styled.div`
  min-width: 240px;
  min-height: 240px;
  border-radius: 10px;
  margin-right: 4rem;
  background-color: var(--color-green);
  border: 2px solid var(--color-black);
  box-shadow: 6px 6px 0px #1a1748;
`
const EventText = styled.div``

const EventsButton = styled(motion.button)`
  cursor: pointer;
  width: 320px;
  border-radius: 50px;
  border: 2px solid var(--color-black);
  background-color: var(--color-white);
  color: var(--color-black);
  font-family: "calibre-medium";
  font-size: 25px;
  line-height: 35px;
  margin-top: 3rem;
  padding: 0.75rem 2.75rem;
  padding-bottom: 0.9rem;
  text-align: center;
  text-transform: uppercase;
  transition: var(--hover-transition);
  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`
