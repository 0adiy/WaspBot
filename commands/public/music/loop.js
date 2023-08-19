import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("loops the queue")
    .addIntegerOption(option =>
      option
        .setName("mode")
        .setDescription("Select the mode of repeat")
        .setRequired(true)
        .addChoices(
          { name: "off", value: 0 },
          { name: "song", value: 1 },
          { name: "queue", value: 2 }
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    const mode = interaction.options.get("mode").value;
    const modeMeaning = mode
      ? mode === 2
        ? "Repeat queue"
        : "Repeat song"
      : "Off";
    if (!queue)
      return await interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    queue.setRepeatMode(mode);
    return await interaction.reply({
      embeds: [
        {
          title: "Looping",
          description: modeMeaning,
        },
      ],
    });
  },
};
