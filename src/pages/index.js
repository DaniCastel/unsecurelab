import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import { Home } from '../components/scenes'
import './pages.css'

export default ({ data }) => (
  <Layout>
    <Home
      blogPosts={data.postsRemark.edges}
      talksPosts={data.talksRemark.edges}
      projectsPosts={data.projectsRemark.edges}
    />
  </Layout>
)

export const query = graphql`
  fragment RemarkCollection on MarkdownRemarkConnection {
    edges {
      node {
        id
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          rawDate: date(formatString: "YYYY-MM-DD")
          title
          subtitle
          url
          conference
          type
          language
          video
          slides
          tags
        }
        fields {
          slug
          collection
          isFuture
        }
        excerpt
        timeToRead
      }
    }
  }

  query remarkByCollection {
    postsRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { published: { ne: false } }
      }
      limit: 4
    ) {
      ...RemarkCollection
    }
    talksRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { isFuture: { eq: true }, collection: { eq: "talks" } }
        frontmatter: { published: { ne: false } }
      }
      limit: 4
    ) {
      ...RemarkCollection
    }
    projectsRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { collection: { eq: "projects" } }
        frontmatter: { featured: { eq: true }, published: { ne: false } }
      }
      limit: 4
    ) {
      ...RemarkCollection
    }
  }
`

// export const query = graphql`
//   query {
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           id
//           frontmatter {
//             name
//             memberImage {
//               childImageSharp {
//                 fluid(maxWidth: 800) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//             description
//             academics
//             email
//             date(formatString: "DD MMMM, YYYY")
//             tags
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `
