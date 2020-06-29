import styled from "styled-components";
import { Card } from "../components/Layout/Card";
import { LoginForm } from "../components/Login/LoginForm";
import { LOGIN } from "../components/Login/LoginMutations";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 60%;
`;

const Heading = styled.h1`
  text-align: center;
  grid-area: 1 / 2 / 2 / 3;
`;

const CentreGrid = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

export default () => {
  return (
    <Grid>
      <Heading>OKR</Heading>
      <CentreGrid>
        <Card>
          <LoginForm buttonText="Login" submitMutation={LOGIN} />
        </Card>
      </CentreGrid>
    </Grid>
  );
};
