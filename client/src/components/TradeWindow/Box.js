import React, { Component } from "react";
import Summary from "./Summary";
import OfferContainer from "./OfferContainer";
import Satisfied from "./Satisfied";

class Box extends Component {
  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary />
        <OfferContainer />
        <Satisfied />
      </div>
    );
  }
}

const boxStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "3fr 1fr",
  textAlign: "center",
  justifyContent: "center",
  margin: "4px",
  background: "#666",
  border: "solid",
  minHeight: "10rem",
  fontWeight: "bold"
}

export default Box;