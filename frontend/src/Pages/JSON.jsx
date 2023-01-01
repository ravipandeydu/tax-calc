import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import data from "../assets/data.json";

const JSON = () => {
  const [tax, setTax] = useState(0);
  function handleCalculateTax(amount, type) {
    console.log(type);
    if (type === 0) {
      setTax(amount * 0.05);
    } else if (type === 1) {
      setTax(amount * 0.08);
    } else if (type === 2) {
      setTax(amount * 0.12);
    } else {
      setTax("Tax not calculated due to invalid item_type");
    }
  }
  return (
    <Box maxW={"2xl"}>
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
                <Th color="red" fontSize={"18px"}>
                  Calculate Tax
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.invoices.map((item, i) => (
                <Tr key={i}>
                  <Td>{item.sno}</Td>
                  <Td>{item.amount}</Td>
                  <Td>{item.item_type}</Td>
                  <Td>
                    <Button
                      onClick={() =>
                        handleCalculateTax(item.amount, item.item_type)
                      }
                    >
                      Calculate
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Flex>
          <Heading as={"h3"} fontSize="24px" my={5} px={5}>
            Calculated Tax Value :{" "}
          </Heading>
          {tax > 0 ? (
            <Heading
              fontSize="24px"
              my={5}
              px={5}
              border={"1px solid teal"}
              color="green"
            >
              {tax}
            </Heading>
          ) : tax ? (
            <Heading
              fontSize="19px"
              my={6}
              color="red"
            >
              {tax}
            </Heading>
          ) : (
            ""
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default JSON;
