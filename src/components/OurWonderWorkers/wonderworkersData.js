import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { WonderWorkersComponent } from "./wonderworkersComponent"
import { PinkPortal, BluePortal } from "../../svg/miscellaneous"

export const workerData = [
  {
    name: "Megan Letter",
    title: "Co-Founder",
    portal: <BluePortal />,
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Zach Letter",
    title: "CEO",
    portal: <PinkPortal />,
    bio: "Zach started on YouTube in 2010 and is known as AviatorGaming, so you may consider him an OG but forever still be a gamer by heart. He went from making videos and streaming Minecraft and Sims to now making the game, Overlook Bay, for Roblox. Fast forward, he and his wife, Megan, both run Wonder Works Studio where they will step foot on becoming the best creators of the metaverses. You can catch him being Megan’s handy cameraman for her channels or dreaming about owning a yacht some day.",
  },
  {
    name: "Joshua Mixon",
    title: "Director of Operations",
    portal: <PinkPortal />,
    bio: "With over 12 years' experience in Roblox and 8 years in game development, Josh has produced several well-perceived projects such as Overlook Bay, Traitor, and The Supers. When he’s not managing a wizardry team at WWS, Josh will play or watch sports at home accompanied by his two cats.",
  },
  {
    name: "Daniel Kolman",
    title: "Creative Director",
    portal: <BluePortal />,
    bio: "Daniel has a knick knack for creating environments and vast landscapes that just blows your mind. He has 7 years of building world experiences and worked on other creative aspects for MeepCity, Overlook Bay, and Traitor. When he’s not designing or heading off to work, he’s highly likely to be snuggled up in bed catching on sleep or gaming with some friends.",
  },
  {
    name: "Francisco Zuniga",
    title: "Graphic Artist",
    portal: <PinkPortal />,
    bio: "Francisco came across Roblox nine years ago and didn't know what was in store for him. He started out making fan art logos at 18, hoping to get his brand out to the world through Twitter and forums, now, he became a Roblox developer going on four years designing UI logos. He's currently expanding his skillset to environment design and realized his dreams are accomplished through hard work and loving support from his close friend, Isabella, who inspires him every day. Francisco was awarded Builderman Excellence Award at the 7th Annual Bloxy's, while working alongside VCaffy’s hit game, Dungeon Quest. Surprisingly in his free time, he is in the zone to 3D model and build more worlds.",
  },
  {
    name: "Benjy Kaplan",
    title: "Game Designer",
    portal: <BluePortal />,
    bio: "When it comes to designing games, Benjy is our go-to man. He has four years experience as a game designer in mobile and worked on an action-RPG game at Plarium. After hours, he’s either playing board games, writing away his thoughts or losing at Hearthstone. ",
  },
  {
    name: "Ashytn Faith",
    title: "Storyteller",
    portal: <PinkPortal />,
    bio: "Ashtyn knows her way around with words and has been doing creative writing for five years. She’s incredibly talented and has the ability to pizazz and grace the entire crowd because she has ten years of stage acting and five years of voice acting experience. When not writing or sticking her nose in a book, Ashtyn loves working with animals, listening to music, or catching a flight to a new destination!",
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
          <WonderWorkersComponent
            key={worker.name + "'s key"}
            name={worker.name}
            index={index}
            title={worker.title}
            portal={worker.portal}
            bio={worker.bio}
            avatar={avatar}
          />
        )
      })}
    </>
  )
}
