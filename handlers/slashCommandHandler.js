import { Routes, REST } from "discord.js";
import config from "../config.js";
import loadFiles from "../functions/fileLoader.js";
import ascii from "ascii-table";

//setting up REST for discord
const rest = new REST({ version: "10" }).setToken(config.TOKEN);

async function loadPublicCommands(client) {
  // table for formatted printing
  const table = new ascii().setHeading("PCommands", "Status");
  // clear all commands first
  await client.publicCommands.clear();

  const publicCommandsArray = [];
  // Load all the files from commands/public folder
  const publicCommandFiles = await loadFiles("commands/public");

  for (const file of publicCommandFiles) {
    // importing those files
    const imported = await import("file://" + file);
    const command = imported.default;

    client.publicCommands.set(command.data.name, command);
    publicCommandsArray.push(command.data.toJSON());

    //formatting
    table.addRow(command.data.name, "🟩");
  }

  await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
    body: publicCommandsArray,
  });

  // await client.application.commands.set(publicCommandsArray);
  return console.log(table.toString(), "\nCommands loaded");
}

async function loadDevCommands(client) {
  // table for formatted printing
  const table = new ascii().setHeading("DCommands", "Status");
  // clear all commands first
  await client.devCommands.clear();

  const devCommandsArray = [];
  // Load all the files from commands/devloper folder
  const devCommandFiles = await loadFiles("commands/devloper");

  for (const file of devCommandFiles) {
    // importing those files
    const imported = await import("file://" + file);
    const command = imported.default;

    client.devCommands.set(command.data.name, command);
    devCommandsArray.push(command.data.toJSON());

    //formatting
    table.addRow(command.data.name, "🟨");
  }

  await rest.put(
    Routes.applicationGuildCommands(config.CLIENT_ID, config.devServer),
    {
      body: devCommandsArray,
    }
  );
  return console.log(table.toString(), "\nCommands loaded");
}

async function removeGlobalCommands(client) {
  try {
    console.log("Started removing commands");

    rest.get(Routes.applicationCommands(config.CLIENT_ID)).then(data => {
      const promises = [];
      for (const command of data) {
        const deleteUrl = `${Routes.applicationCommands(config.CLIENT_ID)}/${
          command.id
        }`;
        promises.push(rest.delete(deleteUrl));
      }

      console.log("Removed commands succesfully");
    });
  } catch {
    console.log("Failed to remove commands");
  }
}

export { loadPublicCommands, loadDevCommands, removeGlobalCommands };
