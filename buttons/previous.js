import { ButtonBuilder, ButtonStyle } from "discord.js";
import getSongEmbed from "../functions/songEmbedGen.js";

export default {
  name: "previous",
  data: new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji("⏮️")
    .setLabel("Previous")
    .setStyle(ButtonStyle.Secondary),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) return await interaction.reply("No song before current one");
    try {
      await interaction.reply("Going Back...");
      const song = await queue.previous();
      await interaction.message.edit({
        embeds: [getSongEmbed(song)],
      });
      await interaction.deleteReply();
    } catch (e) {
      console.log(e);
      return await interaction.editReply(`${e}`);
    }
  },
};
