import React, { Component } from "react";
import PropTypes from "prop-types";

import { boolStatus, colours } from "../../Static";
import { ArcaSends, ArcaContract, ArcaCalls } from "../../ContractCalls";

class Satisfied extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      satisfied: boolStatus.FALSE
    }
    this.getSatisfied = this.getSatisfied.bind(this);
    this.toggleSatisfied = this.toggleSatisfied.bind(this);
    this.acceptTrade = this.acceptTrade.bind(this);
    this.rejectTrade = this.rejectTrade.bind(this);
  }

  componentWillMount() {
    this.setState({ connected: this.props.connected }, () => this.getSatisfied());
  }

  componentWillReceiveProps(newProps) {
    if(this.props.addresses[0] !== newProps.addresses[0] || this.props.addresses[1] !== newProps.addresses[1]
      || newProps.connected !== this.props.connected || newProps.counter !== this.props.counter){
      this.setState({ connected: newProps.connected }, () => this.getSatisfied());
    }
  }

  getSatisfied() {
    if(!this.state.connected){
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
          if(this.state.satisfied === boolStatus.TRUE || this.state.satisfied === boolStatus.TOFALSE) {
            return;
          }
          this.setState({ satisfied: boolStatus.TRUE} );
          this.props.setSatisfied(this.props.boxNum, boolStatus.TRUE);
        }else{
          if(this.state.satisfied === boolStatus.TRUE || this.state.satisfied === boolStatus.TOTRUE) {
            return;
          }          
          this.setState({ satisfied: boolStatus.FALSE} );
          this.props.setSatisfied(this.props.boxNum, boolStatus.FALSE);
        }
      });
  }

  toggleSatisfied(e) {
    if(!this.props.isUser){
      return;
    }

    let satisfied;
    switch(this.state.satisfied){
      case boolStatus.TRUE:
        satisfied = boolStatus.TOFALSE;
        this.rejectTrade();
        break;
      case boolStatus.FALSE:
        satisfied = boolStatus.TOTRUE;
        this.acceptTrade();
        break;
      case boolStatus.TOTRUE:
        satisfied = boolStatus.TOFALSE;
        this.rejectTrade();
        break;
      case boolStatus.TOFALSE:
        satisfied = boolStatus.TOTRUE;
        this.acceptTrade();
        break;
      default:
        console.log("Error in toggleSatisfied");
        return;
    }

    this.setState({ satisfied });
    this.props.setSatisfied(this.props.boxNum, satisfied);
  }

  acceptTrade() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    ArcaSends("acceptTrade", [this.props.addresses[1], this.props.partnerNonce])
      .then(() => {
        this.props.setSatisfied(this.props.boxNum, boolStatus.TRUE);
        this.setState({ satisfied: boolStatus.TRUE });
      })
      .catch((e) => {
        this.props.setSatisfied(this.props.boxNum, boolStatus.FALSE);
        this.setState({ satisfied: boolStatus.FALSE });
      })
  }

  rejectTrade() {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    ArcaSends("unacceptTrade", [this.props.addresses[1]])
      .then(() => {
        this.props.setSatisfied(this.props.boxNum, boolStatus.FALSE);
        this.setState({ satisfied: boolStatus.FALSE });
      })
      .catch((e) => {
        this.props.setSatisfied(this.props.boxNum, boolStatus.TRUE);
        this.setState({ satisfied: boolStatus.TRUE });
      })
  }

  status() {
    if(this.state.satisfied === boolStatus.TRUE){
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
    if(this.state.satisfied === boolStatus.TRUE){
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
  textAlign: "center",
  alignItems: "center",
  background: colours.Primary,
  color: colours.Secondary,
  lineHeight: "1.5em",
  fontWeight: "bold",
  marginLeft: "0",
  marginRight: "0.3rem",
  marginBottom: "0.3rem",
  marginTop: "0.4rem"
}

const btnStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  border: "none",
  borderRadius: "0.8rem",
  color: colours.Primary,
  fontWeight: "bold",
  cursor: "pointer",
  padding: "0.6rem 1.1rem",
  margin: "0.2rem"
}

const btnStyleAccepted = {
  background: colours.ButtonPressed
}

const btnStyleNotAccepted = {
  background: colours.Button
}

const statusStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  width: "100%",
  background: colours.Primary,
  color: colours.Secondary,
  fontWeight: "bold",
  padding: "0.3rem 0",
  margin: "0.2rem 0"
}

const statusStyleAccepted = {
  borderTop: "solid 2px green",
  borderBottom: "solid 2px green"
}

const statusStyleNotAccepted = {
  borderTop: "solid 2px red",
  borderBottom: "solid 2px red"
}

//PropTypes
Satisfied.propTypes = {
  connected: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  addresses: PropTypes.array.isRequired,
  boxNum: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
  partnerNonce: PropTypes.number.isRequired,
  setSatisfied: PropTypes.func.isRequired
}

export default Satisfied;