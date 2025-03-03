import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const deckId = "5atqk8u5sb4u"
  const cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`
  const handValue = [];
  
  let value = handValue.reduce((a,b) => a + b, 0)
  //console.log("the value is " + value);
  const [hand, setHand] = useState([])
  const [score, setScore] = useState(0)

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
  //getDeckId(); 
  }, [])

//This function gets a deck ID from the API if the one provided doesn't work. Uncomment to obtain
//a new id and change the variable deckId on line 6

// async function getDeckId() {
//   const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//   const data = await response.json();
//   console.log(data)
//   const deckId = data.deck_id;
//   return deckId; 
// }

async function drawHand(){
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
  const data = await response.json();
  console.log(data)
  setHand(data.cards)
  console.log(data.cards)
  const hand = data.cards
  let score = 0; 
  hand.map((card) => {

    console.log(card.value)
      if(card.value === "JACK" || card.value === "QUEEN" || card.value === "King"){
        //card.value = 10; 
        score += 10
      } else if(card.value === "ACE"){
        score += 1; 
      }else{
        score += Number(card.value)
      }

      //score += card.value
  })

  setScore(score)
}

async function drawCard(){
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const data = await response.json();
  //console.log(data)
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
        //console.log(handValue);
        return <img src={card.image} alt="" />
})}
      <button onClick={() => handleClick()}>Draw</button>
      <p>{score}</p>
    </>
  )
}

}

export default App
