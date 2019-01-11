import React, { Component } from "react";

class Method extends Component {

  state = {
    id: "",
    contract: "",
    methodName: "",
    methodType: "",
    args: [],
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ args: [...this.state.args, this.state.newArgA[this.state.newArgB]] });
    const state = this.state;
    delete state.newArgA;
    delete state.newArgB;
    this.setState({ state });

    this.props.addMethodArgument(this.state);
  }

   onChange = (e) => this.setState({
     [e.target.name]: e.target.value
   });

  render(){
    return(
      <div className="method" style={ methodStyle }>
        { this.props.method.contract }
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