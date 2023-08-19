const moves = ["Stone 🪨", "Paper 📃", "Scissors ✂️"];
const results = ["Tie", "Win", "Loss"];

function makeEmbed(head, col, player, bot) {
  const embed = {
    title: head,
    color: col,
    fields: [
      {
        name: `Your Choice 🎯`,
        value: player,
        inline: true,
      },
      {
        name: `Bot's Choice 🤖`,
        value: bot,
        inline: true,
      },
    ],
  };
  return embed;
}

function sps(choice) {
  let returnValue;
  const a = choice;
  const b = Math.floor(Math.random() * moves.length);
  const finalResult = results[(a - b + 3) % 3];
  if (finalResult == results[0])
    returnValue = makeEmbed("It's A Tie", 0xffffff, moves[choice], moves[b]);
  if (finalResult == results[1])
    returnValue = makeEmbed("You Win! 🎊", 0x00ff00, moves[choice], moves[b]);
  if (finalResult == results[2])
    returnValue = makeEmbed("You Lost!", 0xff0000, moves[choice], moves[b]);

  return returnValue;
}

export default sps;

