// Deconstructed the constants we need in this file.
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders");
const { default: axios } = require("axios");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("bitcoin")
		.setDescription("View the Bitcoin Price Index (BPI) in real-time"),
	category: "information",
	async execute(interaction) {
		const type = interaction.options.getString("type") || "general";

		const endpoint = `https://api.coindesk.com/v1/bpi/currentprice.json`;

		let data = await axios.get(endpoint).then((res) => res.data);

		let fields = Object.keys(data.bpi).map((bpi) => {
			let obj = data.bpi[bpi];
			return {
				name: `${obj.description} (${obj.code})`,
				value: `${unescapeHTML(obj.symbol)} ${obj.rate}\n${codeBlock(
					"js",
					`\~ ${obj.rate_float}`
				)}`,
				inline: true,
			};
		});

		const embed = new Discord.EmbedBuilder()
			.setColor("Random")
			.addFields(...fields)
			.setFooter({
				text: `${data.disclaimer}`,
			})
			.setTimestamp(new Date(data.time.updated));

		await interaction.reply({
			embeds: [embed],
		});
	},
};

var htmlEntities = {
	nbsp: " ",
	cent: "¢",
	pound: "£",
	yen: "¥",
	euro: "€",
	copy: "©",
	reg: "®",
	lt: "<",
	gt: ">",
	quot: '"',
	amp: "&",
	apos: "'",
};

function unescapeHTML(str) {
	return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
		var match;

		if (entityCode in htmlEntities) {
			return htmlEntities[entityCode];
			/*eslint no-cond-assign: 0*/
		} else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
			return String.fromCharCode(parseInt(match[1], 16));
			/*eslint no-cond-assign: 0*/
		} else if ((match = entityCode.match(/^#(\d+)$/))) {
			return String.fromCharCode(~~match[1]);
		} else {
			return entity;
		}
	});
}
