import { ButtonBuilder } from "discord.js";

export default {
  name: "voldown",
  data: new ButtonBuilder()
    .setCustomId("voldown")
    .setEmoji("<:voldown:1179138942554099853>")
    .setLabel("-20")
    .setStyle("Secondary"),
  execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    if (queue.volume >= 20) queue.setVolume(queue.volume - 20);
    else queue.setVolume(0);
    interaction.reply({
      embeds: [
        {
          title: "<:volup:1179138524373602304> Volume",
          description: `${queue.volume}`,
        },
      ],
    });

    // deleting after 5 seconds
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
