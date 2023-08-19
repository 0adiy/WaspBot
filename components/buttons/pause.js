import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  name: "pause",
  data: new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji("⏸")
    .setLabel("Pause")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue)
      return await interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    if (queue.paused) {
      await queue.resume();
      await interaction.reply({
        embeds: [
          {
            title: "⏯️ Resumed",
            description: "Resumed the song",
          },
        ],
      });
    } else {
      await queue.pause();
      await interaction.reply({
        embeds: [
          {
            title: "⏸ Paused",
            description: "Paused the song",
          },
        ],
      });
    }

    // deleting after 5 seconds
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
