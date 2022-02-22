export default function randomOrder(bingo) {
  let order = [];
  for (let i = 0; i < bingo.brick.length; i++) {
    order.push(i);
  }
  let currentIndex = order.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [order[currentIndex], order[randomIndex]] = [
      order[randomIndex],
      order[currentIndex],
    ];
  }
  return order;
}
