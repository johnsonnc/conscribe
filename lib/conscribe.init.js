"use strict";

var fs = require("node-fs"); // this will probably break.
var markdown = require("markdown").markdown;
var argv = require("optimist").usage("Conscribe (c) 2013 \nNicholas Johnson \n\n Used to generate JSON Schema and MD/HTML/PDF from a single schema\n\nUsage: $0 -c [config file]")
	.demand(["c"])
	.argv;
var colors = require("colors");
var nodefs = require("node-fs");

var conscribe = {};


var channels = require("./conscribe.channels");
conscribe.console = require("./conscribe.console");
//conscribe.utilities = require("./conscribe.utilities").utilities();
var output = require("./conscribe.output");
var template = require("./conscribe.template");


conscribe.channels = new channels(conscribe);
conscribe.output = new output(conscribe);
conscribe.template = new template(conscribe);

conscribe.init = function () {

	//var currentDir = __dirname;


	function readSchema() {
		var baseDir,
			schemaFile,
			schema;

		baseDir = conscribe.config.baseDir || __dirname;


		schemaFile = baseDir + conscribe.config.schemaFile;
		try {
			schema = fs.readFileSync(schemaFile, "utf8");

		} catch (err) {
			throw new Error("Schema File could not be read check path in config file");
		}
		return schema;

	}

	function readConfig() {

		conscribe.config = JSON.parse(fs.readFileSync(argv.c, "utf8"));
		if (argv.e) {
			conscribe.config.doExamples = true;
		}
	}

	var publicInt = {
		init: function () {
			process.on('exit', function () {
				conscribe.console.finish();
			});
			// read in config file seems like a good place 
			// to start... 
			readConfig();
			// read in the schema file eh?
			var schema = readSchema();
			// ok this thing here is because we don't have
			// a good way to clone objects. This means we are
			// going to have to reparse channels as we go.
			conscribe.channels.raw = schema;
			// set the channels...
			var ch = JSON.parse(schema);

			conscribe.channels.init(ch.channels);
			// ok channels set now what?
			// let the channel handler take over.
			conscribe.channels.go();
			// pdf constructor
		}

	};

	return publicInt;

};

process.on("exit", function () {
	conscribe.console.finish();
});
conscribe.init().init();
/**
 * config:
 *
 * flags:
 * // we need two phases.
 * // docs phase and code phase.
 *
 * docs
 * generate MD
 * generate HTML
 * generate PDF
 * seperate Ext
 *
 *
 * js
 * validation-api
 * validation-map
 * fixture-map
 */