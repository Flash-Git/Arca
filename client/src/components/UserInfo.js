import React, { Component } from "react";
//eslint-disable-next-line
import PropTypes from "prop-types";

class UserInfo extends Component {

  onClick = () => {
    
  }

  render() {
    return(
      <div id="section-userInfo" className="section" style={ userInfoStyle }>

      </div>
    );
  }
}

const userInfoStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#486898",
}

//PropTypes
UserInfo.propTypes = {

}

export default UserInfo;