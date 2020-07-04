import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { KEY_RESULTS, KEY_RESULT_OF_PARENT } from "../../Queries";
import { KeyResult } from "../../types";
import { KeyResultListItem } from "../List/KeyResultListItem";
import { useRouter } from "next/router";

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 80vh;
`;

interface KeyResultList {
  parent?: number | undefined;
}

export const KeyResultList: React.FC<KeyResultList> = ({ parent }) => {
  const router = useRouter();

  let keyResults: KeyResult[] = [];

  const { data: noParentQuery } = useQuery(KEY_RESULTS);
  const { data: queryWithParent } = useQuery(KEY_RESULT_OF_PARENT, {
    variables: {
      parent,
    },
  });

  if (parent) {
    keyResults = queryWithParent?.keyResultsOfObjective ?? [];
  } else {
    keyResults = noParentQuery?.keyResults ?? [];
  }

  const selectKR = (id: number) =>
    router.push({
      pathname: "/keyresult",
      query: { id },
    });

  return (
    <ListWrapper>
      {keyResults.map(({ id, title, current, target }) => {
        return (
          <KeyResultListItem
            withHover
            onClick={() => selectKR(id)}
            key={id}
            id={id}
            title={title}
            current={current}
            target={target}
          />
        );
      })}
    </ListWrapper>
  );
};
