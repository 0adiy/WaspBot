import getSongEmbed from "../functions/songEmbedGen.js";

export default {
  name: "skip",
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return;
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
