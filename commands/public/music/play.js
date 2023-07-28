import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Add a song to queue")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Name or link of song")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const query = interaction.options.get("query").value;
    await interaction.deferReply();

    await client.distube.play(interaction.member.voice.channel, query, {
      interaction,
      textChannel: interaction.channel,
      member: interaction.member,
    });

    try {
      const queue = client.distube.getQueue(interaction);
      if (!queue)
        return interaction.editReply(
          "There is nothing in the queue right now!"
        );
      const song = queue.songs[queue.songs.length - 1];

      // Embed
      const embed = new EmbedBuilder()
        .setTitle(song.name)
        .setURL(song.url)
        // .setDescription(`${song.info}`)
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
          }
        )
        .setColor(0x0099ff);

      // Actions
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

      await interaction.editReply({ embeds: [embed], components: [row] });
    } catch (err) {
      return interaction.editReply("```\n" + err + "\n```");
    }
  },
};
