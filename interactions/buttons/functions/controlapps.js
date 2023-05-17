const { sshpw } = require("../../../config.json");

const { EmbedBuilder } = require("discord.js");
module.exports = {
	id: "controlapps",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
		let funcname = "";
		let servname = interaction.customId.split("it").slice(1).join("it");
		let resultfinal;
		console.log(interaction.customId);
		const rtembed = new EmbedBuilder();

		if (interaction.customId.startsWith("status")) {
			funcname = `status`;
		} else if (interaction.customId.startsWith("restart")) {
			funcname = `restart`;
		} else if (interaction.customId.startsWith("stop")) {
			funcname = `stop`;
		}

		if (
			interaction.member.roles.cache.some(
				(r) => r.id == "1074241811314389022"
			) ||
			interaction.customId.startsWith("status")
		) {
			ssh
				.connect({
					host: "dev.codesj.kr",
					username: "codesj",
					password: sshpw,
					readyTimeout: 30000,
				})
				.then(function () {
					ssh
						.execCommand(
							`echo ${sshpw} | sudo -S systemctl ${funcname} ${servname}`,
							{}
						)
						.then(function (result) {
							ssh.execCommand(sshpw, {});
							resultfinal = result.stdout;
						})
						.then(function () {
							if (funcname == "restart" || funcname == "stop") {
								interaction.reply({
									content: `${servname} ${funcname} 완료`,
									components: [],
								});
							} else if (funcname == "status") {
								if (resultfinal.startsWith("●")) {
									console.log(`CodeSJ BOT >>> ${servname} Status Online ●`);
									rtembed
										.setTitle("서비스 작동 현황 - 온라인")
										.setDescription(resultfinal)
										.setColor(0x00ff00);
									interaction.reply({
										embeds: [rtembed],
									});
								} else if (resultfinal.startsWith("○")) {
									console.log(`CodeSJ BOT >>> ${servname} Status Offline ○`);
									rtembed
										.setTitle("서비스 작동 현황 - 오프라인")
										.setDescription(resultfinal)
										.setColor(0xff0000);
									interaction.reply({
										embeds: [rtembed],
									});
								}
							}
						});
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
