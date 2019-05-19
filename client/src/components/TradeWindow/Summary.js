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
      <div className="summary" style={ summaryStyle }>
        { this.summary() }
        { this.props.address !== "" ? <img src={makeBlockie(this.props.address)}
          width="20px" height="20px" alt="blockie" style={{ marginTop: "0.2rem" }} /> : "" }
      </div>
    );
  }
}

const summaryStyle = {
  display: "flex",
  gridColumn: "1 / 3",
  gridRow: "1",
  justifyContent: "center",
  textAlign: "center",
  background: colours.Primary,
  boxShadow: "0px 5px 7px -5px rgba(0,0,0,0.65)",
  color: colours.Secondary,
  lineHeight: "1.8em",
  padding: "0.1rem",
  margin: "0",
  marginTop:"0.1rem"
}

//PropTypes
Summary.propTypes = {
  address: PropTypes.string.isRequired,
  ensAdd: PropTypes.string.isRequired
}

export default Summary;