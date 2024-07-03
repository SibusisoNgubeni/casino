

import React from "react";
import Game from "./components/game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Card Game</h1>
      <Game numPlayers={4} />
    </div>
  );
}

export default App;