import React, { FC, useEffect } from 'react';
import { graphql, PageProps } from "gatsby"
// import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from './seo';
import Layout from './layout';
import { hljs } from '../highlight';

interface ArticleLayoutData {
  mdx: {
    id: string
    body: any
    excerpt: string
    frontmatter: {
      title: string
      summary?: string
    }
  }
}

const ArticleLayout: FC<PageProps<ArticleLayoutData>> = ({ data: { mdx } }) => {
  useEffect(() => {
    const codeNodes = document.querySelectorAll('code');

    for (let node of codeNodes) {
      hljs.highlightBlock(node);
    }
  }, []);

  const { excerpt } = mdx;
  const { title, summary } = mdx.frontmatter;

  return (
    <Layout>
      <SEO title={title} description={summary || excerpt} />

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
      excerpt
      frontmatter {
        title
      }
    }
  }
`;

export default ArticleLayout;