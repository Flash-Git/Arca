import React, { Component } from "react";

class Satisfied extends Component {
  render(){
    return(
      <div className="method" style={ methodStyle }>
        YES
      </div>
    );
  }
}

const methodStyle = {
  gridColumn: "2 auto",
  gridRow: "2 auto",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
}

export default Satisfied;