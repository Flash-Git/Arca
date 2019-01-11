import React, { Component } from "react";

class Method extends Component {

  state = {
    args: []
  }

  onSubmit = (e) => {
    e.preventDefault();
    const args = this.state.args;
    args.push([this.state.newArgA, this.state.newArgB]);
    const state = this.state;
    delete state.newArgA;
    delete state.newArgB;
    this.setState({ state, args });

    this.props.addMethodArguments(this.props.method.id, this.state.args);
  }

   onChange = (e) => this.setState({
     [e.target.name]: e.target.value
   });

  render(){
    return(
      <div className="method" style={ methodStyle }>
        { this.props.method.contract + " " + this.props.method.methodName + " " + this.props.method.methodType + " " + this.state.args}
        <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
          <input 
            type="text" 
            name="newArgA" 
            placeholder="First Arg" 
            value={ this.state.newArgA }
            onChange={ this.onChange }
          />
          <input 
            type="text" 
            name="newArgB" 
            placeholder="Second Arg" 
            value={ this.state.newArgB }
            onChange={ this.onChange }
          />
          <input 
            type="submit" 
            value="Add Args" 
            className="btn"
          />
        </form>
      </div>
    );
  }
}
//this.props.method.contract
const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem"
}

export default Method;