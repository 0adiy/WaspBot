import loadFiles from "../functions/fileLoader.js";
import ascii from "ascii-table";

export default async function loadButtons(client) {
  // table for formatted printing
  const table = new ascii().setHeading("Buttons", "Status");
  // clear all buttons first
  await client.buttons.clear();
  // Load all the files from buttons folder
  const Files = await loadFiles("components/buttons");

  for (const file of Files) {
    // importing button files
    const imported = await import("file://" + file);
    const btn = imported.default;

    const execute = (...args) => btn.execute(...args, client);
    client.buttons.set(btn.name, execute);

    //formatting
    table.addRow(btn.name, "🟧");
  }
  return console.log(table.toString(), "\nButtons loaded");
}
