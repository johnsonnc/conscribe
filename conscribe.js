/**
 * Conscribe.js
 * Used to merge JSON Schema(ish) files with MD
 */

var fs = require("fs");
var path = require("path");
var schmea;
// read in JSON file...
var schema_file = __dirname + '/test/schema.json';

fs.readFile(schema_file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  schema = JSON.parse(data);

  
});

var examples_files = __dirname + '/text/examples.md';

fs.readFile(examples_file,'utf8', function(err,data){

if (err) {
    console.log('Error: ' + err);
    return;
  }

  examples = JSON.parse(data);
});


for(var i in schema.schema){
	schem = schema.schema;

	var composedString;

	composedString = "##" + i "\n\n";
	composedString = "Purpose : " + schem[i].purpose + "\n\n";
	composedString = "";
	examples.replace('/<' + i + '>/g', composedString);
}