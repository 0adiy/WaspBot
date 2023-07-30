import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} from "discord.js";

import loadEvents from "../../handlers/eventHandler.js";
import {
  loadPublicCommands,
  loadDevCommands,
} from "../../handlers/slashCommandHandler.js";
import loadButtons from "../../handlers/buttonHandler.js";

export default {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads commands or events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((option) =>
      option.setName("events").setDescription("Reload events")
    )
    .addSubcommand((option) =>
      option.setName("commands").setDescription("Reload commands")
    )
    .addSubcommand((option) =>
      option.setName("buttons").setDescription("Reload buttons")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({ content: "Reloaded Events", ephemeral: true });
        }
        break;
      case "commands":
        {
          loadPublicCommands(client);
          interaction.reply({ content: "Reloaded Commands", ephemeral: true });
        }
        break;
      case "buttons":
        {
          loadButtons(client);
          interaction.reply({ content: "Reloaded Buttons", ephemeral: true });
        }
        break;
    }
  },
};
