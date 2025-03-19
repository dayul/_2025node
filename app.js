const express = require("express");
const apiRoutes = require("./routes/api");
const app = express();
const PORT = 3000;

app.use(express.json());

// 라우팅
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express! (GET) ");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});