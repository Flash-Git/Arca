import React, { useState, useEffect, useContext } from "react";

import TradeContext from "../../context/trade/TradeContext";
import Web3Context from "../../context/web3/Web3Context";
import EnsContext from "../../context/ens/EnsContext";

const PreTradeForm = () => {
  const tradeContext = useContext(TradeContext);
  const web3Context = useContext(Web3Context);
  const ensContext = useContext(EnsContext);

  //get ens checker
  //get web3 connection
  //get web3 address validator
  //get trade address and ens setter
  //get trade validation setter

  const [formState, setFormState] = useState({
    input1: "",
    address1: null,
    ens1: null,
    input1: "",
    address1: null,
    ens1: null
  });

  const { input1, address1, ens1, input2, address2, ens2 } = formState;

  //Input
  useEffect(() => {
    checkInput(1);
  }, [input1]);

  useEffect(() => {
    checkInput(2);
  }, [input2]);

  const checkInput = inputNum => {
    inputNum === 1 && console.log("checking");
    //check if input1 is valid ens address
    //*if true, check whether it points to a valid address
    //**if true, ens1 = input1, address1 = returned ens address, valid = true and return
    //*else, ens1 to null
    //else, check if input1 is valid address
    //*if true, set address1 = input1, valid = true and return
    //else, address1 = null, valid = false, push to context and return

    //check if input2 is valid ens address
    //*if true, check whether it points to a valid address
    //**if true, ens2 = input2, address2 = returned ens address, valid = true and return
    //*else, ens2 to null
    //else, check if input2 is valid address
    //*if true, set address2 = input2, valid = true and return
    //address2 = null, valid = false, push to context and return
  };

  const onChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    checkInput(1);
    checkInput(2);
    //Push to context state
  };

  return (
    <div className="my-2">
      <form onSubmit={onSubmit} className="flexColumn">
        <input
          type="text"
          placeholder="Address/ENS 1"
          name="input1"
          value={input1}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Address/ENS 2"
          name="input2"
          value={input2}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Open Box"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default PreTradeForm;
