var fs = require("node-fs");

module.exports = function JSONSchema(conscribe) {
	"use strict";
	var conscribe = conscribe;
	var publicInt = {
		go: function () {

			var schema = fs.readFileSync(conscribe.config.baseDir + conscribe.config.schemaFile, "utf8");

			schema = JSON.parse(schema);
			var channels = schema.channels;
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

			fs.writeFileSync(conscribe.config.baseDir + conscribe.config.output.combined + "/validation-schema.json", JSON.stringify(output, null, 4));

		}
	};

	return publicInt;
};