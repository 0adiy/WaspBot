import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  name: "repeatMode",
  data: new ButtonBuilder()
    .setCustomId("repeatMode")
    .setEmoji("<:repeatarrow:1179139149966614608>")
    .setLabel("Repeat Mode")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue)
      return await interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    const newMode = (queue.repeatMode + 1) % 3;
    const nextModeMeaning = newMode
      ? newMode === 2
        ? "Repeat queue"
        : "Repeat song"
      : "Off";

    if (queue.repeatMode === 0) {
      queue.repeatMode = 1;
      await interaction.reply({
        embeds: [
          {
            title: "<:repeatarrow:1179139149966614608> Repeat Mode",
            description: nextModeMeaning,
          },
        ],
      });
    } else if (queue.repeatMode === 1) {
      queue.repeatMode = 2;
      await interaction.reply({
        embeds: [
          {
            title: "<:repeatarrow:1179139149966614608> Repeat Mode",
            description: nextModeMeaning,
          },
        ],
      });
    } else if (queue.repeatMode === 2) {
      queue.repeatMode = 0;
      await interaction.reply({
        embeds: [
          {
            title: "<:repeatarrow:1179139149966614608> Repeat Mode",
            description: nextModeMeaning,
          },
        ],
      });
    }
  },
};
