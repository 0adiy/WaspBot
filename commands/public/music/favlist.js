import { SlashCommandBuilder } from "discord.js";

import favPlaylistSchema from "../../../models/favPlaylistSchema.js";

export default {
  data: new SlashCommandBuilder()
    .setName("favlist")
    .addSubcommand(subcommand =>
      subcommand
        .setName("add")
        .setDescription("Add Queue songs to favourite playlist")
    )
    .addSubcommand(subcommand =>
      subcommand.setName("clear").setDescription("Clear favourite playlist")
    )
    .addSubcommand(subcommand =>
      subcommand.setName("show").setDescription("Show favourite playlist")
    ),

  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "add":
        add(interaction, client);
        break;
      case "clear":
        clear(interaction, client);
        break;
      case "show":
        show(interaction, client);
        break;
    }
  },
};

async function add(interaction, client) {
  const queue = client.distube.getQueue(interaction);

  if (!queue)
    return interaction.reply({
      content: "Queue doesn't exist",
      ephemeral: true,
    });

  const playlist = queue.songs.map(song => song.url);

  // MongoDB stuff
  let doc = await favPlaylistSchema.findOne({ _id: interaction.user.id });
  if (!doc) {
    doc = new favPlaylistSchema({ _id: interaction.user.id });
  }
  doc.favouritePlaylist.addToSet(...playlist);

  console.log(doc, " doc");
  await doc?.save();

  interaction.reply({
    content: playlist.join(", "),
  });
}

async function clear(interaction, client) {
  await favPlaylistSchema.where({ _id: interaction.user.id }).deleteOne();

  await interaction.reply({
    content: "Favourite playlist cleared",
  });
}

async function show(interaction, client) {
  const doc = await favPlaylistSchema
    .where({ _id: interaction.user.id })
    .findOne();
  if (!doc) {
    return interaction.reply({
      content: "Favourite playlist empty",
      ephemeral: true,
    });
  }

  interaction.reply({
    content: doc.favouritePlaylist.join("\n"),
  });
}
