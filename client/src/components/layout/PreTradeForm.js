import React, { useState, useEffect, useContext } from "react";
import { utils as Utils } from "web3";

import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";

const PreTradeForm = () => {
  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);

  const { setAddresses } = userContext;
  const { web3, ens, connect, connectEns } = web3Context;

  //FORM STATE
  const [form1State, setForm1State] = useState({
    input1: "",
    address1: null,
    ens1: null
  });

  const [form2State, setForm2State] = useState({
    input2: "",
    address2: null,
    ens2: null
  });

  const { input1, address1, ens1 } = form1State;
  const { input2, address2, ens2 } = form2State;

  useEffect(() => {
    connect();
  }, [window.web3]);

  //Inputs
  useEffect(() => {
    if (Utils.isAddress(input1.toUpperCase())) {
      setForm1State({ ...form1State, address1: input1, ens1: null });
    } else {
      setForm1State({ ...form1State, address1: null, ens1: null });
    }
  }, [input1]);
  useEffect(() => {
    if (Utils.isAddress(input2.toUpperCase())) {
      setForm2State({ ...form2State, address2: input2, ens2: null });
    } else {
      setForm2State({ ...form2State, address2: null, ens2: null });
    }
  }, [input2]);

  const checkInput1 = async () => {
    if (Utils.isAddress(input1.toUpperCase())) {
      setForm1State({ ...form1State, address1: input1, ens1: null });
      return;
    }

    if (!ens) return;

    const input = input1;
    try {
      const add = await ens.resolver(input1).addr();
      if (input !== input1) return;
      setForm1State({ input1, address1: add, ens1: input1 });
      return;
    } catch {
      if (input !== input1) return;
      setForm1State({ input1, address1: null, ens1: null });
    }
  };

  const checkInput2 = async () => {
    if (Utils.isAddress(input2.toUpperCase())) {
      setForm2State({ ...form2State, address2: input2, ens2: null });
      return;
    }

    if (!ens) return;

    const input = input2;
    try {
      const add = await ens.resolver(input2).addr();
      if (input !== input2) return;
      setForm2State({ input2, address2: add, ens2: input2 });
      return;
    } catch {
      if (input !== input2) return;
      setForm2State({ input2, address2: null, ens2: null });
    }
  };

  const onChange1 = e => {
    setForm1State({ ...form1State, [e.target.name]: e.target.value });
  };
  const onChange2 = e => {
    setForm2State({ ...form2State, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!web3) connect();
    if (!ens) connectEns();

    await Promise.all([checkInput1(), checkInput2()]);

    if (address1 && address2) {
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
        onChange={onChange1}
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
        onChange={onChange2}
      />
      <input type="submit" value="Open Box" className="btn btn-dark" />
    </form>
  );
};

export default PreTradeForm;
