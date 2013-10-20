var fs = require("node-fs");
var finder = require("findit");
var markdownpdf = require("markdown-pdf");
var colors = require("colors");

module.exports = function pdf(conscribe) {

	var publicInt = {

		walk: function () {
			var baseDir = conscribe.config.baseDir + "/test/resources/docs/published/"; // hardcoded -- so far out of give a damn.
			var opts = {
				cssPath: conscribe.config.baseDir + conscribe.config.style.css
			};
			conscribe.console.newProcess("\n\nAttempting PDF Conversion\n\n");
			var count = 0;
			var fd = finder(baseDir);
			fd.on("file", function (file, stat) {

				if (file.indexOf(".md") !== -1) {

					var f = file;
					var g = f.split(".md");
					markdownpdf(file, opts, function (er, pdfPath) {
						if (er) return console.error(er);
						process.stdout.write("\r");
						count++;
						fs.rename(pdfPath, g[0] + ".pdf");
						var message =
							conscribe.console.message("Converted : " + count + " documents successfully");
					});
				}

			});
		}
	};
	return publicInt;
};