import styled from "styled-components";
import { Objective } from "../../types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const OBJECTIVES = gql`
  {
    objectives {
      id
      title
      description
      createdAt
    }
  }
`;

const Container = styled.div`
  text-align: center;
  padding: 4px;
  height: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const ObjectiveDisplay = () => {
  const { data } = useQuery(OBJECTIVES);
  const objectives: Objective[] = data?.objectives ?? [];
  return (
    <Container>
      <h3>Objectives</h3>
      <div>
        {objectives.map(({ createdAt, description, title, id }) => {
          return (
            <ListContainer key={id}>
              <span>title: {title}</span>
              <span>description: {description}</span>
              <span>createdAt: {new Date(createdAt).toString()}</span>
            </ListContainer>
          );
        })}
      </div>
    </Container>
  );
};
