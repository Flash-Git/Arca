import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./TradeWindow/Box";

import { boolStatus, userBoxStatus } from "../Static";

class TradeWindow extends Component {
  
  state = {
    executedStatus: boolStatus.FALSE
  }
  
  execute = () => {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    if(this.props.userBox === userBoxStatus.FIRST_BOX){
      this.sendExecute(this.props.addresses[0], this.props.addresses[1]);
    } else if(this.props.userBox === userBoxStatus.SECOND_BOX){
      this.sendExecute(this.props.addresses[1], this.props.addresses[0]);
    } else {
      return;
    }
    this.setState({ executedStatus: boolStatus.TOTRUE });
  }

  render() {
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <div id="boxes" style={ boxesStyle }>
          {/* <h3>{ AppAddress }</h3> */}
          <Box connected={ this.props.connected } counter={ this.props.counter } 
            isUser={ (this.props.userBox === userBoxStatus.SECOND_BOX ? true : false) }
            addresses={ [this.props.addresses[1], this.props.addresses[0]] } ensAdd={ this.props.ensAdds[1] }
            boxNum = { 0 } erc={ this.props.erc } 
          />
          <Box connected={ this.props.connected } counter={ this.props.counter }
            isUser={ (this.props.userBox === userBoxStatus.FIRST_BOX ? true : false) }
            addresses={ [this.props.addresses[0], this.props.addresses[1]] } ensAdd={ this.props.ensAdds[0] }
            boxNum = { 1 } erc={ this.props.erc }
          />
        </div>
      </div>
    );
  }
}

const tradeWindowStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  marginBottom: "1.15rem",
  maxWidth: "55rem"
}

const boxesStyle = {
  display: "flex",
  flexWrap: "wrap",
  textAlign: "center",
  justifyContent: "center",
  flexDirection: "row",
}
//PropTypes
TradeWindow.propTypes = {
  userBox: PropTypes.number.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdds: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
  erc: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired
}

export default TradeWindow;