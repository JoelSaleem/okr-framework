import { Objective } from "../../types";
import { useRouter } from "next/router";
import { KeyResultForm } from "./KeyResultForm";
import { useState } from "react";
import { CREATE_KEY_RESULT } from "../../Mutations";
import { useMutation } from "@apollo/react-hooks";

interface KeyResultCreateProps {
  objectiveId: number;
}

export const KeyResultCreate: React.FC<KeyResultCreateProps> = ({ id }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState(0);

  const parentId = router.query.parent;
  console.log("%c parent ", "background: purple; color: white", {
    title,
    description,
    parentId: parseInt(parentId as string),
    objective: parent,
    target,
  });
  const [createObjective, { data, loading }] = useMutation(CREATE_KEY_RESULT, {
    variables: {
      title,
      description,
      objective: parseInt(parentId as string),
      target,
    },
  });

  return (
    <KeyResultForm
      createMode
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      target={target}
      setTarget={setTarget}
      updateLoading={loading}
      submitText="Create"
      onSubmit={() => {
        createObjective().then((data) => {
          if (data?.data?.createKeyResult) {
            router.push({
              pathname: "/keyresult",
              query: {
                id: data.data?.createKeyResult?.id,
              },
            });
          }
        });
      }}
      onBack={() =>
        router.push({
          pathname: "/objectives",
        })
      }
    />
  );
};
