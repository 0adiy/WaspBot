import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import mongoose from "mongoose";
import config from "./config.js";

import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
// import { SoundCloudPlugin  } from "@distube/soundcloud";

import loadEvents from "./handlers/eventHandler.js";
import messageCreateHandler from "./handlers/messageCreateHandler.js";

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
    new YtDlpPlugin(),
  ],
});

// Connecting to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));

// TODO: Better Messages handler for normal messages
client.on("messageCreate", messageCreateHandler);

// Turning it on
client.login(config.TOKEN);

