import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import ExecutiveStaff from "./mapExecutiveStaff"

const OurWonderWorkers = () => {
  return (
    <Wrapper>
      <h1>Our Wonder Workers</h1>
      <InnerWrapper>
        <ExecutiveStaff />
      </InnerWrapper>
      <JoinOurTeam>
        <h4>Join our wonderful team working under one roof!</h4>
        <GroupPhoto>
          <StaticImage
            src="../../../images/Home/ww-group.png"
            alt="Group photo in front of the Wonder Works building."
            quality={90}
            objectFit="cover"
            width={1350}
            placeholder="blurred"
          />
        </GroupPhoto>
      </JoinOurTeam>
    </Wrapper>
  )
}

export default OurWonderWorkers

const Wrapper = styled.section`
  background: #ffcd30;
  padding: 10rem 0;

  h1 {
    font-family: "balgin-medium";
    text-align: center;
    text-transform: uppercase;
    margin: 0 auto;
    padding-bottom: 10rem;
  }
`

const InnerWrapper = styled.div`
  width: 98%;
  margin: 0 auto;
`

const JoinOurTeam = styled.div`
  padding: 10rem 0;
  h4 {
    margin: 0 auto;
    text-align: center;
    font-family: "balgin-bold";
  }
`

const GroupPhoto = styled.div`
  border-radius: 30px;
  border: 2px solid var(--color-black);
  display: block;
  margin: 5rem auto;
  overflow: hidden;
  max-width: 69%;
  box-sizing: border-box;
  aspect-ratio: 1350/900;

  display: flex;
  justify-content: center;
  align-items: center;
`
