import React, { FC } from 'react';
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

type DataProps = {
  allMdx: {
    nodes: {
      id: string
      frontmatter: {
        title: string
        slug: string
      }
    }[]
  }
}

const Articles: FC<PageProps<DataProps>> = ({ data: { allMdx: { nodes }} }) => {
  return (
    <Layout>
      <SEO title="Articles archive" />

      <h2>All articles</h2>

      <ul>
        {nodes.map(node => (
          <li key={node.id}>
            <Link to={node.frontmatter.slug}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Articles;

export const query = graphql`
  query AllArticles {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          slug
        }
      }
    }
  }
`