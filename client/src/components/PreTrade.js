import React, { Component } from "react";
import PropTypes from "prop-types";

class PreTrade extends Component {

  state = {
    address1: "",
    address2: ""
  }

  async componentDidMount() {
    if(this.props.isUser){
      let address1 = "";
      try{
        address1 = await window.web3.currentProvider.selectedAddress;
        console.log(address1);
        this.setState({ address1 });//TODO doesn't update input field
      } catch(e){
        console.error(e);
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setAddresses([this.state.address1, this.state.address2]);
  }

   onChange = (e) => this.setState({
     [e.target.name]: e.target.value
   });

  render(){
    return(
      <div id="section-preTrade" className="section" style={ preTradeStyle }>
        <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <input
            type="text"
            name="address1"
            placeholder="Address 1"
            value={ this.state.tradePartner }
            onChange={ this.onChange }
            style={ (this.props.validInput ? inputStyle : badInputStyle) }
          />
        <input
          type="text"
          name="address2"
          placeholder="Address 2"
          value={ this.state.tradePartner }
          onChange={ this.onChange }
          style={ (this.props.validInput ? inputStyle : badInputStyle) }
        />
        </form>
        <button onClick={ this.onSubmit } style={ btnStyle }>Open Trade Box</button>
        <button onClick={ this.props.refresh } style={ btnStyle }>Refresh</button>
      </div>
    );
  }
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#888",
  color: "#fff",
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

const preTradeStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#888"
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
  width: "13em"
}

//PropTypes
PreTrade.propTypes = {
  isUser: PropTypes.bool.isRequired,
  setAddresses: PropTypes.func.isRequired,
  validInput: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired
}

export default PreTrade;