const express = require("express");

const PORT = 3000;
const app = express();

app.get("/reports", (req, res) => {
  // TODO: Return reports
  res.json({ hello: "World" });
});

app.post("/reports", (req, res) => {
  // TODO: Add report to database
  const { website } = req.body;

  res.json({ reportAdded: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
