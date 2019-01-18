import React, { Component } from "react";
import PropTypes from "prop-types";

class PreTrade extends Component {

  state = {
    tradePartner: ""
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setTradePartner(this.state.tradePartner);
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
            name="tradePartner"
            placeholder="Trade Partner Address"
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
  textAlign: "center"
}

const badInputStyle= {
  width: "24em",
  textAlign: "center",
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
  setTradePartner: PropTypes.func.isRequired,
  validInput: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired
}

export default PreTrade;