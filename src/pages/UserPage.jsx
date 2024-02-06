import { useEffect, useState } from "react";
import { Post, UserHeader } from "../components";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import postsAtom from "../atoms/postsAtom";
import { useRecoilState } from "recoil";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getPost = async () => {
      setFetchingPosts(true);

      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getUser();
    getPost();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user && !loading)
    return (
      <Flex height={"70vh"} justifyContent={"center"} alignItems={"center"}>
        <Flex fontSize={"4xl"} gap={"3"}>
          User not found
          <Flex className="animate-bounce">😥</Flex>
        </Flex>
      </Flex>
    );
  return (
    <>
      <UserHeader user={user} />

      {!fetchingPosts && posts.length === 0 && (
        <Flex height={"70vh"} justifyContent={"center"} alignItems={"center"}>
          <Flex fontSize={"4xl"} gap={"3"}>
            User has not posts
            <Flex className="animate-bounce">😥</Flex>
          </Flex>
        </Flex>
      )}

      {fetchingPosts && (
        <Flex justifyContent={"center"} my={"12"}>
          <Spinner size="xl" />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
}
