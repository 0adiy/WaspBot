import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the current song"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) return await interaction.reply("No song in queue");
    if (queue.paused) {
      queue.resume();
      return interaction.reply({
        embeds: [
          {
            title: "⏯️ Resumed",
            description: "Resumed the song",
          },
        ],
      });
    }
    queue.pause();
    await interaction.reply({
      embeds: [
        {
          title: "⏸ Paused",
          description: "Paused the song",
        },
      ],
    });
  },
};
