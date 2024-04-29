import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client } from "discord.js";
import { EmbedBuilder } from "discord.js";
import axios from "axios";
import { load } from "cheerio";
import config from "../../config.js";

async function getSongLink(songName, artistName) {
  const api = config.apis.lyrics_api;
  let responseData = { status: 400, song: null };
  try {
    const response = await fetch(
      `${api.endpoint}?uid=${api.user_id}&tokenid=${api.token}&term=${encodeURIComponent(
        songName,
      )}&format=${api.format}`,
    );
    const responseBody = await response.text();
    if (responseBody == "{}") {
      responseData.status = 404;
    } else {
      let jsonData = JSON.parse(responseBody);
      let result = jsonData.result;
      responseData.status = 200;
      let artistNames = artistName.toLowerCase().split(" ");
      responseData.song = result.find((song) => {
        let artist = song.artist.toLowerCase();
        return artistNames.some((name) => artist.includes(name));
      });
      if (!responseData.song) {
        responseData.song = result[0];
      }
    }
  } catch (error) {
    console.error("Error fetching song link:", error);
    responseData.status = 500;
  }
  return responseData;
}

async function scrapeLyrics(url) {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);
    const lyrics = $("pre.lyric-body").text().trim();
    return lyrics;
  } catch (error) {
    console.error("An error occured while scraping song:", error);
    return null;
  }
}

async function getSongLyrics(songName, artistName) {
  const request = await getSongLink(songName, artistName);
  let response = { status: 404, song: null, lyrics: null };
  if (request.status == 200) {
    response.status = 200;
    response.song = request.song;
    response.lyrics = await scrapeLyrics(request.song["song-link"]);
  }
  return response;
}

export default {
  name: "lyrics",
  data: new ButtonBuilder()
    .setCustomId("lyrics")
    .setEmoji("<:lyrics:1234522617977765968>")
    .setLabel("lyrics")
    .setStyle(ButtonStyle.Secondary),
  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    interaction.deferReply();
    const embed = await interaction.message.embeds[0];
    // REVIEW - Move this processing to the function itself?
    let songName;
    //split string at - | (
    //assume string is "America - A Horse With No Name (Official Audio)"
    // assume songTitle = ["America", "A Horse With No Name", "Official Audio"]
    let filteredTitle = embed.title
      .split(/[-|()]/)
      .filter(
        (title) =>
          !title.toLowerCase().includes("official") &&
          !title.toLowerCase().includes("video") &&
          !title.toLowerCase().includes("remaster") &&
          !title.toLowerCase().includes("music"),
      );
    if (filteredTitle.length > 2) {
      songName =
        filteredTitle[0].length > filteredTitle[1].length ? filteredTitle[0] : filteredTitle[1];
    } else {
      songName = filteredTitle[0];
    }
    const request = await getSongLyrics(songName.trim(), embed.fields[2].value);
    if (request.status == 404) {
      return interaction.editReply(`No lyrics available. Query: ${songName}`);
    }
    const song = request.song;
    const responseEmbed = new EmbedBuilder()
      .setColor(0x1588a8)
      .setThumbnail(embed.thumbnail.url)
      .setTitle(song.song)
      .setDescription(request.lyrics)
      .addFields(
        { name: "Artist", value: song.artist, inline: false },
        {
          name: "Album",
          value: song.album,
          inline: false,
        },
        {
          name: "Query",
          value: songName,
          inline: false,
        },
      );
    await interaction.editReply({ embeds: [responseEmbed.toJSON()] });
  },
};
