/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

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

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("service")
		.setDescription("서비스 컨트롤 목록."),

	async execute(interaction) {
		//console.log(interaction);
		console.log();

		if (
			interaction.member.roles.cache.some((r) => r.id == "1074241811314389022")
		) {
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId("statusentry")
						.setLabel("서비스 상태 확인")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId("restartentry")
						.setLabel("서비스 재시작")
						.setStyle(ButtonStyle.Danger)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId("stopentry")
						.setLabel("서비스 중지")
						.setStyle(ButtonStyle.Danger)
				);
			await interaction.reply({
				content: "Menu를 선택하세요.",
				ephemeral: true,
				components: [row],
			});
		} else {
			await interaction.reply({
				content: "권한이 없습니다. 관리자에게 문의하세요",
			});
		}
	},
};
