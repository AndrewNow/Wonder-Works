import React, { useCallback, useEffect, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ProjectsPageCarousel from "../components/EmblaCarousel/projectsPageCarousel"
import { StaticImage } from "gatsby-plugin-image"
import * as SVG from "../svg/projectspage"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import ReactPlayer from "react-player/file"

const Projects = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Projects`

  // ---------- determine if a blue background section is in view ----------
  // ---------- if in view, update navigation menu text color to white ----------
  const blueSectionRef = useRef()
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleLightTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "light" })
  }, [dispatch])

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    const onScroll = () => {
      const blueBackgroundDiv = blueSectionRef.current.getBoundingClientRect()
      if (blueBackgroundDiv.y <= 150 && blueBackgroundDiv.bottom >= 150) {
        toggleLightTheme()
      } else {
        toggleBlueTheme()
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [toggleLightTheme, toggleBlueTheme])

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme])

  // ----------------- intersection observer logic -----------------

  const ref = useRef()
  const [shopRef, shopInView] = useInView({
    root: null,
    threshold: 0.65,
    triggerOnce: false,
  })

  const setRefs = useCallback(
    //assign multiple refs with useInView
    node => {
      ref.current = node
      shopRef(node)
    },
    [shopRef]
  )

  return (
    <Layout title={siteTitle}>
      <Seo title="Projects" />
      <CarouselWrapper ref={blueSectionRef}>
        <ProjectsPageCarousel />
      </CarouselWrapper>
      <OverlookBay>
        <OverlookBayTitle>
          <h1>
            Overlook <br /> Bay
          </h1>
        </OverlookBayTitle>
        <OverlookBayBody>
          <p>
            Are you ready to jump into Overlook Bay with your friends? Home to
            many land and sea creatures, explore the island with your friends in
            this Massively multiplayer online role-playing game. Collect pets,
            rent out your own cottage, and participate daily activities!
          </p>
          <OverlookRobloxLink
            href=""
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.9 }}
          >
            Play now on Roblox
          </OverlookRobloxLink>
        </OverlookBayBody>
        <LighthouseImageWrapper>
          <StaticImage
            src="../images/Projects/lighthouse.png"
            alt="Image of one of Overlook Bay's characters"
            placeholder="none"
            quality={100}
          />
        </LighthouseImageWrapper>
        <MothImageWrapper>
          <StaticImage
            src="../images/Projects/moth.png"
            alt="Image of one of Overlook Bay's characters"
            placeholder="none"
            quality={100}
          />
        </MothImageWrapper>
        <MermaidImageWrapper>
          <StaticImage
            src="../images/Projects/mermaid.png"
            alt="Image of one of Overlook Bay's characters"
            placeholder="none"
            quality={100}
          />
        </MermaidImageWrapper>
        <TextLogoWrapper>
          <StaticImage
            src="../images/Projects/OverlookBayText.png"
            alt="Overlook Bay's text logo, with playful balloon-style typography."
            placeholder="none"
            quality={100}
          />
        </TextLogoWrapper>
        <SVGWrapper>
          <BigCirclesWrapper>
            <SVG.OverlookBayBigCircles />
          </BigCirclesWrapper>
          <SmallCirclesWrapper>
            <SVG.OverlookBaySmallCircles />
          </SmallCirclesWrapper>
        </SVGWrapper>
      </OverlookBay>
      <Timmeh>
        <TimmehTitle>
          <h1>Timmeh</h1>
        </TimmehTitle>
        <TimmehBody>
          <p>
            Are you ready to jump into Overlook Bay with your friends? Home to
            many land and sea creatures, explore the island with your friends in
            this Massively multiplayer online role-playing game. Collect pets,
            rent out your own cottage, and participate daily activities!
          </p>
          <TimmehRobloxLink
            href=""
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.9 }}
          >
            Play now on Roblox
          </TimmehRobloxLink>
        </TimmehBody>
        <TextLogoWrapper>
          <StaticImage
            src="../images/Projects/TimmehText.png"
            alt="Timmeh's text logo, with horror-style typography."
            placeholder="none"
            quality={100}
          />
        </TextLogoWrapper>
        <TimmehTopWrapper>
          <StaticImage
            src="../images/Projects/timmehTop.png"
            alt="Roblox characters laid on the page"
            placeholder="none"
            quality={100}
          />
        </TimmehTopWrapper>
        <TimmehMiddleWrapper>
          <StaticImage
            src="../images/Projects/timmehMiddle.png"
            alt="Roblox characters laid on the page"
            placeholder="none"
            quality={100}
          />
        </TimmehMiddleWrapper>
        <TimmehBottomWrapper>
          <StaticImage
            src="../images/Projects/timmehBottom.png"
            alt="Roblox characters laid on the page"
            placeholder="none"
            quality={100}
          />
        </TimmehBottomWrapper>
        <SVGWrapper>
          <BigGearsWrapper>
            <SVG.TimmehBigGears />
          </BigGearsWrapper>
          <SmallGearsWrapper>
            <SVG.TimmehSmallGears />
          </SmallGearsWrapper>
        </SVGWrapper>
      </Timmeh>
      <Traitor>
        <TraitorTitle>
          <h1>Traitor</h1>
        </TraitorTitle>
        <TraitorBody>
          <p>
            Test out your intuition in this game of social deduction. Can you
            figure who the traitor is among your friends?
          </p>
          <TraitorRobloxLink
            href=""
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.9 }}
          >
            Play now on Roblox
          </TraitorRobloxLink>
        </TraitorBody>
        <SVGWrapper>
          <TriangleWrapper />
          <TraitorStarsWrapper>
            <SVG.TraitorStars />
          </TraitorStarsWrapper>
        </SVGWrapper>
        <TraitorLeftImageWrapper>
          <StaticImage
            src="../images/Projects/traitorleft.png"
            alt="Image of a Roblox character with a knife sneaking up on another character, who is preoccupied with an electrical task"
            placeholder="none"
            quality={100}
          />
        </TraitorLeftImageWrapper>
        <TraitorMiddleImageWrapper>
          <StaticImage
            src="../images/Projects/traitormiddle.png"
            alt="Character with a gun pointed at them"
            placeholder="none"
            quality={100}
          />
        </TraitorMiddleImageWrapper>
        <TraitorRightImageWrapper>
          <StaticImage
            src="../images/Projects/traitorright.png"
            alt="Image of a Roblox character, back facing the viewer, with a gun pointed at another character."
            placeholder="none"
            quality={100}
          />
        </TraitorRightImageWrapper>
        <TextLogoWrapper>
          <StaticImage
            src="../images/Projects/traitorTextLogo.png"
            alt="Traitor logo in a metallic styled font."
            placeholder="none"
            quality={100}
          />
        </TextLogoWrapper>
      </Traitor>

      <ShopSection ref={shopRef}>
        <ShopFlex>
          <ShopText>
            <ShopBubble>
              <h1>SHOP</h1>
              <p>
                It’s never a dull moment at the{" "}
                <a
                  href="https://www.staypeachy.shop/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Peachy Shop
                </a>
                . Be a part of the Stay Peachy community with custom merch from
                Megan and Overlook Bay, more to come!{" "}
              </p>
            </ShopBubble>
            <PinkStarWrapper
              animate={{
                rotate: -360,
                transition: {
                  duration: 90,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <SVG.PinkStar />
            </PinkStarWrapper>
          </ShopText>
          <ShopVideo>
            <VideoWrapper>
              <ReactPlayer
                url="https://touchdesigner.s3.ca-central-1.amazonaws.com/timelapse.mp4"
                width="100%"
                height="100%"
                playing={shopInView}
                // light={true}
                loop={true}
                muted={true}
              />
            </VideoWrapper>
            <OrangeStarWrapper
              animate={{
                rotate: 360,
                transition: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <SVG.OrangeStar />
            </OrangeStarWrapper>
          </ShopVideo>
        </ShopFlex>
        <StayPeachyLink>
          <SVG.LinkStar />
          <UnderlinedLink
            href="https://www.staypeachy.shop/"
            target="_blank"
            rel="noreferrer"
          >
            www.staypeachy.shop
          </UnderlinedLink>
        </StayPeachyLink>
      </ShopSection>
      <CollabSection>
        <Collabs>
          <h2>Collabs</h2>
          <Tiles>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
          </Tiles>
        </Collabs>
        <Collabs>
          <h2>Partnerships</h2>
          <Tiles>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
          </Tiles>
        </Collabs>
      </CollabSection>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const CarouselWrapper = styled.section`
  background-color: var(--color-black);
`

const OverlookBay = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-lightblue);
  padding-bottom: 10rem;
  height: 110vh;
`

const OverlookBayTitle = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 5rem;
  position: relative;
  z-index: 2;
  h1 {
    font-family: "calibre-semibold";
    font-size: 10.93vw;
    line-height: 8.85vw;
    text-transform: uppercase;
    text-align: right;
    color: var(--color-white);
  }
`

// ----------------------- Overlook Bay -----------------------

const OverlookBayBody = styled.div`
  width: 32.5%;
  padding-left: 3rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  p {
    color: var(--color-white);
    padding-bottom: 5rem;
  }
`

const OverlookRobloxLink = styled(motion.a)`
  border: 2px solid var(--color-white);
  width: 50%;
  color: var(--color-white);
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 30px;
  &:hover {
    background-color: var(--color-white);
    color: var(--color-lightblue);
  }
`

const SVGWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const SmallCirclesWrapper = styled.div`
  position: absolute;
  top: 10%;
  right: 0;
`
const BigCirclesWrapper = styled.div`
  position: absolute;
  top: 12.5%;
  left: -2.5%;
`

const LighthouseImageWrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
`
const MothImageWrapper = styled.div`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 13%;
`
const MermaidImageWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 37%;
  right: 3%;
`
const TextLogoWrapper = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 5%;
  right: 3%;
`

// ----------------------- Timmeh -----------------------
const Timmeh = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-darkblue);
  padding-bottom: 10rem;
  height: 110vh;
