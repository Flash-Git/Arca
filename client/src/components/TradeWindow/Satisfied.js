import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abi";
import { AppAddress, satisfiedStatus } from "../../Static";

class Satisfied extends Component {

  state = {
    isSatisfied: satisfiedStatus.FALSE
  }

  componentDidMount() {
    setInterval( () => this.getSatisfied(), 10000);
  }
  
  //componentWillReceiveProps(nextProps) {
  //  if(nextProps.addresses === this.props.addresses){
  //    return;
  //  }
  //  this.getSatisfied();
  //}

  toggleSatisfied = (e) => {//TODO ADD STUFF FOR TRANSITIONAL STATES
    if(!this.props.isUser){
      return;
    }
    let isSatisfied;

    switch(this.state.isSatisfied){
      case satisfiedStatus.TRUE:
        isSatisfied = satisfiedStatus.TOFALSE;
        this.rejectTrade();
        break;
      case satisfiedStatus.FALSE:
        isSatisfied = satisfiedStatus.TOTRUE;
        this.acceptTrade();
        break;
      case satisfiedStatus.TOTRUE:
        isSatisfied = satisfiedStatus.TOFALSE;
        this.rejectTrade();
        break;
      case satisfiedStatus.TOFALSE:
        isSatisfied = satisfiedStatus.TOTRUE;
        this.acceptTrade();
        break;
      default:
        console.log("Error in toggleSatisfied");
        return;
    }

    this.setState({ isSatisfied });
    this.props.setSatisfied(isSatisfied);
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
        //TODO estimate gas
      })
        .on("transactionHash", hash => {
          console.log(hash);
        })
        .on("receipt", receipt => {
          this.props.setSatisfied(satisfiedStatus.FALSE);
          this.setState({ isSatisfied: satisfiedStatus.FALSE });
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if(confirmationNumber === 3){
            console.log("receipt: " + receipt);
          }
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

  render() {
    return(
      <div className="method" style={ methodStyle }>
        <button onClick={ this.toggleSatisfied } style={ (this.state.isSatisfied === satisfiedStatus.TRUE ? btnStyleSent : btnStyleUnsent) }>
          {this.state.isSatisfied === satisfiedStatus.TRUE ? "Satisfied" : "Unsatisifed"}
        </button>
      </div>
    );
  }
}

const methodStyle = {
  gridColumn: "2 auto",
  gridRow: "2 auto",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
}

const btnStyleUnsent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#660000",
  padding: "26px 26px",
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
  padding: "26px 26px",
  border: "none",
  borderRadius: "5%",
  color: "#fff",
  fontWeight: "bold",
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