var html = require("./conscribe.output.html");
var fixture = require("./conscribe.output.fixture");
var markdown = require("./conscribe.output.markdown");
var pdf = require("./conscribe.output.pdf");
var JSONSchema = require("./conscribe.output.JSONSchema");

module.exports = function output(conscribe) {
	var htmlexport = new html(conscribe);
	var fixtureexport = fixture;
	var markdownexport = new markdown(conscribe);
	var pdfexport = pdf;
	var JSONSchemaexport = JSONSchema;
	return {
		html: htmlexport,
		fixture: fixtureexport,
		markdown: markdownexport,
		pdf: pdfexport,
		JSONSchema: JSONSchemaexport
	};
};