import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./TradeWindow/Box";

import abi from "../abis/abi";
import { AppAddress, executedStatus, userBoxStatus, colours } from "../Static";

class TradeWindow extends Component {
  
  state = {
    executedStatus: executedStatus.FALSE,
    counts: [0, 0]
  }

  setCount = (boxNum, count) => {
    const counts = this.state.counts;
    counts[boxNum] = count;
    this.setState({ counts });
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
    this.setState({ executedStatus: executedStatus.TOTRUE });
  }

  async sendExecute(_add1, _add2) {
    let contract;
    try{
      contract = await new window.web3.eth.Contract(abi, AppAddress);
    } catch(e){
      console.log(e);
    }

    try{
      this.setState({ executedStatus: executedStatus.TOTRUE });
      contract.methods.executeTrade(_add2).send({
        from: _add1
        //TODO estimate gas
      })
        .on("transactionHash", hash => {
          console.log("Hash: " + hash);
        })
        .on("receipt", receipt => {
          this.setState({ executedStatus: executedStatus.TRUE });
          alert("Trade Executed!");
        })
        .on("error", error => {
          console.error(error);
          this.setState({ executedStatus: executedStatus.FALSE });
          alert("Trade Failed");
        });
    } catch(e){
      console.error(e);
      this.setState({ executedStatus: executedStatus.TRUE });
    }
  }
  
  render() {
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <div id="boxes" style={ boxesStyle }>
          {/* <h3>{ AppAddress }</h3> */}
          <Box isUser={ (this.props.userBox === userBoxStatus.SECOND_BOX ? true : false) }
            addresses={ [this.props.addresses[1], this.props.addresses[0]] } ensAdd={ this.props.ensAdds[1] }
            connected={ this.props.connected } setCount={ this.setCount } boxNum = { 0 } count={ this.state.counts[1] }
            erc={ this.props.erc }
          />
          <Box isUser={ (this.props.userBox === userBoxStatus.FIRST_BOX ? true : false) }
            addresses={ [this.props.addresses[0], this.props.addresses[1]] } ensAdd={ this.props.ensAdds[0] }
            connected={ this.props.connected } setCount={ this.setCount } boxNum = { 1 } count={ this.state.counts[0] }
            erc={ this.props.erc }
          />
        </div>
        { (this.props.userBox !== 0 ?
          <button onClick={ this.execute } style={ (this.executed ? btnStyleSent : btnStyleUnsent) }>
            { (this.executed ? "Trade Executed" : "Execute Trade") }
          </button>
        : "") }
      </div>
    );
  }
}

const tradeWindowStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  padding: "0 0.4rem",
  marginBottom: "0.4rem"
}

const boxesStyle = {
  display: "flex",
  flexWrap: "wrap",
  textAlign: "center",
  justifyContent: "center",
}

const btnStyleUnsent = {
  background: colours.User,
  padding: "0.7em 5em",
  border: "none",
  cursor: "pointer",
  color: "#FFFFFF",
  fontWeight: "bold",
  alignSelf: "center",
}

const btnStyleSent = {
  background: colours.User,
  padding: "0.7em 5em",
  border: "none",
  color: "#FFFFFF",
  fontWeight: "bold",
  alignSelf: "center",
}

//PropTypes
TradeWindow.propTypes = {
  userBox: PropTypes.number.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdds: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
  erc: PropTypes.object.isRequired
}

export default TradeWindow;