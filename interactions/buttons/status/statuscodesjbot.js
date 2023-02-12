/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
 *
 */
const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Events,
	EmbedBuilder,
	SlashCommandBuilder,
} = require("discord.js");
module.exports = {
	id: "statuscodesjbot",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();

		const rtembed = new EmbedBuilder().setColor("Random");
		//service = service.toLowerCase();

		ssh
			.connect({
				host: "dev.codesj.kr",
				username: "codesj",
				password: "a071907a",
				readyTimeout: 30000,
			})
			.then(function () {
				ssh
					.execCommand("echo a071907a | sudo -S systemctl status codesjbot", {})
					.then(function (result) {
						ssh.execCommand("a071907a", {});
						resultfinal = result.stdout;
					})
					.then(function () {
						if (resultfinal.startsWith("●")) {
							console.log(`CodeSJ BOT >>> codesjbot Status Online ●`);
							rtembed
								.setTitle("서비스 작동 현황 - 온라인")
								.setDescription(resultfinal)
								.setColor(0x00ff00);
							interaction.reply({
								embeds: [rtembed],
							});
						} else if (resultfinal.startsWith("○")) {
							console.log(`CodeSJ BOT >>> codesjbot Status Offline ○`);
							rtembed
								.setTitle("서비스 작동 현황 - 오프라인")
								.setDescription(resultfinal)
								.setColor(0xff0000);
							interaction.reply({
								embeds: [rtembed],
							});
						}
					});
			});

		return;
	},
};
