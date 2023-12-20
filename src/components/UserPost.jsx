import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import ActionButtons from "./ActionButtons";
import { useState } from "react";

export default function UserPost() {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={`/mikizenebe/post/1`}>
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
                Developer, frontend web developer and UI/UX designerDeveloper,
                frontend web developer and UI/UX designer Developer, frontend
                web developer and UI/UX designer
              </Text>
              <Box
                borderRadius={10}
                overflow="hidden"
                border="1px solid"
                borderColor="gray.light"
              >
                <Image
                  src="/profile.jpg"
                  w="full"
                  h="350px"
                  objectFit="cover"
                />
              </Box>

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
                    50 likes
                  </Text>
                </Flex>

                <Flex>
                  <Text color={"gray.500"}>300 Comments</Text>
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
