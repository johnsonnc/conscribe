module.exports = function console() {
	process.stdout.write("Conscribe Version 0.0.1\n".green);
	var currentChannel;
	var failList = [];
	var publicInt = {

		init: function () {
			process.stdout.write("Conscribe Version 0.0.1\n".green);

		},
		newChannel: function (args) {
			currentChannel = args;
			process.stdout.write("\n" + args.cyan.bold + " : ");
		},
		success: function (args) {
			process.stdout.write(" [" + args.green + "] ");
		},
		ignore: function (args) {
			process.stdout.write(" [" + args.yellow + ": ignored ] ");
		},
		fail: function (args) {
			// regeratate later.
			failList.push = {
				channel: currentChannel,
				item: args
			};

			process.stdout.write(" [" + args.red + "] ");
		},
		newProcess: function (args) {
			process.stdout.write("\n\n" + args.blue.underline + "\n");
		},
		message: function (args) {
			process.stdout.write(args);
		},
		finish: function () {
			var message;
			if (failList.length > 0) {
				message = "\nThere were failures: \n";
				for (var i = 0; i < failList.length; i++) {
					message += failList[i].channelName + " : [" + failList[i].items.red + "]\n";
				}
			} else {
				message = "\nSuccess\n\n".green;
			}
			process.stdout.write(message);
		}

	};

	return publicInt;


}();