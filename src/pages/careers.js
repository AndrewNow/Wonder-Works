import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

const Careers = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Careers`

  return (
    <Layout title={siteTitle}>
      <Seo title="Careers" />
    </Layout>
  )
}

export default Careers

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
