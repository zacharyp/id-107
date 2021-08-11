const { SlashCommandBuilder } = require('@discordjs/builders');
import { CommandInteraction } from 'discord.js'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('keyword')
    .setDescription('Replies with keyword description'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};