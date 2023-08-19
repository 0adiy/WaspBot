import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("activity")
    .setDescription("Sets the bot's activity")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option
        .setName("status")
        .setDescription("Status of the new activity")
        .setRequired(true)
        .addChoices(
          { name: "Online", value: "online" },
          { name: "Idle", value: "idle" },
          { name: "DND", value: "dnd" },
          { name: "Invisible", value: "invisible" }
        )
    )
    .addStringOption(option =>
      option
        .setName("type")
        .setDescription("Type of the new activity")
        .setRequired(true)
        .addChoices(
          { name: "Playing", value: "0" },
          { name: "Streaming", value: "1" },
          { name: "Listening", value: "2" },
          { name: "Watching", value: "3" },
          { name: "Competing", value: "5" }
        )
    )
    .addStringOption(option =>
      option
        .setName("name")
        .setDescription("Name of the new activity")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("url").setDescription("URL of the new activity")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const name = interaction.options.get("name").value;
    const type = interaction.options.get("type").value;
    const status = interaction.options.get("status").value;
    const url =
      interaction.options.get("url")?.value ||
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    client.user.setPresence({
      status: status,
      afk: false,
      activities: [
        {
          name,
          type: parseInt(type),
          url,
        },
      ],
    });

    interaction.reply({ content: "Activity set", ephemeral: true });
  },
};
