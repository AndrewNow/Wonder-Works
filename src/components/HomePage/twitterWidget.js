import React from "react"
import styled from "styled-components"
import { Timeline } from "react-twitter-widgets"
import breakpoints from "../breakpoints"

const TwitterWidget = () => {
  return (
    <Wrapper>
      <Inner>
        <h2>What we're up to</h2>
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "WonderWorksRB",
          }}
          options={{
            height: "530",
            width: "500",
          }}
        />
      </Inner>
    </Wrapper>
  )
}

export default TwitterWidget

const Wrapper = styled.section`
  width: 100%;
  /* height: 100vh; */
  position: relative;
  background: var(--color-pink);
`

const Inner = styled.div`
  padding: 7.5rem 0;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-family: "balgin-medium";
    color: white;
    margin-bottom: 5rem;
    font-size: 5.2vw;
    line-height: 120%;

    text-align: center;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    h2 {
      font-size: 70px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      font-size: 65px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 50px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2 {
      font-size: 42px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 3.5rem 0;
    max-width: 90%;
    h2 {
      margin-bottom: 3rem;
      font-size: 50px;
    }
  }
`
