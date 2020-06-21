import React from "react"
import { Link } from 'gatsby';

import Layout from "../components/layout"
import SEO from "../components/seo"
import MyFavorite from '../components/my-favorite';
import YourFavorite from '../components/your-favorite';
import Latest from '../components/latest';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <p>hey hey,</p>

    <p>My name is Michał Pasierbski. I'm a software engineer at Amazon Web Services.</p>

    <p>
      This website is my personal space where I dump thoughts, mostly about engineering and self improvement.
      Writings that you will find here are sometimes raw, unpolished, even "work in progress".
      This format is inspired by the idea of a <a href="https://joelhooks.com/digital-garden">digital garden</a>.
    </p>

    <p>You can find more of me at <a href="https://github.com/pasierb">github</a>, <a href="https://twitter.com/mpasierbski">twitter</a>, <a href="https://www.linkedin.com/in/mpasierbski/">linkedin</a> and <a href="https://www.instagram.com/mpasierbski/">instagram</a>.</p>

    <div className="pure-g">
      <div className="pure-u-1 pure-u-md-1-2">
        <section>
          <h3>Articles I like</h3>

          <MyFavorite />
        </section>
      </div>
      <div className="pure-u-1 pure-u-md-1-2">
        <section>
          <h3>Others tend to read</h3>

          <YourFavorite />
        </section>
      </div>
      <div className="pure-u-1 pure-u-md-1-2">
        <section>
          <h3>Recent</h3>

          <Latest />
        </section>
      </div>
    </div>

    <Link className="pure-button" to="/articles/">Check all 🗒️</Link>
  </Layout>
)

export default IndexPage
