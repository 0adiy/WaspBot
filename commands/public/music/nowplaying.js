import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";
import getSongEmbed from "../../../functions/songEmbedGen.js";
import { musicOptionsRow } from "../../../components/Rows/musicOptionsRow.js";

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

    const embed = getSongEmbed(song);

    await interaction.editReply({
      embeds: [embed],
      components: [musicOptionsRow],
    });
  },
};
