const { sshpw } = require("../../../config.json");
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
	id: "statusseaheaven",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();

		const rtembed = new EmbedBuilder().setColor("Random");
		//service = service.toLowerCase();

		ssh
			.connect({
				host: "dev.codesj.kr",
				username: "codesj",
				password: sshpw,
				readyTimeout: 30000,
			})
			.then(function () {
				ssh
					.execCommand(`echo ${sshpw} | sudo -S systemctl status seaheaven`, {})
					.then(function (result) {
						ssh.execCommand(sshpw, {});
						resultfinal = result.stdout;
					})
					.then(function () {
						if (resultfinal.startsWith("●")) {
							console.log(`CodeSJ BOT >>> seaheaven Status Online ●`);
							rtembed
								.setTitle("서비스 작동 현황 - 온라인")
								.setDescription(resultfinal)
								.setColor(0x00ff00);
							interaction.reply({
								embeds: [rtembed],
							});
						} else if (resultfinal.startsWith("○")) {
							console.log(`CodeSJ BOT >>> seaheaven Status Offline ○`);
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
