import React, { Component } from "react";
import PropTypes from "prop-types";

import { sendStatus, colours } from "../../Static";
import { Erc20Contract, Erc721Contract, ErcCalls } from "../../ContractCalls";

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

    let contract;
    if(method.type.includes("20")){
      contract = Erc20Contract(method.contractAdd);
      method.type = 0;
    }else if(method.type.includes("721")){
      contract = Erc721Contract(method.contractAdd);
      method.type = 1;
    }else{
      return;
    }

    method.name = "";
    method.symbol = "";

    ErcCalls("name", contract)
      .then(res => {
        method.name = res.toString();
      })
    ErcCalls("symbol", contract)
      .then(res => {
        method.symbol = res.toString();
      })

    this.props.addMethod(method);//TODO THIS MIGHT REQUIRE PROMISE.ALL
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return(
      <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <input style={ this.state.contractAdd.length === 42  ?
            {...baseInputStyle, ...{ maxWidth: "24em", borderLeft: "solid 4px green" }} :
            {...baseInputStyle, ...{ maxWidth: "24em", borderLeft: "solid 4px red" }}
          }
          type="text"
          name="contractAdd"
          placeholder="Token's Contract Address"
          value={ this.state.contractAdd }
          onChange={ this.onChange }
        />
        <select style={ this.state.type.includes("20")||this.state.type.includes("721") ?
            {...baseInputStyle, ...{ maxWidth: "10em", borderLeft: "solid 4px green" }} :
            {...baseInputStyle, ...{ maxWidth: "10em", borderLeft: "solid 4px red" }}
          }
          type="text"
          name="type"
          //placeholder="ERC20 / ERC721"
          value={ this.state.type }
          onChange={ this.onChange }
        >
          <option value={ "ERC20" }>ERC20</option>
          <option value={ "ERC721" }>ERC721</option>
        </select>
        <input style={ {...baseInputStyle, ...{ maxWidth:"10em" }} }
          type="text"
          name="amountId"
          placeholder="Amount / ID"
          value={ this.state.amountId }
          onChange={ this.onChange }
        />
        <input style={ btnStyle }
          type="submit"
          name="addOffer"
          value="Add Offer"
          className="btn"
        />
      </form>
    );
  }
}

const methodStyle = {
  gridColumn: "1 / 3",
  gridRow: "3",
  justifyContent: "center",
  textAlign: "center",
  background: colours.Primary,
  color: colours.Secondary
}

const baseInputStyle = {
  textAlign: "left",
  margin: "0.2rem",
  minWidth: "6em",
  backgroundColor: colours.Primary,
  borderColor: "#888888",
  borderWidth: "1px",
  borderStyle: "solid",
  color: colours.Secondary,
  padding: "0.1rem"
}

const btnStyle = {
  background: colours.Button,
  border: "none",
  borderRadius: "0.4rem",
  color: colours.Primary,
  fontWeight: "bold",
  cursor: "pointer",
  padding: "0.35rem 0.5rem",
  margin: "0.2rem 0.5rem",
  marginTop: "0.4rem"
}

//PropTypes
SubmitBox.propTypes = {
  connected: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  erc: PropTypes.object.isRequired,
  addMethod: PropTypes.func.isRequired
}

export default SubmitBox;