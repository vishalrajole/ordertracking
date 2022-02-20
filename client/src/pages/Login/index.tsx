import { useState, FunctionComponent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { LOGIN_MUTATION } from "./queries";
import EmailValidator from "../../utils/EmailValidator";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Form, Label, ErrorText } from "../../styles/form";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [login, result] = useMutation(LOGIN_MUTATION, {
    onError: () => {},
  });

  useEffect(() => {
    if (result?.data) {
      const token = result.data.login.token;
      localStorage.setItem("token", token); // temporarily storing email into localstorage
      localStorage.setItem("email", email);
      navigate("/trackings");
    }
  }, [result.data]);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: email },
    } = e;
    const emailError = EmailValidator(email);
    if (emailError) {
      setIsDisabled(true);
      setError(emailError);
    } else {
      setIsDisabled(false);
      setError(null);
    }
    setEmail(email);
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login({ variables: { email } });
  };

  return (
    <Card
      title="Please enter your email address to see your recent orders"
      data-testid="login-title"
    >
      <Form>
        <Label data-testid="email-label">Email</Label>
        <Input
          type="text"
          value={email}
          placeholder="Eg. test@gmail.com"
          onChange={onEmailChange}
          required={true}
          dataTestId="email-input"
        />
        {error && <ErrorText data-testid="email-error">{error}</ErrorText>}

        <Button
          disabled={isDisabled}
          onClick={onSubmit}
          dataTestId="login-send"
        >
          Send
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
