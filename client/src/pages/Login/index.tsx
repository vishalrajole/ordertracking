import { useState, FunctionComponent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Form, Label, ErrorText } from "../../styles/form";
import EmailValidator from "../../utils/EmailValidator";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LOGIN_MUTATION } from "./queries";

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>("");
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
    <Card title="Please enter your email address to see your recent orders">
      <Form>
        <Label>Email</Label>
        <Input
          type="text"
          value={email}
          placeholder="Eg. test@gmail.com"
          onChange={onEmailChange}
          required={true}
        />
        {error && <ErrorText>{error}</ErrorText>}

        <Button disabled={isDisabled} onClick={onSubmit}>
          Send
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
