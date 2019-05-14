import React, { Component } from "react";
import PropTypes from "prop-types";

import { boolStatus, colours } from "../../Static";
import { ArcaSends, ArcaContract, ArcaCalls } from "../../ContractCalls";

class Satisfied extends Component {

  state = {
    connected: false,
    isAccepted: boolStatus.FALSE
  }

  componentWillReceiveProps(newProps) {
    if(this.props.addresses[0] !== newProps.addresses[0] || this.props.addresses[1] !== newProps.addresses[1]
      || newProps.connected !== this.props.connected || newProps.counter !== this.props.counter){
      this.setState({ connected: newProps.connected }, () => this.getSatisfied());
    }
  }

  toggleSatisfied = (e) => {//TODO ADD STUFF FOR TRANSITIONAL STATES
    if(!this.props.isUser){
      return;
    }
    let isAccepted;

    switch(this.state.isAccepted){
      case boolStatus.TRUE:
        isAccepted = boolStatus.TOFALSE;
        this.rejectTrade();
        break;
      case boolStatus.FALSE:
        isAccepted = boolStatus.TOTRUE;
        this.acceptTrade();
        break;
      case boolStatus.TOTRUE:
        isAccepted = boolStatus.TOFALSE;
        this.rejectTrade();
        break;
      case boolStatus.TOFALSE:
        isAccepted = boolStatus.TOTRUE;
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

    ArcaSends("acceptTrade", [this.props.addresses[1], this.props.partnerNonce])
      .then(() => {
        this.props.setSatisfied(boolStatus.TRUE);
        this.setState({ isAccepted: boolStatus.TRUE });
      })
      .catch((e) => {
        this.props.setSatisfied(boolStatus.FALSE);
        this.setState({ isAccepted: boolStatus.FALSE });
      })
  }

  async rejectTrade() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    ArcaSends("unacceptTrade", [this.props.addresses[1]])
      .then(() => {
        this.props.setSatisfied(boolStatus.FALSE);
        this.setState({ isAccepted: boolStatus.FALSE });
      })
      .catch((e) => {})
  }

  async getSatisfied() {
    if(!this.props.connected){
      return;
    }

    const [add1, add2] = this.props.addresses;
    const contract = ArcaContract();

    Promise.all([
      ArcaCalls("getPartnerNonce", [add1, add2], contract),
      ArcaCalls("getNonce", [add2, add1], contract)
    ])
      .then(res => {
        if(+res[0] === +res[1]+1){
          this.setState({ isAccepted: boolStatus.TRUE} );
          this.props.setSatisfied(boolStatus.TRUE);
        }else{
          this.setState({ isAccepted: boolStatus.FALSE} );
          this.props.setSatisfied(boolStatus.FALSE);
        }
      });
  }

  status() {
    if(this.state.isAccepted === boolStatus.TRUE){
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
    if(this.state.isAccepted === boolStatus.TRUE){
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
  background: colours.Secondary,
  color: colours.Quaternary,
  marginLeft: "0",
  marginRight: "0.3rem",
  marginBottom: "0.3rem",
  marginTop: "0.4rem",
  lineHeight: "1.5em",
  fontWeight: "bold",
}

const btnStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  border: "none",
  color: colours.Secondary,
  fontWeight: "bold",
  margin: "0.2rem",
  padding: "0.6rem 1.1rem",
  cursor: "pointer",
  borderRadius: "0.8rem",
}

const btnStyleAccepted = {
  background: colours.User,
}

const btnStyleNotAccepted = {
  background: colours.User,
}

const statusStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  fontWeight: "bold",
  padding: "0.3rem 0",
  width: "100%",
  margin: "0.2rem 0",
  color: colours.Quaternary,
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
  partnerNonce: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired
}

export default Satisfied;