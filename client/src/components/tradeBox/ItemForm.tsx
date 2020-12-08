import { FC, useContext, useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";

import { ErcType, SendState } from "../../context/Enums";

import AlertContext from "../../context/alert/AlertContext";
import UserContext from "../../context/user/UserContext";

import {
  AlertContext as IAlertContext,
  UserContext as IUserContext,
  TradeItemDataErc20,
  TradeItemDataErc721
} from "context";

const { UNSENT } = SendState;
const { ERC20, ERC721 } = ErcType;

const ItemForm: FC = () => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const userContext: IUserContext = useContext(UserContext);
  const { addErc20Item, addErc721Item, erc20Items, erc721Items } = userContext;

  const [type, setType] = useState<ErcType>(ERC20);

  const [baseErc, setBaseErc] = useState({
    address: "",
    value: ""
  });

  const [erc20Data, setErc20Data] = useState<TradeItemDataErc20>({
    type: ERC20,
    ...baseErc,
    balance: ""
  });

  const [erc721Data, setErc721Data] = useState<TradeItemDataErc721>({
    type: ERC721,
    ...baseErc,
    id: ""
  });

  const [validation, setValidation] = useState({
    address: false,
    balance: false,
    id: false
  });

  const { address } = baseErc;
  const { balance } = erc20Data;
  const { id } = erc721Data;

  useEffect(() => {
    setValidation({ ...validation, address: utils.isAddress(address) });
  }, [address]);

  useEffect(() => {
    try {
      setValidation({
        ...validation,
        balance: BigNumber.isBigNumber(BigNumber.from(balance))
      });
    } catch (e) {
      setValidation({
        ...validation,
        balance: false
      });
    }
  }, [balance]);

  useEffect(() => {
    try {
      setValidation({
        ...validation,
        id: BigNumber.isBigNumber(BigNumber.from(id))
      });
    } catch (e) {
      setValidation({
        ...validation,
        id: false
      });
    }
  }, [id]);

  // Inputs

  const onChangeType = (e: any) => {
    setType(e.target.value);
  };

  const onChangeBase = (e: any) => {
    setBaseErc({ ...baseErc, [e.target.name]: e.target.value });
  };

  const onChange = (e: any) => {
    switch (type) {
      case ERC20:
        setErc20Data({
          ...erc20Data,
          [e.target.name]: e.target.value
        });
        return;
      case ERC721:
        setErc721Data({
          ...erc721Data,
          [e.target.name]: e.target.value
        });
        return;
      default:
      // addAlert()
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (
      !validation.address || type === ERC20
        ? !validation.balance
        : !validation.id
    ) {
      addAlert(
        `Please add a valid Contract Address and Token ${
          type === ERC20 ? "Balance" : "Id"
        }`,
        "danger"
      );
      return;
    }

    switch (type) {
      case ERC20:
        addErc20Item({
          id: `2-${erc20Items.length + 1}`,
          data: { ...erc20Data, ...baseErc },
          status: {
            slot: -1,
            state: UNSENT
          }
        });
        break;
      case ERC721:
        addErc721Item({
          id: `2-${erc721Items.length + 1}`,
          data: { ...erc721Data, ...baseErc },
          status: {
            slot: -1,
            state: UNSENT
          }
        });
        break;
      default:
        break;
      // addAlert()
    }
  };

  // case "ens":
  //  return (
  //    <Fragment>
  //      <input
  //       className={
  //         name ? "grow-1 is-valid valid" : "grow-1 is-valid invalid"
  //       }
  //       type="text"
  //       placeholder="Name"
  //       name="name"
  //       value={name}
  //       onChange={onChange}
  //     />
  //     {verified && (
  //       <strong
  //         className="grow-1 mx"
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center"
  //         }}
  //       >
  //         VERIFIED
  //       </strong>
  //     )}
  //    </Fragment>)

  return (
    <form className="shadow-top ptop" onSubmit={onSubmit}>
      <div className="flex-row">
        <select name="type" value={type} onChange={onChangeType}>
          <option value={ERC20}>ERC20</option>
          <option value={ERC721}>ERC721</option>
        </select>
        <input
          className={`grow-1 is-valid ${
            type === ERC20
              ? !validation.balance && "in"
              : !validation.id && "in"
          }valid`}
          type="text"
          placeholder={`Token ${type === ERC20 ? "Balance" : "ID"}`}
          name={type === ERC20 ? "balance" : "id"}
          value={type === ERC20 ? balance : id}
          onChange={onChange}
        />
        <input
          className={`grow-2 address is-valid ${
            !validation.address && "in"
          }valid`}
          type="text"
          placeholder="Token Contract Address"
          name="address"
          value={address}
          onChange={onChangeBase}
        />
        <input type="submit" value="Add Trade Item" className="btn btn-dark" />
      </div>
    </form>
  );
};

export default ItemForm;
