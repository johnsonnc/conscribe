module.exports = function channels(conscribe) {

	var conscribe = conscribe;
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
			var docConfig;
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
				docConfig = conscribe.config.generate.docs;
				// start with baseline
				var baselineConfig = docConfig.baseline;
				var r;
				if (baselineConfig.markdown || baselineConfig.html || baselineConfig.pdf) {

					if (!channelSet[i].extension) {
						newChannel = conscribe.channels.baselineDoc(i);
						// ok scrub channel

						if (baselineConfig.markdown) {
							r = conscribe.output.markdown.go(newChannel, i, "baseline");
							if (r) {
								conscribe.console.success("markdown");
							}
						}
						if (baselineConfig.html) {
							r = conscribe.output.html.go(i, "baseline");
							if (r) {
								conscribe.console.success("html");
							}
						}
					} else {
						conscribe.console.ignore("baseline ");
					}
					// here would be pdf



				}
				// start combined.
				// the easy one.
				var combinedConfig = docConfig.combined;

				if (combinedConfig.markdown || combinedConfig.html || combinedConfig.pdf) {

					newChannel = channelSet[channelName];
					// ok scrub channel

					if (combinedConfig.markdown) {
						r = conscribe.output.markdown.go(newChannel, i, "combined");
						if (r) {
							conscribe.console.success("markdown");
						}
					}
					if (combinedConfig.html) {
						r = conscribe.output.html.go(i, "combined");
						if (r) {
							conscribe.console.success("html");
						}
					}
					// here would be pdf
				}

			}
			// extensions... ugh.
			// we have been feeding the outputers with only the channels. however we need a spec.
			var extensionsConfig = docConfig.baseline;

			if (extensionsConfig.markdown || extensionsConfig.html || extensionsConfig.pdf) {

				var ext = conscribe.channels.extensionsDoc();
				// ok scrub channel

				if (extensionsConfig.markdown) {
					for (i in ext) {
						var returnC;
						for (var e in ext[i]) {
							returnC = conscribe.output.markdown.goExtensions(ext[i][e], e, "extensions", i);
							if (returnC) {
								conscribe.console.success("markdown");
							}
						}
					}
				}

				/*if (extensionsConfig.html) {
					r = conscribe.output.html(i, "extensions");
					if (r) {
						conscribe.console.success("html");
					}
				}*/
				// here would be pdf
			}
		},
		baselineDoc: function (args) {
			var schema = conscribe.channels.reparse();
			var channel = args;
			var data = schema.channels[channel];
			//strip extensions...

			function recurse(obj) {
				for (var i in obj) {
					if (obj[i].extension) {
						obj[i] = {};
					} else if (typeof (obj[i].properties) === "object") {
						obj[i].properties = recurse(obj[i].properties);
					}
				}
				return obj;
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
		},

		extensionsDoc: function () {
			// This goes through the whole schema and documents were
			// the extensions are.

			var schema = conscribe.channels.reparse();
			var channels = schema.channels;
			var extensions = {};
			// pass one figure out our extension names. 
			var currentChannel, prop;

			function recurse(args) {
				for (var i in args) {
					if (args[i].extension) {
						if (Object.prototype.toString.call(extensions[args[i].extensionName]) !== "[object Array]") {
							extensions[args[i].extensionName] = [];
						}
						extensions[args[i].extensionName].push(currentChannel);
					}
					if (typeof (args[i].properties) === "object") {
						recurse(args[i].properties);
					}
				}
			}
			for (var i in channels) {
				currentChannel = i;

				if (channels[i].extension) {
					if (Object.prototype.toString.call(extensions[channels[i].extensionName]) !== "[object Array]") {
						extensions[channels[i].extensionName] = [];
					}
					extensions[channels[i].extensionName].push(currentChannel);
				}

				for (var x in channels[i].payload) {
					prop = channels[i].payload[x];
					if (prop.extension) {
						if (Object.prototype.toString.call(extensions[prop.extensionName]) !== "[object Array]") {
							extensions[prop.extensionName] = [];
						}
						extensions[prop.extensionName].push(currentChannel);
					}
					if (typeof (prop.properties) === "object") {
						recurse(prop.properties);
					}

				}
			}

			var currentExtension;

			function recurseExt(args) {
				//var r = true;
				for (var i in args) {
					if (args[i].extension) {
						if (args[i].extensionName === currentExtension) {
							// but keep going.
							if (typeof (args[i].properties) === "object") {
								args[i].properties = recurseExt(args[i].properties);
							}
						} else {
							if (typeof (args[i].properties) === "object") {
								args[i].properties = recurseExt(args[i].properties);
								if (args[i].properties === {}) {
									args[i] = {};
								}
							} else {
								args[i] = {};
							}

						}

					} else {
						if (typeof (args[i].properties) === "object") {
							args[i].properties = recurseExt(args[i].properties);
							if (args[i].properties === {}) {
								args[i] = {};
							}
						} else {
							args[i] = {};
						}
					}
				}

				return args;
			}
			// now we can roll through are new shiny array and start removing properties for each spec.
			var returnVar = {};
			for (var z in extensions) {
				var l = false;
				currentExtension = z;
				returnVar[z] = {};
				var c = extensions[z]; // array of channels.
				// need to reparse schema...	
				schema = conscribe.channels.reparse();
				for (var y = 0; y < c.length; y = y + 1) {
					currentChannel = c[y];
					var channelSchema = schema.channels[currentChannel];
					for (var t in channelSchema.payload) {
						prop = channelSchema.payload[t];
						// does prop match our current extension name
						if (prop.extensionName !== z) {
							// keep going
							if (typeof (prop.properties) === "object") {
								prop.properties = recurseExt(prop.properties);
								if (prop.properties === {}) {
									channelSchema.payload[t] = {};
									//prop = {};
								} else {
									l = true;
								}
							} else {
								// delete it.
								channelSchema.payload[t] = {};
								//prop = {};
							}
						} else {
							// keep prop but check below.
							if (typeof (prop.properties) === "object") {
								channelSchema.payload[t] = recurseExt(prop.properties);
							}
							l = true;
						}
					}
					if (channelSchema.extensionName !== c && l === false) {
						// by by channel.
						channelSchema = {};
					}

					if (channelSchema.extensionName === z) {
						channelSchema.isNew = true;

					} else {
						channelSchema.isExisting = true;
					}

					returnVar[z][currentChannel] = channelSchema;
				}
				// channelSchema should cosiontain a clean extension channel.

			}
			return returnVar;
		}
	};

	return publicInt;
};