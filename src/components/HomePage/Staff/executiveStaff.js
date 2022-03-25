import React, {useState} from "react"
import styled from "styled-components"


const ExecutiveStaff = ({ title, name, bio, index }) => {

  const [clicked, setClicked] = useState(false)

  return (
    <Card index={index}>
      <p>{title}</p>
      <p>{name}</p>
    </Card>
  )
}

export default ExecutiveStaff

const Card = styled.div``
