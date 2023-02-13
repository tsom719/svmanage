const { sshpw } = require("../../../config.json");
module.exports = {
	id: "restartcodesjbot",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
		if (
			interaction.member.roles.cache.some((r) => r.id == "1074241811314389022")
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
							`echo ${sshpw} | sudo -S systemctl restart codesjbot`,
							{}
						)
						.then(function (result) {
							ssh.execCommand(sshpw, {});
						});
				});

			await interaction.reply({
				content: "codesjbot 재시작 완료",
				components: [],
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
