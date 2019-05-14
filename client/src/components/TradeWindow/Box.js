import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import OfferErc from "./OfferErc";

import { sendStatus, boolStatus, colours } from "../../Static";
import { ArcaContract, ArcaCalls, Erc20Contract, Erc721Contract, ErcCalls } from "../../ContractCalls";

class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      satisfied: boolStatus.FALSE,
      partnerNonce: 0,
      localMethods: [],
      chainMethods: []
    }
    this.addLocalMethod = this.addLocalMethod.bind(this);
    this.addChainErc = this.addChainErc.bind(this);
    this.setMethodSendStatus = this.setMethodSendStatus.bind(this);
    this.setMethodEnableStatus = this.setMethodEnableStatus.bind(this);
    this.getErc20Offers = this.getErc20Offers.bind(this);
    this.getErc721Offers = this.getErc721Offers.bind(this);
    this.getMethods = this.getMethods.bind(this);
    this.removing = this.removing.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(this.props.addresses[0] !== newProps.addresses[0] || this.props.addresses[1] !== newProps.addresses[1]
      || newProps.connected !== this.props.connected || newProps.counter !== this.props.counter){
      this.setState({ connected: newProps.connected }, () => this.getMethods());
    }
  }

  async addLocalMethod(method) {
    const [add1, add2] = this.props.addresses;
    const arcaContract = ArcaContract();
    
    if(method.type === 0){
      const ercContract = Erc20Contract(method.contractAdd);
      Promise.all([
        ArcaCalls("getErc20Count", [add1, add2], arcaContract),
        ErcCalls("decimals", ercContract),
        ErcCalls("allowance", ercContract)
      ])
        .then(res => {
          method.id = method.type+"-"+res[0].toString();

          method.decimalString = "1";
          for(let i = 0; i < +(res[1].toString()); i++){
            method.decimalString+="0";
          }

          method.enabled = res[2].toString() === "0" ? false : true;

          this.setState({ localMethods: [...this.state.localMethods, method] });
        })
        .catch(e => {
          this.setState({ localMethods: [...this.state.localMethods, method] });
        });
    }else{
      const ercContract = Erc721Contract(method.contractAdd);
      Promise.all([
        ArcaCalls("getErc721Count", [add1, add2], arcaContract),
        ErcCalls("isApprovedForAll", ercContract)
      ])
        .then(res => {
          method.id = method.type+"-"+res[0].toString();

          method.enabled = res[1];

          this.setState({ localMethods: [...this.state.localMethods, method] });
        });
    }
  }

  addChainErc(_erc) {
    let removals = this.state.chainMethods.filter(erc => {
      return erc.removing === true;
    });

    for(let i = 0; i < removals.length; i++){
      if(removals[i].id === _erc.id){
        return;
      }
    }

    let chainMethods = this.state.chainMethods.filter(erc => {
      return erc.id !== _erc.id;
    });

    let localMethods = this.state.localMethods.filter(erc => {
      return erc.id !== _erc.id;
    });

    chainMethods.push(_erc);
    chainMethods.sort((a, b) => {
      return a.id.split("-").join("") - b.id.split("-").join("");
    });

    this.setState({ chainMethods, localMethods });
  }

  //TODO
  setMethodSendStatus(id, sendStatus) {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }

    const newMethods = this.state.localMethods;
    this.state.localMethods.forEach((method, index) => {
      if(method.id === id){
        newMethods[index].sendStatus = sendStatus;
      }
    });
    
    this.setState({ localMethods: newMethods });
  }

  setMethodEnableStatus(id) {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    
    const newMethods = this.state.localMethods;
    this.state.localMethods.forEach((method, index) => {
      if(method.id === id){
        newMethods[index].enabled = true;
      }
    });
    

    this.setState({ localMethods: newMethods });
  }

  setSatisfied = (satisfied) => {
    this.setState({ satisfied });
  }

  async getErc20Offers(_erc20Count, _arcaContract) {
    for(let i = 0; i < _erc20Count; i++){
      const [add1, add2] = this.props.addresses;
      let offer = { id: "0-"+i, type: 0, contractAdd: "", amountId: "", sendStatus: sendStatus.SENT };

      ArcaCalls("getOfferErc20", [add1, add2, i], _arcaContract)
        .then(res => {
          [offer.contractAdd, offer.amountId] = [res[0].toString(), res[1]];
          const erc20Contract = Erc20Contract(offer.contractAdd);

          Promise.all([
            ErcCalls("decimals", erc20Contract),
            ErcCalls("name", erc20Contract),
            ErcCalls("symbol", erc20Contract),
            ErcCalls("allowance", erc20Contract)
          ])
          .then(res => {
            let decimalString = "1";
            for(let i = 0; i < +res[0]; i++){
              decimalString+="0";
            }
            offer.amountId = offer.amountId.div(decimalString).toString();

            res[0] = decimalString;
            res[1] = res[1].toString();
            res[2] = res[2].toString();
            res[3] = res[3].toString() === "0" ? false : true;

            [offer.decimalString, offer.name, offer.symbol, offer.enabled] = res;

            this.addChainErc(offer);
          })
          .catch(e => {
            offer.amountId = "N/A";
            offer.symbol = "CANCELLED";
            offer.name = "N/A";
            offer.enabled = false;
            //this.addChainErc(offer);
          });
        })
        .catch(e => {
          return;
        });
    }
  }

  async getErc721Offers(_erc721Count, _arcaContract) {
    for(let i = 0; i < _erc721Count; i++){
      const [add1, add2] = this.props.addresses;
      let offer = { id: "1-"+i, type: 1, contractAdd: "", amountId: "", sendStatus: sendStatus.SENT };

      ArcaCalls("getOfferErc721", [add1, add2, i], _arcaContract)
        .then(res => {
          [offer.contractAdd, offer.amountId] = [res[0].toString(), res[1].toString()];
          const erc721Contract = Erc721Contract(offer.contractAdd);

          Promise.all([
            ErcCalls("name", erc721Contract),
            ErcCalls("symbol", erc721Contract),
            ErcCalls("isApprovedForAll", erc721Contract)
          ])
          .then(res => {
            res[0] = res[0].toString();
            res[1] = res[1].toString();
            [offer.name, offer.symbol, offer.enabled] = res;
            
            this.addChainErc(offer);
          })
          .catch(e => {
            offer.amountId = "N/A";
            offer.symbol = "N/A";
            offer.name = "N/A";
            offer.enabled = false;

            //this.addChainErc(offer); //Display removed calls
          });
        })
        .catch(e => {
          //console.log(e);
          return;
        });
    }
  }

  async getMethods() {
    if(!this.state.connected){
      return;
    }

    const contract = ArcaContract();
    const [add1, add2] = this.props.addresses;

    let promiseArray = [];

    promiseArray.push(ArcaCalls("getErc20Count", [add1, add2], contract)
      .then(res => {
        this.getErc20Offers(+res, contract);
      })
      .catch(e => {
        return;
      })
    );

    promiseArray.push(ArcaCalls("getErc721Count", [add1, add2], contract)
      .then(res => {
        this.getErc721Offers(+res, contract)
      })
      .catch(e => {
        return;
      })
    );

    Promise.all(promiseArray)
      .then(res => {
        this.props.setCount(this.props.boxNum, (+res[0]) + (+res[1]));
      });

    ArcaCalls("getNonce", [add2, add1], contract)
      .then(res => {
        this.setState({ partnerNonce: +res });
      })
      .catch(e => {
        return;
      })
  }

  removing(id, remove = true) {
    const newMethods = this.state.chainMethods;
    this.state.chainMethods.forEach((method, index) => {
      if(method.id === id){
        newMethods[index].removing = remove;
      }
    });
    

    this.setState({ chainMethods: newMethods });

  }

  remove = (id) => {
    let localMethods = this.state.localMethods.filter(meth => meth.id !== id);
    this.setState({ localMethods });
    let chainMethods = this.state.chainMethods.filter(meth => meth.id !== id);
    this.setState({ chainMethods });
  }

  render() {
    return(
      <div className="box" style={ boxStyle } >
        <Summary address={ this.props.addresses[0] } ensAdd={ this.props.ensAdd } />
        <div className="container" style={ containerStyle }>
          <div>
            { this.state.chainMethods.map(method =>
              <OfferErc key={ method.id } method={ method }
                setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.props.addresses } local={ false } setMethodEnableStatus={ this.setMethodEnableStatus }
                isUser={ this.props.isUser } connected={ this.props.connected } remove={ this.remove } removing={ this.removing } />
            ) }
          </div>
          <div>
            { this.state.localMethods.map(method =>
              <OfferErc key={ method.id } method={ method }
                setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.props.addresses } local={ true } setMethodEnableStatus={ this.setMethodEnableStatus }
                isUser={ this.props.isUser } connected={ this.props.connected } remove={ this.remove } removing={ this.removing } />
            ) }
          </div>
        </div>
        {this.props.addresses[0].length === 0 ? "" :
          <Satisfied addresses={ this.props.addresses } setSatisfied={ this.setSatisfied } isUser={ this.props.isUser }
            connected={ this.props.connected } partnerNonce={ this.state.partnerNonce } counter={ this.props.counter } />
        }
        { this.props.isUser ?
          <SubmitBox address={ this.props.addresses[0] } addMethod={ this.addLocalMethod } erc={ this.props.erc }
            connected={ this.props.connected } /> : ""
        }
      </div>
    );
  }
}

const boxStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateRows: "2rem 3fr",
  gridTemplateColumns: "4fr 1fr",
  textAlign: "center",
  justifyContent: "center",
  margin: "1rem 1.25rem",
  background: colours.Secondary,
  color: colours.Quaternary,
  fontWeight: "normal",
  minWidth: "11rem",
  padding: "0.3rem",
  boxShadow: "0px 0px 25px -2px rgba(0,0,0,0.25)",
  width: "100%"//

}

const containerStyle = {
  gridColumn: "1 auto",
  gridRow: "2 auto",
  margin: "0.1rem",
  overflowY: "auto",
  scrollbarWidth: "thin",
  minHeight: "7.5rem",
  maxHeight: "14.45rem",
  paddingRight: "0.2rem"
}

//PropTypes
Box.propTypes = {
  boxNum: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdd: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  erc: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired
}

export default Box;