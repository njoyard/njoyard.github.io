ist.js is a client-side javascript templating engine that generates DOM nodes based on templates written using a CSS-like selector syntax, not unlike [HAML] or [Jade].

I built ist.js when working on nestor.  Having worked with many other templating engines (notably [Twig], [Handlebars]/[Mustache] and [Jade]) I either found their template syntaxes not easy to write in an error-prone manner and to maintain, or their way of generating nodes not optimal.  I wanted an engine that allowed the user to write templates efficiently, and I wanted it to generate DOM nodes instead of HTML code.  That's why I started ist.js, and made it evolve a lot as friends and myself started using it in our projects and needed more features.

ist.js has the following main features:

* simple and clear syntax based on CSS selectors
* templates can include any javascript code
* extensible directive API, with built-in standard directives (@if, @each...)
* rendered templates are updateable when the associated data changes

[haml]: http://haml.info/
[handlebars]: http://handlebarsjs.com/
[jade]: http://jade-lang.com/
[mustache]: http://mustache.github.io/
[twig]: http://twig.sensiolabs.org/