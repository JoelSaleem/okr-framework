import { LoginForm } from "../src/components/LoginForm";

export default () => {
  return (
    <div
      className="container bg-purple light-gray h-100 w-100"
      style={{ justifyContent: "flex-start", paddingTop: "10%" }}
    >
      <h1 className="link b black hover-orange">Login</h1>
      <LoginForm />
    </div>
  );
};
