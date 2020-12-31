import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const MyFavorite = () => {
  return (
    <ul>
      <StaticQuery
        query={graphql`
          query MyPromotedArticles {
            myFav: allMarkdownRemark(
              limit: 10
              sort: { fields: frontmatter___date, order: DESC }
              filter: { frontmatter: { promoted: { in: "my" } } }
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
          data.myFav.edges.map(edge => (
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

export default MyFavorite
