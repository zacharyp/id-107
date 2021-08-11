import Discord, { Intents } from 'discord.js';
import { DISCORD_TOKEN } from './config/secrets';

// const PORT = process.env.PORT || 5000;

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////
// Discord Events: https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate

client.once('ready', () => {
  console.log('id-107 has started');
});
// client.on("message", (message: Message) => { commandHandler.handleMessage(message); });

client.on('error', e => {
  console.error('Discord client error!', e);
});

client.login(DISCORD_TOKEN);
