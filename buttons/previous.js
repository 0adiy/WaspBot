import getSongEmbed from "../functions/songEmbedGen.js";

export default {
  name: "previous",
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) return;
    try {
      await interaction.reply("Going Back...");
      const song = await queue.previous();
      await interaction.message.edit({
        embeds: [getSongEmbed(song)],
      });
      await interaction.deleteReply();
    } catch (e) {
      console.log(e);
      return await interaction.reply(`${e}`);
    }
  },
};
