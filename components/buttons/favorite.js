import { ButtonBuilder, ButtonStyle } from "discord.js";
import favPlaylistSchema from "../../models/favPlaylistSchema.js";

export default {
  name: "favorite",
  data: new ButtonBuilder()
    .setCustomId("favorite")
    .setEmoji("🌟")
    .setLabel("Favorite")
    .setStyle(ButtonStyle.Secondary),
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];
    const songURL = embed.url;
    console.log(songURL);

    // MongoDB stuff
    let doc = await favPlaylistSchema.findOne({ _id: interaction.user.id });
    if (!doc) {
      doc = new favPlaylistSchema({ _id: interaction.user.id });
    }
    doc.favouritePlaylist.addToSet(songURL);
    await doc?.save();

    interaction.reply("Added to favourites");

    // deleting after 5 seconds
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
