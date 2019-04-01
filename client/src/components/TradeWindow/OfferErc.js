import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import abi from "../../abi";
import { AppAddress, sendStatus } from "../../Static";


class OfferErc extends Component {

  state = {
    id: "",
    type: "",
    name: "",
    symbol: "",
    contractAdd: "",
    amountId: "",
    sendStatus: sendStatus.UNSENT
  }

  sendMethod = () => {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    try{
      this.broadcast(this.props.method);
      this.setState({ sendStatus: sendStatus.SENDING });
    } catch(e) {
      console.error(e);
      this.setState({ sendStatus: sendStatus.UNSENT });
    }
  }

  async broadcast(_method) {
    const contract = await new window.web3.eth.Contract(abi, AppAddress);
    const [add1, add2] = this.props.addresses;

    try{
      if(_method.type === 0){
        await contract.methods.pushOfferErc20(add2, _method.contractAdd, _method.amount).send({
          from: add1
        })
        .on("transactionHash", (hash) => {
          console.log("txHash: " + hash);
        })
        .on("receipt", (receipt) => {
          this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if(confirmationNumber === 3){
            console.log("receipt: " + receipt);
          }
        })
        .on("error", console.error);
      } else if(_method.type === 1){
        await contract.methods.pushOfferErc721(add2, _method.contractAdd, _method.amount).send({
          from: add1
        })
        .on("transactionHash", (hash) => {
          console.log("txHash: " + hash);
        })
        .on("receipt", (receipt) => {
          this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if(confirmationNumber === 3){
            console.log("receipt: " + receipt);
          }
        })
        .on("error", console.error);
      }
      
    } catch(e){
      console.log(e);
    }
  }

  render() {
    const method = this.props.method;
    return(
      <div className="method" style={ methodStyle }>
        <div className="display" style={ displayStyle }>
          { method.contractAdd }
          { 
            method.contractAdd !== "" ?
              <span> <span>&nbsp;</span> <img src={ 
                makeBlockie(method.contractAdd) } width="16px" height="16px" alt="blockie" 
                style={{ marginTop:"0.2em" }} /> <span>&nbsp;</span> </span>
            : ""
          }
        </div>
        <button onClick={ this.sendMethod } style={ (method.sendStatus === sendStatus.SENT ? btnStyleSent : btnStyleUnsent) }>
          { method.sendStatus === sendStatus.SENT ? <span>Sent<br />(Resend)</span> : "Send Method" }
        </button>
      </div>
    );
  }
}

const methodStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "5fr 1fr",
  gridTemplateRows: "1 1",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const displayStyle = {
  display: "flex",
  gridColumn: "1 / 2",
  gridRow: "1",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const btnStyleUnsent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

const btnStyleSent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#441111",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  color: "#fff",
  fontWeight: "bold",
}

//PropTypes
OfferErc.propTypes = {
  method: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  isUser: PropTypes.bool.isRequired,
  setMethodSendStatus: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired
}

export default OfferErc;