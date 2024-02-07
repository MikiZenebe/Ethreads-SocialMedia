/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import ActionButtons from "./ActionButtons";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import useCopyUrl from "../hooks/useCopyUrl";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsFillImageFill } from "react-icons/bs";

export default function Post({ post, postedBy }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: imageOpen,
    onOpen: imageOnOpen,
    onClose: imageClose,
  } = useDisclosure();
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);

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

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
      } else {
        showToast("Success", "Post deleted", "success");
      }
    } catch (error) {}
  };

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

              <Flex onClick={(e) => e.preventDefault()} color={"gray.500"}>
                {currentUser?._id === user?._id ? (
                  <DeleteIcon onClick={onOpen} />
                ) : (
                  <HiDotsHorizontal />
                )}
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
                isOpen={imageOpen}
                onOpen={imageOnOpen}
                onClose={imageClose}
              />

              <Flex>
                <ActionButtons post={post} />
              </Flex>
            </Flex>
          </Flex>
        </>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent width={"auto"} height={"auto"}>
          <ModalHeader>Deleting Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text>Are you sure? you want to delete this post?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleDeletePost}
              color={useColorModeValue("#ffffff", "#ffffff")}
              bg={useColorModeValue("#a12312", "#a12312")}
              mr={3}
            >
              Delete
            </Button>
            <Button bg={useColorModeValue("#fafafa", "#1B2730")} mr={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Link>
  );
}
