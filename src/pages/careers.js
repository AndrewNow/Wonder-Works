import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
import WonderWorkers from "../components/OurWonderWorkers/wonderworkers"
import { BigPlus, TwoPlus, PlusButton } from "../svg/careerspage"
import { motion } from "framer-motion"

const Careers = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Careers`

  // When career plus icon is clicked, expand the career form
  const [expand, setExpand] = useState(false)
  // Then, update the state of the selected career to match the index of the clicked item
  const [selectedCareer, setSelectedCareer] = useState()

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

  return (
    <Layout title={siteTitle}>
      <Seo title="Careers" />
      <LandingSection>
        <Flex>
          <Left>
            <h1>
              let’s grow
              <br /> together.
            </h1>
            <p>
              At Wonder Works Studio we believe in big dreams and bigger ideas.{" "}
              <br />
              We’re problem solvers, creative leaders, and gaming aficionados.{" "}
              <br /> <br />
              We play first, work second, and always have our eyes set on the
              next big horizon. If you find inspiration in imagination — we want
              to work with you.
            </p>
          </Left>
          <Right>
            <h6>
              wonder <br /> waits
            </h6>
          </Right>
        </Flex>
        <SVGWrapper>
          <BigPlusWrapper>
            <BigPlus />
          </BigPlusWrapper>
          <TwoPlusWrapper>
            <TwoPlus />
          </TwoPlusWrapper>
        </SVGWrapper>
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
                  stroke="black"
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
            {CareerData.map((career, index) => {
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
              console.log(expand, selectedCareer)
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
            })}
          </CareerRight>
        </CareerWrapper>
      </CareerSection>
      {expand && (
        <FormBg ref={formRef}>
          <FormContent>
            <h3>
              To build games for everyone, we need ideas and magic from
              everywhere. We are made up of an incredibly talented team of
              individuals from all backgrounds with dynamic life experiences.
              None of us took the same path to get here but we prioritize
              progression, growth and strongly believe in the value of
              cultivating a diverse team.
            </h3>
            <h1>{CareerData[`${selectedCareer}`].title}</h1>
          </FormContent>
        </FormBg>
      )}
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

const LandingSection = styled.section`
  background-color: var(--color-darkblue);
  position: relative;
`

const Flex = styled.div`
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
  /* border: 1px solid yellow; */

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

const SVGWrapper = styled.div`
  position: absolute;
  float: center;
  top: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const BigPlusWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 16%;
  left: 4.5%;
`

const TwoPlusWrapper = styled.div`
  position: absolute;
  z-index: 0;
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
    color: black;
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
