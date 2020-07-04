import { useRouter } from "next/router";
import { ObjectiveForm } from "./ObjectiveForm";

import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState } from "react";

import { OBJECTIVE } from "../../Queries";
import { UPDATE_OBJECTIVE } from "../../Mutations";

interface ObjectiveUpdate {
  id: number;
}

export const ObjectiveUpdate: React.FC<ObjectiveUpdate> = ({ id }) => {
  const router = useRouter();
  const { data, loading } = useQuery(OBJECTIVE, { variables: { id } });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  let formattedDate: string | null = null;
  if (data?.objective?.createdAt) {
    formattedDate = new Date(data?.objective?.createdAt).toString();
  }

  // Set data after query fetched
  useEffect(() => {
    if (!loading) {
      setTitle(() => data?.objective?.title ?? "");
      setDescription(() => data?.objective?.description ?? "");
    }
  }, [loading]);

  const [updateObjective, { loading: updateLoading }] = useMutation(
    UPDATE_OBJECTIVE,
    {
      variables: data?.objective ? { id, title, description } : { id },
    }
  );

  return (
    <ObjectiveForm
      id={id.toString()}
      title={title}
      description={description}
      createdAt={formattedDate}
      setTitle={setTitle}
      setDescription={setDescription}
      updateLoading={updateLoading}
      onSubmit={updateObjective}
      onBack={() => {
        router.push({
          pathname: "/objectives",
        });
      }}
      submitText={"Save"}
    />
  );
};
