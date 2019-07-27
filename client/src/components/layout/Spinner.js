import React from "react";
import spinner from "./spinner.gif";

const Spinner = ({ height }) => (
  <img
    src={spinner}
    alt="Loading..."
    style={
      height
        ? {
            height: "7rem",
            width: "7rem",
            margin: "auto",
            display: "block"
          }
        : {
            width: "100%",
            margin: "auto",
            display: "block"
          }
    }
  />
);

export default Spinner;
