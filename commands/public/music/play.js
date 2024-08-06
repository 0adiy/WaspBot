import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  AutocompleteInteraction,
  Client,
} from "discord.js";
import {
  musicOptionsRow,
  musicOptionsRow2,
} from "../../../components/Rows/musicOptionsRow.js";
import getSongEmbed from "../../../functions/songEmbedGen.js";
import { YouTubePlugin } from "@distube/youtube";

const ytPlugin = new YouTubePlugin();

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Add a song to queue")
    .addStringOption(option =>
      option
        .setName("query")
        .setDescription("Name or link of song")
        .setRequired(true)
        .setAutocomplete(true)
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
        components: [musicOptionsRow, musicOptionsRow2],
      });
    } catch (err) {
      return interaction.editReply("```\n" + err + "\n```");
    }
  },
  /**
   * @param {AutocompleteInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();

    if (!focusedValue) return;

    /**
     * @type {import("@distube/youtube").YouTubeSearchResultSong}
     */
    const videosList = await ytPlugin.search(focusedValue);

    await interaction.respond(
      videosList.map(v => {
        let title = v.formattedDuration + " " + v.name;
        if (title.length > 90) title = title.slice(0, 90) + "...";

        return {
          name: title,
          value: v.url,
        };
      })
    );
  },
};
