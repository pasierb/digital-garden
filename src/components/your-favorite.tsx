import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const YourFavorite = () => {
  return (
    <ul>
      <StaticQuery
        query={graphql`
          query YourPromotedArticles {
            yourFav: allMarkdownRemark(
              limit: 10
              sort: { fields: frontmatter___date, order: DESC }
              filter: { frontmatter: { promoted: { in: "your" } } }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    slug
                  }
                }
              }
            }
          }
        `}
        render={data =>
          data.yourFav.edges.map(edge => (
            <li key={edge.node.id}>
              <Link to={edge.node.frontmatter.slug}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))
        }
      />
    </ul>
  )
}

export default YourFavorite
