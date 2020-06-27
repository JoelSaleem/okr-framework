import styled from "styled-components";
import { Card } from "../components/Card";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 10%;
`;

const Heading = styled.h1`
  grid-area: 1 / 2 / 2 / 3;
`;

const CentreGrid = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

export default () => {
  return (
    <Grid>
      <Heading>Title</Heading>
      <CentreGrid>
        <Card>Hrl</Card>
      </CentreGrid>
    </Grid>
  );
};
