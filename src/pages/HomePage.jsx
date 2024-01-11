import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Link to={`/mikizenebe`}>
        <Flex w={"full"} justifyContent={"center"}>
          <Button mx={"auto"}>Visit Profile Page</Button>
        </Flex>
      </Link>
    </>
  );
}
