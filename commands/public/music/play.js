import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";

import getSongEmbed from "../../../functions/songEmbedGen.js";

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
    try {
      await client.distube.play(interaction.member.voice.channel, query, {
        interaction,
        textChannel: interaction.channel,
        member: interaction.member,
      });
      const queue = client.distube.getQueue(interaction);
      if (!queue)
        return interaction.editReply(
          "There is nothing in the queue right now!"
        );
      const song = queue.songs[queue.songs.length - 1];

      // Embed
      const embed = getSongEmbed(song);

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
