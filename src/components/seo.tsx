import React, { FC } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { factory } from '../stencilbot';
// import stencilbotConfig from '../../stencilbot.config.json';

// const getTwitterImageUrl = factory(stencilbotConfig);

interface SEOProps {
  title: string
  description?: string
  lang?: string
  meta?: {
    name: string
    content: string
  }[]
}

type SEOQueryData = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
    }
  }
}

const SEO: FC<SEOProps> = (props) => {
  const {
    title,
    description,
    lang = 'en',
    meta = []
  } = props;

  const { site } = useStaticQuery<SEOQueryData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        // {
        //   name: 'twitter:image',
        //   content: getTwitterImageUrl(props)
        // },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
