import { gql } from "apollo-boost";

export const UPDATE_OBJECTIVE = gql`
  mutation UpdateObjective($id: Int!, $title: String, $description: String) {
    updateObjective(id: $id, title: $title, description: $description) {
      id
      title
      description
      createdAt
    }
  }
`;

export const CREATE_OBJECTIVE = gql`
  mutation Objective($title: String!, $description: String!, $parentId: Int) {
    createObjective(
      title: $title
      description: $description
      parentObjective: $parentId
    ) {
      title
      id
    }
  }
`;
