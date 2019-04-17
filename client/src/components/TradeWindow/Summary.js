import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { colours } from "../../Static";

class Summary extends Component {

  summary() {
    if(this.props.ensAdd !== "") {
      return <>{ this.props.ensAdd }&nbsp;</>;
    }
    if(this.props.address !== "") {
      return <>{ this.props.address }&nbsp;</>;
    }
  }


  render() {
    return(
      <div className="summary" style={ methodStyle }>
        { this.summary() }
        { this.props.address !== "" ? <img src={makeBlockie(this.props.address)}
          width="22px" height="22px" alt="blockie" style={{ marginTop:"0.2em" }} /> : "" }
      </div>
    );
  }
}

const methodStyle = {
  display: "flex",
  gridColumn: "1 / 3",
  gridRow: "1",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Primary,
  color: colours.Quaternary,
  marginTop:"0.1rem"
}

//PropTypes
Summary.propTypes = {
  address: PropTypes.string.isRequired,
  ensAdd: PropTypes.string.isRequired
}

export default Summary;