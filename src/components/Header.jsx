import { Image, Flex, useColorMode } from "@chakra-ui/react";
import { HiSun, HiMoon } from "react-icons/hi";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      className="topbar backdrop-blur-lg"
      justifyContent={"space-between"}
      alignItems={"center"}
      my="4"
    >
      <Flex>
        {colorMode === "dark" ? (
          <Image src={"/light.png"} w={8} h={8} />
        ) : (
          <Image src={"/dark.png"} w={8} h={8} />
        )}
      </Flex>

      <Flex className="cursor-pointer flex items-center gap-2">
        <Flex onClick={toggleColorMode}>
          {colorMode === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
        </Flex>

        <Flex>
          <LogoutButton />
        </Flex>
      </Flex>
    </Flex>
  );
}
