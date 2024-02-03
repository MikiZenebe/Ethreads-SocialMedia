/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import ActionButtons from "./ActionButtons";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";

export default function Post({ post, postedBy }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy]);

  return (
    <Link to={`${user?.username}/post/${post._id}`}>
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
                <Avatar
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${user?.username}`);
                  }}
                  src={user?.profilePic}
                />
                <Flex flexDirection="column">
                  <Flex gap="1" flexDirection="row" alignItems="center">
                    <Text
                      fontWeight="normal"
                      color={"gray.200"}
                      _light={{ color: "black" }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/${user?.username}`);
                      }}
                    >
                      {user?.name}
                    </Text>
                    <Image w="13px" src="/Verified.svg" />
                    <Text fontSize="11" color={"gray.500"}>
                      @{user?.username}
                    </Text>
                  </Flex>

                  <Text fontSize="11" color={"gray.500"}>
                    {formatDistanceToNow(new Date(post.createdAt))} ago
                  </Text>
                </Flex>
              </Flex>

              <Flex color={"gray.500"}>
                <HiDotsHorizontal />
              </Flex>
            </Flex>

            <Flex mx="4" flexDirection="column" gap="3">
              <Text _light={{ color: "#1B2730" }} _dark={{ color: "gray.100" }}>
                {post.text}
              </Text>

              {post.img && (
                <Box
                  onClick={onOpen}
                  borderRadius={10}
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.light"
                >
                  <Image src={post.img} w="full" h="350px" objectFit="cover" />
                </Box>
              )}

              <ImageModal
                img={post.img}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />

              <Flex>
                <ActionButtons post={post} />
              </Flex>
            </Flex>
          </Flex>
        </>
      </Flex>
    </Link>
  );
}
