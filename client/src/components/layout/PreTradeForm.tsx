import { useState, useEffect, useContext, FC } from "react";
import { utils } from "ethers";

import AlertContext from "../../context/alert/AlertContext";
import UserContext from "../../context/user/UserContext";
import PartnerContext from "../../context/partner/PartnerContext";

import {
  AlertContext as IAlertContext,
  UserContext as IUserContext,
  PartnerContext as IPartnerContext
} from "context";

const PreTradeForm: FC = () => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;
  const userContext: IUserContext = useContext(UserContext);
  const { setAddress: setAddress1 } = userContext;
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const { setAddress: setAddress2 } = partnerContext;

  const [form1State, setForm1State] = useState({
    input1: "",
    address1: false
  });

  const [form2State, setForm2State] = useState({
    input2: "",
    address2: false
  });

  const { input1, address1 } = form1State;
  const { input2, address2 } = form2State;

  useEffect(() => {
    setForm1State({ input1, address1: utils.isAddress(input1) });
  }, [input1]);

  useEffect(() => {
    setForm2State({ input2, address2: utils.isAddress(input2) });
  }, [input2]);

  //Inputs

  const onChange1 = (e: any) => {
    setForm1State({ ...form1State, [e.target.name]: e.target.value.trim() });
  };
  const onChange2 = (e: any) => {
    setForm2State({ ...form2State, [e.target.name]: e.target.value.trim() });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!address1 || !address2) {
      addAlert("Please enter valid addresses or ENS names", "primary");
      return;
    }

    setAddress1(input1);
    setAddress2(input2);
  };

  return (
    <form onSubmit={onSubmit} className="pre-trade address">
      <input
        className={`text-center is-valid ${!address1 && "in"}valid`}
        type="text"
        placeholder="Address/ENS 1"
        name="input1"
        value={input1}
        onChange={onChange1}
      />
      <input
        className={`text-center is-valid ${!address2 && "in"}valid`}
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
