import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  ActionRowBuilder,
} from "discord.js";
import previous from "../../../buttons/previous.js";
import skip from "../../../buttons/skip.js";
import getSongEmbed from "../../../functions/songEmbedGen.js";

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Add a song to queue")
    .addStringOption(option =>
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

      const row = new ActionRowBuilder().addComponents(
        previous.data,
        skip.data
      );

      await interaction.editReply({ embeds: [embed], components: [row] });
    } catch (err) {
      return interaction.editReply("```\n" + err + "\n```");
    }
  },
};
