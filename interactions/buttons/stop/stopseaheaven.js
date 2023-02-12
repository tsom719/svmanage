const { sshpw } = require("../../../config.json");
module.exports = {
	id: "stopseaheaven",

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
					.execCommand(`echo ${sshpw} | sudo -S systemctl stop seaheaven`, {})
					.then(function (result) {
						ssh.execCommand(sshpw, {});
					});
			});

		await interaction.reply({
			content: "SeaheavenWiki 중지 완료",
			components: [],
		});
		return;
	},
};
