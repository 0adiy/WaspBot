import { ChatInputCommandInteraction, Client, Events } from "discord.js";

const SuperUsers = [
  process.env["SU_Bisskut"],
  process.env["SU_Shazam"],
  process.env["SU_Kuro"],
  process.env["SU_Rockstar"],
];

export default {
  name: Events.InteractionCreate,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      console.log("🕹️ Chat Input");

      // TODO: have a condtion if(command.dm && interaction.channel instanceof Discord.DMChannel) then return, also need to add dm property for each command
      const command =
        client.publicCommands.get(interaction.commandName) ||
        client.devCommands.get(interaction.commandName);
      if (!command)
        return interaction.reply({
          content: "This is outdated",
          ephemeral: true,
        });

      if (command.devloper && !SuperUsers.includes(interaction.user.id))
        return interaction.reply({
          content: "This is for devs 🤓",
          ephemeral: true,
        });

      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      console.log("🔘 Button");

      const btnFunc = client.buttons.get(interaction.customId);
      if (!btnFunc) return;

      btnFunc(interaction, client);
    } else if (interaction.isStringSelectMenu()) {
      console.log("🔘 String Select Menu");
    }
  },
};
