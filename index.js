require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.SERVER_PORT || 3030;

// your code
app.get("/iotdblink", function (req, res) {
  res.send(
    "<p>name: " + req.query["name"] + "</p><p>age: " + req.query["age"] + "</p>"
  );
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
