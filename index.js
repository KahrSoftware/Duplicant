
const env = require('dotenv').config();
const { reactChance, channel, user, reaction } = require('./config.json');
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
] });

const sleepTime = 5000;

const chance = (percent) => Math.random() < percent/100;
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const messageFilter = (message) => message.channelId == channel && message.author.id == user

class MessageHandlerCoordinator {
	#messageId = 0;
	constructor(semaphore)
	{
		this.semaphore = semaphore;
	}
	getMyId() {
		let nextId;
		this.semaphore.take(() => {
			nextId = ++this.#messageId;
			sem.leave();
		});
		return nextId;
	}
	checkCurrentId(id) {
		let matches;
		this.semaphore.take(() => {
			matches = id == this.#messageId;
			sem.leave();
		});
		return matches;
	}
}

client.on(Events.MessageCreate, async message => {
	if(messageFilter(message) && chance(reactChance))
	{
		let myId;
		try {
			myId = coordiantor.getMyId();
			await sleep(sleepTime);
			if (coordiantor.checkCurrentId(myId) && chance(reactChance))
			{
				console.log(`Message handler ${myId} reacting at ${new Date()}`)
				await message.react(reaction);
			}
		} catch (error) {
			console.log(`Error reacting: ${error}`);
		}
	}
})

client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag} started`);
});

const sem = require('semaphore')(1);
const coordiantor = new MessageHandlerCoordinator(sem);
client.login(env.parsed.TOKEN);
