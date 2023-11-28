import { ButtonBuilder, ButtonStyle } from "discord.js";
import getSongEmbed from "../../functions/songEmbedGen.js";

export default {
  name: "previous",
  data: new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji("<:backwardarrow:1179139727010562058>")
    .setLabel("Previous")
    .setStyle(ButtonStyle.Secondary),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    // handling errors
    if (!queue)
      return await interaction.reply({
        content: "No song in queue",
        ephemeral: true,
      });

    if (queue.previousSongs.length === 0)
      return await interaction.reply({
        content: "No song in queue behind",
        ephemeral: true,
      });

    // logic
    try {
      await interaction.reply("Going Back...");
      const song = await queue.previous();
      if (queue.paused) await queue.resume();
      await interaction.message.edit({
        embeds: [getSongEmbed(song)],
      });
      await interaction.deleteReply();
    } catch (e) {
      return await interaction.editReply(`${e}`);
    }
  },
};
