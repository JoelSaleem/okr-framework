import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { OBJECTIVES } from "../../Queries";
import { Objective } from "../../types";
import { ListItem } from "../ListItem";
import { useRouter } from "next/router";

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 80vh;
`;

export const ObjectivesList = () => {
  const { data } = useQuery(OBJECTIVES);
  const router = useRouter();

  const objectives: Objective[] = data?.objectives ?? [];
  const selectObjective = (id: number) =>
    router.push({
      pathname: "/objective",
      query: { id },
    });

  return (
    <ListWrapper>
      {objectives.map(({ id, title, description, createdAt }) => {
        return (
          <ListItem
            withHover
            onClick={() => selectObjective(id)}
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
