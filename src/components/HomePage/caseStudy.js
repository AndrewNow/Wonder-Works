import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../breakpoints"

const CaseStudy = () => {
  return (
    <Wrapper>
      <Inner>
        <h1>Case Study</h1>
        <Content>
          <Image>
            <StaticImage
              src="../../images/Home/caseStudy/traitor.png"
              alt="Thumbnail for Traitor, one of Wonder Works' most popular games."
              quality={100}
            />
          </Image>
          <Text>
            <h4>1.0 Traitor</h4>
            <h5>
              Our team built Traitor in 3 weeks, a successful test of our
              ability to quickly enter a new genre and take share with
              higher-quality production. Like many of our experiences, Traitor
              leveraged our influencer expertise to drive new player growth. We
              build virality into all of our content and our Traitor influencer
              tournaments generated 4M+ views on YouTube and 18M+ visits to the
              game.
            </h5>
          </Text>
        </Content>
      </Inner>
    </Wrapper>
  )
}

export default CaseStudy

const Wrapper = styled.section`
  background-color: var(--color-green);
`

const Inner = styled.div`
  padding: 10rem 0;
  width: 90%;
  max-width: 1850px;
  margin: 0 auto;

  h1 {
    font-family: "ppwoodland-bold";
    color: black;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    padding: 7rem 0;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Image = styled.div`
  position: relative;
  height: auto;
  border-radius: 13px;
  border: 1px solid var(--color-black);
  z-index: 5;
  background-color: var(--color-black);
  box-shadow: 12px 12px 0px #eb2c90;
  
  @media (max-width: ${breakpoints.s}px) {
    box-shadow: 5px 5px 0px #eb2c90;
  }
`

const Text = styled.div`
  width: 50%;
  margin-left: 4rem;

  h4,
  h5 {
    color: black;
  }
  h4 {
    font-family: "balgin-bold";
    margin-bottom: 1rem;
  }
  h5 {
    font-family: "calibre-medium";
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    margin-left: 0;
    margin-top: 3rem;
  }
`
