import { useQuery } from "react-query";
import axios from "axios";
import React from "react";

const fetchPosts = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v1/posts");
    return data;
  } catch (error) {
    throw Error("Unable to fetch Posts");
  }
};
const Home = () => {
  const { data, isLoading, error } = useQuery("posts", fetchPosts);
  console.log(data);
  return <div></div>;
};

export default Home;
