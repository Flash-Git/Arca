import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

class Erc20 extends Component {
  render() {
    return(
      <div className="erc20" style={ erc20Style }>
        <li style={ liStyle }>
          <span style={ symbolStyle }>{ this.props.symbol }&nbsp;</span>
          <img src={makeBlockie(this.props.contractAdd)} width="8px" height="8px" alt="blockie" style={{ marginTop:"0.2em" }} /><br/>
          Balance:&nbsp;{ this.props.balance }<br/>
          Allowance:&nbsp;{ this.props.allowance }
        </li>
      </div>
    );
  }
}

const liStyle= {
  listStyleType: "none",
  marginTop: "0.4rem",
  padding: "0",
  fontSize: "70%",
  lineHeight: "90%"
}

const erc20Style = {
  textAlign: "left",
  marginBottom: "1rem"
}

const symbolStyle = { 
  fontWeight: "bold",
  marginLeft: "2rem"
}

//PropTypes
Erc20.propTypes = {
  contractAdd: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  allowance: PropTypes.string.isRequired
}

export default Erc20;