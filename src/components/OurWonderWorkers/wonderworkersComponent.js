import React, { useState } from "react"
import styled from "styled-components"

const WonderWorkersComponent = ({ name, index, title, bio }) => {
  const [click, setClick] = useState(false)
  {
    console.log(name)
  }
  return (
    <>
      <Worker key={index} onClick={() => setClick(!click)}>
        <h4>{name}</h4>
        <p>{index}</p>
        <p>{title}</p>
      </Worker>
      {click ? (
        <Modal>
          <BackdropColor>
            <Text>
              <h1>{name}</h1>
              <h4>{title}</h4>
              <p>{bio}</p>
            </Text>
            <Close onClick={() => setClick(!click)}>Close me</Close>
          </BackdropColor>
        </Modal>
      ) : null}
    </>
  )
}

export default WonderWorkersComponent

const Worker = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;

  h4,
  p {
    color: var(--color-white);
  }
  p {
    text-transform: uppercase;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2001;
  width: 95%;
  height: 95vh;
  background-color: #1a174899;
  backdrop-filter: blur(2px);
  border-radius: 12px;
  p {
    color: var(--color-white);
  }
`

const BackdropColor = styled.div`
  overflow: hidden;
  border-radius: 12px;
  background-color: #1a174899;
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Close = styled.button`
  position: absolute;
  bottom: 5%;
  right: 5%;
`

const Text = styled.div`

  flex-basis: 50%;
  h1,
  h4 {
    color: var(--color-white);
  }
  h1 {
    font-size: 75px;
    line-height: 80px;
    font-family: "ppwoodland-bold";
    padding-bottom: 1rem;
  }
  h4 {
    padding-bottom: 2rem;
  }
`
