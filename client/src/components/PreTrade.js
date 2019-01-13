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
          />
        </form>
        <button onClick={ this.onSubmit } style={ btnStyle }>Open Trade Box</button>
      </div>
    );
  }
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#888",
  color: "#fff"
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
  fontWeight: "bold"
}

//PropTypes
PreTrade.propTypes = {

}

export default PreTrade;