import React, { useState, useEffect, useContext, FC } from "react";
import Utils from "web3-utils";

import enable from "../loading/enable";

import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";

import {
  UserContext as IUserContext,
  Web3Context as IWeb3Context
} from "context";

type FormState = {
  input: string;
  address: null | string;
  ens: null | string;
};

const PreTradeForm: FC = () => {
  const userContext: IUserContext = useContext(UserContext);
  const web3Context: IWeb3Context = useContext(Web3Context);

  const { setAddresses } = userContext;
  const { connected, web3, ens, connect } = web3Context;

  // FORM STATE
  const [form1State, setForm1State] = useState<FormState>({
    input: "",
    address: null,
    ens: null
  });

  const [form2State, setForm2State] = useState<FormState>({
    input: "",
    address: null,
    ens: null
  });

  const { input: input1, address: address1, ens: ens1 } = form1State;
  const { input: input2, address: address2, ens: ens2 } = form2State;

  //Inputs
  useEffect(() => {
    if (Utils.isAddress(input1.toUpperCase())) {
      setForm1State({ ...form1State, address: input1, ens: null });
    } else {
      setForm1State({ ...form1State, address: null, ens: null });
    }
  }, [input1]);

  useEffect(() => {
    if (Utils.isAddress(input2.toUpperCase())) {
      setForm2State({ ...form2State, address: input2, ens: null });
    } else {
      setForm2State({ ...form2State, address: null, ens: null });
    }
  }, [input2]);

  const checkInput1 = async () => {
    if (Utils.isAddress(input1.toUpperCase())) {
      setForm1State({ ...form1State, address: input1, ens: null });
      return;
    }

    if (ens === null) return;

    const input = input1;
    try {
      const add: string = await ens.resolver(input1).addr();
      setForm1State({ input: input1, address: add, ens: input1 });
      return;
    } catch (e) {
      console.log(e);
      if (input !== input1) return;
      setForm1State({ input: input1, address: null, ens: null });
    }
  };

  const checkInput2 = async () => {
    if (Utils.isAddress(input2.toUpperCase())) {
      setForm2State({ ...form2State, address: input2, ens: null });
      return;
    }
    if (ens === null) return;

    const input = input2;
    try {
      const add = await ens.resolver(input2).addr();
      setForm2State({ input: input2, address: add, ens: input2 });
      return;
    } catch (e) {
      console.log(e);
      if (input !== input2) return;
      setForm2State({ input: input2, address: null, ens: null });
    }
  };

  const onChange1 = (e: any) => {
    setForm1State({ ...form1State, [e.target.name]: e.target.value.trim() });
  };
  const onChange2 = (e: any) => {
    setForm2State({ ...form2State, [e.target.name]: e.target.value.trim() });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (web3 === null) {
      //TODO Alert
      return;
    }
    if (ens === null) {
      //TODO Alert
      return;
    }

    if (!connected) {
      const enabled = await enable();
      if (!enabled) return;
      connect();
      return;
    }

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
