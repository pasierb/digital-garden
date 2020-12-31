import React, { FC } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AllArticles from "../components/all-articles"

const Articles: FC = () => {
  return (
    <Layout>
      <SEO title="Articles archive" />

      <h2>All articles</h2>

      <AllArticles />
    </Layout>
  )
}

export default Articles
