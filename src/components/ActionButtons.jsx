import { Flex } from "@chakra-ui/react";
import { GoHeart, GoComment, GoShare, GoHeartFill } from "react-icons/go";

export default function ActionButtons({ liked, setLiked }) {
  return (
    <Flex my="">
      <Flex
        flexDirection="row"
        gap="3"
        onClick={(e) => e.preventDefault()}
        w="full"
      >
        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap="1.5"
          onClick={() => setLiked(!liked)}
          cursor="pointer"
        >
          {liked ? <GoHeartFill fill="red" /> : <GoHeart />}
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap="1.5"
          cursor="pointer"
        >
          <GoComment />
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap="1.5"
          cursor="pointer"
        >
          <GoShare />
        </Flex>
      </Flex>
    </Flex>
  );
}
