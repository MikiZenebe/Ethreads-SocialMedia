/* eslint-disable react-hooks/rules-of-hooks */
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import toast from "react-hot-toast";
import userAtom from "../atoms/userAtom";
import { APIEndPoint } from "../baseUrl";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(APIEndPoint + "/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User logged in successfully");

        setTimeout(() => {
          window.location.replace("/");
        });
      }
      //Save to the local storage
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("#fafafa", "#1B2730")}
          className="shadow-lg shadow-[#1d303f]/5"
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      email: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs((inputs) => ({
                        ...inputs,
                        password: e.target.value,
                      }))
                    }
                  />
                  <InputRightElement h="full">
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  size={"lg"}
                  bg={useColorModeValue("#1B2730", "gray.300")}
                  color={useColorModeValue("gray.300", "#1B2730")}
                  _hover={{
                    bg: useColorModeValue("#3f5d72", "gray.400"),
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Not a user?{" "}
                  <Link color={"red"} onClick={() => setAuthScreen("signup")}>
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
