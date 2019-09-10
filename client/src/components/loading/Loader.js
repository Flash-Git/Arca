import React, { useContext, useEffect, useState } from "react";

import Web3Context from "../../context/web3/Web3Context";
import UserContext from "../../context/user/UserContext";

const Loader = () => {
  const web3Context = useContext(Web3Context);
  const { connected, ArcaCalls, ErcCalls } = web3Context;

  const userContext = useContext(UserContext);
  const userAdd = userContext.user.addressObj.address;
  const partnerAdd = userContext.tradePartner.addressObj.address;

  const initialState = {
    erc20Count: null,
    erc721Count: null,
    erc20s: [],
    loadedErc20s: true,
    erc721s: [],
    loadedErc721s: true
  };

  const [user, setUser] = useState(initialState);
  const [partner, setPartner] = useState(initialState);

  const getErc20s = (_erc20Count, _add1, _add2) => {
    if (!connected) return;
    const erc20Promises = [];

    for (let i = 0; i < _erc20Count; i++) {
      erc20Promises.push(ArcaCalls("getOfferErc20", [_add1, _add2, i]));
    }

    const offers = [];

    return new Promise((resolve, reject) =>
      Promise.all(erc20Promises)
        .then(erc20s => {
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
          resolve(offers);
        })
        .catch(e => {
          reject(e);
        })
    );
  };

  const getErc721s = (_erc721Count, _add1, _add2) => {
    if (!connected) return;
    const erc721Promises = [];

    for (let i = 0; i < _erc721Count; i++) {
      erc721Promises.push(ArcaCalls("getOfferErc721", [_add1, _add2, i]));
    }

    const offers = [];

    return new Promise((resolve, reject) =>
      Promise.all(erc721Promises)
        .then(erc721s => {
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
          resolve(offers);
        })
        .catch(e => {
          reject(e);
        })
    );
  };

  const load = () => {
    setUser(initialState);
    setPartner(initialState);

    if (!connected) {
      console.log("Not Connected");
      return;
    }

    // Load boxes
    setUser({ ...user, loadedErc20s: false, loadedErc721s: false });
    setPartner({ ...partner, loadedErc20s: false, loadedErc721s: false });
    console.log("Loading");

    ArcaCalls("getErc20Count", [userAdd, partnerAdd]).then(erc20Count => {
      erc20Count = +erc20Count;
      setUser({ ...user, erc20Count });
      getErc20s(erc20Count, userAdd, partnerAdd)
        .then(erc20s => setUser({ ...user, erc20s, loadedErc20s: true }))
        .catch(e => {
          console.log(e);
        });
    });

    ArcaCalls("getErc721Count", [userAdd, partnerAdd]).then(erc721Count => {
      erc721Count = +erc721Count;
      setUser({ ...user, erc721Count });
      getErc721s(erc721Count, userAdd, partnerAdd)
        .then(erc721s => setUser({ ...user, erc721s, loadedErc721s: true }))
        .catch(e => {
          console.log(e);
        });
    });

    ArcaCalls("getErc20Count", [partnerAdd, userAdd]).then(erc20Count => {
      erc20Count = +erc20Count;
      setPartner({ ...partner, erc20Count });
      getErc20s(erc20Count, partnerAdd, userAdd)
        .then(erc20s => setPartner({ ...partner, erc20s, loadedErc20s: true }))
        .catch(e => {
          console.log(e);
        });
    });

    ArcaCalls("getErc721Count", [partnerAdd, userAdd]).then(erc721Count => {
      erc721Count = +erc721Count;
      setPartner({ ...partner, erc721Count });
      getErc721s(erc721Count, partnerAdd, userAdd)
        .then(erc721s =>
          setPartner({ ...partner, erc721s, loadedErc721s: true })
        )
        .catch(e => {
          console.log(e);
        });
    });
  };

  //Hook based async
  useEffect(() => {
    load();
  }, [userAdd, partnerAdd]);

  useEffect(() => {
    if (!user.loadedErc20s || !user.loadedErc721s) return;
    console.log("User is loaded");
    //seterc20s on trade context
  }, [user.loadedErc20s, user.loadedErc721s]);

  useEffect(() => {
    if (!partner.loadedErc20s || !partner.loadedErc721s) return;
    console.log("Partner is loaded");

    //seterc20s on trade context
  }, [partner.loadedErc20s, partner.loadedErc721s]);

  return (
    <button className="btn btn-dark" onClick={load}>
      Reload
    </button>
  );
  return null;
};

export default Loader;
