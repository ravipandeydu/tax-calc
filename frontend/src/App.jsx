import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import CSV from "./Pages/CSV";
import JSON from "./Pages/JSON";

function App() {
  return (
    <Box align={"center"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<CSV />} />
        <Route path="json" element={<JSON />} />
      </Routes>
    </Box>
  );
}

export default App;
