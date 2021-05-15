import { useState, FunctionComponent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Form, Label } from "../../styles/form";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LOGIN_MUTATION } from "./queries";

//TODO not working
const EMAIL_REGEX =
  '/(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/';

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
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
    const {
      target: { value: email },
    } = e;
    if (email.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setEmail(email);
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login({ variables: { email } });
  };

  return (
    <Card title="Please enter your email address to see your recent orders">
      <Form>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          placeholder="Eg. test@gmail.com"
          onChange={onEmailChange}
          required={true}
          pattern={EMAIL_REGEX}
        />

        <Button disabled={isDisabled} onClick={onSubmit}>
          Send
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
