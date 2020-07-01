import Head from "next/head";
import styled from "styled-components";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";
import { Card } from "../components/Layout/Card";

import { ObjectiveDisplay } from "../components/Landing/ObjectiveDisplay";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 2% 1fr 10%;
  grid-template-rows: 10% 1fr 2% 1fr 10%;
`;

const Heading = styled.h1`
  text-align: center;
  grid-area: 1 / 2 / 2 / 5;
`;

const ObjectiveSpacing = styled.div`
  grid-area: 2 / 2 / 3 / 5;
`;

const KeyResultSpacing = styled.div`
  grid-area: 4 / 2 / 5 / 3;
`;

const StatsSpacing = styled.div`
  grid-area: 4 / 4 / 5 / 5;
`;

export default () => {
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token) {
      router.push({
        pathname: "/login",
      });
    }
  });

  return (
    <Grid>
      <Heading>Welcome?</Heading>
      <ObjectiveSpacing>
        <Card>
          <ObjectiveDisplay />
        </Card>
      </ObjectiveSpacing>
      <KeyResultSpacing>
        <Card />
      </KeyResultSpacing>
      <StatsSpacing>
        <Card />
      </StatsSpacing>
    </Grid>
  );
};
