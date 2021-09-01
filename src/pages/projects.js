import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"

const Projects = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Projects`

  return (
    <Layout title={siteTitle}>
      <Seo title="Projects" />
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
