import React from "react"
import ExecutiveStaff from "./executiveStaff"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const MapExecutiveStaff = () => {
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
          index={index}
        />
      ))}
    </Wrapper>
  )
}

export default MapExecutiveStaff

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`
