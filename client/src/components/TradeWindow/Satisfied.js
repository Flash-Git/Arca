import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abis/abi";
import { AppAddress, satisfiedStatus, colours } from "../../Static";

class Satisfied extends Component {

  state = {
    isAccepted: satisfiedStatus.FALSE
  }

  componentDidMount() {
    setInterval( () => this.getSatisfied(), 10000);
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
    }catch(e){//UNCLEAN
      console.log(e);
    }
    try{
      contract.methods.acceptTrade(add2, this.props.count).send({
        from: add1
        //TODO estimate gas
      })
        .on("transactionHash", hash => {
          console.log(hash);
        })
        .on("receipt", receipt => {
          this.props.setSatisfied(satisfiedStatus.TRUE);
          this.setState({ isSatisfied: satisfiedStatus.TRUE });
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if(confirmationNumber === 3){
            console.log("receipt: " + receipt);
          }
        })
        .on("error", error => {
          this.props.setSatisfied(satisfiedStatus.FALSE);
          this.setState({ isSatisfied: satisfiedStatus.FALSE });
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
      contract.methods.rejectTrade(add2).send({
        from: add1
      })
        .on("transactionHash", hash => {
          console.log(hash);
        })
        .on("receipt", receipt => {
          this.props.setSatisfied(satisfiedStatus.FALSE);
          this.setState({ isSatisfied: satisfiedStatus.FALSE });
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
    }catch(e){//UNCLEAN
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
        this.setState({ isSatisfied: satisfiedStatus.FALSE} );
        break;
      case true:
      this.setState({ isSatisfied: satisfiedStatus.TRUE} );
      break;
      default:
        return;
    }
  }

  status() {
    if(this.props.isUser){
      return <div style={ {...statusStyle, ...statusStyleUser} }>
          Accepted
        </div>;
    }
    return <div style={ {...statusStyle, ...statusStyleNotUser} }>
        Not Accepted
      </div>;
  }

  button() {
    if(!this.props.isUser) return;
    if(this.state.isAccepted){
      return <button onClick={ this.toggleSatisfied }
          style={ {...btnStyle, ...btnStyleAccepted} }>
          Reject
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
  alignItems: "center",
  textAlign: "center",
  justifyContent: "space-evenly",//justify-content: space-evenly;
  background: colours.Primary,
  color: colours.Quaternary,
  margin: "0.2rem",
  marginRight: "0.3rem",
}

const btnStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  border: "none",
  color: colours.Quaternary,
  fontWeight: "bold",
  margin: "0.2rem",
  padding: "0.65rem 1.1rem",
  cursor: "pointer",
  borderRadius: "26%",
}

const btnStyleAccepted = {
  background: colours.User,
}

const btnStyleNotAccepted = {
  background: colours.NotUser,
}

const statusStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  color: colours.Quaternary,
  fontWeight: "bold",
  padding: "0.2rem",
  width: "100%",
  margin: "0.2rem 0"
}

const statusStyleUser = {
  background: colours.Secondary
}

const statusStyleNotUser = {
  background: colours.Secondary
}

//PropTypes
Satisfied.propTypes = {
  setSatisfied: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
  isUser: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired //Partner box count
}

export default Satisfied;