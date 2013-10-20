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
			conscribe.console.newProcess("Baseline and Combined Builds");
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
					conscribe.console.message("Baseline : ".blue.italic);

					if (!channelSet[i].extension) {
						newChannel = conscribe.channels.baselineDoc(i);
						// ok scrub channel
						if (conscribe.config.doExamples === true) {
							conscribe.output.examples.generateExamples("baseline", newChannel, i);
						}
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
						conscribe.console.ignore("extension ");
					}

				}
				// start combined.
				// the easy one.
				var combinedConfig = docConfig.combined;

				if (combinedConfig.markdown || combinedConfig.html || combinedConfig.pdf) {
					conscribe.console.message("Combined : ".blue.italic);
					newChannel = channelSet[channelName];
					// ok scrub channel
					if (conscribe.config.doExamples) {
						conscribe.output.examples.generateExamples("combined", newChannel, i);
					}
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
			conscribe.console.message("\n\nConsolidation\n\n".blue.underline);
			conscribe.console.message("\nBaseline : ".blue.italic);
			conscribe.output.markdown.goConsolidate("baseline");
			conscribe.console.message("[" + ("markdown").green + "]");
			conscribe.output.html.goConsolidate(null, "baseline");
			conscribe.console.message("[" + ("html").green + "]");

			conscribe.console.message("\nCombined : ".blue.italic);
			conscribe.output.markdown.goConsolidate("combined");
			conscribe.console.message("[" + ("markdown").green + "]");
			conscribe.output.html.goConsolidate(null, "combined");
			conscribe.console.message("[" + ("html").green + "]");

			// extensions... ugh.
			// we have been feeding the outputers with only the channels. however we need a spec.
			var extensionsConfig = docConfig.baseline;

			if (extensionsConfig.markdown || extensionsConfig.html || extensionsConfig.pdf) {
				conscribe.console.newProcess("Building Extensions\n\n");
				var ext = conscribe.channels.extensionsDoc();
				// ok scrub channel
				var e, returnC;
				if (extensionsConfig.markdown) {
					if (conscribe.config.doExamples) {
						conscribe.console.message("Generating Examples!!\n\n".red.bold);

						conscribe.output.examples.generateExamplesExtensions(ext);
					}
					conscribe.console.newProcess("Begin Spec Build\n\n");
					for (i in ext) {
						conscribe.console.message("\n\n[" + i.red.italic + "]\n");
						for (e in ext[i]) {
							conscribe.console.newChannel(e);
							returnC = conscribe.output.markdown.goExtensions(ext[i][e], e, "extensions", i);
							if (returnC) {
								conscribe.console.success("markdown");
							}
						}
						conscribe.console.message(("\n\nProcessing of Extension Consolidation for " + i + "\n\n").blue.italic);
						conscribe.output.markdown.goConsolidateExtensions(i);
					}
				}

				if (extensionsConfig.html) {
					conscribe.console.newProcess("\n\nBegin Extension Docs HTML\n\n");
					for (i in ext) {
						conscribe.console.message("\n" + i.italic + " : ");
						returnC = conscribe.output.html.goExtensions(i);
						if (returnC) {
							conscribe.console.success("done");
						}

					}
				}


				conscribe.output.pdf.walk();
				conscribe.output.JSONSchema.go();
				conscribe.output.fixture.go();
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
						delete obj[i];
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
				var r = {};
				var i;
				for (i in args) {
					if (args[i].extension) {
						if (args[i].extensionName === currentExtension) {
							// but keep going.
							if (typeof (args[i].properties) === "object") {
								args[i].properties = recurseExt(args[i].properties);

							}
						} else {
							if (typeof (args[i].properties) === "object") {
								args[i].properties = recurseExt(args[i].properties);
								if (Object.keys(args[i].properties).length === 0) {
									args[i] = {};
								}
							} else {
								args[i] = {};
							}

						}

					} else {
						if (typeof (args[i].properties) === "object") {
							args[i].properties = recurseExt(args[i].properties);
							if (Object.keys(args[i].properties).length === 0) {
								args[i] = {};
							}
						} else {
							args[i] = {};
						}
					}
				}
				for (i in args) {
					if (Object.keys(args[i]).length !== 0) {
						r[i] = args[i];
					}
				}

				return r;
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
								if (Object.keys(prop.properties).length === 0) {
									channelSchema.payload[t] = {};
									prop = {};
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
								channelSchema.payload[t].properties = recurseExt(prop.properties);
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