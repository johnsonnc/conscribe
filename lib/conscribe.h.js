var fs = require("fs");
var markdown = require("markdown").markdown;
var argv = require("optimist").usage("Conscribe (c) 2013 \nNicholas Johnson \n\n Used to generate JSON Schema and MD/HTML/PDF from a single schema\n\nUsage: $0 -c [config file]")
	.demand(["c"])
	.argv;
var colors = require("colors");

var conscribe = {};