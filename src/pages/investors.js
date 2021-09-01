import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"

const Investors = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Investors`

  return (
    <Layout title={siteTitle}>
      <Seo title="Investors" />
    </Layout>
  )
}

export default Investors

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