`

const TimmehTitle = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  padding-bottom: 5rem;
  padding-top: 15%;
  position: relative;
  z-index: 2;
  h1 {
    font-family: "calibre-semibold";
    font-size: 10.93vw;
    line-height: 8.85vw;
    text-transform: uppercase;
    text-align: left;
    color: var(--color-white);
  }
`
const TimmehBody = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  position: relative;
  z-index: 2;
  p {
    width: 35%;
    color: var(--color-white);
    padding-bottom: 5rem;
  }
`

const TimmehRobloxLink = styled(motion.a)`
  border: 2px solid var(--color-white);
  width: 50%;
  color: var(--color-white);
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 30px;
  &:hover {
    background-color: var(--color-white);
    color: var(--color-darkblue);
  }
`
const TimmehTopWrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 5%;
  right: 15%;
`
const TimmehMiddleWrapper = styled.div`
  position: absolute;
  z-index: 4;
  top: 10%;
  right: 0;
`

const TimmehBottomWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 28%;
  right: 10%;
`

const BigGearsWrapper = styled.div`
  position: absolute;
  top: 30%;
  left: -10%;
`
const SmallGearsWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
`

// ----------------------- Traitor -----------------------
const Traitor = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--color-black);
  padding-bottom: 10rem;
  height: 110vh;
