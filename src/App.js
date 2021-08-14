import { ChakraProvider, Heading } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import { ReactQueryDevtools } from "react-query/devtools";
import Post from "./Post/Post";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchInterval: 1,
      },
    },
  });
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/post/:id">
              <Post />
            </Route>
            <Route path="/:id" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
