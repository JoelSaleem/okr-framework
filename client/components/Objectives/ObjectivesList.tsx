import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { OBJECTIVES } from "../../Queries";
import { Objective } from "../../types";
import { ListItem } from "../ListItem";

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 80vh;
`;

export const ObjectivesList = () => {
  const { data } = useQuery(OBJECTIVES);
  const objectives: Objective[] = data?.objectives ?? [];
  return (
    <ListWrapper>
      {objectives.map(({ id, title, description, createdAt }) => {
        return (
          <ListItem
            withHover
            key={id}
            id={id}
            title={title}
            description={description}
            createdAt={createdAt}
          />
        );
      })}
    </ListWrapper>
  );
};
