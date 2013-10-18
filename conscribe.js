/**
 * Conscribe.js
 * Used to merge JSON Schema(ish) files with MD
 */



var fs = require("fs");
var markdown = require("markdown").markdown;
var argv = require("optimist").usage("Usage: $0 -c [config file]")
	.demand(["c"])
	.argv;
var colors = require("colors");
var conscript = {};

conscript.config = JSON.parse(fs.readFileSync(argv.c, "utf8"));

//console.dir(conscript.config);


/**
 * Just kidding!
 *
 * PHASE 1 (init):
 *  get all of our files, assign and read in.
 *
 * PASS 1 (combined):
 * initialize each channel.
 *
 * generate channel examples
 * generate channel payloads
 * generate property descriptions
 * generate channel headers
 *
 * mix and serve.
 *
 * PASS 2 (extensions):
 *
 * check each channel
 *
 * generate channel examples
 * generate channel payloads
 * generate property descriptions
 * generate channel headers
 *
 * repeat with per extension.
 *
 * PASS 3 (baseline):
 *
 * check each channel
 *
 * generate channel examples
 * generate channel payloads
 * generate property descriptions
 * generate channel headers
 *
 * PASS 4 (validator/fixture):
 *
 * yep.
 *
 * PASS 5 Cleanup.
 */

conscript.data = {};
conscript.data.input = {};

var schema_file = conscript.config.baseDirectory + conscript.config.schema;
var data = fs.readFileSync(schema_file, "utf8");

conscript.data.input.schema = JSON.parse(data);

conscript.phaseOne = function () {
	/**
	 *  PASS 1 (combined):
	 * initialize each channel.
	 *
	 * generate channel examples
	 * generate channel payloads
	 * generate property descriptions
	 * generate channel headers
	 *
	 * mix and serve.
	 */
	var data = conscript.data.input.schema;
	conscript.exampleInit({
		mode: "combined",
		channels: data.channels
	});
};

conscript.phaseTwo = function () {
	var schema = fs.readFileSync(schema_file, "utf8");

	conscript.data.input.schema = JSON.parse(schema);

	var data = conscript.data.input.schema;

	for (var i in data.channels) {
		if (data.channels[i].extension === true) {
			delete data.channels[i];
		} else {
			for (var x in data.channels[i].payload) {

				if (data.channels[i].payload[x].extension === true) {
					delete data.channels[i].payload[x];
				} else if (data.channels[i].payload[x].type === "object") {
					if (data.channels[i].payload[x].properties !== undefined && data.channels[i].payload[x].properties !== null) {
						data.channels[i].payload[x].properties = conscript.recursiveFilter(data.channels[i].payload[x].properties);
					}
				}
			}
		}

	}

	conscript.exampleInit({
		mode: "baseline",
		channels: data.channels
	});
	for (var y in data.channels) {
		// generate payloads... 
	}
};


conscript.phaseThree = function () {
	var schema = fs.readFileSync(schema_file, "utf8");

	conscript.data.input.schema = JSON.parse(schema);

	var data = conscript.data.input.schema;


	for (var i in data.channels) {

	}

};

conscript.recursiveFilter = function (args) {

	for (var i in args) {
		if (args[i].extension === true) {
			delete args[i];
		} else if (args[i].type === "object") {
			if (args[i].properties !== undefined && args[i].properties !== null) {
				args[i].properties = conscript.recursiveFilter(args[i].properties);
			}
		}
	}
	return args;
};

