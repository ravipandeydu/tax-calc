import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import data from "./assets/data.json";
import axios from "axios";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";

function App() {
  const [tax, setTax] = useState(0);
  const [csv, setCsv] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [result, setResult] = useState([]);

  function handleCalculateTax(amount, type) {
    if (type === 0) {
      setTax(amount * 0.05);
    }
    if (type === 1) {
      setTax(amount * 0.08);
    }
    if (type === 2) {
      setTax(amount * 0.12);
    }
  }

  useEffect(() => {
    if (csv) {
      handleSubmit();
    }
  }, [csv]);

  function handleSubmit() {
    let formData = new FormData();
    console.log(csv);
    formData.append("invoices", csv);
    console.log(formData);
    fetch("http://localhost:8080/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data.input);
      });
  }
  function handleResult() {
    let formData = new FormData();
    console.log(csv);
    formData.append("invoices", csv);
    console.log(formData);
    fetch("http://localhost:8080/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setInvoices([]);
        setResult(data.result);
      });
  }

  return (
    <Box className="App">
      <table border="1px">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Amount</th>
            <th>Item Type</th>
            <th>Calculate Tax</th>
          </tr>
        </thead>
        <tbody>
          {data.invoices.map((item, i) => (
            <tr key={i}>
              <td>{item.sno}</td>
              <td>{item.amount}</td>
              <td>{item.item_type}</td>
              <td>
                <Button
                  onClick={() =>
                    handleCalculateTax(item.amount, item.item_type)
                  }
                >
                  Calculate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box>
        <Flex>
          <Box px={5}>Calculated Tax Value : </Box>
          {tax > 0 ? <Box>{tax}</Box> : ""}
        </Flex>
      </Box>
      <Box>
        <Input type={"file"} onChange={(e) => setCsv(e.target.files[0])} />
        <Button onClick={handleResult}>Get Result</Button>
        {invoices.length > 0 ? (
          <Box>
            <Heading>Invoices</Heading>
            <table border="1px">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Amount</th>
                  <th>Item Type</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((item, i) => (
                  <tr key={i}>
                    <td>{item.s}</td>
                    <td>{item.amount}</td>
                    <td>{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          ""
        )}
        {/* <Button onClick={handleSubmit}>Check Input</Button> */}
      </Box>
      {result.length > 0 ? (
        <Box>
          <Heading>Result</Heading>
          <table border="1px">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Item Type</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, i) => (
                <tr key={i}>
                  <td>{item.s}</td>
                  <td>{item.amount}</td>
                  <td>{item.type}</td>
                  <td>{item.tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form action="http://localhost:8080/result" method="get">
            <Button type="submit">Download Result</Button>
          </form>
        </Box>
      ) : (
        ""
      )}
      {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type={"file"} name="invoices" />
        <input type="submit" />
      </form>
      <Button onClick={handleDownload}>Download</Button> */}
      {/* <a href="#" onClick={handleDownload}>
        Download
      </a> */}
    </Box>
  );
}

export default App;
