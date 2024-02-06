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
  Button,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BsInstagram, BsGithub, BsFacebook } from "react-icons/bs";
import { FaShare, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import useShowToast from "../hooks/useShowToast";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

export default function UserHeader({ user }) {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom); //logged in user

  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  //Copy the username link to clipboard
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      showToast("Copied", "Profile link copied ⚡", "success");
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
        position={"relative"}
      >
        <Box>
          <Avatar name="mikizenebe" src={user.profilePic} size={"lg"} />
        </Box>

        {currentUser?._id === user._id && (
          <Link to={"/update"} className="absolute right-2 top-2">
            <Button size={"sm"}>
              <AiFillSetting />
            </Button>
          </Link>
        )}

        {currentUser?._id !== user._id && (
          <Box className="absolute right-2 top-2">
            <Button
              onClick={handleFollowUnfollow}
              isLoading={updating}
              size={"sm"}
            >
              {following ? <FaUserMinus /> : <FaUserPlus />}
            </Button>
          </Box>
        )}

        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
            {user.name}
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
              @{user.username}
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
          ✨ {user.bio} ✨
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
            <Text color={"gray.500"}>{user.followers?.length} followers</Text>
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
