import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  name: "shuffle",
  data: new ButtonBuilder()
    .setCustomId("shuffle")
    .setEmoji("<:shuffle:1179114919816347668>")
    .setLabel("Shuffle")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue)
      return await interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    await queue.shuffle();

    await interaction.reply({
      embeds: [
        {
          title: "🔀 Shuffled",
          description: "Shuffled the playlist",
        },
      ],
    });

    // deleting after 5 seconds
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
