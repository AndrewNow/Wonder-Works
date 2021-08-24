import React, { useState, useEffect } from "react"
import MailchimpInputField from "./mailchimpInputField"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import breakpoints from "../breakpoints"

const MailchimpCustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (status === "success") clearFields()
  }, [status])

  const clearFields = () => {
    setEmail("")
  }

  const handleSubmit = e => {
    e.preventDefault()
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      })
  }

  const modalvariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <AnimatePresence>
      <EmailForm onSubmit={e => handleSubmit(e)}>
        {status === "sending" && (
          <Sending
            variants={modalvariants}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
          >
            Sending...
          </Sending>
          //Add blinking animation here
        )}
        {status === "error" && (
          <Error
            dangerouslySetInnerHTML={{ __html: message }}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 1 } }}
          />
        )}
        {status === "success" && (
          <Success
            dangerouslySetInnerHTML={{ __html: message }}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
          />
        )}

        <MailchimpInputField
          onChangeHandler={setEmail}
          type="email"
          value={email}
          placeholder="EMAIL ADDRESS"
          isRequired
        />

        <MailchimpInputField
          label="Subscribe"
          type="submit"
          formValues={[email]}
        />
      </EmailForm>
    </AnimatePresence>
  )
}

export default MailchimpCustomForm

const EmailForm = styled.form`
  width: 45vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--color-black);
  padding-bottom: 1rem;
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
`

const Sending = styled(motion.div)`
  position: absolute;
  border: 1px solid black;
  border-radius: 10px;
  background-color: var(--color-white);
  margin-top: 5rem;
  width: 270px;
  word-wrap: wrap;
  padding: 1rem 2rem;
  color: var(--color-darkgreen);

  & a {
    padding-top: 1rem;
    font-size: 16px;
    line-height: 16px;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 2.5rem;
  }
`

const Error = styled(motion.div)`
  font-size: 16px;
  line-height: 16px;
  position: absolute;
  border: 1px solid black;
  border-radius: 10px;
  background-color: var(--color-white);
  margin-top: 5rem;
  width: 270px;
  word-wrap: wrap;
  padding: 1rem 2rem;

  & a {
    padding-top: 1rem;
    font-size: 16px;
    line-height: 16px;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 2.5rem;
  }
`

const Success = styled(motion.div)`
  font-size: 16px;
  line-height: 16px;
  position: absolute;
  border: 1px solid black;
  border-radius: 10px;
  background-color: var(--color-white);
  margin-top: 5rem;
  width: 270px;
  word-wrap: wrap;
  padding: 1rem 2rem;
  color: var(--color-darkgreen);

  & a {
    padding-top: 1rem;
    font-size: 16px;
    line-height: 16px;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 2.5rem;
  }
`
