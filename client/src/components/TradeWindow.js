import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./TradeWindow/Box";

import abi from "../abi";
import { AppAddress, executedStatus, userBoxStatus } from "../Static";

class TradeWindow extends Component {
  
  state = {
    executedStatus: executedStatus.FALSE
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
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if(confirmationNumber === 3){
            console.log("receipt: " + receipt);
          }
        })
        .on("error", error => {
          console.error(error);
          this.setState({ executedStatus: executedStatus.FALSE });
        });
    } catch(e){
      console.error(e);
      this.setState({ executedStatus: executedStatus.TRUE });
    }
  }
  
  render() {
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        {/* <h3>{ AppAddress }</h3> */}
        <Box isUser={ (this.props.userBox === userBoxStatus.SECOND_BOX ? true : false) }
          addresses={ [this.props.addresses[1], this.props.addresses[0]] } ensAdd={ this.props.ensAdds[1] } connected ={ this.props.connected }
        />
        <Box isUser={ (this.props.userBox === userBoxStatus.FIRST_BOX ? true : false) }
          addresses={ [this.props.addresses[0], this.props.addresses[1]] } ensAdd={ this.props.ensAdds[0] } connected ={ this.props.connected }
        />
        { (this.props.userBox !== 0 ?
          <button onClick={ this.execute } style={ (this.executed ? btnStyleSent : btnStyleUnsent) }>
            { (this.executed ? "Executed" : "Execute") }
          </button>
        : "") }
      </div>
    );
  }
}

const tradeWindowStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#608f82",
  padding: "0.4rem",  
  margin: "1.6rem",
  border: "solid",

}

const btnStyleUnsent = {
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

const btnStyleSent = {
  background: "#441111",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  color: "#fff",
  fontWeight: "bold",
}

//PropTypes
TradeWindow.propTypes = {
  userBox: PropTypes.number.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdds: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired
}

export default TradeWindow;