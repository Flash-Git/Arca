import React, { Component } from "react";

class Method extends Component {
  render(){
    return(
      <div className="method" style={ methodStyle }>
        Method
      </div>
    );
  }
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem"
}

export default Method;