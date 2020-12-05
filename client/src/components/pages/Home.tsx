import { useEffect, useContext, FC } from "react";

import Sidebar from "../layout/Sidebar";
import PreTradeForm from "../layout/PreTradeForm";
import Box from "../tradeBox/Box";

import AppContext from "../../context/app/AppContext";

import { AppContext as IAppContext } from "context";

const Home: FC = () => {
  const appContext: IAppContext = useContext(AppContext);
  const { setLocation } = appContext;

  useEffect(() => {
    setLocation("home");
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Sidebar />
      <div className="container">
        <PreTradeForm />
        <Box />
        <Box isUser={true} />
      </div>
    </div>
  );
};

export default Home;
