import React, { Component } from "react";

class Method extends Component {

  state = {

  }

  render(){
    return(
      <div className="method" style={ methodStyle }>
        { this.props.method.contract }
      </div>
    );
  }
}
//this.props.method.contract
const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem"
}

export default Method;