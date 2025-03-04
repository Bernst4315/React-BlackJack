export default function Hand({hand, handValue, scoreMain}) {
   

  return (
    <>
      {hand.map((card) => {
        handValue.push(card.value);
        //console.log(handValue);
        return <img src={card.image} alt="" />;
      })}
      <p>{scoreMain}</p>
    </>
  );
}
