import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

class Erc721 extends Component {
  render() {
    return(
      <div className="erc721" style={ erc721Style }>
        <li style={ liStyle }><span style={ symbolStyle }>{ this.props.symbol }&nbsp;</span>
        <img src={makeBlockie(this.props.contractAdd)} width="8px" height="8px" alt="blockie" style={{ marginTop:"0.2em" }} /><br/>
        Count:&nbsp;{ this.props.balance }</li>
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
  textAlign: "left",
  marginBottom: "1rem"
}

const symbolStyle = { 
  fontWeight: "bold",
  marginLeft: "2rem"
}

//PropTypes
Erc721.propTypes = {
  contractAdd: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
}

export default Erc721;