conscript.exampleInit = function (args) {
	var mode = args.mode;
	var channels = args.channels;
	var payload;
	var baseDirectory = conscript.config.baseDirectory +
		conscript.config.docsDirectory +
		conscript.config.version + "/" +
		"examples/" + mode + "/";
	var channelLen = Object.keys(channels).length;
	process.stdout.write("Initalizing Examples for " + mode.red + " : 0/" + channelLen.green + "\r");
	var w = 0;
	for (var i in channels) {
		w++;
		process.stdout.write("Initalizing Examples for " + mode.red + " : " + w.toString().red + "/" + channelLen.toString().green + " : " + i + "\r");

		var channel = channels[i];
		var data = "## Example 1 \n\n";
		if (channel !== undefined && channel !== null) {
			for (var x in channel.payload) {
				payload = channel.payload;
				// why not just replace the object... 
				if (payload[x] !== undefined && payload[x] !== null) {
					payload[x] = conscript.randomGen(payload[x]);
				}
			}
			//now our payload should be filled in... 
			data += "\t";
			data += JSON.stringify(payload, null, "\t\t");
			data = data.replace("\n}", "\n\t}");
			fs.writeFileSync(baseDirectory + i + ".md", data, "utf8");
		}
	}
	process.stdout.write("\n");
};

conscript.randomGen = function (args) {
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
				r[x] = conscript.randomGen(args.properties[x]);
			}
		} else {
			r = {};
		}
		break;
	default:
		break;
	}
	return r;
};

conscript.init = (function (args) {

	conscript.phaseOne();
	conscript.phaseTwo();
})();

conscript.reader = function (args) {


	var examples;
	var schema;
	// read in json file...

	conscript.data.input.mustash = mustash;
	conscript.data.input.schema = schema;
	conscript.data.input.schemaChannels = schema.channels;
	conscript.data.input.examples = examples;
};

