const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const PORT = 8080;
const upload = multer({ dest: "." });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/upload", upload.single("invoices"), (req, res) => {
  try {
    let csv = fs.readFileSync("./invoices.csv");
    let ar = csv.toString().trim().split("\r");
    function toArray(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim().split(",");
      }
      return arr;
    }
    arr = toArray(ar);
    let data = arr;
    console.log(data);
    let input = [];
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (i !== 0) {
        let obj = { s: data[i][0], amount: data[i][1], type: data[i][2] };
        input.push(obj);
      }
    }
    console.log(input);
    if (arr[0].length === 3) {
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          arr[i].push("tax");
        } else {
          if (arr[i][2] === "0") {
            let tax = +arr[i][1] * 0.05;
            arr[i].push(tax.toString());
          } else if (arr[i][2] === "1") {
            let tax = +arr[i][1] * 0.08;
            arr[i].push(tax.toString());
          } else if (arr[i][2] === "2") {
            let tax = +arr[i][1] * 0.12;
            arr[i].push(tax.toString());
          } else {
            arr[i].push("invalid_item_type");
          }
        }
      }
      result = [];
      for (let i = 0; i < arr.length; i++) {
        if (i !== 0) {
          let obj = {
            s: arr[i][0],
            amount: arr[i][1],
            type: arr[i][2],
            tax: arr[i][3],
          };
          result.push(obj);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].join(",");
      }
      fs.writeFileSync("result.csv", arr.join("\n"));
    }

    fs.rename(`./${req.file.filename}`, "invoices.csv", function () {
      res.send({ input, result });
    });
  } catch (e) {
    res.send({ error: "Something went wrong" });
  }
});

app.get("/result", (req, res) => {
  res.download(path.resolve("./result.csv"));
});

app.listen(8080, () => {
  console.log(`listening on PORT ${PORT}`);
});
