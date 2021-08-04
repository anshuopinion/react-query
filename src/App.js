import { ChakraProvider, Heading } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Heading>Hello React Query</Heading>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
