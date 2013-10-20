var fs = require("node-fs");
var traverse = require("traverse");

module.exports = function fixture(conscribe) {

	"use strict";
	var conscribe = conscribe;

	var publicInt = {
		go: function () {
			var schema = fs.readFileSync(conscribe.config.baseDir + conscribe.config.schemaFile, "utf8");

			var schemaX = JSON.parse(schema);

			var output = "";
			var channels = traverse(schemaX.channels).map(function (x) {
				if (this.key === "description") {
					this.remove();
				} else if (this.key === "purpose") {
					this.remove();
				} else if (this.key === "extension") {
					this.remove();
				} else if (this.key === "extensionName") {
					this.remove();
				} else if (this.key === "noDocument") {
					this.remove();
				}
			});
			schema = JSON.parse(schema);
			schema.channels = channels;
			var file = conscribe.config.baseDir + conscribe.config.output.combined + "/cmwa-fixture.js";
			//output = conscribe.config.generation.fixture.header;

			output += JSON.stringify(schema) + ";";
			fs.writeFileSync(file, output, "utf8");
			console.log("CMWA Fixture Successfully Written @" + file.green);
		}
	};

	return publicInt;
};