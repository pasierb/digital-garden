import React, { FC } from 'react';
import { graphql, PageProps } from "gatsby"
import SEO from './seo';
import Layout from './layout';

interface ArticleLayoutData {
  markdownRemark: {
    id: string
    html: any
    excerpt: string
    frontmatter: {
      title: string
      summary?: string
      stencilbot?: string
    }
  }
}

const ArticleLayout: FC<PageProps<ArticleLayoutData>> = ({ data: { markdownRemark } }) => {
  const { excerpt } = markdownRemark;
  const { title, summary, stencilbot } = markdownRemark.frontmatter;

  return (
    <Layout>
      <SEO title={title} description={summary || excerpt} stencilbot={stencilbot} />

      <article>
        <h1>{markdownRemark.frontmatter.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
      </article>
    </Layout>
  )
};

export const pageQuery = graphql`
  query ArticleQuery($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        title
        stencilbot
        summary
      }
    }
  }
`;

export default ArticleLayout;