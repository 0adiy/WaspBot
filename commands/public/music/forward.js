import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("forward")
    .setDescription("Moves the seeker by specified amount of time")
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("amout of time to move")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply(`There is nothing in the queue right now!`);
    const time = interaction.options.get("time").value;
    queue.seek(queue.currentTime + time);
    interaction.reply({
      embeds: [
        {
          title: "Seeked",
          description: `Forwarded to ${queue.currentTime + time}`,
          color: 0xeeee00,
        },
      ],
    });
  },
};
