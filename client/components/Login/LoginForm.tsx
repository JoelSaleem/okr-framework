import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { LabelInput } from "../Layout/LabelInput";
import { Button } from "../Layout/Button";
import { LOGIN } from "./LoginMutations";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../pages/_app";
import { DocumentNode } from "graphql";

const Container = styled.div`
  min-width: 330px;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 10%;
  height: 100%;
`;

const CentreWrapper = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  grid-template-rows: 10% repeat(3, 1fr) 10%;
`;

const EmailWrapper = styled.div`
  grid-area: 2 / 1 / 3 / 2;
`;

const PasswordWrapper = styled.div`
  grid-area: 3 / 1 / 4 / 2;
`;

const SubmitWrapper = styled.div`
  grid-area: 4 / 1 / 5 / 2;
`;

interface LoginFormProps {
  submitMutation: DocumentNode;
  buttonText: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  buttonText,
  submitMutation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [onSubmit, { data, loading, error }] = useMutation(submitMutation, {
    variables: {
      email,
      password,
    },
  });

  const handleSubmit = () => {
    onSubmit().then(({ data }) => {
      const token = data?.login?.token;
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    });
  };

  return (
    <Container>
      <CentreWrapper>
        <EmailWrapper>
          <LabelInput
            label="Email:"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </EmailWrapper>
        <PasswordWrapper>
          <LabelInput
            label="Password:"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </PasswordWrapper>
        <SubmitWrapper>
          {loading ? (
            "Loding..."
          ) : (
            <Button onClick={handleSubmit}>{buttonText}</Button>
          )}
        </SubmitWrapper>
      </CentreWrapper>
    </Container>
  );
};
