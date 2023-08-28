import { ButtonBuilder } from "discord.js";

export default {
  name: "volup",
  data: new ButtonBuilder()
    .setCustomId("volup")
    .setEmoji("🔊")
    .setLabel("+20")
    .setStyle("Secondary"),
  execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    queue.setVolume(queue.volume + 20);
    interaction.reply({
      embeds: [
        {
          title: "🔊 Volume",
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
