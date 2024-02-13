import {
  Image,
  Flex,
  useColorMode,
  Button,
  Box,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { HiSun, HiMoon } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";
import { FiLogOut, FiLogIn, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      className="topbar backdrop-blur-lg"
      justifyContent={"space-between"}
      alignItems={"center"}
      my="4"
    >
      <Flex>
        <Link to={`/`}>
          {colorMode === "dark" ? (
            <Image src={"/light.png"} w={8} h={8} />
          ) : (
            <Image src={"/dark.png"} w={8} h={8} />
          )}
        </Link>
      </Flex>

      <Flex className="cursor-pointer flex items-center gap-4">
        <Flex onClick={toggleColorMode}>
          {colorMode === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
        </Flex>

        {user && (
          <Flex>
            <Box onClick={(e) => e.preventDefault()} color={"gray.500"}>
              <Menu>
                <MenuButton>
                  <Avatar size={"xs"} src={user.profilePic} />
                </MenuButton>

                <Portal>
                  <MenuList>
                    <MenuItem>
                      <Flex className="flex-col gap-2 items-center">
                        <Link to={`/${user.username}`}>
                          <Flex flexDir={"row"} alignItems={"center"} gap={3}>
                            <span>Profile</span>
                            <FiUser size={20} />
                          </Flex>
                        </Link>
                      </Flex>
                    </MenuItem>

                    <MenuItem>
                      <Flex
                        onClick={logout}
                        flexDir={"row"}
                        alignItems={"center"}
                        gap={3}
                      >
                        <span>Logout</span>
                        <FiLogOut size={20} />
                      </Flex>
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        )}
        {!user && (
          <Button
            size={"xs"}
            to={"/auth"}
            onClick={() => setAuthScreen("login")}
          >
            <FiLogIn size={20} />
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
