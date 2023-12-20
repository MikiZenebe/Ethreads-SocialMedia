import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import ActionButtons from "./ActionButtons";

export default function Comment() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex gap="4" w="full">
        <Avatar src="/profile.jpg" size="sm" />

        <Flex gap="1" w="full" flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Mikiyas
              </Text>
              <Text fontSize="12" color={"gray.500"}>
                5 minutes ago
              </Text>
            </Flex>
            <Flex>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text>Hey this is awesome 😍</Text>
          <Text fontSize="sm" color="gray.light">
            {50 + (liked ? 1 : 0)} likes
          </Text>
          <ActionButtons liked={liked} setLiked={setLiked} />
        </Flex>
      </Flex>

      <Divider />
    </>
  );
}
