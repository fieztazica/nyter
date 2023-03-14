// Deconstructed the constants we need in this file.
const QRCode = require("qrcode");
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("qr")
		.setDescription("Generate QR code")
		.addStringOption((option) =>
			option
				.setName("text")
				.setDescription("A text/string to generate QR Code")
				.setRequired(true)
		),
	category: "information",
	async execute(interaction) {
		const { client } = interaction;
		const text = interaction.options.getString("text");

		const bufferQR = await QRCode.toBuffer(text, {
			width: text.length < 300 ? 300 : text.length,
		});

		const attachment = new Discord.AttachmentBuilder(bufferQR, {
			name: `${text}.png`,
		});

		await interaction.reply({
			files: [attachment],
		});
	},
};
