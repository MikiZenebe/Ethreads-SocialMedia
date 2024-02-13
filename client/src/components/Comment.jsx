import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { BsThreeDots } from "react-icons/bs";

export default function Comment({ reply }) {
  return (
    <>
      <Flex gap="4" w="full">
        <Avatar src="/profile.jpg" size="sm" />

        <Flex gap="1" w="full" flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                {reply.name}
              </Text>
              <Text fontSize="12" color={"gray.500"}>
                @{reply.username}
              </Text>
            </Flex>
            <Flex>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text>{reply.text}</Text>
        </Flex>
      </Flex>

      <Divider />
    </>
  );
}
