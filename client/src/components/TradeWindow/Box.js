import React, { Component } from "react";
import Summary from "./Summary";
import OfferContainer from "./OfferContainer";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";

class Box extends Component {

  state = {
    methods: []
  }

  //Add Todo
  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
    console.log(this.state);
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary />
        <OfferContainer methods={ this.state.methods } />
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