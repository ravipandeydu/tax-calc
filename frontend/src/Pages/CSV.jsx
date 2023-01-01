import {
  Box,
  Button,
  Divider,
  Heading,
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

const CSV = () => {
  const toast = useToast();
  const [csv, setCsv] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [result, setResult] = useState([]);

  function handleSubmit() {
    try {
      let formData = new FormData();
      console.log(csv);
      formData.append("invoices", csv);
      console.log(formData);
      fetch("https://tax-calc.onrender.com/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setResult([]);
          setInvoices(data.input);
          console.log(data);
        });
    } catch (e) {
      console.log(e);
    }
  }
  function handleResult() {
    try {
      let formData = new FormData();
      console.log(csv);
      formData.append("invoices", csv);
      console.log(formData);
      fetch("https://tax-calc.onrender.com/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setInvoices([]);
          setResult(data.result);
        });
    } catch (e) {}
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
    </Box>
  );
};

export default CSV;
