import React, { Component } from "react";

class Satisfied extends Component {

  state = {
    satisfied: false
  }

  toggleSatisfied = (e) => {
    this.setState({ satisfied: !this.state.satisfied });
    this.props.toggleSatisfied();
  }
  render(){
    return(
      <div className="method" style={ methodStyle }>
        <button onClick={ this.toggleSatisfied } style={ btnStyle }>{this.state.satisfied ? "Satisfied" : "Unsatisifed"}</button>
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

const btnStyle = {
  background: "#660000",
  padding: "26px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

export default Satisfied;