const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
const port = process.env.PORT || 3001;

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello From Express" });
});

app.get("/", function(req, res) {
  res.send("Hello from React Server");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
