// Deconstructed the constants we need in this file.

const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("🏓 Gather a pong!"),
	category: "information",
	async execute(interaction) {
		const { client } = interaction;

		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `${days > 0 ? `${days} day${days > 1 ? "s" : ""}, ` : ""}${
			hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}, ` : ""
		}${minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}, ` : ""}${
			seconds > 0 ? `${seconds} second${seconds > 1 ? "s" : ""}` : ""
		}`;

		const Embed = new Discord.EmbedBuilder()
			.setColor("Random")
			.addFields([
				{
					name: `Online`,
					value: "```" + uptime + "```",
					inline: false,
				},
				{
					name: `API Latency`,
					value: "```" + Math.round(client.ws.ping) + "ms" + "```",
					inline: true,
				},
				{
					name: `Client Latency`,
					value:
						"```" +
						Math.round(Date.now() - interaction.createdTimestamp) +
						"ms" +
						"```",
					inline: true,
				},
			])
			// .setFooter({
			// 	text: `${interaction.guild.name}'s Shard: #${interaction.guild.shardId}`,
			// });

		await interaction.reply({
			embeds: [Embed],
		});
	},
};
