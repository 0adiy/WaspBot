import { ActionRowBuilder } from "discord.js";
import previous from "../buttons/previous.js";
import skip from "../buttons/skip.js";
import pause from "../buttons/pause.js";
import shuffle from "../buttons/shuffle.js";
import repeatMode from "../buttons/repeatMode.js";

const musicOptionsRow = new ActionRowBuilder().addComponents(
  previous.data,
  skip.data,
  pause.data,
  shuffle.data,
  repeatMode.data
);

const musicOptionsRow2 = new ActionRowBuilder().addComponents();

export { musicOptionsRow, musicOptionsRow2 };
