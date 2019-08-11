import React, { useState, useEffect, useContext } from "react";

//import { getAddress } from "../../web3/Ens";

import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";

const PreTradeForm = () => {
  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);

  const { setAddresses } = userContext;
  const { web3, ens, connect, connectEns } = web3Context;

  //get ens checker
  //get web3 connection
  //get web3 address validator
  //get trade address and ens setter
  //get trade validation setter

  const [formState, setFormState] = useState({
    input1: "",
    address1: null,
    ens1: null,
    input2: "",
    address2: null,
    ens2: null
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
    if (inputNum === 1) {
      if (web3) {
        console.log(web3);
        web3.utils.isAddress(input1).then(d => console.log(d));
      }
      /*
      if (ens) {
        ens
          .resolver(input1)
          .addr()
          .then(add => {
            setFormState({ ...formState, address1: add, ens1: input1 });
            return true;
          })
          .catch(e => web3.utils.isAddress(input1));
      } else if (web3) {
        web3.utils.isAddress(input1).then(d => console.log(d));
      }*/
    }
    //check if input1 is valid ens address
    //*if true, check whether it points to a valid address
    //**if true, ens1 = input1, address1 = returned ens address, valid = true and return
    //*else, ens1 to null
    //else, check if input1 is valid address
    //*if true, set address1 = input1, valid = true and return
    //else, address1 = null, valid = false, push to context and return

    if (inputNum === 2) {
      ens &&
        ens
          .resolver(input2)
          .addr()
          .then(add => {
            setFormState({ ...formState, address2: add, ens2: input2 });
            return true;
          });
    }
    //check if input2 is valid ens address
    //*if true, check whether it points to a valid address
    //**if true, ens2 = input2, address2 = returned ens address, valid = true and return
    //*else, ens2 to null
    //else, check if input2 is valid address
    //*if true, set address2 = input2, valid = true and return
    //address2 = null, valid = false, push to context and return

    return true; //TEMP
  };

  const onChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!web3) {
      connect();
    }

    if (checkInput(1) && checkInput(2)) {
      setAddresses(
        { address: address1, ens: ens1 },
        { address: address2, ens: ens2 }
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="pre-trade address">
      <input
        className={
          address1
            ? "text-center is-valid valid"
            : "text-center is-valid invalid"
        }
        type="text"
        placeholder="Address/ENS 1"
        name="input1"
        value={input1}
        onChange={onChange}
      />
      <input
        className={
          address2
            ? "text-center is-valid valid"
            : "text-center is-valid invalid"
        }
        type="text"
        placeholder="Address/ENS 2"
        name="input2"
        value={input2}
        onChange={onChange}
      />
      <input type="submit" value="Open Box" className="btn btn-dark" />
    </form>
  );
};

export default PreTradeForm;
