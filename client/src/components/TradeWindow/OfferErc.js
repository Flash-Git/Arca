import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import abi from "../../abis/abi";
import { AppAddress, sendStatus, colours } from "../../Static";

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
      this.setState({ sendStatus: sendStatus.SENDING });
      this.broadcast(this.props.method);
    } catch(e) {
      console.error(e);
      this.setState({ sendStatus: sendStatus.UNSENT });
    }
  }

  async broadcast(method) {
    const contract = await new window.web3.eth.Contract(abi, AppAddress);
    const [add1, add2] = this.props.addresses;

    let bnAm = window.web3.utils.toBN(method.amountId.toString());
    bnAm = bnAm.mul(window.web3.utils.toBN("1000000000000000000"));

    try{
      if(method.type === 0){
        await contract.methods.pushOfferErc20(add2, method.contractAdd, bnAm.toString()).send({
          from: add1
        })
        .on("transactionHash", hash => {
          console.log("txHash: " + hash);
        })
        .on("receipt", receipt => {
          this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
          this.props.remove(this.props.method);
        })
        .on("error", console.error);
      } else if(method.type === 1){
        await contract.methods.pushOfferErc721(add2, method.contractAdd, method.amountId).send({
          from: add1
        })
        .on("transactionHash", hash => {
          console.log("txHash: " + hash);
        })
        .on("receipt", (receipt) => {
          this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
          this.props.remove(this.props.method);
        })
        .on("error", console.error);
      }
    } catch(e){
      console.log(e);
    }
  }

  buttonText = () => {
    if(this.props.method.sendStatus === sendStatus.SENT){
      if(!this.props.isUser) {
        return <span> Sent </span>;
      } else {
        return <span> Sent<br />(Resend) </span>;
      }
    } else if(this.props.method.sendStatus === sendStatus.SENDING) {
      return <span> Sending </span>;
    } else {
      return <span> Send Offer </span>;
    }
  }

  offer = (method) => {
    return <>
      <img src={ makeBlockie(method.contractAdd) } width="28px" height="28px" alt="blockie" style={{ margin: "0.25rem 0.4rem", float: "left" }} />
      { method.type === 0 ? <div style={{ width: "4rem", margin: "0.2rem" }} >ERC20&nbsp;&nbsp;&nbsp;-</div> : 
          <div style={{ width: "4rem", margin: "0.2rem" }} >ERC721&nbsp;&nbsp;-</div> }
      <div style={{ minWidth: "4rem", margin: "0.25rem" }} >
        { method.symbol }
      </div>
      { method.type === 0 ? <div style={{ minWidth: "6rem", margin: "0.2rem" }} >Amount:&nbsp;{ method.amountId } </div> :
          <div style={{ minWidth: "6rem", margin: "0.2rem" }} >ID:&nbsp;{ method.amountId } </div> }
    </>
  }

  render() {
    const method = this.props.method;
    return(
      <div className="method" style={ methodStyle }>
        <div className="display" style={ displayStyle }>
          { this.offer(method) }
        </div>
        <button onClick={ this.sendMethod } style={( method.sendStatus === sendStatus.SENT ? btnStyleSent : btnStyleUnsent) }>
          { this.buttonText() }
        </button>
      </div>
    );
  }
}

const methodStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "5fr 1fr",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Secondary,
  margin: "0.2rem",
  fontSize: "0.95em"
}

const displayStyle = {
  gridColumn: "1 / 2",  
  background: colours.Secondary,
  color: colours.Primary,
  margin: "0.2rem",
  fontSize: "0.95em",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  textAlign: "start",
}

const btnStyleUnsent = {
  gridColumn: "2",
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
  connected: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired
}

export default OfferErc;