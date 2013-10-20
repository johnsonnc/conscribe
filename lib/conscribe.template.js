var header = require("./conscribe.template.header");

module.exports = function template(conscribe) {

	var headersE = new header(conscribe);

	return {
		header: headersE
	};



};