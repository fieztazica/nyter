// Deconstructed the constants we need in this file.
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Get random jokes")
		.addStringOption((option) =>
			option.setName("type").setDescription("Jokes type").setAutocomplete(true)
		),
	category: "information",
	async execute(interaction) {
		const type = interaction.options.getString("type") || "general";

		const endpoint = `https://official-joke-api.appspot.com/jokes/${type}/random`;

		let joke = await axios.get(endpoint).then((res) => [...res.data].shift());

		const embed = new Discord.EmbedBuilder()
			.setColor("Random")
			.setDescription(`${joke.setup}\n\n\> ${joke.punchline}`);
		await interaction.reply({
			embeds: [embed],
		});
	},
};
