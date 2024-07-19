import React from "react";
import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Game currentPlayerIndex={0} />
    </div>
  );
}

export default App;
