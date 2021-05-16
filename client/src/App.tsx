import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import theme from "./styles/theme";
import GlobalStyle from "./styles/normalize";
import Trackings from "./pages/Trackings";
import TrackingDetails from "./pages/TrackingDetails";
import Login from "./pages/Login";

export const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="/login" component={Login} />
              <Route path="/trackings" component={Trackings} />
              <Route
                path="/tracking-details/:tracking_number"
                component={TrackingDetails}
              />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
