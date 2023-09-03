import process from "process";
import { SlashCommandBuilder } from "@discordjs/builders";
import { PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shuts down the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    await interaction.reply("Shutting down...");
    process.exit(0);
  },
};
