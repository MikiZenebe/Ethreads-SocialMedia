import { useEffect, useState } from "react";
import { UserHeader, UserPost } from "../components";
import { useParams } from "react-router-dom";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user && !loading)
    return (
      <Flex height={"70vh"} justifyContent={"center"} alignItems={"center"}>
        <Flex fontSize={"4xl"} gap={"3"}>
          User not found
          <Flex className="animate-bounce">😥</Flex>
        </Flex>
      </Flex>
    );
  return (
    <>
      <UserHeader user={user} />
      <UserPost />
    </>
  );
}
