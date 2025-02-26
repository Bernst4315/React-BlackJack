import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const deckId = "ot3zvj133gc4"
  const [cardUrl, setCardUrl] = useState(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`)
  
  useEffect(() => {
    async function getDeck(){
      const response = await fetch(cardUrl);
      const data = await response.json();
      console.log(data);
      //return data; 
    }
  getDeck();

  })

async function drawCards(){
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
  const data = await response.json();
  console.log(data)
}

drawCards()

  return (
    <>
  
    </>
  )
}

export default App
