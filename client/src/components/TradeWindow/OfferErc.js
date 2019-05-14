import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { sendStatus, colours } from "../../Static";
import { ArcaSends } from "../../ContractCalls";
import { Erc20Contract, Erc721Contract, ErcSends } from "../../ContractCalls";

class OfferErc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sendStatus: sendStatus.UNSENT
    }
    this.sendMethod = this.sendMethod.bind(this);
    this.enableErc = this.enableErc.bind(this);
    this.removeMethod = this.removeMethod.bind(this);
  }

  sendMethod() {
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

  async enableErc() {
    if(!this.props.connected){
      return;
    }
    const method = this.props.method;

    let contract;
    if(method.type === 0){
      contract = Erc20Contract(method.contractAdd);
      method.type = 0;
      ErcSends("approve", "", contract)
        .then(res => {
          alert("Tx Confirmed");
        })
        .catch(e => {
          alert("Tx Failed");
        })
      this.props.setMethodEnableStatus(method.id);//Assuming success
    }else if(method.type === 1){
      contract = Erc721Contract(method.contractAdd);
      method.type = 1;
      ErcSends("setApprovalForAll", "", contract)
        .then(res => {
          alert("Tx Confirmed");
        })
        .catch(e => {
          alert("Tx Failed");
        })
      this.props.setMethodEnableStatus(method.id);//Assuming success
    }
  }

  removeMethod() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    if(this.props.local){
      this.props.remove(this.props.method.id);
      return;
    }
    this.props.removing(this.props.method.id);
    this.broadcastRemove(this.props.method);
  }

  async broadcastAdd(method) {
    if(method.type === 0){
      let bnAm = new window.web3.utils.toBN(method.amountId).mul(new window.web3.utils.toBN(method.decimalString)).toString();
      ArcaSends("pushOfferErc20", [this.props.addresses[1], method.contractAdd, bnAm])
        .then(() => {})
        .catch((e) => {})
    }else if(method.type === 1){
      ArcaSends("pushOfferErc721", [this.props.addresses[1], method.contractAdd, method.amountId])
        .then(() => {})
        .catch((e) => {})
    }
  }

  async broadcastRemove(method) {
    if(method.type === 0){
      ArcaSends("removeOfferErc20", [this.props.addresses[1], method.id.split("-")[1]])
        .then(() => {
          this.props.remove(this.props.method.id);
        })
        .catch((e) => {
          this.props.removing(this.props.method.id, false);
        });
    }else if(method.type === 1){
      ArcaSends("removeOfferErc721", [this.props.addresses[1], method.id.split("-")[1]])
        .then(() => {
          this.props.remove(this.props.method.id);
        })
        .catch((e) => {
          this.props.removing(this.props.method.id, false);
        });
    }
  }

  offerButton(method) {
    if(!method.enabled){
      return <button onClick={ this.enableErc } style={( {...btnStyleSend, ...btnStyleUnsent}) } >
          <span> Enable </span>
        </button>;
    }

    return <button onClick={ this.sendMethod } style={( method.sendStatus === sendStatus.SENT ?
        {...btnStyleSend, ...btnStyleSent} : {...btnStyleSend, ...btnStyleUnsent}) }>
        { this.props.method.sendStatus === sendStatus.SENT ? <span> Resend </span> : <span> Send </span> }
      </button>;
  }

  offer(method) {
    return <>
      <img src={ makeBlockie(method.contractAdd) } width="18px" height="18px" alt="blockie" style={{ margin: "0.3rem 0.4rem", float: "left" }} />
      { method.type === 0 ? <div style={{ minWidth: "4rem", margin: "0.2rem" }} >ERC20&nbsp;&nbsp;&nbsp;-</div> : 
          <div style={{ minWidth: "4rem", margin: "0.2rem" }} >ERC721&nbsp;&nbsp;-</div> }
      <div style={{ minWidth: "4rem", margin: "0.25rem", fontWeight: "normal" }} >
        { method.symbol }
      </div>
      { method.type === 0 ? <div style={{ minWidth: "6rem", margin: "0.25rem" }} >Amount:&nbsp;{ method.amountId } </div> :
          <div style={{ minWidth: "6rem", margin: "0.25rem" }} >ID:&nbsp;{ method.amountId } </div> }
    </>
  }

  render() {
    const method = this.props.method;
    if(!this.props.isUser||method.removing){
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
          <span role="img" aria-label="cross">&#10060;</span>
        </button>
        <div className="display" style={ displayStyle }>
          { this.offer(method) }
        </div>
        { this.offerButton(method) }
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
  background: colours.Secondary,
  margin: "0.2rem",
  marginLeft: "0",
  marginRight: "0",
  fontSize: "0.95em",
  lineHeight: "1.4em",
  fontWeight: "normal",
  boxShadow: "0px 5px 5px -5px rgba(0,0,0,0.5)"
}

const displayStyle = {
  gridColumn: "2 / 3",  
  background: colours.Secondary,
  color: colours.Quaternary,
  margin: "0.1rem",
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
  color: "#FFFFFF",
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
  cursor: "pointer",
  border: "none",
  background: colours.Secondary,
  color: colours.Quaternary,
  textAlign: "center",
  justifyContent: "center",
  //width: "1.2rem",
  //height: "1.2rem",
  fontWeight: "normal",
  fontSize: "130%",
  marginLeft: "0.6rem",
}

//PropTypes
OfferErc.propTypes = {
  method: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  isUser: PropTypes.bool.isRequired,
  setMethodSendStatus: PropTypes.func.isRequired,
  setMethodEnableStatus: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  removing: PropTypes.func.isRequired,
  local: PropTypes.bool.isRequired
}

export default OfferErc;