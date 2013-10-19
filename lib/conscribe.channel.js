"use strict";

var conscribe = conscribe | {};

conscribe.channels = (function () {

	var currentChannel;

	var channelSet;

	var publicInt = {
		init: function (args) {
			channelSet = args;
		},
		reparse: function () {
			return JSON.parse(conscribe.channels.raw);
		},
		setCurrentChannel: function (args) {
			currentChannel = args;
			return channelSet[args];
		},
		getCurrentChannel: function () {
			return currentChannel;
		},
		getAllChannels: function () {
			return channelSet;
		},
		go: function () {
			var channelIgnored;

			for (var i in channelSet) {
				var channelName = i;

				conscribe.console.newChannel(channelName);

				// check if channel is ignored.
				for (var x = 0; x < conscribe.config.ignore.length; x = x + 1) {
					if (conscribe.config.ignore[x] === channelName) {
						conscribe.console.fail("ignore");
						channelIgnored = true;
						break;
					}
				}
				// break out of main loop too.
				if (channelIgnored === true) {
					channelIgnored = false;
					continue;
				}

				// otherwise good to go.
				var newChannel;
				// docs start.
				var docConfig = conscribe.config.generate.docs;
				// start with baseline
				var baselineConfig = docConfig.baseline;
				var r;
				if (baselineConfig.markdown || baselineConfig.html || baselineConfig.pdf) {

					if (!channelSet[i].extension) {
						newChannel = conscribe.channels.baselineDoc(i);
						// ok scrub channel
					} else {
						conscribe.console.ignore("baseline : ");
					}
					if (baselineConfig.markdown) {
						r = conscribe.export.markdown(newChannel, i, "baseline");
						if (r) {
							conscribe.console.success("markdown");
						}
					}
					if (baselineConfig.html) {
						r = conscribe.export.html(i, "baseline");
						if (r) {
							conscribe.console.success("html");
						}
					}
					// here would be pdf



				}
				// start combined.
				var combinedConfig = docConfig.baseline;

				if (combinedConfig.markdown || combinedConfig.html || combinedConfig.pdf) {

					if (!channelSet[i].extension) {
						newChannel = channelSet[channelName];
						// ok scrub channel
					} else {
						conscribe.console.ignore("combined : ");
					}
					if (combinedConfig.markdown) {
						r = conscribe.export.markdown(newChannel, i, "combined");
						if (r) {
							conscribe.console.success("markdown");
						}
					}
					if (combinedConfig.html) {
						r = conscribe.export.html(i, "combined");
						if (r) {
							conscribe.console.success("html");
						}
					}
					// here would be pdf
				}
			}
		},
		baselineDoc: function (args) {
			var schema = conscribe.channels.reparse();
			var channel = args;
			var data = schema.channels(channel);
			//strip extensions...

			function recurse(obj) {
				for (var i in obj) {
					if (obj[i].extension) {
						obj[i] = {};
					} else if (typeof (obj[i].properties) === "object") {
						obj[i].properties = recurse(obj[i].properties);
					}
				}
			}

			for (var i in data.payload) {
				var property = data.payload[i];
				if (property.extension) {
					data.payload[i] = {};
				} else
				if (typeof (property.properties) === "object") {
					data.payload[i].properties = recurse(property.properties);
				}
			}
			return data;
		}
	};

	return publicInt;
}());