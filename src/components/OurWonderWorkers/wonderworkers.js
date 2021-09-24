import React from "react"
import styled from "styled-components"
import { WonderWorkersData } from "./wonderworkersData"
import breakpoints from "../breakpoints"

const WonderWorkers = () => {
  return (
    <>
      <Title>
        <h2>Our Wonder Workers</h2>
      </Title>
      <Wrapper>
        <WonderWorkersData />
      </Wrapper>
    </>
  )
}

export default WonderWorkers

const Title = styled.div`
  width: 90%;
  margin: 0 auto;
  text-transform: uppercase;
  text-align: center;
  h2 {
    color: var(--color-white);
  }

  @media (max-width: ${breakpoints.s}px) {
    h2 {
      font-size: 45px;
      line-height: 50px;
    }
  }
`

const Wrapper = styled.div`
  padding-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 90%;

  div:nth-of-type(2) {
    transform: translate3d(0, 3rem, 0);
    z-index: 10;
  }
  div:nth-of-type(3) {
    transform: translate3d(0, 3rem, 0);
    z-index: 11;
  }
  div:nth-of-type(6) {
    transform: translate3d(0, 3rem, 0);
    z-index: 10;
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 5rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 7rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: center;

    div:nth-of-type(2) {
      transform: none;
      z-index: 10;
      transform: translate3d(0, 6rem, 0);
    }
    div:nth-of-type(3) {
      transform: none;
      z-index: 11;
    }
    div:nth-of-type(4) {
      transform: none;
      z-index: 10;
      transform: translate3d(0, 6rem, 0);
    }
    div:nth-of-type(5) {
      transform: none;
      z-index: 10;
    }
    div:nth-of-type(6) {
      transform: translate3d(0, 6rem, 0);
      z-index: 10;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-top: 5rem;
  }
`
