import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  PermissionFlagsBits,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to delete")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const amt = interaction.options.get("amount").value;

    if (amt > 100) {
      return interaction.reply({
        content: "Please enter a no. less than or equal to 100",
        ephemeral: true,
      });
    }

    const messages = await interaction.channel.messages.fetch({
      limit: amt,
    });
    try {
      messages.forEach(async (m) => await m.delete());
    } catch (error) {
      interaction.reply({
        content: `An error occured while purging messages, probably because the bot lacks the permission to delete certain messages`,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `Purged ${amt} messages`,
      ephemeral: true,
    });
  },
};
