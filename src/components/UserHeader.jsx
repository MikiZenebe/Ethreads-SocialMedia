import {
  VStack,
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BsInstagram, BsGithub, BsFacebook } from "react-icons/bs";
import { FaShare } from "react-icons/fa";

export default function UserHeader() {
  const toast = useToast();

  //Copy the username link to clipboard
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Copied",
        status: "success",
        description: "Profile link copied ⚡",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    });
  };

  return (
    <VStack gap={6} alignItems={"start"}>
      <Flex
        _dark={{ bg: "#1B2730" }}
        _light={{ bg: "#fafafa" }}
        borderRadius={10}
        className="shadow-lg shadow-[#1d303f]/5"
        justifyContent={"space-between"}
        w={"full"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
        p={5}
      >
        <Box>
          <Avatar name="mikizenebe" src="/profile.jpg" size={"lg"} />
        </Box>

        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
            Miki Zenebe
          </Text>

          <Flex gap={2} alignItems={"center"}>
            <Text
              fontSize={"sm"}
              flexDirection={"row"}
              textAlign={"center"}
              alignItems={"center"}
              mx={"auto"}
              color={"gray.500"}
            >
              @mikizenebe
            </Text>

            <Menu>
              <MenuButton>
                <FaShare size={14} />
              </MenuButton>

              <Portal>
                <MenuList>
                  <MenuItem onClick={copyURL}>Copy to clipboard</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
        </Box>

        <Text textAlign={"center"} alignItems={"center"} mx={"auto"}>
          ✨ Developer, frontend web developer and UI/UX designer ✨
        </Text>
        <Flex
          w={"full"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
        >
          <Flex
            gap={2}
            textAlign={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            mx={"auto"}
          >
            <Text color={"gray.500"}>500 followers</Text>
            <Box w="32" h="1" bg={"gray.500"} borderRadius={"full"}></Box>
          </Flex>

          <Flex flexDirection={"row"} color={"gray.500"} gap={5}>
            <BsInstagram
              size={18}
              cursor={"pointer"}
              className="hover:text-gray-300 transition-colors"
            />
            <BsGithub
              size={18}
              cursor={"pointer"}
              className="hover:text-gray-300 transition-colors"
            />
            <BsFacebook
              size={18}
              cursor={"pointer"}
              className="hover:text-gray-300 transition-colors"
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom="1.5px solid white"
          justifyContent="center"
          pb="3"
          cursor="pointer"
        >
          <Text fontWeight="bold">Posts</Text>
        </Flex>

        <Flex
          flex="1"
          borderBottom="1.5px solid gray"
          justifyContent="center"
          color="gray.light"
          pb="3"
          cursor="pointer"
        >
          <Text fontWeight="bold">Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}
