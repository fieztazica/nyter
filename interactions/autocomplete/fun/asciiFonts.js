const { default: axios } = require("axios");
const { fontsSync } = require("figlet");

/**
 * @type {import("../../../typings").AutocompleteInteraction}
 */
module.exports = {
	name: "ascii",

	async execute(interaction) {
		// Preparation for the autocomplete request.

		const focusedValue = interaction.options.getFocused();

		// Extract choices automatically from your choice array (can be dynamic too)!

		const choices = await fontsSync();

		if (!focusedValue) {
			await interaction.respond(
				choices
					.slice(0, 24)
					.map((choice) => ({ name: choice, value: choice }))
			);
			return;
		}

		// Filter choices according to user input.

		const filtered = choices
			.filter((choice) =>
				choice.toLowerCase().startsWith(focusedValue.toLowerCase())
			)
			.slice(0, 24);

		// Respond the request here.
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);

		return;
	},
};
