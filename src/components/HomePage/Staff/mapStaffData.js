import React from "react"
import ExecutiveStaff from "./executiveStaff"
import OtherStaff from "./otherStaff"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../../breakpoints"

export const MapExecutiveStaff = () => {
  const staffData = [
    {
      name: "Kevin Perry",
      title: "Chief Operating Officer",
      bio: "Kevin has over 28 years (and counting!) experience in the game industry, from Microsoft through EA and THQ all the way to fresh startups. He’s a specialist in the three things you need to build a great studio: People, Process, and Product. As COO he’s working on adding rigor and infrastructure to the first two while acting as Designated Old Man across the board. ",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Kevin Perry"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Kevin Perry",
      title: "Chief Operating Officer",
      bio: "Kevin has over 28 years (and counting!) experience in the game industry, from Microsoft through EA and THQ all the way to fresh startups. He’s a specialist in the three things you need to build a great studio: People, Process, and Product. As COO he’s working on adding rigor and infrastructure to the first two while acting as Designated Old Man across the board. ",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Kevin Perry"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Kevin Perry",
      title: "Chief Operating Officer",
      bio: "Kevin has over 28 years (and counting!) experience in the game industry, from Microsoft through EA and THQ all the way to fresh startups. He’s a specialist in the three things you need to build a great studio: People, Process, and Product. As COO he’s working on adding rigor and infrastructure to the first two while acting as Designated Old Man across the board. ",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Kevin Perry"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Kevin Perry",
      title: "Chief Operating Officer",
      bio: "Kevin has over 28 years (and counting!) experience in the game industry, from Microsoft through EA and THQ all the way to fresh startups. He’s a specialist in the three things you need to build a great studio: People, Process, and Product. As COO he’s working on adding rigor and infrastructure to the first two while acting as Designated Old Man across the board. ",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Kevin Perry"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Kevin Perry",
      title: "Chief Operating Officer",
      bio: "Kevin has over 28 years (and counting!) experience in the game industry, from Microsoft through EA and THQ all the way to fresh startups. He’s a specialist in the three things you need to build a great studio: People, Process, and Product. As COO he’s working on adding rigor and infrastructure to the first two while acting as Designated Old Man across the board. ",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Kevin Perry"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
  ]

  return (
    <Wrapper>
      {staffData.map((staff, index) => (
        <ExecutiveStaff
          title={staff.title}
          name={staff.name}
          bio={staff.bio}
          imgSrc={staff.imgSrc}
          key={index}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

export const MapOtherStaff = () => {
  const otherStaffData = [
    {
      name: "Abbigail Ely",
      title: "Executive Assistant",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/abbigail.png"
          alt="image of Abbigail Ely"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `-5deg`,
      rotationBottom: `3deg`,
    },
    {
      name: "Alano Nunez",
      title: "Associate 3D Artist III",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/alano.png"
          alt="image of Alano Nunez"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `2deg`,
      rotationBottom: `-3deg`,
    },
    {
      name: "Amber Calderon",
      title: "Associate Video Editor II",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/amber.png"
          alt="image of Amber Calderon"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `4deg`,
      rotationBottom: `-1deg`,
    },
    {
      name: "Andrew Hernandez",
      title: "Associate Video Editor II",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/andrew.png"
          alt="image of Andrew Hernandez"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `-2deg`,
      rotationBottom: `3deg`,
    },
    {
      name: "Ash Sexton",
      title: "Associate Creative III",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/ash.png"
          alt="image of Ash Sexton"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `4deg`,
      rotationBottom: `-3deg`,
    },
    {
      name: "Bethany Roberts",
      title: "Recruiting Coordinator",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/bethany.png"
          alt="image of Bethany Roberts"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `-1deg`,
      rotationBottom: `2deg`,
    },
    {
      name: "Billie Weddington",
      title: "HR Manager, Department Head",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/billie.png"
          alt="image of Billie Weddington"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `-3deg`,
      rotationBottom: `-2deg`,
    },
    {
      name: "Cole Wilshire",
      title: "Associate Developer I",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/cole.png"
          alt="image of Cole Wilshire"
          quality={85}
          placeholder="blurred"
        />
      ),
      rotationTop: `4deg`,
      rotationBottom: `-3deg`,
    },
  ]

  return (
    <OtherStaffWrapper>
      {otherStaffData.map((otherStaff, index) => (
        <OtherStaff
          key={index + "other"}
          title={otherStaff.title}
          name={otherStaff.name}
          imgSrc={otherStaff.imgSrc}
          rotationTop={otherStaff.rotationTop}
          rotationBottom={otherStaff.rotationBottom}
        />
      ))}
    </OtherStaffWrapper>
  )
}

const OtherStaffWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;

  margin: 5rem auto;

  @media (max-width: ${breakpoints.xxl}px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
  }
`
