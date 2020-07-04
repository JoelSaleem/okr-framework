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

export const OBJECTIVE = gql`
  query Objective($id: Int!) {
    objective(id: $id) {
      id
      title
      description
      createdAt
    }
  }
`;
