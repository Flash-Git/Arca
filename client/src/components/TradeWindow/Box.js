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
    const newMethods = this.state.methods;
    newMethods.filter(method => method.id === id).args = args;
    console.log(this.state.methods[0].args)
    console.log(newMethods.filter(method => method.id === id).args);
    console.log(this.state.methods);
    this.setState({ methods: newMethods });
    console.log(newMethods);
    console.log(this.state.methods);
    this.props.addMethodArguments(id, args);
  }

  toggleSatisfied = () => {
    this.props.toggleSatisfied();
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary />
        <OfferContainer methods={ this.state.methods } addMethodArguments={ this.addMethodArguments } />
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