import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";
import musicOptionsRow from "../../../components/Rows/musicOptionsRow.js";
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

    // Validating
    const vc = interaction.member.voice.channel;
    if (!vc)
      return interaction.reply(
        "You need to be in a voice channel to use this command"
      );

    await interaction.deferReply();
    try {
      await client.distube.play(vc, query, {
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

      await interaction.editReply({
        embeds: [embed],
        components: [musicOptionsRow],
      });
    } catch (err) {
      return interaction.editReply("```\n" + err + "\n```");
    }
  },
};
