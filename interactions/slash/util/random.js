// Deconstructed the constants we need in this file.
const Discord = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder, time } = require("@discordjs/builders");
const { default: axios } = require("axios");
const { getName } = require("country-list");
const {
	default: countryCodeToFlagEmoji,
} = require("country-code-to-flag-emoji");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("random")
		.setDescription("Random things")
		.addSubcommand((sub) =>
			sub
				.setName("number")
				.setDescription("Generate random number. Default is 1 to 100")
				.addIntegerOption((option) =>
					option
						.setName("min")
						.setDescription("Minimum integer number")
						.setMinValue(0)
				)
				.addIntegerOption((option) =>
					option
						.setName("max")
						.setDescription("Maximum integer number")
						.setMinValue(0)
				)
		)
		.addSubcommand((sub) =>
			sub.setName("user").setDescription("Generate a fake user")
		),
	category: "utility",
	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand) {
			case "number":
				randomNumber();
				break;

			case "user":
				randomUser();
				break;

			default:
				randomNumber();
				break;
		}

		async function randomUser() {
			const endpoint = `https://randomuser.me/api`;

			let user = await axios
				.get(endpoint)
				.then((res) => [...res.data.results].shift());

			let nat = countryCodeToFlagEmoji(user.nat);
			let name = Object.values(user.name);
			let title = name.shift();
			let fullName = name.join(" ");
			let street = Object.values(user.location.street).join(" ");
			let timezoneProp = Object.values(user.location.timezone).join(" ");

			let address =
				`**Address**: ${street}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}` ||
				"unknown";
			let phoneNumber = `**Phone**: ${user.phone}` || "unknown";
			let cellphone = `**Cellphone**: ${user.cell}` || "unknown";
			let email = `**Email**: ${user.email}` || "unknown";
			let gender = `**Gender**: ${user.gender}` || "unknown";
			let age = `**Age**: ${user.dob.age}` || "unknown";
			let dateOfBirth =
				`**Date of birth**: ${time(new Date(user.dob.date))}` || "unknown";
			let timezone = `**Timezone**: ${timezoneProp}` || "unknown";
			let idRegisteredDate =
				`**ID Registered**: ${time(new Date(user.registered.date))}` ||
				"unknown";
			let id = `**ID** (${user.id.name}): ${user.id.value}` || "unknown";
			let nation = `**Nation**: ${getName(user.nat)}`;
			let loginCredential = Object.keys(user.login)
				.map((key) => `**${key}**: \`${user.login[key]}\``)
				.join("\n");

			const embed = new Discord.EmbedBuilder()
				.setColor("Random")
				.setTitle(`${nat} ${title}. ${fullName}`)
				.setThumbnail(`${user.picture.large}`)
				.addFields(
					{
						name: "Details",
						value: `${id}\n${nation}\n${gender}\n${age}\n${dateOfBirth}\n${idRegisteredDate}\n${timezone}`,
						inline: true,
					},
					{
						name: "Contacts",
						value: `${address}\n${phoneNumber}\n${cellphone}\n${email}`,
						inline: true,
					},
					{
						name: "Login Credential",
						value: `${loginCredential}`,
					}
				);

			await interaction.reply({
				embeds: [embed],
			});
		}

		async function randomNumber() {
			const minInt = interaction.options.getInteger("min");
			const maxInt = interaction.options.getInteger("max");

			const minNumber = minInt === 0 ? 0 : minInt || 1;
			const maxNumber = maxInt === 0 ? 0 : maxInt || 100;

			const randomNumber = Math.floor(
				Math.random() * (maxNumber - minNumber) + minNumber
			);

			await interaction.reply({
				content: `Your random number from \`${minNumber}\` to \`${maxNumber}\` is: \`${randomNumber}\``,
			});
		}
	},
};
