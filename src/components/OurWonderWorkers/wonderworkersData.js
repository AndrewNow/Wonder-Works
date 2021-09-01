import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { WonderWorkersComponent } from "./wonderworkersComponent"
import { PinkPortal, BluePortal } from "../../svg/miscellaneous"

export const workerData = [
  {
    name: "Megan Letter",
    title: "President",
    style: {},
    portal: <BluePortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Zach Letter",
    title: "CEO",
    style: { zIndex: "10", transform: "translate3d(0, 3rem, 0)" },
    portal: <PinkPortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Joshua Mixon",
    title: "Director of Operations",
    style: { zIndex: "10", transform: "translate3d(0, 3rem, 0)" },
    portal: <PinkPortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Daniel Kolman",
    title: "Creative Director",
    style: {},
    portal: <BluePortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Francisco Zuniga",
    title: "Graphic Artist",
    style: {},
    portal: <PinkPortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Benjy Kaplan",
    title: "Game Designer",
    style: { zIndex: "10", transform: "translate3d(0, 3rem, 0)" },
    portal: <BluePortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Ashytn Faith",
    title: "Storyteller",
    style: {},
    portal: <PinkPortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
]

export const WonderWorkersData = () => {
  const data = useStaticQuery(graphql`
    query WonderWorkers {
      wwImage: allFile(
        filter: { relativeDirectory: { eq: "Team" } }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          childImageSharp {
            gatsbyImageData(
              width: 450
              placeholder: TRACED_SVG
              quality: 80
              blurredOptions: { width: 80 }
            )
          }
        }
      }
    }
  `)
  return (
    <>
      {workerData.map((worker, index) => {
        const avatar = data.wwImage.nodes[index].childImageSharp.gatsbyImageData
        return (
          <>
            <WonderWorkersComponent
              key={index}
              name={worker.name}
              index={index}
              title={worker.title}
              portal={worker.portal}
              bio={worker.bio}
              avatar={avatar}
              style={worker.style}
            />
          </>
        )
      })}
    </>
  )
}
