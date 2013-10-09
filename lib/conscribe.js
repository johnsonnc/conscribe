/**
 * Conscribe.js
 * Used to merge JSON Schema(ish) files with MD
 */



var fs = require("fs");
var markdown = require("markdown").markdown;

var conscript = {};

/**
 * Here is our operation order...
 *
 * 1. read in files.
 * 2. generate MD file.
 * 3. generate JSON (tv4) Schema
 * 4. output HTML
 * 5. output fixture
 * 6. output JAMINE tests ?
 *
 */

conscript.data = {};
conscript.data.input = {};
conscript.reader = function(args) {

	var schema;
	// read in json file...
	var schema_file = __dirname + '/test/schema.json';
	var examples;
	var data = fs.readFileSync(schema_file, 'utf8');
	schema = JSON.parse(data);



	var examples_files = __dirname + '/test/examples.md';
	examples = fs.readFileSync(examples_files, 'utf8');



	conscript.data.input.schemaChannels = schema.channels;
	conscript.data.input.examples = examples;
};

conscript.markdown = function(args) {

	var examples = conscript.data.input.examples,
		channels = conscript.data.input.schemaChannels;

	var pDCount = 0;
	var output,required;
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
				r += "{\n";
				r += propertiesRecursive(args[i].properties, head + "." + i);
				r += tab + "\n},";
			}
		}
		pDCount = pDCount - 1;
		return r;
	}

	for (var i in channels) {

		var composedString = "";
		var tempString = "";
		composedString += "## " + i + "\n\n";
		composedString += "**Purpose** : " + channels[i].purpose + "\n\n";
		composedString += "**Response Channel** : " + channels[i].resultChannel + "\n\n";
		composedString += "**Payload** : \n\n";
		composedString += "\t {\n";
		for (var x in channels[i].payload) {
			composedString += "\t\t" + x + " : ";
			if (channels[i].payload[x].properties !== undefined && channels[i].payload[x].properties !== null) {
				composedString += "{\n";
				composedString += propertiesRecursive(channels[i].payload[x].properties, x);
				composedString += "\t\t} ";
			}

			if (channels[i].payload[x].required === true) {
				required = "required";
			} else {
				required = "optional";
			}
			composedString += required + ", " + channels[i].payload[x].type + "\n";


			tempString += "**" + x + "** : " + "*(" + required + ", " + channels[i].payload[x].type + ")* " + channels[i].payload[x].description + "\n\n";
			if (channels[i].payload[x].properties !== undefined && channels[i].payload[x].properties !== null) {
				tempString += propertiesDescptRecursive(channels[i].payload[x].properties, x);
			}
		}
		composedString += "\t }\n\n";
		composedString += tempString;
		var searchString = "<" + i + ">";
	
		output = examples.replace(searchString, composedString);
	}
	fs.writeFileSync("output.md", output);
};

conscript.html = function() {
	var mdFile = __dirname  + "output.md";
	var md = fs.readFileSync(mdFile,'utf_8');
	fs.writeFileSync("output.html", markdown.toHMTL(md));

};

conscript.JSONSchema = function(args) {
	var channels = conscript.data.input.schemaChannels;
	var output;
	
	for(var i in channels){
		var channel = channels[i];
		output[i] = i;
		output[i] = 
	}
};

conscript.fixture = function(args) {};


conscript.helpers = {};


//console.dir(output);
