import React from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import { motion } from "framer-motion"
import { Arrow } from "../../svg/miscellaneous"

const MailchimpInputField = props => {
  //Checks if all the fields are filled and if an @ sign is used in the email field
  const validateInput = values => {
    if (values.some(f => f === "") || values[0].indexOf("@") === -1) {
      return true
    } else {
      return false
    }
  }
  if (props.type === "submit") {
    return (
      <SubmitLabel>
        <LabelArrow>
          {validateInput(props.formValues) ? (
            <ArrowDiv style={{opacity: .5}}>
              <Arrow />
            </ArrowDiv>
          ) : (
            <ArrowDiv
              initial={{ x: 0 }}
              animate={{
                x: -10,
                transition: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <Arrow />
            </ArrowDiv>
          )}
          <SubmitInput
            type="submit"
            value={" "}
            disabled={validateInput(props.formValues)}
          />
        </LabelArrow>
      </SubmitLabel>
    )
  } else if (props.type === "textarea") {
    return (
      <Label>
        {props.label}
        <textarea
          onChange={e => props.onChangeHandler(e.target.value)}
          placeholder={props.placeholder}
          value={props.value}
          required={props.isRequired}
          rows={7}
          name={props.name}
        />
      </Label>
    )
  } else {
    return (
      <Label>
        {props.label}
        <EmailInput
          onChange={e => props.onChangeHandler(e.target.value)}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          required={props.isRequired}
          name={props.name}
        />
      </Label>
    )
  }
}

export default React.memo(MailchimpInputField)

const EmailInput = styled.input`
  width: 40vw;
  border: none;
  background: none;
  background-color: none;
  font-family: "calibre-regular";
  font-size: 30px;
  box-sizing: border-box;
  color: var(--color-white);

  &:focus {
    border-radius: 3px;
    outline: none !important;
    color: var(--color-white);
  }
  ::placeholder {
    color: whitesmoke;
    opacity: 0.9 !important;
  }
`

const SubmitLabel = styled(motion.label)`
  position: relative;
  /* border: 1px solid grey; */
  & svg {
    position: absolute;
    color: #00000050;
    transform: translate(-2rem, 0rem);
    transition: var(--hover-transition);
    &:hover {
      color: var(--color-orange) !important;
      cursor: pointer;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    & svg {
      transform: translate(-3rem, -0.25rem);
      /* position: relative; */
    }
  }
`

const SubmitInput = styled.input`
  color: none;
  padding-left: 1rem;
  padding-bottom: 1rem;
  border: none;
  width: 100px;
  background: none;
  background-color: none;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
  @media (max-width: ${breakpoints.m}px) {
    /* padding-bottom: 0rem; */
  }
`

const LabelArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const ArrowDiv = styled(motion.div)`
  right: 0;
  bottom: 1rem;
  position: absolute;
`

const Label = styled.label``
