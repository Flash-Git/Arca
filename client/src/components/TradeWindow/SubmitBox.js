import React, { Component } from "react";

class SubmitBox extends Component {

  //Args added after
  state = {
    method: {
      contract: "",
      methodName: "",
      methodType: ""
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addMethod(this.state.method);
  }

  onChangeContract = (e) => this.setState({
    [e.target.name]: e.target.value
  });

  onChangeMethodName = (e) => this.setState({
    [e.target.name]: e.target.value
  });

  onChangeMethodType = (e) => console.log([e.target.name]);

  render(){
    return(
      <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <input 
          type="text" 
          name="method.contract" 
          placeholder="Contract Address" 
          value={ this.state.method.contract }
          onChange={ this.onChangeContract }
        />
        <input 
          type="text" 
          name="method.methodName" 
          placeholder="Function Name" 
          value={ this.state.method.methodName }
          onChange={ this.onChangeMethodName }
        />
        <input 
          type="text" 
          name="method.methodType" 
          placeholder="Function Type" 
          value={ this.state.method.methodType }
          onChange={ this.onChangeMethodType }
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