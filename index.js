
const env = require('dotenv').config();
const { reactChance, channel, user, reaction } = require('./config.json');
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
] });

const messageFilter = (message) => message.channelId == channel && message.author.id == user
const chance = (percent) => Math.random() < percent/100;

client.on(Events.MessageCreate, async message => {
	if(messageFilter(message) && chance(reactChance))
	{
		try {
			await message.react(reaction);
		} catch (error) {
			console.log(`Error reacting: ${error}`);
		}
	}
})

client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag} started`);
});

client.login(env.parsed.TOKEN);