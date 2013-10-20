var fs = require("node-fs");

module.exports = function header(conscribe) {
	var conscribe = conscribe;

	var publicInt = {

		getHeader: function (mode, extension) {
			var r;
			var baseDir = conscribe.config.baseDir + conscribe.config.headers[mode];
			if (mode === "extensions") {
				r = fs.readFileSync(baseDir + "/" + extension + ".header.md", "utf8");
			} else {
				r = fs.readFileSync(baseDir + "/" + mode + ".header.md", "utf8");
			}
			return r;
		}

	};


	return publicInt;
};