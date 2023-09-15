import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
} from "discord.js";
import {
  musicOptionsRow,
  musicOptionsRow2,
} from "../../../components/Rows/musicOptionsRow.js";

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
    if (!queue)
      return await interaction.reply({
        content: "No song in queue",
        ephemeral: true,
      });
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
      )
      .setFooter({
        text: `Current time ${queue.currentTime}`,
      });

    await interaction.reply({
      embeds: [embed],
      components: [musicOptionsRow, musicOptionsRow2],
    });
  },
};
