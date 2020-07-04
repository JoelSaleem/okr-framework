import styled from "styled-components";
import { useRouter } from "next/router";
import { Objective } from "../../types";
import { useQuery } from "@apollo/react-hooks";
import { OBJECTIVES } from "../../Queries";
import { ListItem } from "../ListItem";

const Container = styled.div`
  text-align: center;
  padding: 4px;
  height: 100%;
  cursor: pointer;
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
  const router = useRouter();

  const { data } = useQuery(OBJECTIVES);
  const objectives: Objective[] = data?.objectives ?? [];

  const onClick = () => {
    router.push({
      pathname: "/objectives",
    });
  };

  return (
    <Container onClick={onClick}>
      <h3>Objectives</h3>
      <List isSmallScreen={isSmallScreen}>
        {objectives.map(({ createdAt, description, title, id }) => {
          return (
            <ListItem
              id={id}
              createdAt={createdAt}
              description={description}
              title={title}
              key={id}
            />
          );
        })}
      </List>
    </Container>
  );
};
