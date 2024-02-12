/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Post } from "../components";
import postsAtom from "../atoms/postsAtom";
import { useRecoilState } from "recoil";
import { APIEndPoint } from "../baseUrl";

export default function HomePage() {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(APIEndPoint + "/api/posts/feed");
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [setPosts]);

  console.log(posts);

  return (
    <>
      {loading && (
        <Flex justify={"center"}>
          <Spinner size="xl" />
        </Flex>
      )}
      {!loading && posts.length === 0 && (
        <Flex height={"70vh"} justifyContent={"center"} alignItems={"center"}>
          <Flex fontSize={"3xl"} gap={"3"}>
            Follow some users to see the feed
            <Flex className="animate-bounce">😌</Flex>
          </Flex>
        </Flex>
      )}

      {posts &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
}
