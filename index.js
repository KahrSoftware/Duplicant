
const env = require('dotenv').config();
const config = require('./config.json');

const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
] });

function chance(percent) {
	return Math.random() < percent/100;
}

client.on(Events.MessageCreate, message => {
	if(message.channelId == config.channel && message.author.id == config.user && chance(config.reactChance))
	{
		message.react(config.reaction);
	}
})

client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag} started`);
});

client.login(env.parsed.TOKEN);