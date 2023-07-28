import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Shows the song playing right now"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();

    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply(`There is nothing in the queue right now!`);
    const song = queue.songs[0];

    // Embed
    const embed = new EmbedBuilder()
      .setTitle(song.name)
      .setURL(song.url)
      .setThumbnail(song.thumbnail)
      .addFields(
        {
          name: "Requested by",
          value: `${song.user}`,
          inline: true,
        },
        {
          name: "Duration",
          value: `${song.formattedDuration}`,
          inline: true,
        },
        {
          name: "Song by",
          value: `[${song.uploader?.name}](${song.uploader?.url})`,
          inline: true,
        },
        {
          name: "Current Time",
          value: `${queue.currentTime}`,
          inline: true,
        }
      );

    await interaction.editReply({ embeds: [embed] });
  },
};
