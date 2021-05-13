import { useState, FunctionComponent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Title } from "./style";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { LOGIN_MUTATION } from "./queries";

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const [login, result] = useMutation(LOGIN_MUTATION, {
    onError: () => {},
  });

  useEffect(() => {
    if (result?.data) {
      const token = result.data.login.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      history.push("/trackings");
    }
  }, [result.data]);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login({ variables: { email } });
  };

  return (
    <Card>
      <form onSubmit={() => {}}>
        <Title>Please enter your email address to see your recent orders</Title>
        <div>
          <label>
            Email
            <input type="text" value={email} onChange={onEmailChange} />
          </label>
          <Button onClick={onSubmit}>Send</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
