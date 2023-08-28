import { Events } from "discord.js";
import {
  loadPublicCommands,
  loadDevCommands,
} from "../handlers/slashCommandHandler.js";
import loadButtons from "../handlers/buttonHandler.js";
import mongoose from "mongoose";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`😈 ${client.user.tag} is in 🤓!`);

    // Loading Commands
    loadPublicCommands(client);
    loadDevCommands(client);
    loadButtons(client);

    // Connecting to MongoDB
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    console.log("Connected to MongoDB");
  },
};
