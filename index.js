class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }
}

const startGameButton = document.getElementById("start-game-button");

startGame() {
    this.shuffleDeck();
    this.players = [];
    for (let i = 0; i < this.numPlayers; i++) {
      this.players.push(new Player(`Player ${i + 1}`));
    }
    this.dealCards();
  
    // Create the card elements and add them to the webpage
    for (let player of this.players) {
      const playerElement = document.createElement("div");
      playerElement.className = "player";
      for (let card of player.hand) {
        const cardElement = document.createElement("img");
        cardElement.src = cardImages[card];
        cardElement.className = "card";
        playerElement.appendChild(cardElement);
      }
      document.body.appendChild(playerElement);
    }
  }

class Game {
  constructor(numPlayers) {
      // Initialize the game with the given number of rounds
    this.numPlayers = numPlayers;
    this.deck = this.createDeck();
    this.currentRound = 1;
  }

  createDeck() {
    const deck = [];
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "A",
    ];

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(`${rank} of ${suit}`);
      }
    }

    return deck;
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCards() {
    if (this.numPlayers === 2) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          this.players[i].addCardToHand(this.deck.pop());
        }
      }
    } else if (this.numPlayers === 3) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 13; j++) {
          this.players[i].addCardToHand(this.deck.pop());
        }
      }
      this.startingCard = this.deck.pop();
    } else if (this.numPlayers === 4) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 10; j++) {
          this.players[i].addCardToHand(this.deck.pop());
        }
      }
    }
  }

  startGame() {
    this.shuffleDeck();
    this.players = [];
    for (let i = 0; i < this.numPlayers; i++) {
      this.players.push(new Player(`Player ${i + 1}`));
    }
    this.dealCards();
  }

  playRound() {
    // Determine the starting card for the round
    const startingCard = this.deck.pop();

    // Initialize the points for each player
    const points = this.players.map(() => 0);

    // Initialize the numbers built on the table
    const builtNumbers = {};

    // Allow each player to take a turn
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const hand = player.hand;

      // Check if the player can build any numbers
      for (let j = 10; j >= 1; j--) {
        if (hand.includes(`${j}`)) {
          // Check if the number can be built on the table
          if (builtNumbers[j] === undefined || builtNumbers[j] === 0) {
            // Build the number on the table
            builtNumbers[j] = j;
            points[i]++;

            // Check if the player can build any more numbers
            for (let k = j - 1; k >= 1; k--) {
              if (hand.includes(`${k}`)) {
                // Check if the number can be built on the table
                if (builtNumbers[k] === undefined || builtNumbers[k] === 0) {
                  // Build the number on the table
                  builtNumbers[k] = k;
                  points[i]++;
                }
              }
            }
          }
        }
      }

      // Check if the player can take any numbers from the table
      for (let j = 1; j <= 10; j++) {
        if (builtNumbers[j] !== undefined && builtNumbers[j] !== 0) {
          // Check if the player has the card to take the number
          if (hand.includes(`${j}`)) {
            // Take the number from the table
            builtNumbers[j] = 0;
            points[i]++;
          }
        }
      }
    }

    // Determine the winner of the round based on the points
    const winningPoints = points.reduce(
      (max, points) => Math.max(max, points),
      0
    );
    const winnerIndex = points.indexOf(winningPoints);

    // Increment the current round
    this.currentRound++;

    // Return the winner of the round
    return this.players[winnerIndex];
  }

  endGame() {
    // Implement the logic for determining the overall winner of the game
  }
}

const game = new Game(4);
game.startGame();
// Continue implementing the rest of the game logic
