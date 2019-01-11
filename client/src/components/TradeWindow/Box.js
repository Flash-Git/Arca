import React, { Component } from "react";
import Summary from "./Summary";
import OfferContainer from "./OfferContainer";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";

class Box extends Component {

  state = {
    methods: []
  }

  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
    this.props.addMethod(method);
  }

  addMethodArgument = (method) => {
    console.log(method.id + " " + method.args);
    const methods = this.state.methods;
    const oldMethod = methods.filter(method => oldMethod.id === method.id);
    oldMethod.args = method.args;
    this.setState({ methods: [...this.state.methods, method] });
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary />
        <OfferContainer methods={ this.state.methods } addMethodArgument={ this.addMethodArgument } />
        <Satisfied />
        <SubmitBox addMethod={ this.addMethod } />
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