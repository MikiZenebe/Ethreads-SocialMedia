/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { HiDotsHorizontal } from "react-icons/hi";
import { ActionButtons, Comment } from "../components/index";
import { useEffect, useState } from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { formatDistanceToNow } from "date-fns";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

export default function PostPage() {
  const showToast = useShowToast();
  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };

    getPost();
  }, []);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!post) return null;

  return (
    <Flex flexDirection="column">
      <>
        <Flex
          _dark={{ bg: "#1B2730" }}
          _light={{ bg: "#fafafa" }}
          gap="3"
          my="4"
          py="5"
          borderRadius={10}
          flexDirection="column"
        >
          <Flex
            mx="4"
            flex="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex flexDirection="row" alignItems="center" gap="3">
              <Avatar src={user.profilePic} />
              <Flex flexDirection="column">
                <Flex gap="1" flexDirection="row" alignItems="center">
                  <Text
                    fontWeight="normal"
                    color={"gray.200"}
                    _light={{ color: "black" }}
                  >
                    {user.name}
                  </Text>
                  <Image w="13px" src="/Verified.svg" />
                  <Text fontSize="11" color={"gray.500"}>
                    @{user.username}
                  </Text>
                </Flex>

                <Text fontSize="11" color={"gray.500"}>
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </Text>
              </Flex>
            </Flex>

            <Box onClick={(e) => e.preventDefault()} color={"gray.500"}>
              <Menu>
                <MenuButton>
                  {currentUser?._id === user?._id ? (
                    <DeleteIcon onClick={onOpen} />
                  ) : (
                    <HiDotsHorizontal />
                  )}
                </MenuButton>

                <Portal>
                  <MenuList>
                    <MenuItem>Copy post link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>

          <Flex mx="4" flexDirection="column" gap="3">
            <Text _light={{ color: "#1B2730" }} _dark={{ color: "gray.100" }}>
              {post.text}
            </Text>

            <Flex
              w="full"
              gap="1"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            ></Flex>

            <Flex>
              <ActionButtons post={post} />
            </Flex>

            <Divider my={1} />

            <Flex justifyContent="space-between">
              <Flex gap="2" alignItems="center">
                <Text fontSize="2xl">👋</Text>
                <Text color="gray.light">
                  Get the app to like, reply and post.
                </Text>
              </Flex>
              <Button>Get</Button>
            </Flex>

            <Divider my={1} />
            {/* <Comment /> */}
          </Flex>
        </Flex>
      </>
    </Flex>
  );
}
