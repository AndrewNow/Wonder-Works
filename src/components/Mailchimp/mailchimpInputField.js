import React from "react"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import { motion } from "framer-motion"

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
            <Arrow>
              <svg
                width="35"
                height="25"
                viewBox="0 0 35 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4292 0.998394C22.3328 1.0947 22.2563 1.20945 22.2041 1.33531C22.1519 1.46116 22.125 1.59556 22.125 1.73179C22.125 1.86803 22.1519 2.0034 22.2041 2.12925C22.2563 2.25511 22.3328 2.36986 22.4292 2.46617L31.4873 11.5072H1.66309C1.38806 11.5072 1.12416 11.6164 0.929688 11.8109C0.735212 12.0054 0.625977 12.2683 0.625977 12.5433C0.625977 12.8183 0.735212 13.0822 0.929688 13.2767C1.12416 13.4712 1.38806 13.5804 1.66309 13.5804H31.4873L22.6343 22.4349C22.5341 22.5304 22.4538 22.645 22.3984 22.7718C22.3431 22.8987 22.3138 23.0348 22.312 23.1732C22.3102 23.3116 22.3357 23.4492 22.3877 23.5775C22.4397 23.7058 22.5171 23.8222 22.6147 23.9203C22.7124 24.0183 22.8285 24.0963 22.9565 24.1488C23.0846 24.2013 23.222 24.2272 23.3604 24.2259C23.4987 24.2247 23.6351 24.1958 23.7622 24.141C23.8893 24.0861 24.0042 24.0064 24.1001 23.9066L34.1543 13.8509C34.3249 13.6803 34.4598 13.4774 34.5518 13.2543C34.6437 13.0312 34.6907 12.7924 34.6899 12.5511C34.6893 12.0641 34.4971 11.5962 34.1543 11.2503L23.917 1.015C23.7276 0.815561 23.4668 0.698879 23.1919 0.691753C22.917 0.684627 22.6506 0.787553 22.4512 0.976909L22.4292 0.998394Z"
                  fill="#1A174850"
                />
              </svg>
            </Arrow>
          ) : (
            <Arrow
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
              <motion.svg
                width="35"
                height="25"
                viewBox="0 0 35 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4292 0.998394C22.3328 1.0947 22.2563 1.20945 22.2041 1.33531C22.1519 1.46116 22.125 1.59556 22.125 1.73179C22.125 1.86803 22.1519 2.0034 22.2041 2.12925C22.2563 2.25511 22.3328 2.36986 22.4292 2.46617L31.4873 11.5072H1.66309C1.38806 11.5072 1.12416 11.6164 0.929688 11.8109C0.735212 12.0054 0.625977 12.2683 0.625977 12.5433C0.625977 12.8183 0.735212 13.0822 0.929688 13.2767C1.12416 13.4712 1.38806 13.5804 1.66309 13.5804H31.4873L22.6343 22.4349C22.5341 22.5304 22.4538 22.645 22.3984 22.7718C22.3431 22.8987 22.3138 23.0348 22.312 23.1732C22.3102 23.3116 22.3357 23.4492 22.3877 23.5775C22.4397 23.7058 22.5171 23.8222 22.6147 23.9203C22.7124 24.0183 22.8285 24.0963 22.9565 24.1488C23.0846 24.2013 23.222 24.2272 23.3604 24.2259C23.4987 24.2247 23.6351 24.1958 23.7622 24.141C23.8893 24.0861 24.0042 24.0064 24.1001 23.9066L34.1543 13.8509C34.3249 13.6803 34.4598 13.4774 34.5518 13.2543C34.6437 13.0312 34.6907 12.7924 34.6899 12.5511C34.6893 12.0641 34.4971 11.5962 34.1543 11.2503L23.917 1.015C23.7276 0.815561 23.4668 0.698879 23.1919 0.691753C22.917 0.684627 22.6506 0.787553 22.4512 0.976909L22.4292 0.998394Z"
                  fill="#1A1748"
                />
              </motion.svg>
            </Arrow>
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

const Arrow = styled(motion.div)`
  right: 0;
  position: absolute;
`

const Label = styled.label``
