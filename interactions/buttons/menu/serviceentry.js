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
const functoko = {
	restart: "재시작",
	status: "정보 보기",
	stop: "중지",
};
const functoit = {
	restartentry: "restart",
	statusentry: "status",
	stopentry: "stop",
};
module.exports = {
	id: "serviceentry",

	async execute(interaction) {
		let funcit = functoit[interaction.customId];

		if (
			interaction.member.roles.cache.some(
				(r) => r.id == "1074241811314389022"
			) ||
			funcit == "status"
		) {
			const { NodeSSH } = require("node-ssh");
			const ssh = new NodeSSH();
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}itseaheaven`)
						.setLabel("seaheaven")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}itapache2`)
						.setLabel("apache2")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}itmtbot`)
						.setLabel("mtbot")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}itcodesjbot`)
						.setLabel("codesjbot")
						.setStyle(ButtonStyle.Primary)
				)	
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}itshmc`)
						.setLabel("shmc")
						.setStyle(ButtonStyle.Primary)
				);

			await interaction.reply({
				content: `Codesj 서비스 ${functoko[funcit]}`,
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
