import { Heading, Stack, useToast } from "@chakra-ui/react";

import { Form, Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { addNewPost, updatePost } from "../../api";

const AddNewPost = ({ isUpdate, id }) => {
  const toast = useToast();
  const cache = useQueryClient();
  const { isLoading, data, mutateAsync } = useMutation(
    isUpdate ? "updatePost" : "addNewPost",
    isUpdate ? updatePost : addNewPost,
    {
      onSuccess: () => {
        // isUpdate
        //   ? cache.invalidateQueries(["post", id])
        // :
        cache.invalidateQueries("posts");
      },

      onMutate: async (newPost) => {
        if (isUpdate) {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await cache.cancelQueries("post");

          // Snapshot the previous value
          const previousPost = cache.getQueryData(["post", id]);

          // Optimistically update to the new value
          cache.setQueryData(["post", id], (old) => {
            console.log(old);
            return { data: newPost };
          });

          // Return a context object with the snapshotted value
          return { previousPost };
        }
      },
      onError: (error, newPost, context) => {
        cache.setQueryData(["post", id], context.previousPost);
        toast({ status: "error", title: error.message });
      },
      onSettled: () => {
        // cache.invalidateQueries(["post", id]);
      },
    }
  );

  return (
    <div>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          isUpdate
            ? await mutateAsync({ title: values.title, body: values.body, id })
            : await mutateAsync({ title: values.title, body: values.body });
        }}
      >
        <Form>
          <Stack my="4">
            <Heading fontSize="2xl" textAlign="center">
              {isUpdate ? "UPDATE" : "Add New"} Post
            </Heading>
            <InputControl name="title" label="Title" />
            <TextareaControl name="body" label="Content" />
            <SubmitButton isLoading={isLoading}>
              {isUpdate ? "UPDATE" : "ADD"} POST
            </SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNewPost;
