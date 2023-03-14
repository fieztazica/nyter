const { Events } = require('discord.js');
const statusChanger = require('../helper/statusChanger');


module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
        statusChanger(client);
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
