import React, { useState } from "react"
import styled from "styled-components"
import WonderWorkersComponent from "./wonderworkersComponent"
import { WonderWorkersData } from "./wonderworkersData"

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
`

const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 90%;
`
