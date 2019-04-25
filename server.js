const express = require("express");
const path = require("path");

const app = express();

//Bodyparser middleware
app.use(express.json());

//Serve static assets if in prod
if(process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));