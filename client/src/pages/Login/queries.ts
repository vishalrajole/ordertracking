import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!) {
    login(email: $email) {
      token
      email
    }
  }
`;
