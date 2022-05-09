import React from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"

const ProjectRoadmap = () => {
  return (
    <Wrapper>
      <Inner>
        <h1>Project Roadmap</h1>
        <Flex>
          <Graph></Graph>
          <Text>
            <h4>Structured development</h4>
            <p>
              We use agile scrum methodology to ensure our teams focus on only
              priority goals to build the best experiences faster. <br />
              <br /> Our producers design detailed sprints and roadmaps to help
              our teams to stay on track across months of content, allowing us
              to tackle multiple projects without overwhelming team members.
            </p>
          </Text>
        </Flex>
        <Flex>
          <Text>
            <h4>Collaboration-focused</h4>
            <p>
              From the initial creative kick-off meeting to the big release,
              each team member has a respected voice in the game’s creative
              direction and development. <br /> <br />
              We pride ourselves in taking team member feedback seriously and
              letting our teams build what they love. This starts right away
              from the game design documents and initial concepts all the way to
              release builds and live ops.
            </p>
          </Text>
          <Graph></Graph>
        </Flex>
      </Inner>
    </Wrapper>
  )
}

export default ProjectRoadmap

const Wrapper = styled.div`
  background-color: var(--color-lightpurple);
`

const Inner = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10rem 0;

  h1,
  h4,
  p {
    color: white;
  }

  h1 {
    font-family: "ppwoodland-bold";
    text-align: right;
    margin-bottom: 5rem;
  }

  
  @media (max-width: ${breakpoints.l}px) {    
    span:nth-of-type(2) {
      flex-direction: column;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 5rem 0;
  }
`

const Flex = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 5rem;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
  }
`

const Text = styled.div`
  width: 39%;

  h4 {
    font-family: "balgin-bold";
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`
const Graph = styled.div`
  /* max-width: 900px; */
  width: 900px;
  max-width: 100%;
  /* min-width: 30%; */
  height: 500px;
  background: white;
  border-radius: 10px;

  @media (max-width: ${breakpoints.l}px) {
    height: 250px;
  }
`
