import { Channel, Client, Intents, Message } from "discord.js";
import { DISCORD_TOKEN } from "./config/secrets";

// const PORT = process.env.PORT || 5000;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Discord Events: https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate

client.on("interactionCreate", interaction => {
  console.log(interaction);
});

client.once("ready", () => {
  console.log("id-107 has started");
  // client.application.commands = new ApplicationCommandManager();

});
// client.on("message", (message: Message) => { commandHandler.handleMessage(message); });

client.on("error", e => {
  console.error("Discord client error!", e);
});


client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else {
    console.log("commandName = " + interaction.commandName);
  }
});

let legionhqREG = /(legionhq.thefifthtrooper.com\/list\/)(rebels|empire|republic|separatists)\/([a-zA-Z0-9,]+)/;

client.on("messageCreate", async (message: Message) => {
  let content = message.content;
  // console.log("message: " + content);

  // https://legionhq.thefifthtrooper.com/list/rebels/1kflidg0kh_0000,1lv0lu,1jg0,2ahiu000,2ah0000,2ajeejbdf00,2aofe0,kj,cv,ls,bk,lr,bj
  // https://legionhq.thefifthtrooper.com/list/empire/1asdx00ik,2hgfu0000,2ft0,2bbem0000,1bceljb0de0,1ayej000,1ay0ez00,,,,,,
  // https://legionhq.thefifthtrooper.com/list/republic/1na0000,,,,,,
  // https://legionhq.thefifthtrooper.com/list/separatists/1ia0000,,,,,,
  if (legionhqREG.test(content)) {
    let matched = content.match(legionhqREG);
    if (matched != null) {
      console.log("legionhq URI path: " + matched[3]);

      let id = message.guild?.id;
      let channelId = message.channel.id;

      const channel: Channel | undefined = client.channels.cache.get(channelId);
      if (channel != undefined) {
        message.reply("legionhq URI path: " + matched[3])
      }

      // client.
    }
  }
});

// client.application.commands = new ApplicationCommandManager();

// client.commands = new Collection();
//
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//
// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   // set a new item in the Collection
//   // with the key as the command name and the value as the exported module
//   client.commands.set(command.data.name, command);
// }

client.login(DISCORD_TOKEN);

/*
https://discord.com/api/oauth2/authorize?client_id=874631542851387423&permissions=2048&scope=applications.commands%20bot
*/