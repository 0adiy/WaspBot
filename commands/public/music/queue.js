import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
} from "discord.js";
import previous from "../../../buttons/previous.js";
import skip from "../../../buttons/skip.js";

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
      )
      .setFooter({
        text: `Current time ${queue.currentTime}`,
      });

    const row = new ActionRowBuilder().addComponents(previous.data, skip.data);
    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
