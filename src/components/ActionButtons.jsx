import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GoHeart, GoComment, GoShare, GoHeartFill } from "react-icons/go";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

export default function ActionButtons({ post }) {
  const user = useRecoilState(userAtom);
  const [liked, setLiked] = useState(post?.likes.includes(user?._id));
  const showToast = useShowToast();
  const [posts, setPosts] = useState(post);

  const handleLikeUnlike = async () => {
    if (!user)
      return showToast(
        "Error",
        "You must be logged in to perform this action",
        "error"
      );

    try {
      const res = await fetch("/api/posts/like/" + posts._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (!liked) {
        //Add the id of the current user to posts.likes array
        setPosts({ ...posts, likes: [...posts.likes, user._id] });
      } else {
        //Remove the id of the current user from post.likes array
        setPosts({ ...posts, likes: [...posts.likes, user._id] });
      }

      setLiked(!liked);
      if (data.error) return showToast("Error", data.error, "error");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex
      onClick={(e) => e.preventDefault()}
      className="flex flex-col gap-3 w-full"
    >
      <Flex gap="1" flexDirection="row" justifyContent="space-between">
        <Flex alignItems="center" onClick={(e) => e.preventDefault()}>
          <Text>{post?.likes.length} likes</Text>
        </Flex>

        <Flex>
          <Text color={"gray.500"}>{post?.replies.length} Comments</Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection="row"
        gap="3"
        onClick={(e) => e.preventDefault()}
        w="full"
      >
        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap="1.5"
          onClick={handleLikeUnlike}
          cursor="pointer"
        >
          {liked ? <GoHeartFill fill="red" /> : <GoHeart />}
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap="1.5"
          cursor="pointer"
        >
          <GoComment />
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap="1.5"
          cursor="pointer"
        >
          <GoShare />
        </Flex>
      </Flex>
    </Flex>
  );
}
