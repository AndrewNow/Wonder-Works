import React from "react"
import styled from "styled-components"

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
      </Right>
    </Wrapper>
  )
}

const Headline = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.5rem;

  h4 {
    margin-right: 1rem;
    font-family: "calibre-semibold";
    padding: 0;
  }
`

const Wrapper = styled.div`
  width: 77.5%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10rem;
  padding-top: 5rem;
`

const Left = styled.div`
  h1 {
    width: 60%;
    font-size: 6.5625vw;
    line-height: 105%;
    /* line-height: 130px; */
    white-space: nowrap;
    padding-bottom: 15rem;
  }

  h2 {
    width: 60%;
    font-family: "ppwoodland-light";
    white-space: nowrap;
    padding-bottom: 5rem;
  }
`
const Right = styled.div`
  align-self: flex-end;
`

const Contact = styled.div`
  display: grid;
  grid-template-columns: 1.75fr 2fr 2fr;
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
`
