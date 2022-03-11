import React, { useCallback, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import breakpoints from "../components/breakpoints"
import MobileNavAnimation from "../components/mobileNavAnimation"
import { useGlobalDispatchContext } from "../context/globalContext"

const NotFoundPage = ({ data }) => {
  // Make sure navbar starts in blue on page load
  const dispatch = useGlobalDispatchContext()

  const toggleBlueTheme = useCallback(() => {
    dispatch({ type: "TOGGLE_THEME", theme: "blue" })
  }, [dispatch])

  useEffect(() => {
    toggleBlueTheme()
  }, [toggleBlueTheme])

  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout title={siteTitle}>
      <Seo title="404: Not Found" />
      <Wrapper>
        <AnimationWrapper>
          <MobileNavAnimation />
          <div>Test2</div>
        </AnimationWrapper>
        <FourOFour>
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </FourOFour>
        <BackToWebButton to="/" aria-label="Link to return back to homepage">
          Back To <br /> Web
        </BackToWebButton>
        <MetaverseText>
          <h3>
            Looks like you’re lost in the metaverse! <br /> Let us guide you
            back to the web.
          </h3>
        </MetaverseText>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Wrapper = styled.div`
  height: calc(100vh - 157.5px);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: ${breakpoints.l}px) {
    height: 90vh;
  }
`
const AnimationWrapper = styled.div`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    position: absolute;
    top: 20%;
    display: block;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 20vh;
    transform: scale(.75);
  }
  @media (max-width: ${breakpoints.xs}px) {
    transform: scale(0.6);
  }
`

const FourOFour = styled.div`
  position: relative;
  margin-left: 15vw;
  margin-top: 10vh;
  h1,
  h2 {
    font-family: "ppwoodland-light";
  }
  h1 {
    font-size: 15vw;
    line-height: 100%;
  }
  h2 {
    transform: translateX(20%);
    font-size: 7.5vw;
    line-height: 100%;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    margin-left: 7.5vw;
    margin-top: 15vh;
    h1 {
      /* font-size: 225px; */
    }
    h2 {
      /* font-size: 125px; */
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin-left: 7.5vw;
    margin-top: 15vh;
    h1 {
      /* font-size: 200px; */
    }
    h2 {
      /* font-size: 100px; */
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-left: 7.5vw;
    margin-top: 25vh;
    h1 {
      font-size: 175px;
    }
    h2 {
      font-size: 75px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 30vh;
    h1 {
      font-size: 90px;
    }
    h2 {
      transform: translateX(0%);
      font-size: 45px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h1 {
      font-size: 70px;
    }
    h2 {
      transform: translateX(0%);
      font-size: 35px;
    }
  }
`

const MetaverseText = styled.div`
  position: relative;
  display: block;
  margin-left: 17.5vw;

  h3 {
    font-size: 2.5vw;
    line-height: 100%;
    font-family: "calibre-medium";
  }
  @media (max-width: ${breakpoints.xl}px) {
    font-size: 35px;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 2rem;
    h3 {
      font-size: 30px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-left: 10vw;
    h3 {
      font-size: 18px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    margin-left: 10vw;
    h3 {
      font-size: 16px;
    }
  }
`

const BackToWebButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-black);
  background-color: var(--color-white);
  border-radius: 100px;
  max-width: 285px;
  padding: 1rem 4rem;

  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "calibre-regular";
  font-size: 36px;
  align-self: flex-end;
  float: right;
  margin-top: 3rem;
  margin-right: 12.5vw;

  transition: var(--hover-transition);
  :hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
  @media (max-width: ${breakpoints.xxl}px) {
    padding: 0.75rem 4rem;
    font-size: 32px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    font-size: 22px;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 0.75rem 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: block;
    border: 1px solid var(--color-black);
    padding: 0.5rem 1rem;
    width: 125px;
    margin-top: 2rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding: 0.5rem 1rem;
    width: 125px;
    font-size: 20px;
  }
`
