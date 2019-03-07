import React, { Component } from "react";
// eslint-disable-next-line
import PropTypes from "prop-types";

class Help extends Component {

  state = {
  }

  toggle = (e) => {
  }

  render(){
    return(
      <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
        <div id="section-help" className="section" style={ helpStyle }>
          <div>
            <h3>Arbitrary function calls</h3>
            <h4>To call the function setInt() of 0xbcF2...</h4>
            <p>Contract Address: &lt;0xbcF2...&gt; Function Name: &lt;setInt&gt; Function Type: &lt;function&gt;</p>
            <h4>To add the argument int256 _value = 5 to the function setInt()</h4>
            <p>Arg Type: &lt;256&gt; Arg Name: &lt;_value&gt; Arg Value: &lt;5&gt;</p>
          </div>
        </div>
        <button onClick={ this.toggle } style={ btnStyle }>Toggle Help</button>
      </div>
    );
  }
}

const helpStyle = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  background: "#608f82",
  padding: "0.4rem",
  paddingTop: "0.2rem",
  paddingBottom: "0.2rem",
  margin: "1.6rem",
  border: "solid"
}

const btnStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#564899",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  marginTop: "2rem",
  marginBottom: "2rem"
}

//PropTypes
Help.propTypes = {

}

export default Help;