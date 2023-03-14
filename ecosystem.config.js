module.exports = {
	apps: [
		{
			name: "nyter",
			script: "./bot.js",
			env_production: {
				NODE_ENV: "production",
			},
			env_development: {
				NODE_ENV: "development",
			},
			watch: true,
		},
	],
};
