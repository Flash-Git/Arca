import React, { Component } from "react";
import PropTypes from "prop-types";

import Erc20 from "./Erc20";
import Erc721 from "./Erc721";
import { listErc20, listErc721, colours } from "../../Static";
import { ercCalls, erc20Contract, erc721Contract } from "../../ContractCalls";

class TokenInfo extends Component {

  state = {
    erc20s: [],
    erc721s: []
  }

  componentDidMount() {
    setInterval( () => this.updateBalances(), 15000);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.connected!==this.props.connected){
      if(newProps.connected === true){
        this.updateBalances();
      }
    }
  }

  getBalance = (contract) => {
    return 
  }

  updateBalances = () => {
    if(!this.props.connected){
      return;
    }

    let erc20s = [];
    let decimalBalancePromises = [];
    let erc721s = [];

    for(let i = 0; i < listErc20.length; i++){
      console.log("i " + i);

      let erc = { id: i, contractAdd: listErc20[i], type: "ERC20" };
      const contract = erc20Contract(listErc20[i]);

      ercCalls(contract, "decimals")
        .then(res => {
          erc.decimalString = "1";
          if(res===null){
            console.log(listErc20[i]);
            return;
          }
          for(let i = 0; i < +(res.toString()); i++){
            erc.decimalString+="0";
          }
          console.log("decimals " + erc.decimalString);
          ercCalls(contract, "balanceOf")
            .then(res => {
              if(res===null){
                console.log(listErc20[i]);
                return;
              }
              erc.balance = res.div(erc.decimalString).toString();
              console.log("balance " + erc.balance);
              if(erc.balance === "0"){
                console.log("Skipping");
                return;
              }
              console.log("adding");
              let promiseArray = [];
              promiseArray.push(ercCalls(contract, "symbol")
                .then(res => {
                  if(res===null){
                    console.log(listErc20[i]);
                    return;
                  }
                  erc.symbol = res.toString();
                  console.log("symbol " + erc.symbol);
                }));
              promiseArray.push(ercCalls(contract, "allowance")
                .then(res => {
                  if(res===null){
                    console.log(listErc20[i]);
                    return;
                  }
                  res === "0" ? erc.allowance = "False" : erc.allowance = "True";
                  console.log("allowance " + erc.allowance);
                }));
              Promise.all(promiseArray)
                .then( () => {
                  erc20s.push(erc);
                  this.setState({ erc20s });
                });
          });
        });
      }
      /*

      let decimalString = "1";
      for(let i = 0; i < decimals; i++){
        decimalString+="0";
      }
      erc.decimalString = decimalString;

      ercCalls(contract, "balanceOf")
        .then(res => balance = res.div(decimalString).toString());
      console.log(balance);

      if(balance === "0"){
        continue;
      }
      erc.balance = balance;

      erc.symbol = ercCalls(contract, "symbol").toString();
      console.log(erc.symbol);

      erc.allowance = ercCalls(contract, "allowance") === "0" ? erc.allowance = "False" : erc.allowance = "True"
      console.log(erc.allowance);
      erc20s.push(erc);
      */

    this.setState({ erc20s, erc721s });
  }

  render() {
    return(
      <div className="tokenInfo" style={ tokenInfoStyle }>
        <h4 style={ h3Style }>ERC20</h4>
        { this.state.erc20s.map(erc =>
          <Erc20 key={ erc.id } erc={ erc } addErc={ this.props.addErc } />
        ) }
        <br/>
        <h4 style={ h3Style }>ERC721</h4>
        { this.state.erc721s.map(erc =>
          <Erc721 key={ erc.id } erc={ erc } addErc={ this.props.addErc } />
        ) }
      </div>
    );
  }
}

const h3Style = {
  marginTop: "0",
  marginBottom: "0.3rem",
}

const tokenInfoStyle = {
  padding: "0.6rem 0",
  paddingBottom: "0.3rem",
  borderRadius: "15px",
  minHeight: "5rem",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  backgroundColor: colours.Secondary,
  margin: "0.5rem"
}

//PropTypes
TokenInfo.propTypes = {
  connected: PropTypes.bool.isRequired,
  addErc: PropTypes.func.isRequired
}

export default TokenInfo;