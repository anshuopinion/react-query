import { useQuery } from "react-query";
import axios from "axios";
import React from "react";
import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

const fetchPost = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v1/posts/${id}`
    );

    return data;
  } catch (error) {
    throw Error("Unable to fetch Post");
  }
};
const Post = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  const toast = useToast();
  const { data, isLoading } = useQuery(["post", id], () => fetchPost(id), {
    keepPreviousData: true,
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
          <Stack
            p="4"
            boxShadow="md"
            borderRadius="xl"
            border="1px solid #ccc"
            key={data.data.id}
            mb="4"
          >
            <Flex justify="space-between">
              <Text>UserId: {data.data.user_id}</Text>
              <Text>postId: {data.data.id}</Text>
            </Flex>
            <Heading fontSize="2xl">{data.data.title}</Heading>
            <Text>{data.data.body}</Text>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Post;
