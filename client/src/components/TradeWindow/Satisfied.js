import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abi";
import { AppAddress, satisfiedStatus } from "../../Static";

class Satisfied extends Component {

  state = {
    isSatisfied: satisfiedStatus.FALSE
  }

  toggleSatisfied = (e) => {
    if(!this.props.isUser){
      return;
    }
    let isSatisfied;

    switch(this.state.isSatisfied){
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
    this.sendSetSatisfied();
  }

  async sendSetSatisfied() {
    const add1 = this.props.addresses[0];
    const add2 = this.props.addresses[1];

    const contract = await new window.web3.eth.Contract(abi, AppAddress);

    try{
      contract.methods.setSatisfied(add2, "0x").send({//TODO hash other box
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

  //TODO set up updating
  async getSatisfied() {
    const add1 = this.props.addresses[0];
    const add2 = this.props.addresses[1];

    const contract = await new window.web3.eth.Contract(abi, AppAddress);
    
    let satisfied = false;
    try{
      satisfied = await contract.methods.getSatisfied(add1, add2).call({
        from: add1
      });
    } catch(e){
      return;
    }

    //TODO
    /////
    // switch(this.state.isSatisfied){
    //   case satisfiedStatus.TRUE:
    //     isSatisfied = satisfiedStatus.TOFALSE;
    //     break;
    //   case satisfiedStatus.FALSE:
    //     isSatisfied = satisfiedStatus.TOTRUE;
    //     break;
    //   case satisfiedStatus.TOTRUE:
    //     isSatisfied = satisfiedStatus.TOFALSE;
    //     break;
    //   case satisfiedStatus.TOFALSE:
    //     isSatisfied = satisfiedStatus.TOTRUE;
    //     break;
    //   default:
    //     return;
    // }
    ///////
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
  addresses: PropTypes.array.isRequired,
  isUser: PropTypes.bool.isRequired
}

export default Satisfied;