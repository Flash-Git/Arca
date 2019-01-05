import React, { Component } from "react";
import Web3 from "web3";

class Landing extends Component {
    // console.log("cunt");
    // if(window.ethereum) { //Modern DApp Browsers
    //   web3 = new Web3(window.ethereum);
    //   try { 
    //     window.ethereum.enable().then(
    //       function() {
    //         console.log("Web3 Enabled");
    //       }
    //     );
    //   } catch(e) {
    //     console.log(e);
    //   }
    // } else if(window.web3) { //Legacy DApp Browsers
    //   web3 = new Web3(web3.currentProvider);
    //   console.log("Degacy web3 enabled");
    // } else { //Non-DApp Browsers
    //   alert('Please install MetaMask');
    // }
  render(){
    return(
      <div id="section-landing">
        <div className="section" id="section0">
          <div className="section-imgtext">
            <h1>Trade</h1>
          </div>
          <div className="section-landingtext">
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;