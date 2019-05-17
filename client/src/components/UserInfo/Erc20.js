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
            <div>
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
  margin: "0.15rem",
  marginBottom: "0.5rem",
  padding: "0.2rem",
  paddingRight: "0rem",
  borderRadius: "0.4rem",
}

const liStyle = {
  display: "flex",
  listStyleType: "none",
  fontSize: "72%",
  lineHeight: "120%"
}

const symbolStyle = { 
  fontWeight: "bold",
  marginLeft: "2rem",
  fontSize: "115%",
  lineHeight: "110%",
}

const btnStyle = {
  marginLeft: "auto",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Accent,
  color: "#FFFFFF",
  border: "none",
  borderRadius: "30%",
  fontWeight: "bold",
  padding: "0.4rem 0.6rem",
  alignSelf: "center",
  cursor: "pointer",
  fontSize: "130%"
}

//PropTypes
Erc20.propTypes = {
  erc: PropTypes.object.isRequired,
  addErc: PropTypes.func.isRequired
}

export default Erc20;