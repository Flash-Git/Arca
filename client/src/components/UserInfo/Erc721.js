import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { colours } from "../../Static";

class Erc721 extends Component {

  add = (e) => {
    this.props.addErc(this.props.erc);
  }

  render() {
    return(
      <div className="erc721" style={ ercStyle }>
        <li style={ liStyle }>
          <div>
            <div style={{ marginBottom: "0.4rem" }}>
              <span style={ symbolStyle }>{ this.props.erc.symbol }&nbsp;</span>
              <img src={ makeBlockie(this.props.erc.contractAdd) } width="12px" height="12px" alt="blockie" />&nbsp;<br/>
            </div>
            <div>
              Count:&nbsp;{ this.props.erc.balance }<br/>
              Enabled:&nbsp;{ this.props.erc.allowance }
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
  margin: "0.25rem",
  marginBottom: "0.5rem",
  padding: "0.4rem",
  borderRadius: "0.4rem",
  background: colours.Primary
}

const liStyle= {
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
  background: colours.User,
  color: "#FFFFFF",
  border: "none",
  borderRadius: "30%",
  fontWeight: "bold",
  padding: "0.3rem 0.5rem",
  alignSelf: "center",
  cursor: "pointer"
}

//PropTypes
Erc721.propTypes = {
  erc: PropTypes.object.isRequired,
  addErc: PropTypes.func.isRequired
}

export default Erc721;