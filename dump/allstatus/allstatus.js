setInterval(function () {
	try {
		ssh
			.connect({
				host: "dev.codesj.kr",
				username: "codesj",
				password: sshpw,
				readyTimeout: 30000,
			})
			.then(function () {
				ssh.execCommand(`ls`, {}).then(function (result) {
					ssh.execCommand(sshpw, {});
					resultfinal = result.stdout;
				});
			});
	} catch (err) {
		client.users.fetch("576631840484622336", false).then((user) => {
			user.send("서버 접속에 오류가 있습니다.");
		});
		client.channels.fetch("1074243798462365776", false).then((user) => {
			user.send("hello world");
		});
	}
}, 5000);
