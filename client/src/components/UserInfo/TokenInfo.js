import React, { Component } from "react";
import PropTypes from "prop-types";

import Erc20 from "./Erc20";
import Erc721 from "./Erc721";
import { ListErc20, ListErc721, colours } from "../../Static";
import { ercCalls, erc20Contract, erc721Contract } from "../../ContractCalls";

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
    if(newProps.connected !== this.props.connected){
      this.setState({ connected: newProps.connected }, () => this.updateBalances());
    }
  }

  updateBalances = () => {
    if(!this.props.connected){
      return;
    }
    
    const listErc20 = ListErc20();
    const listErc721 = ListErc721();

    for(let i = 0; i < listErc20.length; i++){
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
          ercCalls(contract, "balanceOf")
            .then(res => {
              if(res===null){
                console.log(listErc20[i]);
                return;
              }
              erc.balance = res.div(erc.decimalString).toString();
              if(erc.balance === "0"){
                return;
              }

              let promiseArray = [];
              promiseArray.push(ercCalls(contract, "symbol")
                .then(res => {
                  if(res===null){
                    console.log(listErc20[i]);
                    erc.symbol = "N/A";
                    return;
                  }
                  erc.symbol = res.toString();
                }));
              promiseArray.push(ercCalls(contract, "allowance")
                .then(res => {
                  if(res===null){
                    console.log(listErc20[i]);
                    erc.allowance = "N/A";
                    return;
                  }
                  erc.allowance = res === "0" ? "False" : "True";
                }));
              Promise.all(promiseArray)
                .then( () => {
                  this.addErc20(erc);
                });
          });
        });
      }

      for(let i = 0; i < listErc721.length; i++){
        let erc = { id: i, contractAdd: listErc721[i], type: "ERC721" };
        const contract = erc721Contract(listErc721[i]);

        ercCalls(contract, "balanceOf")
          .then(res => {
            if(res===null){
              console.log(listErc721[i]);
              return;
            }
            erc.balance = res.toString();
            if(erc.balance === "0"){
              return;
            }

            let promiseArray = [];
            promiseArray.push(ercCalls(contract, "symbol")
              .then(res => {
                if(res===null){
                  console.log(listErc721[i]);
                  erc.symbol = "N/A";
                  return;
                }
                erc.symbol = res.toString();
              }));
            promiseArray.push(ercCalls(contract, "isApprovedForAll")
              .then(res => {
                if(res===null){
                  console.log(listErc721[i]);
                  erc.allowance = "N/A";
                  return;
                }
                erc.allowance = res === "0" ? "False" : "True";
              }));
            Promise.all(promiseArray)
              .then( () => {
                this.addErc721(erc);
              });
          });
      }
  }

  addErc20(_erc) {
    let erc20s = this.state.erc20s.filter(erc20 =>{
      return erc20.id !== _erc.id;
    });
    erc20s.push(_erc);
    erc20s.sort((a, b) => { 
      return a.id - b.id;
    });
    this.setState({ erc20s });
  }

  addErc721(_erc) {
    let erc721s = this.state.erc721s.filter(erc721 => {
      return erc721.id !== _erc.id;
    });
    erc721s.push(_erc);
    erc721s.sort((a, b) => { 
      return a.id - b.id;
    });
    this.setState({ erc721s });
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