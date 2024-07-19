
import React from 'react';

const cardImagePaths = {
  "A of hearts": "./src/assets/images/Hearts/hearts_ace.png",
  "2 of hearts": "./src/assets/images/Hearts/hearts_2.png",
  "3 of hearts": "./src/assets/images/Hearts/hearts_3.png",
  "4 of hearts": "./src/assets/images/Hearts/hearts_4.png",
  "5 of hearts": "./src/assets/images/Hearts/hearts_5.png",
  "6 of hearts": "./src/assets/images/Hearts/hearts_6.png",
  "7 of hearts": "./src/assets/images/Hearts/hearts_7.png",
  "8 of hearts": "./src/assets/images/Hearts/hearts_8.png",
  "9 of hearts": "./src/assets/images/Hearts/hearts_9.png",
  "10 of hearts": "./src/assets/images/Hearts/hearts_10.png",
  "A of clubs": "./src/assets/images/Clubs/clubs_ace.png",
  "2 of clubs": "./src/assets/images/Clubs/clubs_2.png",
  "3 of clubs": "./src/assets/images/Clubs/clubs_3.png",
  "4 of clubs": "./src/assets/images/Clubs/clubs_4.png",
  "5 of clubs": "./src/assets/images/Clubs/clubs_5.png",
  "6 of clubs": "./src/assets/images/Clubs/clubs_6.png",
  "7 of clubs": "./src/assets/images/Clubs/clubs_7.png",
  "8 of clubs": "./src/assets/images/Clubs/clubs_8.png",
  "9 of clubs": "./src/assets/images/Clubs/clubs_9.png",
  "10 of clubs": "./src/assets/images/Clubs/clubs_10.png",
  "A of diamonds": "./src/assets/images/Diamonds/diamonds_ace.png",
  "2 of diamonds": "./src/assets/images/Diamonds/diamonds_2.png",
  "3 of diamonds": "./src/assets/images/Diamonds/diamonds_3.png",
  "4 of diamonds": "./src/assets/images/Diamonds/diamonds_4.png",
  "5 of diamonds": "./src/assets/images/Diamonds/diamonds_5.png",
  "6 of diamonds": "./src/assets/images/Diamonds/diamonds_6.png",
  "7 of diamonds": "./src/assets/images/Diamonds/diamonds_7.png",
  "8 of diamonds": "./src/assets/images/Diamonds/diamonds_8.png",
  "9 of diamonds": "./src/assets/images/Diamonds/diamonds_9.png",
  "10 of diamonds": "./src/assets/images/Diamonds/diamonds_10.png",
  "A of spades": "./src/assets/images/Spades/spades_ace.png",
  "2 of spades": "./src/assets/images/Spades/spades_2.png",
  "3 of spades": "./src/assets/images/Spades/spades_3.png",
  "4 of spades": "./src/assets/images/Spades/spades_4.png",
  "5 of spades": "./src/assets/images/Spades/spades_5.png",
  "6 of spades": "./src/assets/images/Spades/spades_6.png",
  "7 of spades": "./src/assets/images/Spades/spades_7.png",
  "8 of spades": "./src/assets/images/Spades/spades_8.png",
  "9 of spades": "./src/assets/images/Spades/spades_9.png",
  "10 of spades": "./src/assets/images/Spades/spades_10.png",
  };
  

export default function Card({ card }) {
  return (
    <div className='card'>
      <img className='cards' src={cardImagePaths[card]} alt={card} />
    </div>
  );
}