conscript.markdown = function (args) {

	var examples = conscript.data.input.examples,
		channels = conscript.data.input.schemaChannels;

	//this is obviously dead wrong
	var baseLineExamples = examples;
	var combinedExamples = examples;
	var baselineOutput, combinedOutput;


	var pDCount = 0;
	var output = examples,
		required;
	var doExtensions = args;
	var baseLine = "";
	var extendedBaseLine = "";

	var newChannelExtensions = {};
	var extendedChannelExtensions = {};

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



	for (var i in channels) {
		// If the channel is an extension and we aren't doing extensions... bail.
		if (doExtensions === false) {
			if (channels[i].extension) {
				continue;
			}
		}

		var composedString = "";
		var combined = "";
		var combinedTemp = "";
		var tempString = "";
		var baseString = "";
		var newChannel = "";
		var newChannelTemp = "";
		composedString += "## " + i + "\n\n";
		composedString += "**Purpose** : " + channels[i].purpose + "\n\n";
		composedString += "**Response Channel** : " + channels[i].resultChannel + "\n\n";
		composedString += "**Payload** : \n\n";
		composedString += "\t {\n";
		var extensionText;
		var extendedHeader = composedString;
		var newChannel = composedString;
		// are always seperate extensions... ??
		combined += composedString;
		var isExtended = channels[i].extension;
		if (channels[i].extension === true) {

			if (newChannelExtensions[channels[i].extensionName] !== undefined && newChannelExtensions[channels[i].extensionName] !== null) {
				newChannelExtensions[channels[i].extensionName][i] = {};
			} else {
				newChannelExtensions[channels[i].extensionName] = {};
			}

		}


		for (var x in channels[i].payload) {
			var loopString = "";
			var loopTempString = "";
			var prop = channels[i].payload[x];


			if (doExtensions === false) {
				if (prop.extension) {
					continue;
				}
			}

			loopString += "\t\t" + x + " : ";
			if (channels[i].payload[x].properties !== undefined && channels[i].payload[x].properties !== null) {
				loopString += "{\n";
				loopString += propertiesRecursive(channels[i].payload[x].properties, x);
				loopString += "\t\t} ";
			}

			if (channels[i].payload[x].required === true) {
				required = "required";
			} else {
				required = "optional";
			}
			loopString += required + ", " + channels[i].payload[x].type + "\n";


			loopTempString += "**" + x + "** : " + "*(" + required + ", " + channels[i].payload[x].type + ")* " + channels[i].payload[x].description + "\n\n";
			if (channels[i].payload[x].properties !== undefined && channels[i].payload[x].properties !== null) {
				loopTempString += propertiesDescptRecursive(channels[i].payload[x].properties, x);
			}

			if (prop.extension === true) {
				if (extendedChannelExtensions[prop.extensionName] !== undefined && extendedChannelExtensions[prop.extensionName] !== null) {
					if (extendedChannelExtensions[prop.extensionName][i] !== undefined && extendedChannelExtensions[prop.extensionName][i] !== null) {
						extendedChannelExtensions[prop.extensionName][i].header = extendedChannelExtensions[prop.extensionName][i].header + loopString;
						extendedChannelExtensions[prop.extensionName][i].desc = extendedChannelExtensions[prop.extensionName][i].desc + loopTempString;
					} else {
						extendedChannelExtensions[prop.extensionName][i] = {};
						extendedChannelExtensions[prop.extensionName][i].header = extendedHeader + loopString;
						extendedChannelExtensions[prop.extensionName][i].desc = loopTempString;
					}

				} else {
					extendedChannelExtensions[prop.extensionName] = {};
					extendedChannelExtensions[prop.extensionName][i] = {};
					extendedChannelExtensions[prop.extensionName][i].header = extendedHeader + loopString;
					extendedChannelExtensions[prop.extensionName][i].desc = loopTempString;
				}
			} else if (channels[i].extension !== true) {
				//base line... 


			} else {}


			// combined
			combined += loopString;
			combinedTemp += loopTempString;
		}
		baseString += composedString + loopString;
		baseString += "\t }\n\n";
		baseString += loopTempString;

		//base line... 

		combined += "\t }\n\n";
		combined += combinedTemp;
		if (channels[i].extension === true) {
			if (newChannelExtensions[channels[i].extensionName][i] !== undefined && newChannelExtensions[channels[i].extensionName][i] !== null) {

				newChannelExtensions[channels[i].extensionName][i] = combined;
			} else {
				newChannelExtensions[channels[i].extensionName][i] = {};
				newChannelExtensions[channels[i].extensionName][i] = combined;
			}

		}
		var searchString = "<" + i + ">";

		baseLineExamples = baseLineExamples.replace(searchString, baseString);
		combinedExamples = combinedExamples.replace(searchString, combined);

	}

	fs.writeFileSync("baseLine.md", baseLineExamples);
	fs.writeFileSync("combined.md", combinedExamples);

	baseLineExamples = markdown.toHTML(baseLineExamples);
	combinedExamples = markdown.toHTML(combinedExamples);
	baseLineExamples = conscript.data.input.mustash + baseLineExamples;
	combinedExamples = conscript.data.input.mustash + combinedExamples;
	fs.writeFileSync("baseLine.html", baseLineExamples);
	fs.writeFileSync("combined.html", combinedExamples);

	// the fun part... 
	for (var y in extendedChannelExtensions) {
		var extendedOutput = "";
		if (newChannelExtensions[y] !== undefined && newChannelExtensions[y] !== null) {
			extendedOutput = "# New Channels \n\n";
			for (var z in newChannelExtensions[y]) {
				extendedOutput += newChannelExtensions[y][z];
			}
			extendedOutput += "\n\n # Existing Channels \n\n";
			for (var z in extendedChannelExtensions[y]) {
				extendedOutput += extendedChannelExtensions[y][z].header;
				extendedOutput += "\t }\n\n";
				extendedOutput += extendedChannelExtensions[y][z].desc;
			}
			newChannelExtensions[y] = {};
		} else {
			extendedOutput += "# Existing Channels \n\n";
			for (var z in extendedChannelExtensions[y]) {

				extendedOutput += extendedChannelExtensions[y][z].header;
				extendedOutput += "\t } \n\n";
				extendedOutput += extendedChannelExtensions[y][z].desc;
			}


		}
		fs.writeFileSync(y + ".md", extendedOutput);
		extendedOutput = markdown.toHTML(extendedOutput);
		extendedOutput = conscript.data.input.mustash + extendedOutput;
		fs.writeFileSync(y + ".html", extendedOutput);
	}
};

