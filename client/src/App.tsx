import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

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
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/trackings" element={<Trackings />} />
              <Route
                path="/tracking-details/:tracking_number"
                element={<TrackingDetails />}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
