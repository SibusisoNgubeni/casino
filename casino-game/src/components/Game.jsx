import React, { useState } from "react";
import Card from "./card"; // Make sure the path is correct
import "../styles/game.css";

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }
}

const Game = ({ currentPlayerIndex }) => {
  const createDeck = () => {
    const deck = [];
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(`${rank} of ${suit}`);
      }
    }

    return deck;
  };

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const dealCards = (players, deck, cardsPerPlayer, openCards = 0) => {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < cardsPerPlayer; j++) {
        players[i].addCardToHand(deck.pop());
      }
    }
    const open = [];
    for (let i = 0; i < openCards; i++) {
      open.push(deck.pop());
    }
    return { players, open };
  };

  const [deck, setDeck] = useState(createDeck());
  const [players, setPlayers] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [numPlayers, setNumPlayers] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = (e) => {
    e.preventDefault();
    const shuffledDeck = shuffleDeck([...deck]);
    const newPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      newPlayers.push(new Player(`Player ${i + 1}`));
    }
    let cardsPerPlayer;
    let open = 0;
    if (numPlayers === 2) {
      cardsPerPlayer = 10;
    } else if (numPlayers === 3) {
      cardsPerPlayer = 13;
      open = 1;
    } else if (numPlayers === 4) {
      cardsPerPlayer = 10;
    }
    const { players: dealtPlayers, open: dealtOpen } = dealCards(newPlayers, shuffledDeck, cardsPerPlayer, open);
    setPlayers(dealtPlayers);
    setOpenCards(dealtOpen);
    setDeck(shuffledDeck);
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted && (
        <form onSubmit={startGame}>
          <label>
            Number of Players:
            <select value={numPlayers} onChange={(e) => setNumPlayers(Number(e.target.value))}>
              <option value={0}>Select</option>
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </label>
          <button type="submit">Start Game</button>
        </form>
      )}

         {openCards.length > 0 && (
                <div className="open-cards">
                  <h3>Open Card</h3>
                  {openCards.map((card, index) => (
                    <Card key={index} card={card} />
                  ))}
                </div>
              )}
      {players.length > 0 && (
        <div className="players">
          <div className="player">
            <h3>{players[currentPlayerIndex].name}</h3>
            <div className="hand">
             
              {players[currentPlayerIndex].hand.map((card, cardIndex) => (
                <Card key={cardIndex} card={card} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
