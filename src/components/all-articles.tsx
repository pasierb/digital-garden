import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const MyFavorite = () => {
  const data = useStaticQuery(graphql`
    query AllArticlesComponent {
      myFav: allMdx(
        limit: 10
        sort: { fields: frontmatter___date, order: DESC }
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
  `)

  return (
    <ul>
      {data.myFav.edges.map(edge => (
        <li key={edge.node.id}>
          <Link to={edge.node.frontmatter.slug}>
            {edge.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MyFavorite
