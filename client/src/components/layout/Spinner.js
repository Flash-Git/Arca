import React from "react";
import spinner from "./spinner.gif";

const Spinner = ({ size }) => {
  const style = {
    margin: "auto",
    display: "block"
  };

  switch (size) {
    case 5:
      style.width = "5rem";
      style.height = "5rem";
      break;
    case 7:
      style.width = "7rem";
      style.height = "7rem";
      break;
    case 10:
      style.width = "10rem";
      style.height = "10rem";
      break;
    default:
      style.width = "100%";
  }

  return <img src={spinner} alt="Loading..." style={style} />;
};

export default Spinner;
