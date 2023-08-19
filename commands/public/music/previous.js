import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("previous")
    .setDescription("Goes back"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    // handle errors
    if (!queue)
      return await interaction.reply({
        content: "No song in queue",
        ephemeral: true,
      });
    if (queue.previousSongs.length === 0)
      return await interaction.reply({
        content: "No song in queue behind",
        ephemeral: true,
      });

    // logic
    try {
      const song = await queue.previous();
      return await interaction.reply(`Now playing:\n${song.name}`);
    } catch (e) {
      return await interaction.reply(`${e}`);
    }
  },
};
