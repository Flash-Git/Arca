import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { colours } from "../../Static";

class Erc20 extends Component {

  add = (e) => {
    this.props.addErc(this.props.erc);
  }

  render() {
    return(
      <div className="erc20" style={ ercStyle }>
        <li style={ liStyle }>
          <div>
            <div style={{ marginBottom: "0.4rem" }}>
              <span style={ symbolStyle }>{ this.props.erc.symbol }&nbsp;</span>
              <img src={ makeBlockie(this.props.erc.contractAdd) } width="12px" height="12px" alt="blockie" /><br/>
            </div>
            <div style={{ marginRight: "0.2rem" }}>
              <span>Balance:&nbsp;{ this.props.erc.balance }<br/></span>
              <span>Enabled:&nbsp;{ this.props.erc.enabled }</span>
            </div>
          </div>
          <button onClick={ this.add } style={ btnStyle }>
            +
          </button>
        </li>
      </div>
    );
  }
}

const ercStyle = {
  textAlign: "left",
  borderRadius: "0.4rem",
  padding: "0.2rem",
  paddingRight: "0rem",
  margin: "0.15rem",
  marginBottom: "0.5rem"
}

const liStyle = {
  display: "flex",
  listStyleType: "none",
  lineHeight: "120%",
  fontSize: "72%"
}

const symbolStyle = { 
  fontWeight: "bold",
  lineHeight: "110%",
  fontSize: "115%",
  marginLeft: "2rem"
}

const btnStyle = {
  alignSelf: "center",
  justifyContent: "center",
  textAlign: "center",
  background: colours.Accent,
  border: "none",
  borderRadius: "30%",
  color: "#FFFFFF",
  fontSize: "130%",
  fontWeight: "bold",
  cursor: "pointer",
  padding: "0.4rem 0.6rem",
  marginLeft: "auto",
  marginRight: "0.1rem"
}

//PropTypes
Erc20.propTypes = {
  erc: PropTypes.object.isRequired,
  addErc: PropTypes.func.isRequired
}

export default Erc20;