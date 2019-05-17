import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./TradeWindow/Box";

import { boolStatus, userBoxStatus } from "../Static";

class TradeWindow extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      satisfied: [boolStatus.FALSE, boolStatus.FALSE],
      executedStatus: boolStatus.FALSE
    }
    this.setSatisfied = this.setSatisfied.bind(this);
  }

  setSatisfied(_boxNum, _satisfied) {
    console.log(_satisfied);
    let satisfied = this.state.satisfied;
    if(satisfied[_boxNum] ===_satisfied) return;

    satisfied[_boxNum] = _satisfied;
    this.setState({ satisfied });
    
    if(satisfied[0] === boolStatus.TRUE && satisfied[1] === boolStatus.TRUE){
      this.setState({ executedStatus: boolStatus.TRUE });
      alert("Trade Successfully Executed");
    }else{
      this.setState({ executedStatus: boolStatus.FALSE });
    }
  }
  
  render() {
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <div id="boxes" style={ boxesStyle }>
          {/* <h3>{ AppAddress }</h3> */}
          <Box connected={ this.props.connected } counter={ this.props.counter } 
            isUser={ (this.props.userBox === userBoxStatus.SECOND_BOX ? true : false) }
            addresses={ [this.props.addresses[1], this.props.addresses[0]] } ensAdd={ this.props.ensAdds[1] }
            boxNum = { 0 } erc={ this.props.erc } setSatisfied={ this.setSatisfied }
          />
          <Box connected={ this.props.connected } counter={ this.props.counter }
            isUser={ (this.props.userBox === userBoxStatus.FIRST_BOX ? true : false) }
            addresses={ [this.props.addresses[0], this.props.addresses[1]] } ensAdd={ this.props.ensAdds[0] }
            boxNum = { 1 } erc={ this.props.erc } setSatisfied={ this.setSatisfied }
          />
        </div>
      </div>
    );
  }
}

const tradeWindowStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  marginBottom: "1.15rem",
  maxWidth: "55rem"
}

const boxesStyle = {
  display: "flex",
  flexWrap: "wrap",
  textAlign: "center",
  justifyContent: "center",
  flexDirection: "row",
}
//PropTypes
TradeWindow.propTypes = {
  connected: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdds: PropTypes.array.isRequired,
  userBox: PropTypes.number.isRequired,
  erc: PropTypes.object.isRequired
}

export default TradeWindow;