`

const TraitorTitle = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  padding-bottom: 5rem;
  padding-top: 5%;
  position: relative;
  z-index: 2;
  h1 {
    font-family: "calibre-semibold";
    font-size: 10.93vw;
    line-height: 8.85vw;
    text-transform: uppercase;
    text-align: left;
    color: var(--color-white);
  }
`
const TraitorBody = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-left: 5rem;
  position: relative;
  z-index: 5;
  p {
    width: 35%;
    color: var(--color-white);
    padding-bottom: 5rem;
  }
`

const TraitorRobloxLink = styled(motion.a)`
  border: 2px solid var(--color-white);
  color: var(--color-white);
  width: 50%;
  border-radius: 50px;
  padding: 0.75rem 2.75rem;
  transition: var(--hover-transition);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 25px;
  line-height: 30px;
  &:hover {
    background-color: var(--color-white);
    color: var(--color-black);
  }
`

const TriangleWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 0;
  background-color: var(--color-purple);
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
`

const TraitorStarsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 50%;
`

const TraitorLeftImageWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: -25%;
`
const TraitorMiddleImageWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 35%;
  bottom: 20%;
`
const TraitorRightImageWrapper = styled.div`
  position: absolute;
  z-index: 3;
  bottom: -5%;
  right: 0;
`

const ShopSection = styled.div`
  padding-top: 15rem;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 15rem;
  position: relative;
`

const ShopFlex = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShopText = styled.div`
  position: relative;
`

const ShopBubble = styled.div`
  position: relative;
  z-index: 5;
  transform: translateX(12%);
  background-color: var(--color-white);
  border: 2px solid var(--color-black);
  border-radius: 100%;
  width: 460px;
  height: 460px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem;
`

const PinkStarWrapper = styled(motion.div)`
  position: absolute;
  top: -7%;
  left: -8%;
`

const OrangeStarWrapper = styled(motion.div)`
  position: absolute;
  bottom: -5%;
  left: -5%;
`

const ShopVideo = styled.div`
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  /* aspect-ratio: 16/9; */
  height: 475px;
`

const VideoWrapper = styled.div`
  border: 2px solid var(--color-black);
  filter: drop-shadow(12px 12px 0px #e795bf);
  /* width: 900px; */
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 10px;
`

const StayPeachyLink = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  padding-top: 2rem;

  svg {
    margin-right: 1rem;
    min-width: 16px;
    min-height: 16px;
  }
`

const UnderlinedLink = styled.a`
  text-decoration: none;
  font-family: "calibre-regular";
  font-size: 25px;
  text-decoration: none;
  position: relative;
  width: 80%;
  right: 0;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: var(--color-black);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const CollabSection = styled.section`
  background-color: var(--color-green);
  padding: 5rem 0;

  h2 {
    font-family: "ppwoodland-light";
    text-transform: uppercase;
    text-align: center;
  }
`
const Collabs = styled.div`
  padding: 10rem 0;
`
const Tiles = styled.div`
  padding-top: 10rem;
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`
const Tile = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid var(--color-black);
  border-radius: 10px;
  box-shadow: 6px 6px 0px #1a1748;
`

