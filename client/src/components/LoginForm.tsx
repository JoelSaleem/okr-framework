import { useState, ChangeEvent } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";

import { Card } from "./Card";
import { Button } from "./Button";
import { Input } from "./Input";

import { LOGIN_MUTATION, TOKEN_KEY } from "../../requests/auth";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [login, { data, error, called }] = useMutation(LOGIN_MUTATION, {
    variables: { username, password },
  });

  if (!error && data?.login?.token && called) {
    localStorage.setItem(TOKEN_KEY, data?.login?.token);
    Router.push("/");
  }

  return (
    <div className="flex flex-auto w-100" style={styles.containerStyles}>
      <Card>
        <div className="flex flex-column flex-auto justify-center">
          <div className="flex-column flex">
            <Input
              label="Username"
              value={username}
              onChange={onUsernameChange}
            />
            <Input
              label="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <div className="flex justify-center items-center ma1">
            <Button
              style={styles.buttonStyles}
              classNames="ma1 flex-auto"
              onClick={() => login()}
            >
              Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const styles = {
  containerStyles: {
    maxHeight: 200,
    padding: 20,
    minWidth: 300,
    maxWidth: 700,
  },
  buttonStyles: { maxWidth: 200, maxHeight: 44 },
};
