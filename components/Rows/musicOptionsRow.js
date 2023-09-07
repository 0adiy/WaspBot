import { ActionRowBuilder } from "discord.js";
import previous from "../buttons/previous.js";
import next from "../buttons/next.js";
import pause from "../buttons/pause.js";
import shuffle from "../buttons/shuffle.js";
import repeatMode from "../buttons/repeatMode.js";
import voldown from "../buttons/voldown.js";
import volup from "../buttons/volup.js";
import favorite from "../buttons/favorite.js";

const musicOptionsRow = new ActionRowBuilder().addComponents(
  shuffle.data,
  previous.data,
  pause.data,
  next.data,
  repeatMode.data
);

const musicOptionsRow2 = new ActionRowBuilder().addComponents(
  voldown.data,
  volup.data,
  favorite.data
);

export { musicOptionsRow, musicOptionsRow2 };
