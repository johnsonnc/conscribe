
var fs = require("fs");
var markdown = require("markdown").markdown;
var argv = require("optimist").usage("Conscribe (c) 2013 \nNicholas Johnson \n\n Used to generate JSON Schema and MD/HTML/PDF from a single schema\n\nUsage: $0 -c [config file]")
	.demand(["c"])
	.argv;
var colors = require("colors");
var conscribe = {};


conscribe.init = (function(){
	
	var currentDir = __dirname__;

	
	function reader(){

	}

	var publicInt = {
		init : function(){
			conscript.config = JSON.parse(fs.readFileSync(argv.c, "utf8"));

		},

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