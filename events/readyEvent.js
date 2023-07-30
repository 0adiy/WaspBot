import { Events } from "discord.js";
import {
  loadPublicCommands,
  loadDevCommands,
} from "../handlers/slashCommandHandler.js";
import loadButtons from "../handlers/buttonHandler.js";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`😈 ${client.user.tag} is in 🤓!`);
    loadPublicCommands(client);
    loadDevCommands(client);
    loadButtons(client);
  },
};
