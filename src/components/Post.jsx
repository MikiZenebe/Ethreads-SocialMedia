/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import ActionButtons from "./ActionButtons";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import useShowToast from "../hooks/useShowToast";

export default function Post({ post, userId, postedBy }) {
  const [liked, setLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
  }, []);

  return (
    <Link to={``}>
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
                <Avatar src="/profile.jpg" />
                <Flex flexDirection="column">
                  <Flex gap="1" flexDirection="row" alignItems="center">
                    <Text
                      fontWeight="normal"
                      color={"gray.200"}
                      _light={{ color: "black" }}
                    >
                      Mikiyas
                    </Text>
                    <Image w="13px" src="/Verified.svg" />
                    <Text fontSize="11" color={"gray.500"}>
                      @mikizenebe
                    </Text>
                  </Flex>

                  <Text fontSize="11" color={"gray.500"}>
                    Few hours ago
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

              <Flex
                w="full"
                gap="1"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex alignItems="center" onClick={(e) => e.preventDefault()}>
                  {/* <Avatar src="/profile.jpg" w="5" h="5" mx="0.75" />
                      <Avatar src="/profile.jpg" w="5" h="5" mx="0.75" />
                      <Avatar src="/profile.jpg" w="5" h="5" mx="0.75" /> */}
                  <Text color={"gray.500"} ml="0.5">
                    {post.likes.length} likes
                  </Text>
                </Flex>

                <Flex>
                  <Text color={"gray.500"}>{post.replies.length} Comments</Text>
                </Flex>
              </Flex>

              <Flex>
                <ActionButtons liked={liked} setLiked={setLiked} />
              </Flex>
            </Flex>
          </Flex>
        </>
      </Flex>
    </Link>
  );
}
