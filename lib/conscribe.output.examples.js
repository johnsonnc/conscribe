var fs = require("node-fs");

module.exports = function examples(conscribe) {

	var conscribe = conscribe;


	var publicInt = {

		generateExamples: function (mode, channel, channelName) {

			// need baseline, combines, extension...
			var c = JSON.parse(JSON.stringify(channel)); // I am not proud of this...
			var payload;
			var baseDirectory = conscribe.config.baseDir +
				conscribe.config.examplesDir[mode];

			// var channelLen = Object.keys(channels).length;
			fs.mkdirSync(baseDirectory, 0777, true);
			process.stdout.write("[" + ("example").red.bold + "]");


			if (mode === "combined" || mode === "baseline") {
				var data = "### Example 1 \n\n";

				if (c !== undefined && c !== null) {
					for (var x in c.payload) {
						payload = c.payload;
						// why not just replace the object... 
						if (payload[x] !== undefined && payload[x] !== null) {
							payload[x] = this.randomGen(payload[x]);
						}
					}

					//now our payload should be filled in... 
					data += "\t";
					data += JSON.stringify(payload, null, "\t\t");
					data = data.replace("\n}", "\n\t}");

					fs.writeFileSync(baseDirectory + "/" + channelName + ".md", data, "utf8");
				}
			}
		},
		generateExamplesExtensions: function (extensions) {
			var baseDir = conscribe.config.baseDir + conscribe.config.examplesDir["extensions"];
			for (var i in extensions) {
				var extDir = baseDir + "/" + i + "/";

				fs.mkdirSync(extDir, 0777, true);
				process.stdout.write("[" + (i).cyan + "]\n");

				for (var e in extensions[i]) {

					var c = JSON.parse(JSON.stringify(extensions[i][e]));

					var data = "### Example 1 \n\n";

					if (c !== undefined && c !== null) {
						var payload;
						for (var x in c.payload) {
							payload = c.payload;
							// why not just replace the object... 
							if (payload[x] !== undefined && payload[x] !== null) {
								payload[x] = this.randomGen(payload[x]);
							}
						}

						//now our payload should be filled in... 
						data += "\t";
						data += JSON.stringify(payload, null, "\t\t");
						data = data.replace("\n}", "\n\t}");

						fs.writeFileSync(extDir + e + ".md", data, "utf8");
					}
				}
			}
		},

		randomGen: function (args) {
			var r;

			switch (args.type) {
			case "string":
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for (var y = 0; y < 5; y++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				r = text;
				break;
			case "number":
				r = Math.floor(Math.random() * 2);
				break;
			case "boolean":
				r = (Math.random() < 0.5);
				break;
			case "object":
				if (args.properties !== undefined && args.properties !== null) {
					r = {};
					for (var x in args.properties) {
						r[x] = this.randomGen(args.properties[x]);
					}
				} else {
					r = {};
				}
				break;
			default:
				break;
			}
			return r;
		},

		getExample: function (mode, channelName) {
			var baseDirectory = conscribe.config.baseDir +
				conscribe.config.examplesDir[mode];
			var r = fs.readFileSync(baseDirectory + "/" + channelName + ".md", "utf8");
			return r;
		}
	};

	return publicInt;
};