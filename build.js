#!/usr/bin/env node

/*jshint node:true*/
"use strict";

var spawn = require("child_process").spawn;
var requirejs = require("requirejs");
var data = require("./assets/data.json");

/* Build less file */
var lessc = spawn("node_modules/.bin/lessc", [
	"--compress",
	"style.less",
	"style.css"
]);

lessc.on("exit", function(code) {
	if (code) {
		console.log("lessc exited with code " + code);
		process.exit(1);
	} else {
		console.log("lessc done");

		/* Get markdown files from data */
		var mdFiles = [];
		Object.keys(data.sections).forEach(function(section) {
			Object.keys(data.sections[section]).forEach(function(item) {
				if ("text" in data.sections[section][item]) {
					mdFiles.push(data.sections[section][item].text);
				}
			});
		});

		/* Run requirejs optimizer */
		requirejs.optimize({
			baseUrl: "",
			name: "js/main",
			out: "js/main-built.js",
			optimize: "uglify2",
			paths: {
				"dom": "js/dom",
				"async": "lib/async",
				"ist": "lib/ist",
				"json": "lib/json",
				"markdownConverter": "lib/Markdown.Converter",
				"mdown": "lib/mdown",
				"text": "lib/text"
			},
			deps: mdFiles.map(function(file) {
				return "mdown!" + file;
			}),
			stubModules: ["text", "json", "mdown", "markdownConverter"]
		}, function() {
			console.log("requirejs done");
			process.exit(0);
		}, function(err) {
			console.log("requirejs error: " + err);
			process.exit(1);
		});
	}
});
