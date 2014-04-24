/*jshint browser:true*/
/*global require, requirejs*/
"use strict";

requirejs.config({
	baseUrl: "",
	paths: {
		"dom": "js/dom",
		"async": "lib/async",
		"ist": "lib/ist",
		"json": "lib/json",
		"markdownConverter": "lib/Markdown.Converter",
		"mdown": "lib/mdown",
		"text": "lib/text"
	}
});

require(["ist!template", "json!assets/data.json", "async", "dom"], function(template, data, async, dom) {
	var markdowns = [];
	Object.keys(data.sections).forEach(function(cat) {
		Object.keys(data.sections[cat]).forEach(function(item) {
			if ("text" in data.sections[cat][item]) {
				markdowns.push(data.sections[cat][item]);
			}
		});
	});

	async.each(markdowns, function(item, cb) {
		require(["mdown!" + item.text], function(text) {
			item.content = document.createElement("div");
			item.content.innerHTML = text;
			cb();
		});
	}, function() {
		document.body.appendChild(template.render(data));

		dom.behave(dom.body(), {
			".menu a": {
				"click": function(e) {
					var current = dom.$(".section.current");
					if (current) {
						current.classList.remove("current");
					}

					dom.$(".section#" + this.dataset.section).classList.add("current");

					e.preventDefault();
					return false;
				}
			},

			".item": {
				"click": function(e) {
					var current = dom.$(".expanded");

					if (current) {
						current.classList.remove("expanded");
					}

					this.classList.add("expanded");
					this.scrollIntoView(true);
				}
			}
		});
	});
});
