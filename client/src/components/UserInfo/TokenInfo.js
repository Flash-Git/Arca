import React, { Component } from "react";
import PropTypes from "prop-types";

import Erc20 from "./Erc20";
import Erc721 from "./Erc721";
import abiErc20 from "../../abis/abiErc20";
import abiErc721 from "../../abis/abiErc721";
import { AppAddress, listErc20, listErc721, colours } from "../../Static";

class TokenInfo extends Component {

  state = {
    connected: false,
    erc20s: [],
    erc721s: []
  }

  componentDidMount() {
    setInterval( () => this.updateBalances(), 15000);
  }

  componentWillReceiveProps(newProps) {
    if(this.props.address!==newProps.address || this.props.connected!==newProps.connected){
      if(newProps.connected===false){
        this.setState({ connected: false });
      }
      this.setState({ connected: true }, () =>
        this.updateBalances());
    }
  }

  async updateBalances() {
    if(!this.state.connected){
      return;
    }

    let erc20s = [];
    let erc721s = [];
    const address = this.props.address.toString();
    if(!window.web3.utils.isAddress(address)){
      return;
    }
    let contract;

    for(let i = 0; i < listErc20.length; i++){
      let erc = { id: i, contractAdd: listErc20[i], type: "ERC20" };
      contract = await new window.web3.eth.Contract(abiErc20, listErc20[i]);

      try{
        let decimals = await contract.methods.decimals().call({
          from: address
        });
        decimals = decimals.toString();
        
        let decimalString = "1";
        for(let i = 0; i < decimals; i++){
          decimalString+="0";
        }
        erc.decimalString = decimalString;

        let balance = await contract.methods.balanceOf(address).call({
          from: address
        });
        balance = balance.div(decimalString).toString();

        if(balance === "0"){
          continue;
        }

        erc.balance = balance;

        erc.symbol = await contract.methods.symbol().call({
          from: address
        });

        let allowance = await contract.methods.allowance(address, AppAddress).call({
          from: address
        });
        allowance = allowance.toString();
        if(allowance === "0"){
          erc.allowance = "False";
        }else{
          erc.allowance = "True";
        }
      }catch(e){
        continue;
      }

      erc20s.push(erc);
    }
  
    for(let i = 0; i < listErc721.length; i++){
      let erc = { id: i, contractAdd: listErc721[i], type: "ERC721" };
      contract = await new window.web3.eth.Contract(abiErc721, listErc721[i]);
      try{
        let balance = await contract.methods.balanceOf(address).call({
          from: address
        });
        erc.balance = balance.toString();

        if(erc.balance === "0"){
          continue;
        }

        let symbol = "";
        try{
          symbol = await contract.methods.symbol().call({
            from: address
          });
        }catch(e){
          symbol = "NA";
        }
        erc.symbol = symbol;

        let allowance = await contract.methods.isApprovedForAll(address, AppAddress).call({
          from: address
        });
        if(allowance === false){
          erc.allowance = "False";
        }else{
          erc.allowance = "True";
        }
      }catch(e){
        continue;
      }
      erc721s.push(erc);
    }

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
  address: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  addErc: PropTypes.func.isRequired
}

export default TokenInfo;