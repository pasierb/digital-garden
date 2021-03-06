/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = result.data.allMarkdownRemark.edges

  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    const slug =
      node.frontmatter.slug?.trim() ||
      node.frontmatter.title.toLowerCase().replace(/\W+/, "-")

    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/article-layout.tsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
