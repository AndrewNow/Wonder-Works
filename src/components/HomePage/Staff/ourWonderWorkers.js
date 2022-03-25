import React from "react"
import styled from "styled-components"
import ExecutiveStaff from "./mapExecutiveStaff"

const OurWonderWorkers = () => {
  return (
    <Wrapper>
      <h1>Our Wonder Workers</h1>
      <ExecutiveStaff />
    </Wrapper>
  )
}

export default OurWonderWorkers

const Wrapper = styled.section`
  background: var(--color-orange);
  padding: 10rem 0;

  h1 {
    font-family: "balgin-medium";
    text-align: center;
    text-transform: uppercase;
    margin: 0 auto;
  }
`
