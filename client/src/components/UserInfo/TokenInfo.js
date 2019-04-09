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
    setInterval( () => this.updateBalances(), 5000);
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
      let erc = { id: i, contractAdd: listErc20[i], type: "ERC20" };
      contract = await new window.web3.eth.Contract(abiErc20, listErc20[i]);

      let balance = await contract.methods.balanceOf(address).call({
        from: address
      });
      balance = balance.toString();

      if(balance === "0"){
        continue;
      }

      erc.balance = balance.slice(0, balance.length-18);

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

      erc20s.push(erc);
    }
  
    for(let i = 0; i < listErc721.length; i++){
      let erc = { id: i, contractAdd: listErc721[i], type: "ERC721" };
      contract = await new window.web3.eth.Contract(abiErc721, listErc721[i]);

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
        <h4 style={ h3Style }>ERC721</h4>
        { this.state.erc721s.map(erc =>
          <Erc721 key={ erc.id } erc={ erc } addErc={ this.props.addErc } />
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
  connected: PropTypes.bool.isRequired,
  addErc: PropTypes.func.isRequired
}

export default TokenInfo;