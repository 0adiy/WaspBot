import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Moves to specified time")
    .addIntegerOption((option) =>
      option.setName("time").setDescription("time to move to").setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    const time = interaction.options.get("time").value;
    if (!queue) return await interaction.reply("No song to seek");
    queue.seek(time);
    await interaction.reply({
      embeds: [
        {
          title: "Seeked",
          description: `Seeked to ${time}`,
          color: 0xeeee00,
        },
      ],
    });
  },
};
