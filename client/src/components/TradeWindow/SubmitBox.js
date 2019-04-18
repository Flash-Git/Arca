import React, { Component } from "react";
import PropTypes from "prop-types";

import abiErc20 from "../../abis/abiErc20";
import abiErc721 from "../../abis/abiErc721";
import { AppAddress, sendStatus, colours } from "../../Static";

class SubmitBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      type: "",
      name: "",
      symbol: "",
      contractAdd: "",
      amountId: "",
      sendStatus: sendStatus.UNSENT
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.allowErc = this.allowErc.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.erc.contractAdd !== this.props.erc.contractAdd){
      this.setState({ contractAdd: nextProps.erc.contractAdd, type: nextProps.erc.type, amountId: "" });
    }
  }

  async onSubmit(e) {//addOffer
    e.preventDefault();
    const method = {
      id: "",
      type: this.state.type,
      name: "",
      symbol: "",
      contractAdd: this.state.contractAdd,
      amountId: this.state.amountId,
      sendStatus: sendStatus.UNSENT
    };
    let ercAbi = "";

    if(method.type.includes("20")){
      ercAbi = abiErc20;
      method.type = 0;
    }else if(method.type.includes("721")){
      ercAbi = abiErc20;
      method.type = 1;
    }else{
      return;
    }
    try {
      const ercContract = await new window.web3.eth.Contract(ercAbi, method.contractAdd);
      method.name = await ercContract.methods.name().call({
        from: this.props.address
      });
      method.symbol = await ercContract.methods.symbol().call({
        from: this.props.address
      });
    }catch(e){
      method.name = "";
      method.symbol = "";
    }

    this.props.addMethod(method);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async allowErc(e) {
    e.preventDefault();
    if(!this.props.connected){
      return;
    }

    let ercAbi;
    let type;

    if(this.state.type.includes("20")){
      ercAbi = abiErc20;
      type = 0;
    }else if(this.state.type.includes("721")){
      ercAbi = abiErc721;
      type = 1;
    }else{
      return;
    }

    try{
      let contract = await new window.web3.eth.Contract(ercAbi, this.state.contractAdd);

      if(type === 0){//ERC20
        await contract.methods.approve(AppAddress, "10000000000000000000000000000000000").send({
          from: this.props.address
        })
        .on("transactionHash", (hash) => {
          console.log("txHash: " + hash);
        })
        .on("error", console.error);
      }else{//ERC721
        await contract.methods.setApprovalForAll(AppAddress, true).send({
          from: this.props.address
        })
        .on("transactionHash", (hash) => {
          console.log("txHash: " + hash);
        })
        .on("error", console.error);
      }
    }catch(e){
      console.log(e);
      return;
    }
  }

  render() {
    return(
      <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <input
          type="text"
          name="contractAdd"
          placeholder="Token's Contract Address"
          value={ this.state.contractAdd }
          onChange={ this.onChange }
        />
        <input
          type="text"
          name="type"
          placeholder="ERC20 / ERC721"
          value={ this.state.type }
          onChange={ this.onChange }
        />
        <input
          type="text"
          name="amountId"
          placeholder="Amount / ID"
          value={ this.state.amountId }
          onChange={ this.onChange }
        />
        <input
          type="submit"
          name="addOffer"
          value="Add Offer"
          className="btn"
        />
        <button onClick={ this.allowErc } className="btn">
          Enable
        </button>
      </form>
    );
  }
}

const methodStyle = {
  gridColumn: "1 / 3",
  gridRow: "3",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Secondary,
  color: colours.Quaternary
}

//PropTypes
SubmitBox.propTypes = {
  address: PropTypes.string.isRequired,
  addMethod: PropTypes.func.isRequired,
  erc: PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired
}

export default SubmitBox;