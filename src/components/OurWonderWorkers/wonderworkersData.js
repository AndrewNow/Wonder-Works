import React from "react"
import WonderWorkersComponent from "./wonderworkersComponent"
export const workerData = [
  {
    name: "Megan Letter",
    title: "President",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Zach Letter",
    title: "CEO",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Joshua Mixon",
    title: "Director of Operations",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Daniel Kolman",
    title: "Creative Director",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Francisco Zuniga",
    title: "Graphic Artist",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Benjy Kaplan",
    title: "Game Designer",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
  {
    name: "Ashytn Faith",
    title: "Storyteller",
    // avatar: ""
    bio: "Most of the time, Megan can be spotted with a Starbucks drink in her hand, fueling her creative mind power to be at 150%. With this energy, she has launched her own brand, Stay Peachy, and a game called Overlook Bay on Roblox. Shortly after, Wonder Works Studio was born and now, she and her husband Zach will run this studio right out of the ballpark by creating more games for players of all ages. When Megan is not playing video games, you can find her taking part in her new podcast channel, Party of Two, where she will discuss everyday topics with special guests or hanging out with her fur babies and Zach.",
  },
]

export const WonderWorkersData = () => {
  return (
    <>
      {workerData.map((worker, index) => {
        return (
          <>
            <WonderWorkersComponent
              name={worker.name}
              index={index}
              title={worker.title}
              bio={worker.bio}
            />
          </>
        )
      })}
    </>
  )
}
