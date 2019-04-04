import React, { Component } from "react";
//eslint-disable-next-line
import PropTypes from "prop-types";

class Help extends Component {

  state = {
    display: false
  }

  toggle = (e) => {
    const display = !this.state.display;
    this.setState({ display });
  }

  render() {
    if(!this.state.display){
      return(
        <div id="section-help" className="section" style={ helpSectionStyle }>
          <button onClick={ this.toggle } style={ btnStyle }>Toggle Help</button>
        </div>
      );
    }

    return(
      <div id="section-help" className="section" style={ helpSectionStyle }>
        <div style={ helpCellStyle }>
          <div>
          </div>
          <button onClick={ this.toggle } style={ btnStyle }>Toggle Help</button>
        </div>
      </div>
    );
  }
}

const helpSectionStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  textAlign: "center",
  background: "#486898",
  margin: "0 1.6rem",
  padding: "0.4rem",
  border: "solid"
}

const helpCellStyle = {
  display: "flex",
  flex: "1 1 10rem",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "left",
  color: "#fff",
  background: "#3f4f6a",
  padding: "0 0.5rem",
  margin: "0.5rem",
  fontSize: "small",
  lineHeight: "1",
  maxWidth: "18rem"
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
  padding: "0.5rem",
  margin: "0.5rem 0"
}

//PropTypes
Help.propTypes = {

}

export default Help;