conscript.html = function () {
	var mdFile = __dirname + "output.md";
	var md = fs.readFileSync(mdFile, 'utf_8');
	fs.writeFileSync("output.html", markdown.toHMTL(md));

};

conscript.JSONSchema = function (args) {
	var schema = fs.readFileSync(schema_file, "utf8");

	conscript.data.input.schema = JSON.parse(schema);
	var channels = conscript.data.input.schema.channels;
	var output = {};

	function recurseAssist(args) {
		var required = [];
		var returnVar = {};
		returnVar.properties = {};
		for (var x in args) {
			var item = {};

			if (args[x].required) {
				required.push(x);
				item.type = args[x].type;
			} else {
				if (!Array.isArray(args[x].type)) {
					item.type = [];
				}
				item.type.push(args[x].type);
				item.type.push("null");
			}

			if (args[x].enum !== undefined && args[x].enum !== null) {
				item.enum = args[x].enum;
			}

			if (args[x].maximum !== undefined && args[x].maximum !== null) {
				item.maximum = args[x].maximum;
			}
			if (args[x].minimum !== undefined && args[x].minimum !== null) {
				item.minimum = args[x].minimum;
			}

			if (args[x].properties !== undefined && args[x].properties !== null) {
				item.properties = recurseAssist(args[x].properties);
			}
			returnVar.properties[x] = item;
		}
		returnVar.required = required;
		return returnVar;
	}

	for (var i in channels) {
		var required = [];
		var channel = channels[i];
		output[i] = {};
		output[i].title = i;
		output[i].type = "object";
		output[i].properties = {};
		var item = {};
		for (var x in channels[i].payload) {

			item[x] = {};
			if (channel.payload[x].required) {
				required.push(x);
				item[x].type = channel.payload[x].type;
			} else {
				if (Array.isArray(channel.payload[x].type)) {
					item[x].type = channel.payload[x].type;
					item[x].type.push("null");
				} else {
					item[x].type = [];
					item[x].type.push(channel.payload[x].type);
					item[x].type.push("null");
				}

			}

			if (channel.payload[x].enum !== undefined && channel.payload[x].enum !== null) {
				item[x].enum = channel.payload[x].enum;
			}

			if (channel.payload[x].maximum !== undefined && channel.payload[x].maximum !== null) {
				item[x].maximum = channel.payload[x].maximum;
			}
			if (channel.payload[x].minimum !== undefined && channel.payload[x].minimum !== null) {
				item[x].minimum = channel.payload[x].minimum;
			}

			if (channel.payload[x].properties !== undefined && channel.payload[x].properties !== null) {
				var recurse = recurseAssist(channel.payload[x].properties);
				item[x].properties = recurse.properties;
				item[x].required = recurse.required;
			}

		}

		output[i].properties = item;
		output[i].required = required;
	}

	fs.writeFileSync("validation-schema.json", JSON.stringify(output, null, 4));

};

conscript.fixture = function (args) {
	var schema = fs.readFileSync(schema_file, "utf8");

	conscript.data.input.schema = JSON.parse(schema);


	schema = conscript.data.input.schema;
	var file = conscript.config.baseDirectory + conscript.config.generation.fixture.where + conscript.config.generation.fixture.file;
	var output = conscript.config.generation.fixture.header;
	output += JSON.stringify(schema, null, 4) + ";";
	fs.writeFileSync(file, output, "utf8");
	console.log("CMWA Fixture Successfully Written @" + file.green);
};


conscript.helpers = {};

/*conscript.reader();
conscript.markdown(true); */
conscript.JSONSchema();
conscript.fixture();

//console.dir(output);*/