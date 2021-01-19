import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AllArticles from "../components/all-articles"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <p>hey hey,</p>

    <p>
      My name is Michał Pasierbski. I'm a software engineer at Amazon Web
      Services (opinions are my own).
    </p>

    <p>
      This website is my personal space where I dump thoughts, mostly about
      engineering and self improvement. Writings that you will find here are
      sometimes raw, unpolished, even "work in progress". This format is
      inspired by the idea of a{" "}
      <a href="https://joelhooks.com/digital-garden">digital garden</a>.
    </p>

    <p>
      You can find more of me at <a href="https://github.com/pasierb">GitHub</a>
      , <a href="https://twitter.com/mpasierbski">Twitter</a> and{" "}
      <a href="https://www.linkedin.com/in/mpasierbski/">LinkedIn</a>.
    </p>

    <h2>Articles</h2>

    <section>
      <AllArticles />
    </section>
  </Layout>
)

export default IndexPage
