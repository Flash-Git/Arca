import React, { Component } from "react";
import PropTypes from "prop-types";

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
    setInterval( () => this.updateBalances(), 10000);
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

    for(let i = 0; i<listErc20.length; i++){
      let erc20 = {};
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
  
    for(let i = 0; i<listErc721.length; i++){
      let erc721 = {};
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
        { this.state.erc20s.map(erc20 => 
          <>
            <span> { erc20.symbol } &nbsp; { erc20.balance }</span>
            <span> { erc20.allowance }</span>
          </>
        ) }
        { this.state.erc721s.map(erc721 => 
          <>
            <span> { erc721.symbol } &nbsp; { erc721.balance }</span>
          </>
        ) }
      </div>
    );
  }
}

const tokenInfoStyle = {
}

//PropTypes
TokenInfo.propTypes = {
  address: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired
}

export default TokenInfo;