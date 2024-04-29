import { ActionRowBuilder } from "discord.js";
import previous from "../buttons/previous.js";
import next from "../buttons/next.js";
import pause from "../buttons/pause.js";
import shuffle from "../buttons/shuffle.js";
import repeatMode from "../buttons/repeatMode.js";
import voldown from "../buttons/voldown.js";
import volup from "../buttons/volup.js";
import favorite from "../buttons/favorite.js";
import { lyrics } from "../buttons/lyrics.js";

const musicOptionsRow = new ActionRowBuilder().addComponents(
  voldown.data,
  previous.data,
  pause.data,
  next.data,
  volup.data,
);

const musicOptionsRow2 = new ActionRowBuilder().addComponents(
  favorite.data,
  shuffle.data,
  repeatMode.data,
  lyrics.data,
);

export { musicOptionsRow, musicOptionsRow2 };
