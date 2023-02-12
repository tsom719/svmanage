/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
 */
module.exports = {
	id: "restartapache2",

	async execute(interaction) {
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
		ssh
			.connect({
				host: "dev.codesj.kr",
				username: "codesj",
				password: "a071907a",
				readyTimeout: 30000,
			})
			.then(function () {
				ssh
					.execCommand("echo a071907a | sudo -S systemctl restart apache2", {})
					.then(function (result) {
						ssh.execCommand("a071907a", {});
					});
			});

		await interaction.reply({
			content: "Apache2 재시작 완료",
			components: [],
		});
		return;
	},
};
