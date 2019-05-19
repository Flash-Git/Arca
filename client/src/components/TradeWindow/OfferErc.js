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
    this.broadcastAdd = this.broadcastAdd.bind(this);
    this.broadcastRemove = this.broadcastRemove.bind(this);
    this.removeMethod = this.removeMethod.bind(this);
  }

  sendMethod() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    this.setState({ sendStatus: sendStatus.SENDING });
    this.broadcastAdd(this.props.method);
  }

  enableErc() {
    if(!this.props.connected){
      return;
    }
    const method = this.props.method;

    let contract;
    if(method.type === 0){
      contract = Erc20Contract(method.contractAdd);

      ErcSends("approve", "", contract)
        .then(res => {
          //alert("Tx Confirmed");
        })
        .catch(e => {
          alert("Tx Failed");
          this.props.updateErc("enabled", method.id, false);
        });
      this.props.updateErc("enabled", method.id, true);//Assuming success
    }else if(method.type === 1){
      contract = Erc721Contract(method.contractAdd);

      ErcSends("setApprovalForAll", "", contract)
        .then(res => {
          //alert("Tx Confirmed");
        })
        .catch(e => {
          alert("Tx Failed");
          this.props.updateErc("enabled", method.id, false);
        });
      this.props.updateErc("enabled", method.id, true);//Assuming success
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
    this.props.updateErc("removing", this.props.method.id, true);
    this.broadcastRemove(this.props.method);
  }

  broadcastAdd(method) {
    if(method.type === 0){
      ArcaSends("pushOfferErc20", [this.props.addresses[1], method.contractAdd, (+method.amountId*+method.decimalString).toString()])
        .then(() => {
          this.props.updateErc("sendStatus", method.id, sendStatus.SENT);
        })
        .catch((e) => {
          this.props.updateErc("sendStatus", method.id, sendStatus.UNSENT);
        });
    }else if(method.type === 1){
      ArcaSends("pushOfferErc721", [this.props.addresses[1], method.contractAdd, method.amountId])
        .then(() => {
          this.props.updateErc("sendStatus", method.id, sendStatus.SENT);
        })
        .catch((e) => {
          this.props.updateErc("sendStatus", method.id, sendStatus.UNSENT);
        });
    }
  }

  broadcastRemove(method) {
    if(method.type === 0){
      ArcaSends("removeOfferErc20", [this.props.addresses[1], method.id.split("-")[1]])
        .then(() => {
          this.props.remove(method.id);
        })
        .catch((e) => {
          this.props.updateErc("removing", method.id, false);
          //this.props.removing(this.props.method.id, false);
        });
    }else if(method.type === 1){
      ArcaSends("removeOfferErc721", [this.props.addresses[1], method.id.split("-")[1]])
        .then(() => {
          this.props.remove(method.id);
        })
        .catch((e) => {
          this.props.updateErc("removing", method.id, false);          
          //this.props.removing(this.props.method.id, false);
        });
    }
  }

  offerButton(method) {
    if(!method.enabled){
      return <button onClick={ this.enableErc } style={( {...btnStyleSend, ...btnStyleUnsent}) } >
          <span> Enable </span>
        </button>;
    }

    //Erc20
    if(method.type === 0){
      return <button onClick={ this.sendMethod } style={( method.sendStatus === sendStatus.SENT ?
        {...btnStyleSend, ...btnStyleSent} : {...btnStyleSend, ...btnStyleUnsent}) }>
        { this.props.method.sendStatus === sendStatus.SENT ? <span> Resend </span> : <span> Send </span> }
      </button>;
    }

    //Erc721
    if(method.sendStatus === sendStatus.SENT){
      return null;
    }
    return <button onClick={ this.sendMethod } style={( {...btnStyleSend, ...btnStyleUnsent}) }>
        <span> Send </span>
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
    
    if(method.removing) return null;
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
  justifyContent: "center",
  textAlign: "center",
  background: colours.Primary,
  boxShadow: "0px 5px 5px -5px rgba(0,0,0,0.5)",
  lineHeight: "1.4em",
  fontSize: "0.95em",
  fontWeight: "normal",
  margin: "0.2rem",
  marginLeft: "0",
  marginRight: "0"
}

const displayStyle = {
  gridColumn: "2 / 3",  
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "start",
  background: colours.Primary,
  color: colours.Secondary,
  fontSize: "0.95em",
  margin: "0.1rem"
}

const btnStyleSend = {
  gridColumn: "3",
  border: "none",
  width: "5rem",
  color: "#FFFFFF",
  fontWeight: "bold",
  cursor: "pointer",
  margin: "0.2rem"
}

const btnStyleUnsent = {
  background: colours.Button
}

const btnStyleSent = {
  background: colours.ButtonPressed
}

const btnStyleX = {
  gridColumn: "1",
  justifyContent: "center",
  textAlign: "center",
  background: colours.Primary,
  border: "none",
  color: colours.Secondary,
  fontSize: "130%",
  fontWeight: "normal",
  cursor: "pointer",
  marginLeft: "0.6rem"
}

//PropTypes
OfferErc.propTypes = {
  connected: PropTypes.bool.isRequired,
  method: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  local: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  updateErc: PropTypes.func.isRequired
}

export default OfferErc;