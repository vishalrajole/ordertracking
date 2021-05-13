import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import theme from "./styles/theme";
import GlobalStyle from "./styles/normalize";
import Trackings from "./pages/Trackings";
import TrackingDetails from "./pages/TrackingDetails";
import Login from "./pages/Login";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  display: flex;
  align-items: center;
  justify-contents: center;
`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Container>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={Login} />
                <Route path="/trackings" component={Trackings} />
                <Route
                  path="/tracking-details/:trackingId"
                  component={TrackingDetails}
                />
              </Switch>
            </BrowserRouter>
          </Container>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
