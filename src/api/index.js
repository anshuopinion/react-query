import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization:
      "Bearer 007799281949d89788d14812e4014006d629ed8ccd4d8941977827f383d4643a",
  },
});

export const addNewPost = async ({ title, body }) => {
  try {
    const { data } = await api.post(
      `users/1891/posts`,
      {
        title,
        body,
      },
      {
        headers: {
          Authorization:
            "Bearer 007799281949d89788d14812e4014006d629ed8ccd4d8941977827f383d4643a",
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error.response.statusText);
  }
};

export const updatePost = async ({ title, body, id }) => {
  try {
    const { data } = await api.patch(
      `posts/${id}`,
      {
        title,
        body,
      },
      {
        headers: {
          Authorization:
            "Bearer 007799281949d89788d14812e4014006d629ed8ccd4d8941977827f383d4643a",
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error.response.statusText);
  }
};
export const deletePost = async ({ id }) => {
  try {
    const { data } = await api.delete(
      `posts/${id}`,

      {
        headers: {
          Authorization:
            "Bearer 007799281949d89788d14812e4014006d629ed8ccd4d8941977827f383d4643a",
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error.response.statusText);
  }
};
export const fetchPosts = async (id) => {
  try {
    const { data } = await api.get(`users/1891/posts?page=${id}`);

    return data;
  } catch (error) {
    throw Error("Unable to fetch Posts");
  }
};

export const fetchPost = async (id) => {
  try {
    const { data } = await api.get(`posts/${id}`);

    return data;
  } catch (error) {
    throw Error("Unable to fetch Post");
  }
};
