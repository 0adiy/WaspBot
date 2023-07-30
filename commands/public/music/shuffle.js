import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the queue"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("No song in queue");
    queue.shuffle();
    await interaction.reply({
      embeds: [
        {
          title: "Shuffled",
          description: "Shuffled",
          color: 0xeeee00,
        },
      ],
    });
  },
};
