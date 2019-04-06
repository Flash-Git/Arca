import React, { Component } from "react";
import PropTypes from "prop-types";

class Erc721 extends Component {
  render() {
    return(
      <div className="erc721" style={ erc721Style }>
        <li style={ liStyle }><span style={ symbolStyle }>{ this.props.symbol }</span><br/>Count:&nbsp;{ this.props.balance }</li>
      </div>
    );
  }
}

const liStyle= {
  listStyleType: "none",
  margin: "0",
  padding: "0",
  fontSize: "70%",
  lineHeight: "90%"
}

const erc721Style = {
  textAlign: "left"
}

const symbolStyle = { 
  fontWeight: "bold",
  marginLeft: "2rem"
}

//PropTypes
Erc721.propTypes = {
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
}

export default Erc721;