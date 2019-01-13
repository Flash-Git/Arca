import React, { Component } from "react";
import PropTypes from "prop-types";

class Satisfied extends Component {

  state = {
    satisfied: false
  }

  toggleSatisfied = (e) => {
    const satisfied = !this.state.satisfied;
    this.setState({ satisfied });
    this.props.toggleSatisfied(satisfied);
  }
  render(){
    return(
      <div className="method" style={ methodStyle }>
        <button onClick={ this.toggleSatisfied } style={ (this.state.satisfied ? btnStyleSent : btnStyleUnsent) }>{this.state.satisfied ? "Satisfied" : "Unsatisifed"}</button>
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

const btnStyleUnsent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#660000",
  padding: "26px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

const btnStyleSent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#441111",
  padding: "26px 26px",
  border: "none",
  borderRadius: "5%",
  color: "#fff",
  fontWeight: "bold",
}

//PropTypes
Satisfied.propTypes = {
  toggleSatisfied: PropTypes.func.isRequired
}

export default Satisfied;