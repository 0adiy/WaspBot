import { SlashCommandBuilder } from "discord.js";

import favPlaylistSchema from "../../models/favPlaylistSchema.js";

export default {
  data: new SlashCommandBuilder()
    .setName("addtofav")
    .setDescription("Add to fav"),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue)
      return interaction.reply({
        content: "Queue doesn't exist",
        ephemeral: true,
      });

    const playlist = queue.songs.map(song => song.url);

    const doc = await favPlaylistSchema.findOneAndUpdate(
      { _id: interaction.user.id },
      {
        _id: interaction.user.id,
        $push: { favouritePlaylist: { $each: playlist } },
      },
      { upsert: true }
    );

    console.log(doc, " doc");
    await doc?.save();

    interaction.reply({
      content: playlist.join(", "),
    });
  },
};
