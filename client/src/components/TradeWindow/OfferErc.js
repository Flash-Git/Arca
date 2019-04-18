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
      this.broadcastAdd(this.props.method);
    }catch(e){
      console.error(e);
      this.setState({ sendStatus: sendStatus.UNSENT });
    }
  }

  removeMethod = () => {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    try{
      if(!this.props.local) this.broadcastRemove(this.props.method);
      this.props.remove(this.props.method.id, 0);
      this.props.remove(this.props.method.id, 1);
    }catch(e){
      console.error(e);
    }
  }

  async broadcastAdd(method) {
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
          //this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
          //this.props.remove(this.props.method.id);
        })
        .on("error", console.error);
      } else if(method.type === 1){
        await contract.methods.pushOfferErc721(add2, method.contractAdd, method.amountId).send({
          from: add1
        })
        .on("transactionHash", hash => {
          console.log("txHash: " + hash);
        })
        .on("receipt", receipt => {
          //this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
          //this.props.remove(this.props.method.id);
        })
        .on("error", console.error);
      }
    } catch(e){
      console.log(e);
    }
  }

  async broadcastRemove(method) {
    const contract = await new window.web3.eth.Contract(abi, AppAddress);
    const [add1, add2] = this.props.addresses;

    try{
      if(method.type === 0){
        await contract.methods.removeOfferErc20(add2, method.id.split("-")[1]).send({
          from: add1
        })
        .on("transactionHash", hash => {
          console.log("txHash: " + hash);
        })
        .on("error", console.error);
      }else if(method.type === 1){
        await contract.methods.removeOfferErc721(add2, method.id.split("-")[1]).send({
          from: add1
        })
        .on("transactionHash", hash => {
          console.log("txHash: " + hash);
        })
        .on("error", console.error);
      }
    } catch(e){
      console.log(e);
    }
  }

  buttonText = () => {
    if(this.props.method.sendStatus === sendStatus.SENT){
      return <span> Resend </span>;
    } 
    if(this.props.method.sendStatus === sendStatus.UNSENT){
      return <span> Send </span>;      
    }
  }

  offer = (method) => {
    return <>
      <img src={ makeBlockie(method.contractAdd) } width="18px" height="18px" alt="blockie" style={{ margin: "0.25rem 0.4rem", float: "left" }} />
      { method.type === 0 ? <div style={{ width: "4rem", margin: "0.2rem" }} >ERC20&nbsp;&nbsp;&nbsp;-</div> : 
          <div style={{ width: "4rem", margin: "0.2rem" }} >ERC721&nbsp;&nbsp;-</div> }
      <div style={{ minWidth: "4rem", margin: "0.25rem" }} >
        { method.symbol }
      </div>
      { method.type === 0 ? <div style={{ minWidth: "6rem", margin: "0.25rem" }} >Amount:&nbsp;{ method.amountId } </div> :
          <div style={{ minWidth: "6rem", margin: "0.25rem" }} >ID:&nbsp;{ method.amountId } </div> }
    </>
  }

  render() {
    const method = this.props.method;
    if(!this.props.isUser){
      return(
        <div className="method" style={ methodStyle }>
          <div className="display" style={ displayStyle }>
            { this.offer(method) }
          </div>
        </div>
      );
    }
    return(
      <div className="method" style={ methodStyle }>
        <button onClick={ this.removeMethod } style={ btnStyleX }>
          x
        </button>
        <div className="display" style={ displayStyle }>
          { this.offer(method) }
        </div>
        <button onClick={ this.sendMethod } style={( method.sendStatus === sendStatus.SENT ?
          {...btnStyleSend, ...btnStyleSent} : {...btnStyleSend, ...btnStyleUnsent}) }>
          { this.buttonText() }
        </button>
      </div>
    );
  }
}

const methodStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "auto 5fr auto",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Primary,
  margin: "0.2rem",
  fontSize: "0.95em",
  lineHeight: "1.4em"
}

const displayStyle = {
  gridColumn: "2 / 3",  
  background: colours.Primary,
  color: colours.Quaternary,
  margin: "0.2rem",
  fontSize: "0.95em",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  textAlign: "start",
}

const btnStyleSend = {
  gridColumn: "3",
  border: "none",
  cursor: "pointer",
  color: colours.Quaternary,
  width: "5rem",
  fontWeight: "bold",
  margin: "0.2rem"
}

const btnStyleUnsent = {
  background: colours.User
}

const btnStyleSent = {
  background: colours.User
}

const btnStyleX = {
  gridColumn: "1",
  background: "#752535",
  cursor: "pointer",
  border: "none",
  color: colours.Quaternary,
  width: "1.9rem",
  fontWeight: "bold",
  padding: "0.25rem",
  margin: "0.25rem"
}

//PropTypes
OfferErc.propTypes = {
  method: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  isUser: PropTypes.bool.isRequired,
  setMethodSendStatus: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  local: PropTypes.bool.isRequired
}

export default OfferErc;