import getSongEmbed from "../functions/songEmbedGen.js";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  name: "skip",
  data: new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji("⏭️")
    .setLabel("Skip")
    .setStyle(ButtonStyle.Secondary),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("Nothing in Queue to skip");
    try {
      await interaction.reply("Skipping...");
      const song = await queue.skip();
      await interaction.message.edit({
        embeds: [getSongEmbed(song)],
      });
      await interaction.deleteReply();
    } catch (e) {
      return await interaction.editReply(`${e}`);
    }
  },
};
