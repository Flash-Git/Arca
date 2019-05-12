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

  updateBalances = () => {
    if(!this.props.connected){
      return;
    }

    let erc20s = [];
    let erc721s = [];
    let promiseArray = [];
    let promiseArray2 = [];

    for(let i = 0; i < listErc20.length; i++){
      let erc = { id: i, contractAdd: listErc20[i], type: "ERC20" };
      const contract = erc20Contract(listErc20[i]);

      promiseArray.push(ercCalls(contract, "decimals")
        .then(res => {
          erc.decimalString = "1";
          if(res===null){
            console.log(listErc20[i]);
            return;
          }
          for(let i = 0; i < +(res.toString()); i++){
            erc.decimalString+="0";
          }
          //console.log("decimals " + erc.decimalString);
          ercCalls(contract, "balanceOf")
            .then(res => {
              if(res===null){
                console.log(listErc20[i]);
                return;
              }
              erc.balance = res.div(erc.decimalString).toString();
              //console.log("balance " + erc.balance);
              if(erc.balance === "0"){
                return;
              }

              erc20s.push(erc);

              promiseArray2.push(ercCalls(contract, "symbol")
                .then(res => {
                  if(res===null){
                    console.log(listErc20[i]);
                    return;
                  }
                  erc.symbol = res.toString();
                  //console.log("symbol " + erc.symbol);
                }));
              promiseArray2.push(ercCalls(contract, "allowance")
                .then(res => {
                  if(res===null){
                    //console.log(listErc20[i]);
                    return;
                  }
                  erc.allowance = res === "0" ? "False" : "True";
                  //console.log("allowance " + erc.allowance);
                }));
              /*Promise.all(promiseArray)
                .then( () => {
                  erc20s.push(erc);
                  //this.setState({ erc20s });
                });*/
          });
        }));
      }

      for(let i = 0; i < listErc721.length; i++){
        let erc = { id: i, contractAdd: listErc721[i], type: "ERC721" };
        const contract = erc721Contract(listErc721[i]);

        promiseArray.push(ercCalls(contract, "balanceOf")
          .then(res => {
            if(res===null){
              console.log(listErc721[i]);
              return;
            }
            erc.balance = res.toString();
            //console.log("balance " + erc.balance);
            if(erc.balance === "0"){
              return;
            }

            erc721s.push(erc);

            promiseArray2.push(ercCalls(contract, "symbol")
              .then(res => {
                if(res===null){
                  console.log(listErc721[i]);
                  return;
                }
                erc.symbol = res.toString();
                //console.log("symbol " + erc.symbol);
              }));
            promiseArray2.push(ercCalls(contract, "isApprovedForAll")
              .then(res => {
                if(res===null){
                  //console.log(listErc721[i]);
                  return;
                }
                erc.allowance = res === "0" ? "False" : "True";
                //console.log("allowance " + erc.allowance);
              }));
            /*Promise.all(promiseArray)
              .then( () => {
                erc721s.push(erc);
                //this.setState({ erc721s });
              });*/
          }));
      }

      Promise.all(promiseArray)
        .then( () => {
          console.log(promiseArray2.length);
          Promise.all(promiseArray2)
            .then( () => {
              this.setState({ erc20s, erc721s });
            })
        });
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