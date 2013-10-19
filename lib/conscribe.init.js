"use strict";

var fs = fs || {};
var argv = argv || {};
var conscribe = {};


conscribe.init = (function () {

	var currentDir = __dirname__;


	function readSchema() {
		var baseDir,
			schemaFile,
			schema,
			parsedSchema;

		baseDir = conscribe.config.baseDir || __dirname__;

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

	}

	var publicInt = {
		init: function () {
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
			conscribe.channels.init(JSON.parse(schema.channels));
			// ok channels set now what?
			// let the channel handler take over.
			conscribe.channels.go();
		}

	};

	return publicInt;

}());

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