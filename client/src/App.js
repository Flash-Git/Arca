import React, { Component } from "react";
import { Provider } from "react-redux";

import Main from "./components/main/Landing";

import store from "./store";

import "./App.css";

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;