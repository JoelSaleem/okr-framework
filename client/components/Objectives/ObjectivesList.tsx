import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { OBJECTIVES, OBJECTIVES_OF_PARIENT } from "../../Queries";
import { Objective } from "../../types";
import { ObjectiveListItem } from "../List/ObjectiveListItem";
import { useRouter } from "next/router";

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 80vh;
`;

export const ObjectivesList = () => {
  const router = useRouter();
  const parent = router.query?.parent;
  const { data: allObjectives } = useQuery(OBJECTIVES);
  const { data: childObjectives } = useQuery(OBJECTIVES_OF_PARIENT, {
    variables: {
      parent: parseInt(parent as string),
    },
  });

  let objectives: Objective[] = [];
  if (parent) {
    objectives = childObjectives?.objectivesOfParent ?? [];
  } else {
    objectives = allObjectives?.objectives ?? [];
  }

  const selectObjective = (id: number) =>
    router.push({
      pathname: "/objective",
      query: { id },
    });

  return (
    <ListWrapper>
      {objectives.map(({ id, title, description, createdAt }) => {
        return (
          <ObjectiveListItem
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
