import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Time from "./time"
import "./all-articles.css"

const dateFormat = new Intl.DateTimeFormat("en-us", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

const AllArticles = () => {
  const data = useStaticQuery(graphql`
    query AllArticlesComponent {
      articles: allMarkdownRemark(
        limit: 100
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              date
              title
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <ul className="AllArticles">
      {data.articles.edges.map(edge => {
        return (
          <li key={edge.node.id}>
            <Time date={new Date(edge.node.frontmatter.date)} />

            <Link to={edge.node.frontmatter.slug}>
              {edge.node.frontmatter.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default AllArticles
