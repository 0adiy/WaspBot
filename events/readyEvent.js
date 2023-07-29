import { Events } from "discord.js";
import {
  loadPublicCommands,
  loadDevCommands,
} from "../handlers/slashCommandHandler.js";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`😈 ${client.user.tag} is in 🤓!`);
    loadPublicCommands(client);
    loadDevCommands(client);
  },
};
