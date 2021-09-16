import { Channel, Client, Intents, Message } from "discord.js";
import { DISCORD_TOKEN } from "./config/secrets";
import { legionhqToArmy } from "./helpers/legionhq";
import { exportAsText } from "./helpers/import_export";
import { findKeyword } from "./helpers/keywords_check";
import {ttaToArmy} from "./helpers/tta";

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

let legionhqREG = /(legionhq.thefifthtrooper.com\/list\/)(rebels|empire|republic|separatists)\/([a-zA-Z0-9,_]+)/;
let keywordREG = /^(#lkeyword) (\w+)/;

// https://tabletopadmiral.com/listbuilder/Galactic%20Republic/p62uEMue8uEMp29uEMu66uEMuEMp38u01uEMp25uEMuEMuEMuEMp25uEMuEMuEMuEMp25uEMuc2uEMuEMuEMp25uEMuc1uEMuEMc08
// https://tabletopadmiral.com/listbuilder/Empire/p03uEMuEMuEMc08
// https://tabletopadmiral.com/listbuilder/Separatist%20Alliance/p5euEMuEMuEMuEMc08
// https://tabletopadmiral.com/listbuilder/Rebel/p0buEMuEMuEMc08
let ttaREG = /(tabletopadmiral.com\/listbuilder\/)(Rebel|Empire|Galactic%20Republic|Separatist%20Alliance)\/([a-zA-Z0-9,_]+)/;


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
  } else if (ttaREG.test(content)) {
    let matched = content.match(ttaREG);
    if (matched != null) {
      let channelId = message.channel.id;

      const channel: Channel | undefined = client.channels.cache.get(channelId);
      if (channel != undefined) {
        let army = ttaToArmy(matched[2], matched[3]);
        if (army) {
          let text = exportAsText(army);
          console.log(text)
          // message.reply(text)
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
