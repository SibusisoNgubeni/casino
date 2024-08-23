import React, { useState } from "react";
import Card from "./card";
import "../styles/game.css";

// Define the createDeck function at the top
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

// Define the Player class
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  removeCardFromHand(card) {
    this.hand = this.hand.filter(c => c !== card);
  }
}

// Function to parse card values
const parseCardValue = (card) => {
  const value = card.split(' ')[0];
  if (value === 'A') return 1;
  if (['J', 'Q', 'K'].includes(value)) return 10;
  return parseInt(value, 10);
};

const Game = ({ currentPlayerIndex }) => {
  const [deck, setDeck] = useState(createDeck());
  const [players, setPlayers] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [numPlayers, setNumPlayers] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCardFromHand, setSelectedCardFromHand] = useState(null);
  const [selectedCardFromTable, setSelectedCardFromTable] = useState(null);
  const [openCardsTotal, setOpenCardsTotal] = useState(0);

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
    setOpenCardsTotal(dealtOpen.reduce((sum, card) => sum + parseCardValue(card), 0));
  };

  const playCard = (playerIndex, card, action) => {
    const cardValue = parseCardValue(card);
    const newPlayers = [...players];
    const currentPlayer = newPlayers[playerIndex];
    
    if (action === 'addToOpenCards') {
      if (openCardsTotal + cardValue > 10) {
        console.log(`Cannot add ${card} as it exceeds the total value of 10.`);
        return;
      }
      setOpenCards([...openCards, card]);
      setOpenCardsTotal(openCardsTotal + cardValue);
      
      // Handle special case when total becomes 10
      if (openCardsTotal + cardValue === 10) {
        setSelectedCardFromHand(null);
        setSelectedCardFromTable(null);
      }
    } else if (action === 'throwToTable') {
      setTableCards([...tableCards, card]);
      currentPlayer.removeCardFromHand(card);
      setPlayers(newPlayers);
    }
  };

  const handleCardFromHandSelect = (card) => {
    setSelectedCardFromHand(card);
  };

  const handleCardFromTableSelect = (card) => {
    setSelectedCardFromTable(card);
  };

  const validateAndAddCards = () => {
    const handValue = parseCardValue(selectedCardFromHand);
    const tableValue = parseCardValue(selectedCardFromTable);

    if (handValue + tableValue === 10) {
      setOpenCards([...openCards, selectedCardFromHand, selectedCardFromTable]);
      setOpenCardsTotal(10);
      setSelectedCardFromHand(null);
      setSelectedCardFromTable(null);
    } else {
      console.log("Selected cards do not make 10.");
    }
  };

  return (
    <div>
      <div className="start-game">
        {!gameStarted && (
          <form onSubmit={startGame}>
            <label>
              Number of Players:
              <br />
              <select className="selector" value={numPlayers} onChange={(e) => setNumPlayers(Number(e.target.value))}>
                <option value={0}>Select</option>
                <option value={2}>2 Players</option>
                <option value={3}>3 Players</option>
                <option value={4}>4 Players</option>
              </select>
            </label>
            <br />
            <button type="submit">Start Game</button>
          </form>
        )}
      </div>

      {openCards.length > 0 && (
        <div className="open-cards">
          <h3>Open Cards (Total: {openCardsTotal})</h3>
          {openCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      )}

      {tableCards.length > 0 && (
        <div className="table-cards">
          <h3>Table Cards</h3>
          {tableCards.map((card, index) => (
            <div key={index} onClick={() => handleCardFromTableSelect(card)}>
              <Card card={card} />
            </div>
          ))}
        </div>
      )}

      {gameStarted && (
        <div>
          <div className="players">
            {players.length > 0 && (
              <div className="player">
                <h3>{players[currentPlayerIndex].name}</h3>
                <div className="hand">
                  {players[currentPlayerIndex].hand.map((card, cardIndex) => (
                    <div key={cardIndex}>
                      <Card card={card} />
                      <button onClick={() => playCard(currentPlayerIndex, card, 'addToOpenCards')}>Add to Open Cards</button>
                      <button onClick={() => playCard(currentPlayerIndex, card, 'throwToTable')}>Throw to Table</button>
                    </div>
                  ))}
                </div>
                {openCardsTotal === 10 && (
                  <div className="card-selection">
                    <h3>Select a Card to Make 10</h3>
                    <div>
                      <h4>Hand Cards</h4>
                      {players[currentPlayerIndex].hand.map((card, cardIndex) => (
                        <div key={cardIndex} onClick={() => handleCardFromHandSelect(card)}>
                          <Card card={card} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4>Table Cards</h4>
                      {tableCards.map((card, cardIndex) => (
                        <div key={cardIndex} onClick={() => handleCardFromTableSelect(card)}>
                          <Card card={card} />
                        </div>
                      ))}
                    </div>
                    {selectedCardFromHand && selectedCardFromTable && (
                      <button onClick={validateAndAddCards}>Validate and Add</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
