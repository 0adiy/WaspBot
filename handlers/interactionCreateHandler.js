import emojify from "../functions/emojify.js";
import stonePaperScissors from "../functions/sps.js";

export default async function interactionCreateHandler(interaction) {
  //checking if Chat Input command or not
  if (!interaction.isChatInputCommand()) return;
  console.log("đšī¸  Chat Input");

  let embed;
  switch (interaction.commandName) {
    // Ping Command
    case "ping":
      embed = {
        title: "Pong!!",
        description: "ponged you back đ¤",
        color: 0xeeee00,
      };
      await interaction.reply({ embeds: [embed] });
      break;

    // Emojify Command
    case "emojify":
      let msg = interaction.options.get("message").value;
      await interaction.reply(emojify(msg));
      break;

    // Stone Paper Scissor Command
    case "sps":
      let choice = interaction.options.get("choice").value; //will receive int from {0,1,2}
      await interaction.reply({ embeds: [stonePaperScissors(choice)] });
      break;

    default:
      embed = {
        title: "Well this is awkward",
        description:
          "Seems like this command doesn't exist... How did you reach here đ¤",
        color: 0xff0000,
      };
      await interaction.reply({ embeds: [embed] });
  }
}
