const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Configuration options for express
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// Connect to db
mongoose.connect("mongodb://localhost/spam_shame", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error"));
db.once("open", () => {
  console.log("Database connected");

  // Define database schema
  const reportSchema = new mongoose.Schema({ website: String });
  const Report = mongoose.model("Report", reportSchema);

  // Specify express (api) routes
  app.get("/reports", async (req, res) => {
    // Find all reports and then return them as an array
    const reports = await Report.find({}).select("website -_id");
    res.json({ reports: reports.map((x) => x.website) });
  });

  app.post("/reports", (req, res) => {
    const { website } = req.body;
    const newReport = new Report({ website });

    // Add new report to the database
    newReport.save((err, newReport) => {
      if (err) {
        console.error(`Error saving new report for ${website}`);
        return res.status(500).json({ reportAdded: false });
      }
      console.log(`New report saved for ${website}`);
      res.json({ reportAdded: true });
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
