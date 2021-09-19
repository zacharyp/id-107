import { Channel, Client, Intents, Message } from "discord.js";
import { DISCORD_TOKEN } from "./config/secrets";
import { legionhqToArmy } from "./helpers/legionhq";
import { exportAsText } from "./helpers/import_export";
import { findKeyword } from "./helpers/keywords_check";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("interactionCreate", interaction => {
  console.log(interaction);
});

client.once("ready", () => {
  console.log("id-107 has started");
});

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

let legionhqREG = /(legionhq.thefifthtrooper.com\/list\/)(rebels|empire|republic|separatists)\/([a-zA-Z0-9,_+]+)/;
let keywordREG = /^(#lkeyword) (\w+)/;

client.on("messageCreate", async (message: Message) => {
  let content = message.content;
  if (legionhqREG.test(content)) {
    let matched = content.match(legionhqREG);
    if (matched != null) {
      // console.log("legionhq URI path: " + matched[3]);

      let id = message.guild?.id;
      let channelId = message.channel.id;

      const channel: Channel | undefined = client.channels.cache.get(channelId);
      if (channel != undefined) {
        let army = legionhqToArmy(matched[2], matched[3]);
        if (army) {
          let text = exportAsText(army);
          message.reply(text)
        }
      }
    }
  } else if (keywordREG.test(content)) {
    let matched = content.match(keywordREG)
    if (matched != null) {
      // console.log(matched[0])
      // console.log(matched[1])
      // console.log(matched[2])
      let foundKeyword = findKeyword(matched[2])
      if (foundKeyword) {
        message.reply(foundKeyword)
      }
    }
  }

  /*
    https://legionhq.thefifthtrooper.com/list/57604
     => GET https://api.legion-hq.com:3001/lists/57604
  */

});

client.login(DISCORD_TOKEN);

/*
https://discord.com/api/oauth2/authorize?client_id=874631542851387423&permissions=2048&scope=applications.commands%20bot
*/
