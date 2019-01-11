import React, { Component } from "react";
import uuid from "uuid/v4";

class SubmitBox extends Component {

  //Args added after
  state = {
    id: "",
    contract: "",
    methodName: "",
    methodType: ""
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState();
    const method = this.state;
    method.id = uuid();
    this.setState(method);
    this.props.addMethod(this.state);
  }

   onChange = (e) => this.setState({
     [e.target.name]: e.target.value
   });

  render(){
    return(
      <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <input 
          type="text" 
          name="contract" 
          placeholder="Contract Address" 
          value={ this.state.contract }
          onChange={ this.onChange }
        />
        <input 
          type="text" 
          name="methodName" 
          placeholder="Function Name" 
          value={ this.state.methodName }
          onChange={ this.onChange }
        />
        <input 
          type="text" 
          name="methodType" 
          placeholder="Function Type" 
          value={ this.state.methodType }
          onChange={ this.onChange }
        />
        <input 
          type="submit" 
          value="Add Function" 
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

export default SubmitBox;