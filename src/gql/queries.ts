import { gql } from "@apollo/client";

export const GET_ASSESSMENTS = gql`
  query GetAssessments {
    assessmentCollection {
      items {
        name
        slug
        intro {
          json
        }
        questions
        resultsIntro {
          json
        }
      }
    }
  }
`;
