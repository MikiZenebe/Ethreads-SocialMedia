import { Flex, Text } from "@chakra-ui/react";
import { GoHeart, GoComment, GoShare } from "react-icons/go";

export default function ActionButtons({ liked, setLiked }) {
  return (
    <Flex mx="4" my="2">
      <Flex
        flexDirection="row"
        gap="5"
        onClick={(e) => e.preventDefault()}
        w="full"
      >
        <Flex
          alignItems="center"
          flexDirection="row"
          _dark={{ bg: "#28343E" }}
          _light={{ bg: "gray.200", color: "#28343E" }}
          py="2"
          w="130px"
          justifyContent="center"
          borderRadius="10"
          gap="1.5"
          onClick={() => setLiked(!liked)}
        >
          {liked ? <span className="animate-bounce">😍🥰</span> : <GoHeart />}
          <Text className={liked ? "hidden" : "flex"}>Like</Text>
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="row"
          _dark={{ bg: "#28343E" }}
          _light={{ bg: "gray.200", color: "#28343E" }}
          w="150px"
          justifyContent="center"
          py="2"
          borderRadius="10"
          gap="1.5"
        >
          <GoComment />
          Comment
        </Flex>

        <Flex
          color="gray.100"
          alignItems="center"
          flexDirection="row"
          _dark={{ bg: "#28343E" }}
          _light={{ bg: "gray.200", color: "#28343E" }}
          w="130px"
          justifyContent="center"
          py="2"
          borderRadius="10"
          gap="1.5"
        >
          <GoShare />
          Share
        </Flex>
      </Flex>
    </Flex>
  );
}
