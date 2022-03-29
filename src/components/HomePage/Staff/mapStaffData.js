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
      name: "Zach Letter",
      title: "Chief Executive Officer",
      bio: "Gaming has been an integral part of Zach's life for as long as he can remember, it entertained him, connected him with lifelong companions and inspired him creatively. After graduating high school, he found solace in creating digital gaming content on the YouTube platform. During his 10 year entertainment career he amassed billions of collective views, millions of subscribers and hundreds of powerful influencer connections. Taking what he learned from his passion for gaming, entertainment career, and connections to digital influencers, he and his wife Megan founded Wonder Works Studio, a white glove, full service, premier gaming studio for the growing metaverse landscape. Forged in passion, understanding and close connection for the community they serve, Zach's goal is to bring high quality AAA experiences to the emerging and underserved eco systems that are Roblox and Web3.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/ZachLetter.png"
          alt="image of Zach Letter"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Joe",
      title: "Vice President of Finance",
      bio: "Joe has 7 years’ experience analyzing and investing across the global internet and game industries. His lifelong love for gaming has centered around its ability to drive positive social connections between players and the emergence of platforms like Roblox takes this to the next level. Joe is focused on finance and business development at Wonder Works and helps top brands and entertainers drive deep, meaningful connections to their communities through immersive digital experiences.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Joe"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Tyson",
      title: "Chief Content Officer",
      bio: "Tyson has 10 years’ experience creating digital content across multiple platforms. Through his time-tested creative process, he’s amassed billions of views in a multitude of content genres. His deep rooted understanding of this new generation of media is invaluable.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/KevinPerry.png"
          alt="image of Tyson"
          quality={85}
          placeholder="blurred"
        />
      ),
    },
    {
      name: "Joshua Mixon",
      title: "Chief Production Officer",
      bio: "Josh has created dozens of games with hundreds of millions of plays across the last 6 years on the Roblox platform. Through community outreach and teaching Josh has helped empower the next generation of gamers. Now, Josh is leading a team of the most talented engineers, modellers, animators, and designers this world has yet to see. Josh’s focus is on creating an enjoyable atmosphere through the promotion of creativity, collaboration, and innovation within the workspace. We all succeed when we love what we are doing - and Wonder Works Studio is built on the love of gaming.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/JoshuaMixon.png"
          alt="image of Joshua Mixon"
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

  @media (max-width: ${breakpoints.xl}px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
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
