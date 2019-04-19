import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abis/abi";
import { AppAddress, satisfiedStatus, colours } from "../../Static";

class Satisfied extends Component {

  state = {
    isAccepted: satisfiedStatus.FALSE
  }

  componentDidMount() {
    setInterval( () => this.getSatisfied(), 5000);
  }

  toggleSatisfied = (e) => {//TODO ADD STUFF FOR TRANSITIONAL STATES
    if(!this.props.isUser){
      return;
    }
    let isAccepted;

    switch(this.state.isAccepted){
      case satisfiedStatus.TRUE:
        isAccepted = satisfiedStatus.TOFALSE;
        this.rejectTrade();
        break;
      case satisfiedStatus.FALSE:
        isAccepted = satisfiedStatus.TOTRUE;
        this.acceptTrade();
        break;
      case satisfiedStatus.TOTRUE:
        isAccepted = satisfiedStatus.TOFALSE;
        this.rejectTrade();
        break;
      case satisfiedStatus.TOFALSE:
        isAccepted = satisfiedStatus.TOTRUE;
        this.acceptTrade();
        break;
      default:
        console.log("Error in toggleSatisfied");
        return;
    }

    this.setState({ isAccepted });
    this.props.setSatisfied(isAccepted);
  }

  async acceptTrade() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    const [add1, add2] = this.props.addresses;
    let contract;

    try{
      contract = await new window.web3.eth.Contract(abi, AppAddress);
    }catch(e){
      console.log(e);
    }
    try{
      contract.methods.acceptTrade(add2, this.props.partnerNonce).send({
        from: add1
      })
        .on("transactionHash", hash => {
          console.log(hash);
        })
        .on("receipt", receipt => {
          this.props.setSatisfied(satisfiedStatus.TRUE);
          this.setState({ isAccepted: satisfiedStatus.TRUE });
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if(confirmationNumber === 3){
            console.log("receipt: " + receipt);
          }
        })
        .on("error", error => {
          this.props.setSatisfied(satisfiedStatus.FALSE);
          this.setState({ isAccepted: satisfiedStatus.FALSE });
          console.error(error);
        });
    } catch(e){
      console.error(e);
    }
  }

  async rejectTrade() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    const [add1, add2] = this.props.addresses;
    let contract;

    try{
      contract = await new window.web3.eth.Contract(abi, AppAddress);
    }catch(e){//UNCLEAN
      console.log(e);
    }

    try{
      contract.methods.unacceptTrade(add2).send({
        from: add1
      })
        .on("transactionHash", hash => {
          console.log(hash);
        })
        .on("receipt", receipt => {
          this.props.setSatisfied(satisfiedStatus.FALSE);
          this.setState({ isAccepted: satisfiedStatus.FALSE });
        })
        .on("error", error => {
          console.error(error);
        });
    } catch(e){
      console.error(e);
    }
  }

  async getSatisfied() {
    if(!this.props.connected){
      return;
    }
    const [add1, add2] = this.props.addresses;
    let contract;

    try{
      contract = await new window.web3.eth.Contract(abi, AppAddress);
    }catch(e){
      console.log(e);
    }    
    let satisfied = false;
    try{
      const partnerNonce = await contract.methods.getPartnerNonce(add1, add2).call({
        from: add1
      });
      const nonce = await contract.methods.getNonce(add2, add1).call({
        from: add1
      });
      if(+partnerNonce === +nonce+1){
        satisfied = true;
      }
    } catch(e){
      return;
    }

    switch(satisfied){
      case false:
        this.setState({ isAccepted: satisfiedStatus.FALSE} );
        this.props.setSatisfied(satisfiedStatus.FALSE);
        break;
      case true:
        this.setState({ isAccepted: satisfiedStatus.TRUE} );
        this.props.setSatisfied(satisfiedStatus.TRUE);
        break;
      default:
        return;
    }
  }

  status() {
    if(this.state.isAccepted === satisfiedStatus.TRUE){
      return <div style={ {...statusStyle, ...statusStyleAccepted} }>
          Accepted
        </div>;
    }
    return <div style={ {...statusStyle, ...statusStyleNotAccepted} }>
        Not Accepted
      </div>;
  }

  button() {
    if(!this.props.isUser) return;
    if(this.state.isAccepted === satisfiedStatus.TRUE){
      return <button onClick={ this.toggleSatisfied }
          style={ {...btnStyle, ...btnStyleAccepted} }>
          Unaccept
        </button>;
    }
    return <button onClick={ this.toggleSatisfied }
        style={ {...btnStyle, ...btnStyleNotAccepted} }>
        Accept
      </button>;
  }

  render() {
    return(
      <div className="satisfied" style={ satisfiedStyle }>
        { this.status() }
        { this.button() }
      </div>
    );
  }
}

const satisfiedStyle = {
  gridColumn: "2 auto",
  gridRow: "2 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  textAlign: "center",
  background: colours.Primary,
  color: colours.Quaternary,
  margin: "0.2rem",
  marginRight: "0.3rem",
  lineHeight: "1.5em",
  fontWeight: "bold",
}

const btnStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  border: "none",
  color: "#FFFFFF",
  fontWeight: "bold",
  margin: "0.2rem",
  padding: "0.6rem 1.1rem",
  cursor: "pointer",
  borderRadius: "0.8rem",
}

const btnStyleAccepted = {
  background: colours.NotUser,
}

const btnStyleNotAccepted = {
  background: colours.User,
}

const statusStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  color: colours.Quaternary,
  fontWeight: "bold",
  padding: "0.3rem 0",
  width: "100%",
  margin: "0.2rem 0",
  background: colours.Secondary,
}

const statusStyleAccepted = {
  //color: colours.isUser,
  borderTop: "solid 2px green",
  borderBottom: "solid 2px green"
}

const statusStyleNotAccepted = {
  //color: colours.NotUser,
  borderTop: "solid 2px red",
  borderBottom: "solid 2px red"
}

//PropTypes
Satisfied.propTypes = {
  setSatisfied: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
  isUser: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  partnerNonce: PropTypes.number.isRequired
}

export default Satisfied;