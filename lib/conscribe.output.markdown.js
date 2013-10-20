var fs = require("node-fs"); // this will probably break.
var markdown = require("markdown").markdown;

module.exports = function markdown(conscribe) {
	var conscribe = conscribe;
	var publicInt = {
		go: function (args, channelName, type) {
			var data = args;
			// Does recursive descriptions...

			var pDCount;

			function propertiesDescptRecursive(args, head) {

				var r = "";
				var required;
				for (var i in args) {
					if (args[i].required === true) {
						required = "required";
					} else {
						required = "optional";
					}

					r += "**" + head + "." + i + "** : *(" + required + ", " + args[i].type + ")* ";
					r += args[i].description + "\n\n";
					if (args[i].properties !== undefined && args[i].properties !== null) {
						r += propertiesDescptRecursive(args[i].properties, head + "." + i);
					}
				}
				return r;
			}

			// does recursive payload code thingy.

			function propertiesRecursive(args, head) {
				pDCount = pDCount + 1;
				var count = pDCount;
				var r = "";
				var tab = "\t\t";
				while (count > 0) {

					tab += "\t";
					count = count - 1;
				}

				var required;
				for (var i in args) {
					if (args[i].required === true) {
						required = "required";
					} else {
						required = "optional";
					}
					r += tab + i + " : " + required + ", " + args[i].type + ", " + "\n";
					if (args[i].properties !== undefined && args[i].properties !== null) {
						r += tab + "{\n";
						r += propertiesRecursive(args[i].properties, head + "." + i);
						r += tab + "},\n";
					}
				}
				pDCount = pDCount - 1;
				return r;
			}



			//Header
			var outputHeader = "## " + channelName + "\n\n";

			//Purpose
			var outputPurpose = "**Purpose** : " + data.purpose + "\n\n";

			//Response Channel
			var outputResponseChannel = "**Response Channel** : " + data.resultChannel + "\n\n";
			var outputPayload = "### Payload  \n\n";
			outputPayload += "\t {\n";

			var loopString = "";
			var loopTempString = "";
			for (var x in data.payload) {

				var required;

				if (Object.keys(data.payload[x]).length !== 0) {
					loopString += "\t\t" + x + " : ";
					if (data.payload[x].properties !== undefined && data.payload[x].properties !== null) {
						loopString += "{\n";
						loopString += propertiesRecursive(data.payload[x].properties, x);
						loopString += "\t\t} ";
					}

					if (data.payload[x].required === true) {
						required = "required";
					} else {
						required = "optional";
					}
					loopString += required + ", " + data.payload[x].type + "\n";


					loopTempString += "**" + x + "** : " + "*(" + required + ", " + data.payload[x].type + ")* " + data.payload[x].description + "\n\n";
					if (data.payload[x].properties !== undefined && data.payload[x].properties !== null) {
						loopTempString += propertiesDescptRecursive(data.payload[x].properties, x);
					}
				}

			}

			outputPayload += loopString;
			outputPayload += "\t }\n\n";
			var outputProperties = "**Payload Description** \n" + loopTempString;

			var output = outputHeader + outputPurpose + outputResponseChannel + outputPayload + outputProperties;

			output += "\n" + conscribe.output.examples.getExample(type, channelName);

			fs.mkdirSync(conscribe.config.baseDir + conscribe.config.output[type] + "/md/", 0777, true);

			var path = conscribe.config.baseDir + conscribe.config.output[type] + "/md/" + channelName + ".md";

			try {
				fs.writeFileSync(path, output, "utf8");
				return true;
			} catch (err) {
				throw new Error(err);

			}

		},
		goConsolidate: function (type) {

			var baseDir = conscribe.config.baseDir + conscribe.config.output[type] + "/md/";
			var fileList = fs.readdirSync(baseDir);
			var output = "";
			for (var i = 0; i < fileList.length; i++) {
				if (fileList[i].indexOf(".md") !== -1) {
					output += fs.readFileSync(baseDir + fileList[i]) + "\n\n";
				}

			}
			output = conscribe.template.header.getHeader(type) + "\n\n" + output;
			fs.writeFileSync(conscribe.config.baseDir + conscribe.config.output[type] + "/CMWA-Channel-Spec.md", output, "utf8");
		},

		// now we have one large md file.
		//var mdOutput = markdown.toHTML(md);

		extensionsCat: {},
		goExtensions: function (args, channelName, type, extensionName) {
			var data = args;
			// Does recursive descriptions...
			var pDCount = 0;

			function propertiesDescptRecursive(args, head) {

				var r = "";
				var required;
				for (var i in args) {
					if (Object.keys(args[i]).length !== 0) {
						if (args[i].required === true) {
							required = "required";
						} else {
							required = "optional";
						}

						r += "**" + head + "." + i + "** : *(" + required + ", " + args[i].type + ")* " + args[i].description + "\n\n";
						if (args[i].properties !== undefined && args[i].properties !== null) {
							r += propertiesDescptRecursive(args[i].properties, head + "." + i);
						}
					}
				}
				return r;
			}

			// does recursive payload code thingy.

			function propertiesRecursive(args, head) {
				pDCount = pDCount + 1;
				var count = pDCount;
				var r = "";
				var tab = "\t\t";

				while (count > 0) {

					tab += "\t";
					count = count - 1;
				}

				var required;
				for (var i in args) {
					if (Object.keys(args[i]).length !== 0) {
						if (args[i].required === true) {
							required = "required";
						} else {
							required = "optional";
						}
						r += tab + i + " : " + required + ", " + args[i].type + ", " + "\n";
						if (args[i].properties !== undefined && args[i].properties !== null) {
							r += tab + "{\n";
							r += propertiesRecursive(args[i].properties, head + "." + i);
							r += tab + "},\n";
						}
					}
				}
				pDCount = pDCount - 1;
				return r;
			}



			//Header
			var outputHeader = "## " + channelName + "\n\n";

			//Purpose
			var outputPurpose = "**Purpose** : " + data.purpose + "\n\n";

			//Response Channel
			var outputResponseChannel = "**Response Channel** : " + data.resultChannel + "\n\n";
			var outputPayload = "**Payload** : \n\n";
			outputPayload += "\t {\n";

			var loopString = "";
			var loopTempString = "";
			for (var x in data.payload) {

				var required;

				if (Object.keys(data.payload[x]).length !== 0) {
					loopString += "\t\t" + x + " : ";
					if (data.payload[x].properties !== undefined && data.payload[x].properties !== null) {
						loopString += "{\n";
						loopString += propertiesRecursive(data.payload[x].properties, x);
						loopString += "\t\t} ";
					}

					if (data.payload[x].required === true) {
						required = "required";
					} else {
						required = "optional";
					}
					loopString += required + ", " + data.payload[x].type + "\n";


					loopTempString += "**" + x + "** : " + "*(" + required + ", " + data.payload[x].type + ")* " + data.payload[x].description + "\n\n";
					if (data.payload[x].properties !== undefined && data.payload[x].properties !== null) {
						loopTempString += propertiesDescptRecursive(data.payload[x].properties, x);
					}
				}

			}

			outputPayload += loopString;
			outputPayload += "\t }\n\n";
			var outputProperties = "**Payload Description** \n" + loopTempString;

			var output = outputHeader + outputPurpose + outputResponseChannel + outputPayload + outputProperties;

			var fileName;
			if (data.isNew) {
				fileName = channelName + ".new";
			}
			if (data.isExisting) {
				fileName = channelName + ".existing";
			}

			fs.mkdirSync(conscribe.config.baseDir + conscribe.config.output[type] + "/" + extensionName + "/" + "md/", 0777, true); // use strict might break this.

			var path = conscribe.config.baseDir + conscribe.config.output[type] + "/" + extensionName + "/" + "md/" + fileName + ".md";
			try {
				fs.writeFileSync(path, output, "utf8");
				return true;
			} catch (err) {
				throw new Error(err);

			}
		},
		goConsolidateExtensions: function (extension) {
			var md = "";
			var newChannelsHeader = "# New Channels\n\n";
			var newChannels = "";
			var existingChannelsHeader = "# Existing Channels\n\n";
			var existingChannels = "";
			var type = "extensions";

			var basePathMd = conscribe.config.baseDir + conscribe.config.output[type] + "/" + extension + "/" + "md/";

			var fileList = fs.readdirSync(basePathMd);

			for (var i = 0; i < fileList.length; i++) {
				if (fileList[i].indexOf(".md") !== -1) {
					var fileSplit = fileList[i].split(".");

					for (var e = 0; e < fileSplit.length; e++) {
						// is new or existing...
						if (e === (fileSplit.length - 2)) {
							if (fileSplit[e] === "new") {

								newChannels += fs.readFileSync(basePathMd + fileList[i], "utf8") + "\n\n";
							} else if (fileSplit[e] === "existing") {
								existingChannels += fs.readFileSync(basePathMd + fileList[i], "utf8") + "\n\n";
							}
						}
					}
				}

			}
			var gHeader = conscribe.template.header.getHeader("extensions", extension);

			if (newChannels !== "") {
				fs.writeFileSync(basePathMd + extension + "-newChannels.md", gHeader + newChannelsHeader + newChannels, "utf8");
			}
			if (existingChannels !== "") {
				fs.writeFileSync(basePathMd + extension + "-existingChannels.md", gHeader + existingChannelsHeader + existingChannels, "utf8");
			}
		}
	};
	return publicInt;
};