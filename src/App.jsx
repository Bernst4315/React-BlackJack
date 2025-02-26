import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const deckId = "ot3zvj133gc4"
  const cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`
  
  const [hand, setHand] = useState([])

  useEffect(() => {
    // async function getDeck(){
    //   const response = await fetch(cardUrl);
    //   const data = await response.json();
    //   console.log(data);
      //return data; 
    //}
  //getDeck();
  drawHand(); 
  }, [])

async function drawHand(){
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
  const data = await response.json();
  console.log(data)
  setHand(data.cards)

}

async function drawCard(){
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const data = await response.json();
  console.log(data)
  hand.push(data);
  setHand(data.cards)

}

function handleClick(){
  console.log("click")
  drawCard()
}

//let cards = drawCards();
//console.log("you drew" + cards);
console.log(hand)
if(hand.length){
  return (
    <>
      {hand.map((card) => <img src={card.image} alt="" />)}
      <button onClick={() => handleClick()}>Draw</button>
    </>
  )
}

}

export default App
