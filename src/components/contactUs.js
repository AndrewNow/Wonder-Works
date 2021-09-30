import React from "react"
import styled from "styled-components"
import breakpoints from "./breakpoints"
import { Link } from "gatsby"
import { Arrow } from "../svg/miscellaneous"

export const ContactUsHomePage = () => {
  return (
    <Wrapper>
      <Left>
        <Headline>
          <h4>Contact Us</h4>
          <svg
            width="160"
            height="3"
            viewBox="0 0 160 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.84424H159.385"
              stroke="#1A1748"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </Headline>
        <h1>
          Let’s work <br />
          wonders <br />
          together.
        </h1>
      </Left>
      <Right>
        <Contact>
          <p>
            <strong>inquiries</strong>
          </p>
          <p>
            for general <br />
            inquiries
          </p>
          <a href="mailto:info@wonderworks.gg">info@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>press</strong>
          </p>
          <p>
            for press <br />
            press
          </p>
          <a href="mailto:press@wonderworks.gg">press@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>collabs</strong>
          </p>
          <p>
            influencer <br />
            collaborations
          </p>
          <a href="mailto:collab@wonderworks.gg">collab@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>careers</strong>
          </p>
          <p>
            applications <br />
            and inquiries
          </p>
          <a href="mailto:careers@wonderworks.gg">careers@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>partnerships</strong>
          </p>
          <p>
            brand <br />
            partnerships
          </p>
          <a href="mailto:partnerships@wonderworks.gg">
            partnerships@wonderworks.gg
          </a>
        </Contact>
        <MobileContact>
          <Link to="/contact">
            <Arrow />
          </Link>
        </MobileContact>
      </Right>
    </Wrapper>
  )
}

export const ContactUs = () => {
  return (
    <Wrapper>
      <Left>
        <Headline>
          <h4>Contact Us</h4>
          <svg
            width="160"
            height="3"
            viewBox="0 0 160 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.84424H159.385"
              stroke="#1A1748"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </Headline>
        <h2>
          Let’s work <br />
          wonders <br />
          together.
        </h2>
      </Left>
      <Right>
        <Contact>
          <p>
            <strong>inquiries</strong>
          </p>
          <p>
            for general <br />
            inquiries
          </p>
          <a href="mailto:info@wonderworks.gg">info@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>press</strong>
          </p>
          <p>
            for press <br />
            press
          </p>
          <a href="mailto:press@wonderworks.gg">press@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>collabs</strong>
          </p>
          <p>
            influencer <br />
            collaborations
          </p>
          <a href="mailto:collab@wonderworks.gg">collab@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>careers</strong>
          </p>
          <p>
            applications <br />
            and inquiries
          </p>
          <a href="mailto:careers@wonderworks.gg">careers@wonderworks.gg</a>
        </Contact>
        <Contact>
          <p>
            <strong>partnerships</strong>
          </p>
          <p>
            brand <br />
            partnerships
          </p>
          <a href="mailto:partnerships@wonderworks.gg">
            partnerships@wonderworks.gg
          </a>
        </Contact>
        <MobileContact>
          <Link to="/contact">
            <Arrow />
          </Link>
        </MobileContact>
      </Right>
    </Wrapper>
  )
}

const Headline = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;

  h4 {
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
    white-space: nowrap;
  }
`

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10rem;
  padding-top: 5rem;

  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 6rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    width: 90%;
    padding-bottom: 5rem;
  }
`

const Left = styled.div`
  h1 {
    width: 60%;
    font-size: 6.5625vw;
    line-height: 105%;
    white-space: nowrap;
    padding-bottom: 15rem;
  }

  h2 {
    width: 60%;
    font-family: "ppwoodland-light";
    white-space: nowrap;
    padding-bottom: 5rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      font-size: 76px;
      line-height: 70px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    h1,
    h2 {
      padding-bottom: 5rem;
      font-size: 9vw;
    }
    h2 {
      line-height: 90%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h1 {
      font-size: 10vw;
    }

    h2 {
      font-size: 70px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1,
    h2 {
      font-size: 45px;
    }
  }
`
const Right = styled.div`
  align-self: flex-end;

  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 5rem;
    /* align-self: center; */
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 0rem;
    width: 100%;
    align-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.m}px) {
    align-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media (max-width: ${breakpoints.xs}px) {
    grid-template-columns: 1fr;
  }
`

const Contact = styled.div`
  display: grid;
  grid-template-columns: 150px 2fr 2fr;
  margin-top: 2rem;

  p,
  strong,
  a {
    font-size: 18px;
    line-height: 22px;
  }

  p {
    font-family: "calibre-regular";
  }

  strong {
    font-family: "calibre-semibold";
  }

  :last-of-type a {
    width: 100%;
  }

  a {
    text-decoration: none;
    font-family: "calibre-regular";
    text-decoration: none;
    position: relative;
    width: 80%;

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1px;
      bottom: 15px;
      left: 0;
      background-color: var(--color-black);
      transform-origin: bottom right;
      transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    }

    :hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    display: flex;
    flex-direction: column;
    width: 85%;

    br {
      display: none;
    }

    a {
      width: 100%;
      text-decoration: underline;

      ::after {
        content: none;
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
  @media (max-width: ${breakpoints.s}px) {
    a,
    p {
      font-size: 15px;
    }
    p {
      white-space: nowrap;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    a,
    p {
      font-size: 18px;
    }
    p {
      margin-top: 0.25rem;
    }
    strong {
      font-size: 20px;
    }
  }
`
const MobileContact = styled.div`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin-right: 4rem;
    position: relative;
    a {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-right: 0rem;

    a {
      right: 45%;
    }
  }
  @media (max-width: 700px) {
    a {
      right: 33%;
    }
  }
  @media (max-width: 600px) {
    a {
      right: 28%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 0.5rem;
    a {
      right: 30%;
    }
  }

  @media (max-width: 400px) {
    a {
      right: 0%;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    margin-top: 4rem;
    a {
      left: 0;
    }
  }
`
