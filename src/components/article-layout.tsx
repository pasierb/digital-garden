import React, { useEffect } from 'react';
import { graphql } from "gatsby"
// import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from './layout';
import { hljs } from '../highlight';

const ArticleLayout = ({ data: { mdx } }) => {
  useEffect(() => {
    const codeNodes = document.querySelectorAll('code');

    for (let node of codeNodes) {
      hljs.highlightBlock(node);
    }
  }, []);

  return (
    <Layout>
      <article>
        <h1>{mdx.frontmatter.title}</h1>

        <MDXRenderer>{mdx.body}</MDXRenderer>
      </article>
    </Layout>
  )
};

export const pageQuery = graphql`
  query ArticleQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;

export default ArticleLayout;