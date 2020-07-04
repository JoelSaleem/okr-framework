import styled from "styled-components";
import { Card } from "../components/Layout/Card";
import { ObjectivesList } from "../components/Objectives/ObjectivesList";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 10%;
  text-align: center;
`;

const Heading = styled.h3`
  grid-area: 1 / 2 / 2/ 3;
`;

const BodyWrapper = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

export default () => {
  return (
    <Grid>
      <Heading>Objectives</Heading>
      <BodyWrapper>
        <Card>
          <ObjectivesList />
        </Card>
      </BodyWrapper>
    </Grid>
  );
};
