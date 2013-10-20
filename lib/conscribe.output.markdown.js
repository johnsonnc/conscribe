var fs = require("node-fs"); // this will probably break.
var markdown = require("markdown").markdown;

module.exports = function markdown(conscribe) {
	var conscribe = conscribe;
	var publicInt = {
		go: function (args, channelName, type) {
			var data = args;
			// Does recursive descriptions...

			function propertiesDescptRecursive(args, head) {

				var r = "";
				var required;
				for (var i in args) {
					if (args[i].required === true) {
						required = "required";
					} else {
						required = "optional";
					}

					r += "**" + head + "." + i + "** : *(" + required + ", " + args[i].type + ")* " + args[i].desc + "\n\n";
					if (args[i].properties !== undefined && args[i].properties !== null) {
						r += propertiesDescptRecursive(args[i].properties, head + "." + i);
					}
				}
				return r;
			}

			// does recursive payload code thingy.

			function propertiesRecursive(args, head) {
				var pDCount = pDCount + 1;
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
			var outputPayload = "**Payload** : \n\n";
			outputPayload += "\t {\n";

			var loopString = "";
			var loopTempString = "";
			for (var x in data.payload) {

				var required;


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

			outputPayload += loopString;
			outputPayload += "\t }\n\n";
			var outputProperties = "**Payload Description** \n" + loopTempString;

			var output = outputHeader + outputPurpose + outputResponseChannel + outputPayload + outputPayload + outputProperties;
			fs.mkdirSync(conscribe.config.baseDir + conscribe.config.output[type] + "/md/", 0777, true);
			var path = conscribe.config.baseDir + conscribe.config.output[type] + "/md/" + channelName + ".md";
			try {
				fs.writeFileSync(path, output, "utf8");
				return true;
			} catch (err) {
				throw new Error(err);

			}

		},
		extensionsCat: {},
		goExtensions: function (args, channelName, type, extensionName) {
			var data = args;
			// Does recursive descriptions...

			function propertiesDescptRecursive(args, head) {

				var r = "";
				var required;
				for (var i in args) {
					if (args[i].required === true) {
						required = "required";
					} else {
						required = "optional";
					}

					r += "**" + head + "." + i + "** : *(" + required + ", " + args[i].type + ")* " + args[i].desc + "\n\n";
					if (args[i].properties !== undefined && args[i].properties !== null) {
						r += propertiesDescptRecursive(args[i].properties, head + "." + i);
					}
				}
				return r;
			}

			// does recursive payload code thingy.

			function propertiesRecursive(args, head) {
				var pDCount = pDCount + 1;
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
			var outputPayload = "**Payload** : \n\n";
			outputPayload += "\t {\n";

			var loopString = "";
			var loopTempString = "";
			for (var x in data.payload) {

				var required;

				if( Object.keys(data.payload[x]).length !==0){
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
		}
	};
	return publicInt;
};