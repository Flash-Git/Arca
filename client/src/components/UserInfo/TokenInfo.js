import React, { Component } from "react";
import PropTypes from "prop-types";

import Erc20 from "./Erc20";
import Erc721 from "./Erc721";
import abiErc20 from "../../abis/abiErc20";
import abiErc721 from "../../abis/abiErc721";
import { AppAddress, listErc20, listErc721 } from "../../Static";

class TokenInfo extends Component {

  state = {
    erc20s: [],
    erc721s: []
  }

  componentDidMount() {
    this.updateBalances();
    setInterval( () => this.updateBalances(), 1000);
  }

  async updateBalances() {
    if(!this.props.connected){
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
      let erc20 = { id: i, contractAdd: listErc20[i] };
      contract = await new window.web3.eth.Contract(abiErc20, listErc20[i]);

      let balance = await contract.methods.balanceOf(address).call({
        from: address
      });
      balance = balance.toString();

      if(balance === "0"){
        continue;
      }

      erc20.balance = balance.slice(0, balance.length-18);

      erc20.symbol = await contract.methods.symbol().call({
        from: address
      });

      let allowance = await contract.methods.allowance(address, AppAddress).call({
        from: address
      });
      allowance = allowance.toString();

      erc20.allowance = allowance.slice(0, balance.length-18);
      erc20s.push( erc20 );
    }
  
    for(let i = 0; i < listErc721.length; i++){
      let erc721 = { id: i, contractAdd: listErc721[i] };
      contract = await new window.web3.eth.Contract(abiErc721, listErc721[i]);

      let balance = await contract.methods.balanceOf(address).call({
        from: address
      });
      erc721.balance = balance.toString();

      if(erc721.balance === "0"){
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
      erc721.symbol = symbol;

      erc721s.push(erc721);
    }

    this.setState({ erc20s, erc721s });
  }

  render() {
    return(
      <div className="tokenInfo" style={ tokenInfoStyle }>
        <h4 style={ h3Style }>ERC20</h4>
        { this.state.erc20s.map(erc20 =>
          <Erc20 key={ erc20.id } contractAdd={ erc20.contractAdd } symbol={ erc20.symbol } balance={ erc20.balance } allowance={ erc20.allowance } />
        ) }
        <h4 style={ h3Style }>ERC721</h4>
        { this.state.erc721s.map(erc721 =>
          <Erc721 key={ erc721.id } contractAdd={ erc721.contractAdd } symbol={ erc721.symbol } balance={ erc721.balance } />
        ) }
      </div>
    );
  }
}

const h3Style = {
  marginTop: "0em",
  marginBottom: "0.4em",
  textDecoration: "underline"
}

const tokenInfoStyle = {
  margin: "0.5rem",
  paddingTop: "0.3rem"
}

//PropTypes
TokenInfo.propTypes = {
  address: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired
}

export default TokenInfo;