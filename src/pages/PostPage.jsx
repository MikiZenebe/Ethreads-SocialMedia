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
  Text,
  useToast,
} from "@chakra-ui/react";

import { HiDotsHorizontal } from "react-icons/hi";
import { ActionButtons, Comment } from "../components/index";
import { useState } from "react";

export default function PostPage() {
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  //Copy the username link to clipboard
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Copied",
        status: "success",
        description: "Post link copied ⚡",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    });
  };

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

            <Box onClick={(e) => e.preventDefault()} color={"gray.500"}>
              <Menu>
                <MenuButton>
                  <HiDotsHorizontal />
                </MenuButton>

                <Portal>
                  <MenuList>
                    <MenuItem onClick={copyURL}>Copy post link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>

          <Flex mx="4" flexDirection="column" gap="3">
            <Text _light={{ color: "#1B2730" }} _dark={{ color: "gray.100" }}>
              Developer, frontend web developer and UI/UX designerDeveloper,
              frontend web developer and UI/UX designer Developer, frontend web
              developer and UI/UX designer
            </Text>
            <Box
              borderRadius={10}
              overflow="hidden"
              border="1px solid"
              borderColor="gray.light"
            >
              <Image src="/profile.jpg" w="full" h="350px" objectFit="cover" />
            </Box>

            <Flex
              w="full"
              gap="1"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center" onClick={(e) => e.preventDefault()}>
                <Text color={"gray.500"} ml="0.5">
                  {58 + (liked ? 1 : 0)} likes
                </Text>
              </Flex>

              <Flex alignItems="center" onClick={(e) => e.preventDefault()}>
                {/* <Avatar src="/profile.jpg" w="5" h="5" mx="0.75" />
                <Avatar src="/profile.jpg" w="5" h="5" mx="0.75" />
                <Avatar src="/profile.jpg" w="5" h="5" mx="0.75" /> */}
                <Text color={"gray.500"}>58 Comments</Text>
              </Flex>
            </Flex>

            <Flex>
              <ActionButtons liked={liked} setLiked={setLiked} />
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
            <Comment />
            <Comment />
            <Comment />
          </Flex>
        </Flex>
      </>
    </Flex>
  );
}
