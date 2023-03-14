// Deconstructed the constants we need in this file.
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("quote")
		.setDescription("Generate random quote"),
	category: "information",
	async execute(interaction) {
		const quote = await axios
			.get("https://api.quotable.io/random")
			.then((res) => res.data);

		const embed = new Discord.EmbedBuilder()
			.setColor("Random")
			.setFooter({ text: `${quote.author}` })
			.setDescription(`${quote.content}`);

		await interaction.reply({
			embeds: [embed],
		});
	},
};
