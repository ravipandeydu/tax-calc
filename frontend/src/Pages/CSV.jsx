import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInput, getResult } from "../Redux/tax/tax.actions";

const CSV = () => {
  const toast = useToast();
  const [csv, setCsv] = useState({});
  const invoices = useSelector((state) => state.tax.input);
  const result = useSelector((state) => state.tax.result);
  const loading = useSelector((state) => state.tax.loading);
  const error = useSelector((state) => state.tax.error);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(getInput(csv));
  }
  function handleResult() {
    dispatch(getResult(csv));
  }
  return (
    <Box align={"center"}>
      <Box>
        <Input
          pt="5px"
          maxW={"2xl"}
          type={"file"}
          my={5}
          onChange={(e) => setCsv(e.target.files[0])}
        />
        <Button onClick={handleSubmit}>Check Input</Button>

        <Button onClick={handleResult} disabled={invoices?.length < 1}>
          Get Result
        </Button>
        {invoices?.length > 0 ? (
          <Box maxW={"2xl"}>
            <Heading my={5}>Invoices</Heading>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th color="red" fontSize={"18px"}>
                      S.No
                    </Th>
                    <Th color="red" fontSize={"18px"}>
                      Amount
                    </Th>
                    <Th color="red" fontSize={"18px"}>
                      Item Type
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {invoices.map((item, i) => (
                    <Tr key={i}>
                      <Td>{item.s}</Td>
                      <Td>{item.amount}</Td>
                      <Td>{item.type}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          ""
        )}
      </Box>
      {result?.length > 0 ? (
        <Box maxW={"2xl"}>
          <Heading my={5}>Result</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th color="red" fontSize={"18px"}>
                    S.No
                  </Th>
                  <Th color="red" fontSize={"18px"}>
                    Amount
                  </Th>
                  <Th color="red" fontSize={"18px"}>
                    Item Type
                  </Th>
                  <Th color="red" fontSize={"18px"}>
                    Tax
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {result.map((item, i) => (
                  <Tr key={i}>
                    <Td>{item.s}</Td>
                    <Td>{item.amount}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.tax}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Divider />
          <form action="https://tax-calc.onrender.com/result" method="get">
            <Button type="submit">Download Result</Button>
          </form>
        </Box>
      ) : (
        ""
      )}
      {loading ? (
        <Flex
          w="100vw"
          h={"100vh"}
          mx={"auto"}
          align={"center"}
          justify={"center"}
          bg={"rgba(245,250,254,.5)"}
          backgroundBlendMode={"hard-light"}
          position={"absolute"}
          top={"0"}
          left={"0"}
        >
          <Image
            borderRadius={"50%"}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
          />
        </Flex>
      ) : (
        ""
      )}
      {error ? (
        <Flex
          w="100vw"
          h={"100vh"}
          mx={"auto"}
          align={"center"}
          justify={"center"}
          bg={"rgba(245,250,254,.5)"}
          backgroundBlendMode={"hard-light"}
          position={"absolute"}
          top={"0"}
          left={"0"}
        >
          <Image
            borderRadius={"50%"}
            src="https://i.ytimg.com/vi/dk2z7dCCpzQ/maxresdefault.jpg"
          />
        </Flex>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CSV;
