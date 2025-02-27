import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const deckId = "ot3zvj133gc4"
  const cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`
  const handValue = [];
  
  let value = handValue.reduce((a,b) => a + b, 0)
  console.log("the value is " + value);
  const [hand, setHand] = useState([])

  useEffect(() => {
    //get deck function resets the deck upon refresh
    async function getDeck(){
      const response = await fetch(cardUrl);
      const data = await response.json();
      //console.log(data);
      return data; 
    }
  getDeck();
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
  const card = data.cards;
  setHand([...hand, card[0]]);

}

function handleClick(){
  drawCard()
}

if(hand.length){
 
  return (
    <>
      {hand.map((card) => {
        //console.log(card),
        // if(card.value === "JACK" || "QUEEN"|| "King"){
        //   card.value = 10, 
        // };
        handValue.push(card.value);
        console.log(handValue);
        return <img src={card.image} alt="" />
})}
      <button onClick={() => handleClick()}>Draw</button>
    </>
  )
}

}

export default App
