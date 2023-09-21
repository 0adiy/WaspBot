import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ChatInputCommandInteraction, Client } from "discord.js";
export default {
  name: "delete",
  data: new ButtonBuilder()
    .setCustomId("delete")
    .setEmoji("🗑️")
    .setLabel("Delete")
    .setStyle(ButtonStyle.Danger),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.message.delete();
    await interaction.reply({ content: "Deleted", ephemeral: true });
  },
};
