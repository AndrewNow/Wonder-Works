import React from "react"
import ExecutiveStaff from "./category/executiveStaff"
import Founders from "./category/founders"
import OtherStaff from "./category/otherStaff"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import breakpoints from "../../breakpoints"
import Marquee from "react-fast-marquee"

export const MapFounders = () => {
  const founderData = [
    {
      name: "Megan Letter",
      title: "Co-Founder",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/megan.jpg"
          alt="Portrait image of Megan Letter against a pale blue background."
          quality={80}
          placeholder="blurred"
          aspectRatio={1 / 1}
          width={400}
        />
      ),
    },
    {
      name: "Zach Letter",
      title: "CEO & Co-Founder",
      // bio: "Gaming has been an integral part of Zach's life for as long as he can remember, it entertained him, connected him with lifelong companions and inspired him creatively. After graduating high school, he found solace in creating digital gaming content on the YouTube platform. During his 10 year entertainment career he amassed billions of collective views, millions of subscribers and hundreds of powerful influencer connections. Taking what he learned from his passion for gaming, entertainment career, and connections to digital influencers, he and his wife Megan founded Wonder Works Studio, a white glove, full service, premier gaming studio for the growing metaverse landscape. Forged in passion, understanding and close connection for the community they serve, Zach's goal is to bring high quality AAA experiences to the emerging and underserved eco systems that are Roblox and Web3.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/ZachLetter.png"
          alt="Portrait image of Zach Letter against a pale blue background."
          quality={80}
          placeholder="blurred"
          aspectRatio={1 / 1}
          width={400}
        />
      ),
    },
  ]

  return founderData.map((staff, index) => {
    const min = Math.ceil(-5)
    const max = Math.floor(6)
    const rotationTop = `${Math.floor(
      Math.random() * (max - min + 1) + min
    )}deg`
    const rotationBottom = `${Math.floor(
      Math.random() * (max - min + 1) + min
    )}deg`
    return (
      <Founders
        title={staff.title}
        name={staff.name}
        bio={staff.bio}
        imgSrc={staff.imgSrc}
        key={index}
        rotationTop={rotationTop}
        rotationBottom={rotationBottom}
      />
    )
  })
}

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
          quality={80}
          placeholder="blurred"
          height={300}
          width={300}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Joe Jurbala",
      title: "Chief Business Officer",
      bio: "Joe has 7 years’ experience analyzing and investing across the global internet and game industries. His lifelong love for gaming has centered around its ability to drive positive social connections between players and the emergence of platforms like Roblox takes this to the next level. Joe is focused on finance and business development at Wonder Works and helps top brands and entertainers drive deep, meaningful connections to their communities through immersive digital experiences.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/JoeJurbala.webp"
          alt="image of Joe"
          quality={80}
          placeholder="blurred"
          height={300}
          width={300}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Tyson Letter",
      title: "Chief Content Officer",
      bio: "Tyson has 10 years’ experience creating digital content across multiple platforms. Through his time-tested creative process, he’s amassed billions of views in a multitude of content genres. His deep rooted understanding of this new generation of media is invaluable.",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/execs/TysonLetter.jpg"
          alt="image of Tyson"
          quality={80}
          placeholder="blurred"
          height={300}
          width={300}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
  ]

  return (
    <Wrapper>
      {staffData.map((staff, index) => {
        const min = Math.ceil(-5)
        const max = Math.floor(6)
        const rotationTop = `${Math.floor(
          Math.random() * (max - min + 1) + min
        )}deg`
        const rotationBottom = `${Math.floor(
          Math.random() * (max - min + 1) + min
        )}deg`
        return (
          <ExecutiveStaff
            title={staff.title}
            name={staff.name}
            bio={staff.bio}
            imgSrc={staff.imgSrc}
            key={index}
            rotationTop={rotationTop}
            rotationBottom={rotationBottom}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 85%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 80%;
    margin: 0 auto;
    flex-wrap: wrap;
    /* display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    justify-content: center; */
  }

  @media (max-width: ${breakpoints.m}px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`

export const MapOtherStaff = () => {
  const otherStaffData = [
    {
      name: "Abbigail Ely",
      title: "Chief of Staff",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/abbigail.png"
          alt="image of Abbigail Ely"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Amber Calderon",
      title: "Video Editor",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/amber.png"
          alt="image of Amber Calderon"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Andrew Hernandez",
      title: "Video Editor",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/andrew.png"
          alt="image of Andrew Hernandez"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Daniel Kolman",
      title: "Environmental Artist",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/daniel.jpg"
          alt="image of Daniel Kolman"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Dylan Jackson",
      title: "Cinematic Animator",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/dylan.jpg"
          alt="image of Dylan Jackson"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Everett Bradford",
      title: "3D Artist",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/everett.jpg"
          alt="image of Everett Bradford"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },

    {
      name: "Hector Ochoa",
      title: "3D Artist",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/hector.jpg"
          alt="image of Hector Ochoa"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Hope Nasr",
      title: "Producer",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/hope.jpg"
          alt="image of Hope Nasr"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Jo Hardman",
      title: "Animator",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/jo.jpg"
          alt="image of Jo Hardman"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Joseph Baumgratz",
      title: "Developer",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/joseph.jpg"
          alt="image of Joseph Baumgratz"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Joshua Tanner",
      title: "Developer",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/joshua.jpg"
          alt="image of Joshua Tanner"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Karla Parra",
      title: "Creative",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/karla.jpg"
          alt="image of Karla Parra"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Mary Braden",
      title: "QA",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/mary.jpg"
          alt="image of Mary Braden"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "McKenzie Woodward",
      title: "Concept Artist",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/mckenzie.jpg"
          alt="image of McKenzie Woodward"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Michael Benavides",
      title: "Designer",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/michaelb.jpg"
          alt="image of Michael Benavides"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
    {
      name: "Molly Woodward",
      title: "Audio Engineer",
      imgSrc: (
        <StaticImage
          src="../../../images/Team/other/molly.jpg"
          alt="image of Molly Woodward"
          quality={75}
          placeholder="blurred"
          width={250}
          aspectRatio={1 / 1}
          transformOptions={{ fit: "cover", cropFocus: "top" }}
        />
      ),
    },
  ]

  return (
    <MarqueeSection>
      <OtherStaffWrapper>
        <Marquee
          gradientColor={[255, 205, 48]}
          style={{ overflowY: "hidden" }}
          gradientWidth={75}
        >
          {otherStaffData.map((otherStaff, index) => {
            const min = Math.ceil(-5)
            const max = Math.floor(6)
            const rotationTop = `${Math.floor(
              Math.random() * (max - min + 1) + min
            )}deg`
            const rotationBottom = `${Math.floor(
              Math.random() * (max - min + 1) + min
            )}deg`
            return (
              <OtherStaff
                key={index + "other"}
                title={otherStaff.title}
                name={otherStaff.name}
                imgSrc={otherStaff.imgSrc}
                rotationTop={rotationTop}
                rotationBottom={rotationBottom}
              />
            )
          })}
        </Marquee>
      </OtherStaffWrapper>
      <OtherStaffWrapper>
        <Marquee
          gradientColor={[255, 205, 48]}
          style={{ overflowY: "hidden" }}
          gradientWidth={75}
          direction="right"
        >
          {/* same array but reversed */}
          {otherStaffData.reverse().map((otherStaff, index) => {
            const min = Math.ceil(-5)
            const max = Math.floor(5)
            const rotationTop = `${Math.floor(
              Math.random() * (max - min + 1) + min
            )}deg`
            const rotationBottom = `${Math.floor(
              Math.random() * (max - min + 1) + min
            )}deg`
            return (
              <OtherStaff
                key={index + "other"}
                title={otherStaff.title}
                name={otherStaff.name}
                imgSrc={otherStaff.imgSrc}
                rotationTop={rotationTop}
                rotationBottom={rotationBottom}
              />
            )
          })}
        </Marquee>
      </OtherStaffWrapper>
    </MarqueeSection>
  )
}

const MarqueeSection = styled.div`
  margin: 1rem auto;
  width: 100%;
`

const OtherStaffWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${breakpoints.xxl}px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 0rem auto;
  }
`
