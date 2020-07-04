import { gql } from "apollo-boost";

export const OBJECTIVES = gql`
  {
    objectives {
      id
      title
      description
      createdAt
    }
  }
`;
