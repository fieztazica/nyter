const { default: axios } = require("axios");

/**
 * @type {import("../../../typings").AutocompleteInteraction}
 */
module.exports = {
	name: "joke",

	async execute(interaction) {
		// Preparation for the autocomplete request.

		const focusedValue = interaction.options.getFocused();

		// Extract choices automatically from your choice array (can be dynamic too)!

		const choices = await axios
			.get(
				`https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json`
			)
			.then((res) => [...new Set([...res.data].map((j) => j.type))]);

		// Filter choices according to user input.

		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);

		// Respond the request here.
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);

		return;
	},
};
