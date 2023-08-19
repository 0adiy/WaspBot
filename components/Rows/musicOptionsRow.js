import { ActionRowBuilder } from "discord.js";
import previous from "../buttons/previous.js";
import skip from "../buttons/skip.js";
import pause from "../buttons/pause.js";

export default new ActionRowBuilder().addComponents(
  previous.data,
  skip.data,
  pause.data
);
