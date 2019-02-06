import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./TradeWindow/Box";

import abi from "../abi";

const executedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const AppAddress = "0x34d418E6019704815F626578eb4df5839f1a445d";

class TradeWindow extends Component {
  
  state = {
    executedStatus: executedStatus.FALSE
  }
  
  execute = () => {
    if(this.props.userBox === 1){
      this.sendExecute(this.props.addresses[0], this.props.addresses[1]);
    } else if(this.props.userBox === 2){
      this.sendExecute(this.props.addresses[1], this.props.addresses[0]);
    } else {
      return;
    }
    this.setState({ executedStatus: executedStatus.TOTRUE });
  }

  async sendExecute(_add1, _add2) {
    const contract = await new window.web3.eth.Contract(abi, AppAddress);

    try{
      this.setState({ executedStatus: executedStatus.TOTRUE });
      contract.methods.executeTrade(_add2).send({
        from: _add1
        //TODO estimate gas
      })
        .on("transactionHash", hash => {
          console.log(hash);
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
        <Box isUser={ (this.props.userBox === 2 ? true : false) } addresses={ [this.props.addresses[1], this.props.addresses[0]] } />
        <Box isUser={ (this.props.userBox === 1 ? true : false) } addresses={ [this.props.addresses[0], this.props.addresses[1]] } />
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
  padding: "1rem",
  margin: "1rem"
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
  addresses: PropTypes.array.isRequired
}

export default TradeWindow;