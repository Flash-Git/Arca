import React, { Component } from "react";
import PropTypes from "prop-types";

import { colours } from "../Static";

class PreTrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address1: "",
      address2: "",
      ensAdd1: "",
      ensAdd2: "",
      validInput1: false,
      validInput2: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.checkAddress = this.checkAddress.bind(this);
  }

  async checkAddress(index, address) {
    if(!window.web3){
      this.setState({ validInput1: false, validInput2: false });
      return;
    }
    
    if(!address.includes(".eth")){
      if(address.length !== 42){
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
        return;
      }

      try{
        const sumAdd = await window.web3.utils.toChecksumAddress(address);
        if(window.web3.utils.isAddress(sumAdd)){
          index === 0 ? this.setState({ validInput1: true }) : this.setState({ validInput2: true });
          return;
        }
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
        return;
      }catch(e){
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
        return;
      }
    }

    try{ 
      //DOESNT WORK
      //Uncaught (in promise) Error: Network not synced; last block was 3620.3069999217987 seconds ago
      let ensAdd = await window.web3.eth.ens.getAddress(address);
      console.log("ENS:" + address + " Add: " + ensAdd);
      ensAdd = await window.web3.utils.toChecksumAddress(ensAdd);
      if(!window.web3.utils.isAddress(ensAdd)){
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
      }
      index === 0 ? this.setState({ validInput1: true, address1: ensAdd, ensAdd1: address }) : this.setState({ validInput2: true, address1: ensAdd, ensAdd1: address });
      return;
    }catch(e){
      console.log(e);
      index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
      return;
    }
  }

  async onChange1(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.checkAddress(0, e.target.value);
  }

  async onChange2(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.checkAddress(1, e.target.value);
  }

  async onSubmit(e) {
    e.preventDefault();
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    await this.checkAddress(0, this.state.address1);
    await this.checkAddress(1, this.state.address2);
    
    if(this.state.validInput1 && this.state.validInput1){
      this.props.setAddresses([this.state.address1, this.state.address2], [this.state.ensAdd1, this.state.ensAdd2]);
    }
  }

  render() {
    return(
      <div id="section-preTrade" className="section" style={ preTradeStyle }>
        <form onSubmit={ this.onSubmit } className="method" style={ formStyle }>
        <div style={ addressesStyle }>
          <input
              type="text"
              name="address1"
              placeholder="Address 1"
              value={ this.state.address1 }
              onChange={ this.onChange1 }
              style={ (this.state.validInput1 ? inputStyle : badInputStyle) }
            />
          <input
            type="text"
            name="address2"
            placeholder="Address 2"
            value={ this.state.address2 }
            onChange={ this.onChange2 }
            style={ (this.state.validInput2 ? inputStyle : badInputStyle) }
          />
        </div>
        </form>
        <div style={ addressesStyle }>
          <button onClick={ this.onSubmit } style={ btnStyle }>Open Trade Box</button>
          {/*<button onClick={ this.props.refresh } style={ btnStyle }>Refresh</button>*/}
        </div>
      </div>
    );
  }
}

const preTradeStyle = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Secondary,
  padding: "0.4rem 0.2rem",
  margin: "1.6rem",
  marginTop: "0",
  color: colours.Tertiary,
  //border: "solid",
  flexDirection: "column"
}

const addressesStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  textAlign: "center"
}

const formStyle = {
  textAlign: "center",
  justifyContent: "center",
  color: colours.Primary
}

const inputStyle= {
  width: "24em",
  textAlign: "center",
  margin: "0.1rem"
}

const badInputStyle= {
  width: "24em",
  textAlign: "center",
  margin: "0.2rem",
  border: "solid red"
}

const btnStyle = {
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  margin: "0 1rem",
  marginTop: "0.2rem",
  width: "13em"
}

//PropTypes
PreTrade.propTypes = {
  isUser: PropTypes.number.isRequired,
  setAddresses: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired
}

export default PreTrade;