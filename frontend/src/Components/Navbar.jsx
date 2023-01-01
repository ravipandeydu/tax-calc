import {
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      bg={useColorModeValue("red.200", "teal")}
      borderBottom="0.5px solid #b1b3b5"
      px={6}
      align="center"
      justify="center"
      wrap="nowrap"
      position={"sticky"}
      top={0}
      zIndex={10}
    >
      <Link to="/">
        <Text px={6} py={2} fontSize="xl">
        CSV
        </Text>
      </Link>
      <Link to="/json">
        <Text px={6} py={2} fontSize="xl">
          File with JSON
        </Text>
      </Link>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Navbar;
