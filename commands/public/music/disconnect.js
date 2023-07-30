import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnects the bot from voice channel"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    client.distube.voices.leave(interaction);
    await interaction.reply({
      embeds: [
        {
          title: "Disconnected",
          description: "Bot has been disconnected from voice channel",
          color: 0xeeee00,
        },
      ],
    });
  },
};
