import { useEffect, useState } from "react";

import "./App.css";
import Hand from "./components/Hand";

function App() {
  const deckId = "5atqk8u5sb4u";
  const cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`;
  const handValue = [];

  //let value = handValue.reduce((a,b) => a + b, 0)
  //console.log("the value is " + value);
  const [hand, setHand] = useState([]);
  const [scoreMain, setScoreMain] = useState(0);
  const [win, setWin] = useState("");
  const [end, setEnd] = useState(false)

  useEffect(() => {
    //get deck function resets the deck upon refresh
    async function getDeck() {
      const response = await fetch(cardUrl);
      const data = await response.json();
      //console.log(data);
      return data;
    }
    getDeck();
    drawHand();
    //getDeckId();
  }, []);

  //This function gets a deck ID from the API if the one provided doesn't work. Uncomment to obtain
  //a new id and change the variable deckId on line 6

  // async function getDeckId() {
  //   const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  //   const data = await response.json();
  //   console.log(data)
  //   const deckId = data.deck_id;
  //   return deckId;
  // }

  async function drawHand() {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    const data = await response.json();
    console.log(data);
    setHand(data.cards);
    console.log(data.cards);
    const hand = data.cards;
    let score = 0;
    hand.map((card) => {
      console.log(card.value);
      if (
        card.value === "JACK" ||
        card.value === "QUEEN" ||
        card.value === "KING"
      ) {
        //card.value = 10;
        score += 10;
      } else if (card.value === "ACE") {
        score += 1;
      } else {
        score += Number(card.value);
      }

      //score += card.value
    });

    setScoreMain(score);
  }

  async function drawCard() {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    //console.log(data)
    const card = data.cards;
    let score = scoreMain;

    card.map((card) => {
      console.log(card.value);
      if (
        card.value === "JACK" ||
        card.value === "QUEEN" ||
        card.value === "KING"
      ) {
        //card.value = 10;
        score += 10;
      } else if (card.value === "ACE") {
        score += 1;
      } else {
        score += Number(card.value);
      }

      //score += card.value
    });

    setScoreMain(score);

    setHand([...hand, card[0]]);
  }

  function handleClick() {
    drawCard();
  }

  function handleEnd(end){
    setWin("you win")
    setEnd(true)
  }

  if (hand.length) {
    

 if(scoreMain <=21){

  return (
    <>
    <Hand hand={hand} handValue={handValue} scoreMain={scoreMain}/>
    {!end && <button onClick={() => handleClick()}>Draw</button>}
    {!end && <button onClick={() => handleEnd(end)}>End</button>}
    <p>{win}</p>
    </>
  )
}else{
  
  return(
    <>
    <Hand hand={hand} handValue={handValue} scoreMain={scoreMain}/>
    

    <p>You Lose</p>
    </>
  )
}


  }
}

export default App;
