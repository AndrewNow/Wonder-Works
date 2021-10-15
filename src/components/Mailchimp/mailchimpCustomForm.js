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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            Sending...
          </Sending>
          //Add blinking animation here
        )}
        {status === "error" && (
          <Error
            // dangerouslySetInnerHTML={{ __html: message }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            OOPS! SEEMS LIKE SOMETHING WENT WRONG. PLEASE TRY AGAIN.
          </Error>
        )}
        {status === "success" && (
          <Success
            // dangerouslySetInnerHTML={{ __html: message }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            Success!
          </Success>
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

  @media (max-width: ${breakpoints.xl}px) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
`

const Sending = styled(motion.div)`
  position: absolute;
  margin-top: 5rem;
  max-width: 40vw;
  word-wrap: wrap;
  font-family: "calibre-semibold";
  text-transform: uppercase;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-black);

  & a {
    font-family: "calibre-semibold";
    text-transform: uppercase;
    padding-top: 2rem;
    font-size: 16px;
    line-height: 20px;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 4rem;
  }
`

const Error = styled(motion.div)`
  position: absolute;
  margin-top: 5rem;
  max-width: 40vw;
  word-wrap: wrap;
  font-family: "calibre-semibold";
  text-transform: uppercase;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-black);

  & a {
    font-family: "calibre-semibold";
    text-transform: uppercase;
    padding-top: 2rem;
    font-size: 16px;
    line-height: 20px;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 4rem;
  }
`

const Success = styled(motion.div)`
  position: absolute;
  margin-top: 5rem;
  max-width: 40vw;
  word-wrap: wrap;
  font-family: "calibre-semibold";
  text-transform: uppercase;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-black);

  & a {
    font-family: "calibre-semibold";
    text-transform: uppercase;
    padding-top: 2rem;
    font-size: 16px;
    line-height: 20px;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-top: 4rem;
  }
`
