import React, { Component } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

import { sendStatus } from "../../Static";

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
      this.setState({ contractAdd: this.props.erc.contractAdd, type: this.props.erc.type, amountId: "" });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const method = this.state;
    if(method.type.includes("20")){
      method.type = 0;
    } else if(method.type.includes("721")){
      method.type = 1;
    }
    method.id = method.type+"-"+uuid();//TODO getCount
    this.setState(method);
    this.props.addMethod(this.state);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
          placeholder="ERC20"
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
  textAlign: "center",
  justifyContent: "center",
  background: "#222",
  color: "#fff"
}

//PropTypes
SubmitBox.propTypes = {
  addMethod: PropTypes.func.isRequired,
  erc: PropTypes.object.isRequired
}

export default SubmitBox;