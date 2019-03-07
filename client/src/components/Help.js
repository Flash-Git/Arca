import React, { Component } from "react";
//eslint-disable-next-line
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
          <div style={ helpSectionStyle }>
            <h3>Arbitrary function calls</h3>
            <h4>To call the function setInt() of 0xbcF2...</h4>
            <p>Contract Address: &lt;0xbcF2...&gt; Function Name: &lt;setInt&gt; Function Type: &lt;function&gt; Call Type: &lt;Arbitrary&gt;</p>
            <h4>To add the argument int256 _value = 5 to the function setInt()</h4>
            <p>Arg Type: &lt;int256&gt; Arg Name: &lt;_value&gt; Arg Value: &lt;5&gt;</p>
            <h4>On execution: The Box contract will call setInt(5) of 0xbcF2...</h4>
          </div>
          <div style={ helpSectionStyle }>
            <h3>Ownable function calls</h3>
            <h4>To offer ownership of contract 0x1234...</h4>
            <p>Contract Address: &lt;0x1234...&gt; Function Name: &lt;setOwner&gt; Function Type: &lt;function&gt; Call Type: &lt;Ownable&gt;</p>
            <h4>To add the argument address _newOwner = &lt;Trade Partner&gt; to the function setOwner()</h4>
            <p>Arg Type: &lt;address&gt; Arg Name: &lt;_newOwner&gt; Arg Value: &lt;Trade Partner&gt;</p>
            <h4>On execution: The Box contract will set the owner variable of 0x1234... to &lt;Trade Partner&gt;</h4>
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

const helpSectionStyle = {
  padding: "0.5rem",
  marginRight: "1rem",
  borderRightStyle: "solid",
  fontSize: "small",
  lineHeight: "1"
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