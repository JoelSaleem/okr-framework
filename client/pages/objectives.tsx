import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "../components/Layout/Button";
import { MainWrapper } from "../components/Layout/MainWrapper";
import { ObjectivesList } from "../components/Objectives/ObjectivesList";
import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 10%;
  text-align: center;
`;

const Heading = styled.h3`
  grid-area: 1 / 2 / 2 / 3;
`;

const BodyWrapper = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

export default () => {
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token) {
      router.push({
        pathname: "/login",
      });
    }
  });
  return (
    <MainWrapper heading="Objectives">
      <ObjectivesList />
      <Button
        onClick={() => {
          router.push("/objective");
        }}
      >
        Create
      </Button>
      <Button
        onClick={() => {
          router.push("/");
        }}
        secondary
      >
        Back
      </Button>
    </MainWrapper>
  );
};
