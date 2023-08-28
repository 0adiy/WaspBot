import getSongEmbed from "../../functions/songEmbedGen.js";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  name: "next",
  data: new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("⏭️")
    .setLabel("Next")
    .setStyle(ButtonStyle.Secondary),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    // handling errors
    if (!queue)
      return await interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    if (queue.songs.length === 1)
      return await interaction.reply({
        content: "No song in queue ahead",
        ephemeral: true,
      });

    // logic
    try {
      await interaction.reply("Skipping...");
      const song = await queue.skip();
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
