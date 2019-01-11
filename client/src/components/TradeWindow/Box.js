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

  addMethodArguments = (id, args) => {
    let newMethods = this.state.methods;
    let argMeth;
    let argMethIndex;
    //Can't use indexOf filter. learned the hard way
    this.state.methods.forEach(function(method, index) {
      argMethIndex = index;
      argMeth = method;
      argMeth.args = args;
    });

    newMethods[argMethIndex] = argMeth;

    this.setState({ methods: newMethods });
    this.props.addMethodArguments(id, args);
  }

  toggleSatisfied = () => {
    this.props.toggleSatisfied();
  }

  sendMethod = (i) => {
    this.props.sendMethod(i);
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary />
        <OfferContainer methods={ this.state.methods } addMethodArguments={ this.addMethodArguments } sendMethod={ this.sendMethod } />
        <Satisfied toggleSatisfied={ this.toggleSatisfied } />
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