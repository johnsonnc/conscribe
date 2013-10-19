"use strict";
var fs = fs || {};
var markdown = markdown || {};
var conscribe = conscribe || {};

conscribe.export.html = (function () {


	var publicInt = {
		go: function (channelName, type) {

			// ok need to get md file.
			var mdPath = conscribe.config.output[type] + "/md/" + channelName + ".md";
			var md = fs.readFileSync(mdPath, "utf8");

			var mdOutput = markdown.toHtml(md);
			var style = fs.readFileSync(conscribe.config.style.css, "utf8");

			var htmlOutput = style + mdOutput;

			var htmlPath = conscribe.config.output[type] + "/html/" + channelName + ".html";
			fs.writeFileSync(htmlPath, htmlOutput, "utf8");
			return true;
		},
		consolidate: function (channels, type) {
			var md = "";
			for (var i in channels) {
				var mdPath = conscribe.config.output[type] + "/md/" + i + ".md";
				md += fs.readFileSync(mdPath, "utf8");
			}

			// now we have one large md file.
			var mdOutput = markdown.toHtml(md);
			var style = fs.readFileSync(conscribe.config.style.css, "utf8");

			var htmlOutput = style + mdOutput;

			var htmlPath = conscribe.config.output[type] + "/html/" + type + ".html";
			fs.writeFileSync(htmlPath, htmlOutput, "utf8");

			return true;
		}
	};
	return publicInt;
}());