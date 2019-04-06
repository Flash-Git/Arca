import React, { Component } from "react";
import PropTypes from "prop-types";

class PreTrade extends Component {

  state = {
    address1: "",
    ensAdd1: "",
    address2: "",
    ensAdd2: "",
    validInput1: false,
    validInput2: false
  }


  onSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    if(!this.props.connected){
      return;
    }
    if(this.state.address1.includes(".eth")){
      window.web3.eth.ens.getAddress(this.state.address1).then(address1 =>
        this.setState({ ensAdd1: this.state.address1, address1 }, () => this.handleNewAddresses)
      );
      count++;
    }
    if(this.state.address2.includes(".eth")){
      window.web3.eth.ens.getAddress(this.state.address2).then(address2 =>
        this.setState({ ensAdd2: this.state.address2, address2 }, () => this.handleNewAddresses)
      );
      count++;
    } else if(count === 0){
      this.handleNewAddresses();
    }
  }

  handleNewAddresses = () => {
    if(this.checkAddresses() === false){
      return;
    }
    this.props.setAddresses([this.state.address1, this.state.address2], [this.state.ensAdd1, this.state.ensAdd2]);
  }

  checkAddresses = () => {
    if(!this.props.connected){
      return false;
    }
    let sumAdd1 = "";
    let sumAdd2 = "";
    
    try{
      sumAdd1 = window.web3.utils.toChecksumAddress(this.state.address1);
    } catch(e) {
      this.setState({ validInput1: false });
      return false;
    }
    try{
      sumAdd2 = window.web3.utils.toChecksumAddress(this.state.address2);
    } catch(e) {
      this.setState({ validInput2: false });
      return false;
    }
    if(window.web3.utils.isAddress(sumAdd1)){
      this.setState({ validInput1: true });
    } else {
      this.setState({ validInput1: false });
    }
    if(window.web3.utils.isAddress(sumAdd2)){
      this.setState({ validInput2: true });
    } else {
      this.setState({ validInput2: false });
    }
  }

  onChange = (e) => {this.setState({
      [e.target.name]: e.target.value
    });
    this.checkAddresses();
  }

  render() {
    return(
      <div id="section-preTrade" className="section" style={ preTradeStyle }>
        <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <div style={ addressesStyle }>
          <input
              type="text"
              name="address1"
              placeholder="Address 1"
              value={ this.state.address1 }
              onChange={ this.onChange }
              style={ (this.state.validInput1 ? inputStyle : badInputStyle) }
            />
          <input
            type="text"
            name="address2"
            placeholder="Address 2"
            value={ this.state.address2 }
            onChange={ this.onChange }
            style={ (this.state.validInput2 ? inputStyle : badInputStyle) }
          />
        </div>
        </form>
        <div style={ addressesStyle }>
          <button onClick={ this.onSubmit } style={ btnStyle }>Open Trade Box</button>
          <button onClick={ this.props.refresh } style={ btnStyle }>Refresh</button>
        </div>
      </div>
    );
  }
}

const preTradeStyle = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  background: "#858889",
  padding: "0.4rem 0.2rem",
  margin: "1.6rem",
  marginTop: "0",
  border: "solid",
  flexDirection: "column"
}

const addressesStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  textAlign: "center"
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  color: "#fff"
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