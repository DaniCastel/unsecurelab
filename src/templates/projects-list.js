import React from 'react';
import { graphql } from 'gatsby';

import { ProjectsList } from '../components/scenes';

export default ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  return (
    <ProjectsList
      posts={data.allMarkdownRemark.edges}
      currentPage={currentPage}
      numPages={numPages}
    />
  );
};

export const query = graphql`
  query projectsListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___featured, frontmatter___date]
        order: [DESC, DESC]
      }
      filter: { fields: { collection: { eq: "projects" } }, frontmatter: { published: {ne: false} } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            url
            featured
          }
          excerpt
        }
      }
    }
  }
`;
