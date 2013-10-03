/**
 * Conscribe.js
 * Used to merge JSON Schema(ish) files with MD
 */

var fs = require("fs");
var path = require("path");

// read in JSON file...
var file = __dirname + '/test/schema.json';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.dir(data);
});