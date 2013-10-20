var fs = require("node-fs"); // this will probably break.
var markdown = require("markdown").markdown;

module.exports = function html(conscribe) {
	var conscribe = conscribe;

	var publicInt = {
		go: function (channelName, type) {

			// ok need to get md file.
			var mdPath = conscribe.config.baseDir + conscribe.config.output[type] + "/md/" + channelName + ".md";
			var md = fs.readFileSync(mdPath, "utf8");

			var mdOutput = markdown.toHTML(md);

			var style = fs.readFileSync(conscribe.config.baseDir + conscribe.config.style.css, "utf8");

			var htmlOutput = style + mdOutput;
			fs.mkdirSync(conscribe.config.baseDir + conscribe.config.output[type] + "/html/", 0777, true);
			var htmlPath = conscribe.config.baseDir + conscribe.config.output[type] + "/html/" + channelName + ".html";
			fs.writeFileSync(htmlPath, htmlOutput, "utf8");
			return true;

		},
		goConsolidate: function (channels, type) {
			var md = "";
			var style;
			if (type === "baseline" || type === "combined") {
				var baseDir = conscribe.config.baseDir + conscribe.config.output[type] + "/";

				var list = fs.readdirSync(baseDir);

				for (var e = 0; e < list.length; e++) {
					if (list[e].indexOf(".md") !== -1) {
						md = fs.readFileSync(baseDir + list[e], "utf8");
						var fileName = list[e].replace(".md", "");
						var html = markdown.toHTML(md);
						style = fs.readFileSync(conscribe.config.baseDir + conscribe.config.style.css, "utf8");
						var output = style + html;
						fs.writeFileSync(baseDir + fileName + ".html", output, "utf8");
					}

				}
				return true;
			} else {

				for (var i in channels) {
					var mdPath = conscribe.config.baseDir + conscribe.config.output[type] + "/md/" + i + ".md";
					md += "\n\n" + fs.readFileSync(mdPath, "utf8");
				}

				// now we have one large md file.
				var mdOutput = markdown.toHTML(md);
				style = fs.readFileSync(conscribe.config.baseDir + conscribe.config.style.css, "utf8");

				var htmlOutput = style + mdOutput;

				var htmlPath = conscribe.config.baseDir + conscribe.config.output[type] + "/html/" + type + ".html";
				fs.writeFileSync(htmlPath, htmlOutput, "utf8");
			}
			return true;
		},
		goExtensions: function (extension) {

			var type = "extensions";
			var style, html, nFile, eFile;
			//get our base MD path....
			var basePathMd = conscribe.config.baseDir + conscribe.config.output[type] + "/" + extension + "/" + "md/";
			var basePathHtml = conscribe.config.baseDir + conscribe.config.output[type] + "/" + extension + "/" + "html/";
			// get our files.
			var fileList = fs.readdirSync(basePathMd);
			fs.mkdirSync(basePathHtml, 0777, true);
			//this also so happen to hit our new/existing channels
			for (var i = 0; i < fileList.length; i++) {
				//var fileSplit = fileList[i].split(".");
				if (fileList[i].indexOf(".md") !== -1) {
					var fileName = fileList[i].replace(".md", "");

					var file = fs.readFileSync(basePathMd + fileList[i], "utf8");
					html = markdown.toHTML(file);
					style = fs.readFileSync(conscribe.config.baseDir + conscribe.config.style.css, "utf8");
					var singleOut = style + html;

					fs.writeFileSync(basePathHtml + fileName + ".html", singleOut, "utf8");
				}
			}

			// consolidate said channels...
			var fileNew = basePathMd + extension + "-newChannels.md";
			if (fs.existsSync(fileNew)) {
				nFile = fs.readFileSync(fileNew, "utf8");
			} else {
				nFile = "";
			}

			var fileExisting = basePathMd + extension + "-existingChannels.md";
			if (fs.existsSync(fileExisting)) {
				eFile = fs.readFileSync(fileExisting, "utf8");
			} else {
				eFile = "";
			}


			// now smash said files together like a fat kid in fiat!
			var cFile = nFile + "\n\n" + eFile;
			fs.writeFileSync(conscribe.config.baseDir + conscribe.config.output[type] + "/" + extension + "/" + extension + ".md", cFile, "utf8");
			html = markdown.toHTML(cFile);
			var oFile = style + html;

			fs.writeFileSync(conscribe.config.baseDir + conscribe.config.output[type] + "/" + extension + "/" + extension + ".html", oFile, "utf8");
			//ok everyone is in their place.
			return true;
		}
	};
	return publicInt;
};