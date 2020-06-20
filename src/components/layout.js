/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from "gatsby"

import { SearchProvider } from '../components/search';
import Header from "./header"

import "purecss/build/pure.css";
import "purecss/build/grids-responsive.css";
import "@reach/dialog/styles.css";
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <SearchProvider>
      <div className="container">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        </Helmet>

        <Header siteTitle={data.site.siteMetadata.title} />

        <main>
          {children}
        </main>

        <footer>
          Michal Pasierbski © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </SearchProvider>
  )
}

export default Layout
