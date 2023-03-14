// Deconstructed the constants we need in this file.
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders");
const { textSync, fontsSync } = require("figlet");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("ascii")
		.setDescription("Summon ascii art with given string")
		.addStringOption((option) =>
			option
				.setName("content")
				.setDescription("Make your string shorter than 20 characters")
				.setMinLength(1)
				.setMaxLength(20)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("font")
				.setDescription("Set ascii art font")
				.setAutocomplete(true)
		),
	category: "fun",
	async execute(interaction) {
		let font = interaction.options.getString("font") || "Standard";

		let content = interaction.options
			.getString("content")
			.trim()
			.split(/ +/)
			.join(" ");

		let result = await textSync(content, font);

		let embed = new Discord.EmbedBuilder()
			.setColor("Random")
			.setDescription(codeBlock(result))
			.setFooter({ text: `${font}` });

		return interaction.reply({
			embeds: [embed],
		});
	},
};
