// Deconstructed the constants we need in this file.
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("dog")
		.setDescription("Dog relates command")
		.addSubcommand((sub) =>
			sub.setName("random").setDescription("Get random dog pics")
		)
		.addSubcommand((sub) =>
			sub.setName("fact").setDescription("Get random dog facts")
		),
	category: "fun",
	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();

		const embed = new Discord.EmbedBuilder().setColor("Random");

		const picEndpoint = `https://api.thedogapi.com/v1/images/search`;
		const factEndpoint = `https://dog-api.kinduff.com/api/facts`;

		switch (subCommand) {
			case "random":
				let pic = await axios
					.get(picEndpoint)
					.then((res) => [...res.data].shift());
				embed.setImage(`${pic.url}`);
				break;

			case "fact":
				let fact = await axios
					.get(factEndpoint)
					.then((res) => [...res.data.facts].shift());
				embed.setDescription(`${fact}`);
				break;
		}

		await interaction.reply({
			embeds: [embed],
		});
	},
};
