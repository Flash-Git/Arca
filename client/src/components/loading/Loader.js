import React, { useContext, useEffect, useState } from "react";

import Web3Context from "../../context/web3/Web3Context";
import UserContext from "../../context/user/UserContext";

const Loader = () => {
  const web3Context = useContext(Web3Context);
  const { web3, ArcaCalls, ErcCalls } = web3Context;

  const userContext = useContext(UserContext);
  const userAdd = userContext.user.addressObj.address;
  const partnerAdd = userContext.tradePartner.addressObj.address;

  const initialState = {
    erc20Count: null,
    erc721Count: null,
    erc20s: [],
    loadedErc20s: false,
    erc721s: [],
    loadedErc721s: false,
  };

  const [user, setUser] = useState(initialState);
  const [partner, setPartner] = useState(initialState);

  const getErc20s = (_erc20Count, _add1, _add2) => {
    if (web3 === null) return;
    const erc20Promises = [];

    for (let i = 0; i < _erc20Count; i++) {
      erc20Promises.push(ArcaCalls("getOfferErc20", [_add1, _add2, i]));
    }

    const offers = [];

    Promise.all(erc20Promises).then(erc20s => {
      erc20s.map((erc20, i) => {
        let offer = {
          id: "0-" + i,
          network: { slot: i },
          data: { type: "erc20", contractAdd: "", amount: "" }
        };
        [offer.data.contractAdd, offer.data.amount] = [
          erc20[0].toString(), //contractAdd
          erc20[1].toString() //amount
        ];
        offers.push(offer);
      });
      return offers;
    });

    const getErc721s = (_erc721Count, _add1, _add2) => {
      if (web3 === null) return;
      const erc721Promises = [];

      for (let i = 0; i < _erc721Count; i++) {
        erc721Promises.push(ArcaCalls("getOfferErc721", [_add1, _add2, i]));
      }

      const offers = [];

      Promise.all(erc721Promises).then(erc721s => {
        erc721s.map((erc721, i) => {
          let offer = {
            id: "1-" + i,
            network: { slot: i },
            data: { type: "erc721", contractAdd: "", id: "" }
          };
          [offer.data.contractAdd, offer.data.id] = [
            erc721[0].toString(), //contractAdd
            erc721[1].toString() //id
          ];
          offers.push(offer);
        });
        return offers;
      });

    //Hook based async
    useEffect(() => {
      if (web3 === null) {
        setUser(initialState);
        setPartner(initialState);
        return;
      }

      ArcaCalls("getErc20Count", [userAdd, partnerAdd]).then(erc20Count => {
        setUser(...user, +erc20Count);
        getErc20s(+erc20Count, userAdd, partnerAdd).then(erc20s =>
          setUser(erc20s, loadedErc20s = true)
        );
      });

      ArcaCalls("getErc721Count", [userAdd, partnerAdd]).then(erc721Count => {
        setUser(...user, +erc721Count);
        getErc721s(+erc721Count, userAdd, partnerAdd).then(erc721s =>
          setUser(erc721s, loadedErc721s = true)
        );
      });

      ArcaCalls("getErc20Count", [partnerAdd, userAdd]).then(erc20Count => {
        setUser(...partner, +erc20Count);
        getErc20s(+erc20Count, partnerAdd, userAdd).then(erc20s =>
          setPartner(erc20s, loadedErc20s = true)
        );
      });

      ArcaCalls("getErc721Count", [partnerAdd, userAdd]).then(erc721Count => {
        setPartner(...partner, erc721Count);
        getErc721s(+erc721Count, partnerAdd, userAdd).then(erc721s =>
          setPartner(erc721s, loadedErc721s = true)
        );
      });
    }, [userAdd, partnerAdd]);
  };

  useEffect(() => {
    if(!user.loadedErc20s||!user.loadedErc721s) return

    //seterc20s on trade context
  }, [user.erc20s, user.erc721s])

  useEffect(() => {
    if(!partner.loadedErc20s||!partner.loadedErc721s) return

    //seterc20s on trade context
  }, [partner.erc20s, partner.erc721s])

  return <button className="btn">Reload box</button>;
};

export default Loader;
