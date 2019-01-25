import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abi";

const satisfiedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const AppAddress = "0x34d418E6019704815F626578eb4df5839f1a445d";

class Satisfied extends Component {

  state = {
    isSatisfied: satisfiedStatus.FALSE
  }

  toggleSatisfied = (e) => {//TODO test for web3
    if(!this.props.isUser){
      return;
    }
    let isSatisfied;

    switch(this.props.isSatisfied){
      case satisfiedStatus.TRUE:
        isSatisfied = satisfiedStatus.TOFALSE;
        break;
      case satisfiedStatus.FALSE:
        isSatisfied = satisfiedStatus.TOTRUE;
        break;
      case satisfiedStatus.TOTRUE:
        isSatisfied = satisfiedStatus.TOFALSE;
        break;
      case satisfiedStatus.TOFALSE:
        isSatisfied = satisfiedStatus.TOTRUE;
        break;
      default:
        console.log("Error in toggleSatisfied");
        return;
    }

    this.setState({ isSatisfied });
    this.props.setSatisfied(isSatisfied);
    //this.sendSetSatisfied();
  }

  async sendSetSatisfied() {
    const add1 = this.props.addresses[0];
    const add2 = this.props.addresses[1];

    const contract = new window.web3.eth.Contract(abi, AppAddress);

    contract.methods.setSatisfied(add2, true).send({
      from: add1
      //TODO estimate gas
    })
      .on('transactionHash', (hash) => {
        console.log(hash);
      })
      .on('receipt', (receipt) => {
        this.props.setSatisfied(satisfiedStatus.TRUE);
        this.setState({ isSatisfied: satisfiedStatus.TRUE });
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 3){
          console.log("receipt: " + receipt);
        }
      })
      .on('error', (error) => {
        this.props.setSatisfied(satisfiedStatus.FALSE);
        this.setState({ isSatisfied: satisfiedStatus.FALSE });
        console.error(error);
      });
  }

  render(){
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
  addresses: PropTypes.array.isRequired
}

export default Satisfied;