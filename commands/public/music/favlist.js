import {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
} from "discord.js";

import favPlaylistSchema from "../../../models/favPlaylistSchema.js";
import getSongEmbed from "../../../functions/songEmbedGen.js";
import {
  musicOptionsRow,
  musicOptionsRow2,
} from "../../../components/Rows/musicOptionsRow.js";

export default {
  data: new SlashCommandBuilder()
    .setName("favlist")
    .setDescription("Manage favourite playlist")
    .addSubcommand(cmd =>
      cmd.setName("add").setDescription("Add Queue songs to favourite playlist")
    )
    .addSubcommand(cmd =>
      cmd.setName("clear").setDescription("Clear favourite playlist")
    )
    .addSubcommand(cmd =>
      cmd.setName("show").setDescription("Show favourite playlist")
    )
    .addSubcommand(cmd =>
      cmd
        .setName("play")
        .setDescription("Plays all songs in favourite playlist")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
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
      case "play":
        play(interaction, client);
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

async function play(interaction, client) {
  const vc = interaction.member.voice.channel;
  if (!vc)
    return interaction.reply(
      "You need to be in a voice channel to use this command"
    );

  await interaction.deferReply();

  // MongoDB stuff
  const doc = await favPlaylistSchema
    .where({ _id: interaction.user.id })
    .findOne();
  if (!doc) {
    return interaction.editReply({
      content: "Favourite playlist empty",
      ephemeral: true,
    });
  }
  console.log("Song Urls: ", doc.favouritePlaylist);

  const playlist = await client.distube.createCustomPlaylist(
    doc.favouritePlaylist,
    {
      member: interaction.member,
      properties: { name: "My playlist name", source: "custom" },
      parallel: true,
    }
  );

  try {
    await client.distube.play(vc, playlist, {
      interaction,
      textChannel: interaction.channel,
      member: interaction.member,
    });

    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.editReply("There is nothing in the queue right now!");
    const song = queue.songs[0];

    // Embed
    const embed = getSongEmbed(song);

    await interaction.editReply({
      embeds: [embed],
      components: [musicOptionsRow, musicOptionsRow2],
    });
  } catch (err) {
    return interaction.editReply("```\n" + err + "\n```");
  }
}
