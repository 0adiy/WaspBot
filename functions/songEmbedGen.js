import { EmbedBuilder } from "discord.js";

export default function getSongEmbed(song) {
  return (
    new EmbedBuilder()
      .setTitle(song.name)
      .setURL(song.url)
      // .setDescription(`${song.info}`)
      .setThumbnail(song.thumbnail)
      .addFields(
        {
          name: "Requested by",
          value: `${song.user}`,
          inline: true,
        },
        {
          name: "Duration",
          value: `${song.formattedDuration}`,
          inline: true,
        },
        {
          name: "Song by",
          value: `[${song.uploader?.name}](${song.uploader?.url})`,
          inline: true,
        }
      )
      .setColor(0x0099ff)
  );
}
