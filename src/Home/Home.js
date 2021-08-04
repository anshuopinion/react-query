import { useQuery } from "react-query";
import axios from "axios";
import React from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

const fetchPosts = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v1/posts");

    return data;
  } catch (error) {
    throw Error("Unable to fetch Posts");
  }
};
const Home = () => {
  const toast = useToast();
  const { data, isLoading } = useQuery("posts", fetchPosts, {
    onError: (error) => {
      toast({ status: "error", title: error.message });
    },
  });

  return (
    <Container maxW="1300px" mt="4">
      {isLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
          {data.data.map((post) => (
            <Stack
              p="4"
              boxShadow="md"
              borderRadius="xl"
              border="1px solid #ccc"
              key={post.id}
              mb="4"
            >
              <Flex justify="space-between">
                <Text>UserId: {post.user_id}</Text>
                <Text>PostId: {post.id}</Text>
              </Flex>
              <Heading fontSize="2xl">{post.title}</Heading>
              <Text>{post.body}</Text>
            </Stack>
          ))}
        </>
      )}
    </Container>
  );
};

export default Home;
