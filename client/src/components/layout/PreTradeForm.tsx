import { useState, useEffect, useContext, FC } from "react";
import { utils } from "ethers";

import UserContext from "../../context/user/UserContext";
import PartnerContext from "../../context/partner/PartnerContext";

import {
  UserContext as IUserContext,
  PartnerContext as IPartnerContext
} from "context";

type FormState = {
  input: string;
  address: boolean;
};

const PreTradeForm: FC = () => {
  const userContext: IUserContext = useContext(UserContext);
  const { setAddress: setAddress1 } = userContext;
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const { setAddress: setAddress2 } = partnerContext;

  // FORM STATE
  const [form1State, setForm1State] = useState<FormState>({
    input: "",
    address: false
  });

  const [form2State, setForm2State] = useState<FormState>({
    input: "",
    address: false
  });

  const { input: input1, address: address1 } = form1State;
  const { input: input2, address: address2 } = form2State;

  useEffect(() => {
    setForm1State({ input: input1, address: utils.isAddress(input1) });
  }, [input1]);

  useEffect(() => {
    setForm2State({ input: input2, address: utils.isAddress(input2) });
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

    if (!address1 || !address2) return;

    setAddress1(input1);
    setAddress2(input2);
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
