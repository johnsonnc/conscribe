var html = require("./conscribe.output.html");
var fixture = require("./conscribe.output.fixture");
var markdown = require("./conscribe.output.markdown");
var pdf = require("./conscribe.output.pdf");
var JSONSchema = require("./conscribe.output.JSONSchema");
var examples = require("./conscribe.output.examples");

module.exports = function output(conscribe) {
	var htmlexport = new html(conscribe);
	var examplesExport = new examples(conscribe);
	var fixtureexport = new fixture(conscribe);
	var markdownexport = new markdown(conscribe);
	var pdfexport = new pdf(conscribe);
	var JSONSchemaexport = new JSONSchema(conscribe);
	return {
		html: htmlexport,
		fixture: fixtureexport,
		markdown: markdownexport,
		pdf: pdfexport,
		JSONSchema: JSONSchemaexport,
		examples: examplesExport
	};
};