// src/Game.js

import React, { useState } from "react";
import "./Game.css";

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }
}

const cardImages = {
  // Add your card images here
  "2 of hearts": "path/to/2_of_hearts.png",
  "3 of hearts": "path/to/3_of_hearts.png",
  // ... other card images
};

const Game = ({ numPlayers }) => {
  const [deck, setDeck] = useState(createDeck());
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

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

  const dealCards = (players, deck) => {
    if (numPlayers === 2) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          players[i].addCardToHand(deck.pop());
        }
      }
    } else if (numPlayers === 3) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 13; j++) {
          players[i].addCardToHand(deck.pop());
        }
      }
    } else if (numPlayers === 4) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 10; j++) {
          players[i].addCardToHand(deck.pop());
        }
      }
    }
    return players;
  };

  const startGame = () => {
    const shuffledDeck = shuffleDeck([...deck]);
    const newPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      newPlayers.push(new Player(`Player ${i + 1}`));
    }
    const dealtPlayers = dealCards(newPlayers, shuffledDeck);
    setPlayers(dealtPlayers);
    setDeck(shuffledDeck);
    setCurrentRound(1);
  };

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      <div className="players">
        {players.map((player, index) => (
          <div key={index} className="player">
            <h3>{player.name}</h3>
            <div className="hand">
              {player.hand.map((card, cardIndex) => (
                <img key={cardIndex} src={cardImages[card]} alt={card} className="card" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
