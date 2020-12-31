import React from 'react';
import { Link, StaticQuery, graphql  } from "gatsby"

const LatestArticles = () => {
  return (
    <ul>
      <StaticQuery
        query={graphql`
          query LatestArticles {
            latestArticles: allMarkdownRemark(
              limit: 5,
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
        `}
        render={(data) => data.latestArticles.edges.map(edge => <li key={edge.node.id}>
          <Link to={edge.node.frontmatter.slug}>{edge.node.frontmatter.title}</Link>
        </li>)}
      />
    </ul>
  )
}

export default LatestArticles;
