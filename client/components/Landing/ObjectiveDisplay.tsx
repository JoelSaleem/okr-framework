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
  padding: 12px;
  height: 70px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  cursor: pointer;
`;

const ListTitle = styled.div`
  font-weight: 500;
`;
const List = styled.div`
  overflow: auto;
  max-height: ${({ isSmallScreen }: { isSmallScreen: boolean }) => {
    return isSmallScreen ? "20vh" : "30vh";
  }};
`;

interface ObjectiveDisplayProps {
  isSmallScreen: boolean;
}

export const ObjectiveDisplay: React.FC<ObjectiveDisplayProps> = ({
  isSmallScreen,
}) => {
  const { data } = useQuery(OBJECTIVES);
  const objectives: Objective[] = data?.objectives ?? [];
  return (
    <Container>
      <h3>Objectives</h3>
      <List isSmallScreen={isSmallScreen}>
        {objectives.map(({ createdAt, description, title, id }) => {
          return (
            <ListContainer key={id}>
              <ListTitle>Title:</ListTitle> <span>{title}</span>
              <ListTitle>Description:</ListTitle> <span>{description}</span>
              <ListTitle>Created At:</ListTitle>
              <span>{new Date(createdAt).toString()}</span>
            </ListContainer>
          );
        })}
      </List>
    </Container>
  );
};
