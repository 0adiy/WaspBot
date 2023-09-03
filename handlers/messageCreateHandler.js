import chalk from "chalk";
import config from "../config.js";

function hello() {
  const greetings = ["Hi Super! 😎", "Hi Super User! 🤙", "Greetings 🤓"];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

let result = "";
function print(String) {
  if (result.length < 1900) result += String;
}

export default async function messageCreateHandler(message) {
  const msgIn = message.guild
    ? chalk.black.bgGreen(message.guild?.nameAcronym)
    : chalk.black.bgWhite("Dm");
  if (!message.author.bot)
    console.log(
      `🗨️ ${chalk.bgRed(message.author.username)} in ${msgIn} has ${chalk.gray(
        message.content
      )}`
    );

  // for later use
  const [client, guild, channel] = [
    message.client,
    message.guild,
    message.channel,
  ];

  if (
    !message.content.startsWith(config.prefix) ||
    message.author.bot ||
    !config.superUsersArray.includes(message.author.id)
  )
    return;
  const msg = message.content.slice(config.prefix.length);

  // OLD REGEX
  const command = /^\w+/.exec(msg)[0].toLowerCase();
  const args = msg?.replace(/^\w+/, "");

  // TODO: better regex?
  // const [, command, args] = msg.match(/^(\w+)\s(.+)/) || [];

  // logging command
  // console.log(`${chalk.blue(command)} ${args}`);

  if (command === "hello") {
    await message.channel.send(hello());
  }

  if (command == "eval") {
    const codeString = args?.replace(/```js|```/g, "");
    try {
      const asyncFunction = new Function(
        "client, guild, channel, message, print, msg",
        `return (async () => { ${codeString} })()`
      );
      await asyncFunction(client, guild, channel, message, print, msg);
      await message.react("<a:check:1054376181673234492>");
    } catch (error) {
      result = error;
      await message.react("<a:cross:1060641653121093803>");
    }

    if (result) {
      await message.channel.send("```\n" + result + "\n```");
    }
    result = "";
  }
}
