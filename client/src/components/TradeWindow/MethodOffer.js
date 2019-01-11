import React, { Component } from "react";

class Method extends Component {

  state = {
    args: [],
    type: "",
    name: "",
    value: "",
    sent: false
  }

  onChange = (e) => this.setState({
    [e.target.name]: e.target.value
  });

  onSubmit = (e) => {
    e.preventDefault();
    const args = this.state.args;
    args.push([this.state.type, this.state.name, this.state.value]);
    this.setState({ args });
    this.props.addMethodArguments(this.props.method.id, this.state.args, this.state.sent);
  }

  sendMethod = (e) => {
    this.props.sendMethod(this.props.method.id);
  }

  render(){
    return(
      <div className="method" style={ methodStyle }>
        <div className="display" style={ displayStyle }>
          { this.props.method.contract + " " + this.props.method.methodType + " " + this.props.method.methodName }
          { "(" }
          { this.state.args.map((arg, i) => (
          arg[0] + ": " + arg[1] + " = " + arg[2] + (i===this.state.args.length-1 ? "" : ", ")
          )) }
          { ")" }
        </div>
        <form onSubmit={ this.onSubmit } className="form" style={ formStyle }>
          <input 
            type="text" 
            name="type" 
            placeholder="Arg Type" 
            value={ this.state.type }
            onChange={ this.onChange }
          />
          <input 
            type="text" 
            name="name" 
            placeholder="Arg name" 
            value={ this.state.name }
            onChange={ this.onChange }
          />
          <input 
          type="text" 
          name="value" 
          placeholder="Arg value" 
          value={ this.state.value }
          onChange={ this.onChange }
        />
          <input 
            type="submit" 
            value="Add Args" 
            className="btn"
          />
        </form>
        <button onClick={ this.sendMethod } style={ btnStyle }>{ (this.props.method.sent ? "Sent" : "Send Method") }</button>
      </div>
    );
  }
}

const methodStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "5fr 1fr",
  gridTemplateRows: "1 1",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const displayStyle = {
  gridColumn: "1 / 2",
  gridRow: "1",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const formStyle = {
  gridColumn: "1 / 2",
  gridRow: "2 / 3",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const btnStyle = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

export default Method;