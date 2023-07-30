import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
// import { SoundCloudPlugin  } from "@distube/soundcloud";

import loadEvents from "./handlers/eventHandler.js";
import messageCreateHandler from "./handlers/messageCreateHandler.js";

import dotenv from "dotenv"; // For Environment variables
dotenv.config();

// making new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  presence: {
    status: "online",
    afk: false,
    activities: [
      {
        name: "buzzing sounds",
        type: 1,
      },
    ],
  },
});

//setting up env variables
const TOKEN = process.env["TOKEN"];

client.events = new Collection();
client.publicCommands = new Collection();
client.devCommands = new Collection();
client.buttons = new Collection();
client.uptimeTrackerTimestamp = new Date();
loadEvents(client);

// Distube setup
client.distube = new DisTube(client, {
  emptyCooldown: 30,
  nsfw: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    // new SoundCloudPlugin(),
    new YtDlpPlugin({
      emitEventsAfterFetching: true,
    }),
  ],
});

// TODO: Better Messages handler for normal messages
client.on("messageCreate", messageCreateHandler);

// Turning it on
client.login(TOKEN);
