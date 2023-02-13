const { sshpw } = require("../../../config.json");
module.exports = {
	id: "restartseaheaven",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
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
						`echo ${sshpw} | sudo -S systemctl restart seaheaven`,
						{}
					)
					.then(function (result) {
						ssh.execCommand(sshpw, {});
					});
			});

		await interaction.reply({
			content: "SeaheavenWiki 재시작 완료",
			ephemeral: true,
			components: [],
		});
		return;
	},
};
