const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//Bodyparser middleware
app.use(express.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//Serve static assets if in prod
if(process.env.NODE_ENV === "production"){
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));