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
	id: "statusentry",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("statusseaheaven")
					.setLabel("seaheaven")
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("statusapache2")
					.setLabel("apache2")
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("statusmtbot")
					.setLabel("mtbot")
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("statuscodesjbot")
					.setLabel("codesjbot")
					.setStyle(ButtonStyle.Primary)
			);

		if (
			interaction.member.roles.cache.some((r) => r.id == "1074241811314389022")
		) {
			await interaction.reply({
				content: "Codesj 서버 상태 확인",
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
