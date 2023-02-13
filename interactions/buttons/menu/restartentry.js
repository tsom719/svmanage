/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
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
	id: "restartentry",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("restartseaheaven")
					.setLabel("seaheaven")
					.setStyle(ButtonStyle.Danger)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("restartapache2")
					.setLabel("apache2")
					.setStyle(ButtonStyle.Danger)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("restartmtbot")
					.setLabel("mtbot")
					.setStyle(ButtonStyle.Danger)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("restartcodesjbot")
					.setLabel("codesjbot")
					.setStyle(ButtonStyle.Danger)
			);
		if (
			interaction.member.roles.cache.some((r) => r.id == "1074241811314389022")
		) {
			await interaction.reply({
				content: "Codesj 재시작",
				ephemeral: true,
				components: [row],
			});
		} else {
			await interaction.reply({
				content: "권한이 없습니다. 관리자에게 요청하세요",
				ephemeral: true,
			});
		}

		return;
	},
};
