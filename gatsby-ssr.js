import React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import "./src/style.css"

export const wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>
}
