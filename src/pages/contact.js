import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

const Contact = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Contact`

  return (
    <Layout title={siteTitle}>
      <Seo title="Contact" />
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
