import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
  ButtonBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows queue"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("No song in queue");
    const embed = new EmbedBuilder()
      .setColor(0xeeee00)
      .setTitle("Server Queue")
      .setDescription(
        queue.songs
          .map(
            (song, i) =>
              `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
                song.formattedDuration
              }\``
          )
          .join("\n")
      );

    const skip = new ButtonBuilder()
      .setCustomId("skip")
      .setEmoji("⏭️")
      .setLabel("Skip")
      .setStyle(ButtonStyle.Secondary);

    const previous = new ButtonBuilder()
      .setCustomId("previous")
      .setEmoji("⏮️")
      .setLabel("Previous")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(previous, skip);
    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
