import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { Link, useHistory, useParams } from "react-router-dom";
import AddNewPost from "./components/AddNewPost";
import { deletePost, fetchPost, fetchPosts } from "../api";

const Home = () => {
  const cache = useQueryClient();
  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  const pageId = parseInt(id);

  const toast = useToast();
  const { data, isLoading, isSuccess } = useQuery(
    ["posts", pageId],
    () => fetchPosts(pageId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );

  const { data: singlePost } = useQuery(["post", 1315], () => fetchPost(1315), {
    enabled: isSuccess,
    onError: (error) => {
      toast({ status: "error", title: error.message });
    },
  });

  console.log("post", singlePost);
  console.log("posts", data);
  const { isLoading: isMutating, mutateAsync } = useMutation(
    "deletePost",
    deletePost,
    {
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
      onSuccess: () => {
        cache.invalidateQueries("posts");
      },
    }
  );

  return (
    <Container maxW="1300px" mt="4">
      {isLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
          <AddNewPost />
          <Flex justify="space-between" mb="4">
            <Button
              colorScheme="red"
              onClick={() => {
                if (data.meta.pagination.links.previous !== null) {
                  history.push(`/${pageId - 1}`);
                }
              }}
              disabled={!data.meta.pagination.links.previous !== null}
            >
              Prev
            </Button>

            <Text>Current Page : {pageId}</Text>
            <Button
              colorScheme="green"
              onClick={() => {
                history.push(`/${pageId + 1}`);
              }}
            >
              {" "}
              Next
            </Button>
          </Flex>
          {data.data.map((post) => (
            <Stack
              key={post.id}
              p="4"
              boxShadow="md"
              borderRadius="xl"
              border="1px solid #ccc"
              mb="4"
            >
              <Flex justify="flex-end">
                <Button
                  size="sm"
                  isLoading={isMutating}
                  onClick={async () => {
                    await mutateAsync({ id: post.id });
                  }}
                >
                  Delete
                </Button>
              </Flex>
              <Link to={`/post/${post.id}`}>
                <Stack>
                  <Flex justify="space-between">
                    <Text>UserId: {post.user_id}</Text>
                    <Text>PostId: {post.id}</Text>
                  </Flex>
                  <Heading fontSize="2xl">{post.title}</Heading>
                  <Text>{post.body}</Text>
                </Stack>
              </Link>
            </Stack>
          ))}
        </>
      )}
    </Container>
  );
};

export default Home;
