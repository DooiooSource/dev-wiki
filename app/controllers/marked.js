var hljs = require('highlight.js');
var marked = require('marked');
marked.setOptions({
	sanitize: false,
	highlight: function(code, lang) {
		if (lang) {
			return hljs.highlight(lang, code, true).value;
		} else {
			return hljs.highlightAuto(code).value;
		};
	}
});

exports.parsemd = marked;




// Set default options
// marked.setOptions({
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: true,
//   smartLists: true,
//   smartypants: false,
//   langPrefix: 'language-',
//   highlight: function(code, lang) {
//     if (lang === 'js') {
//       return highlighter.javascript(code);
//     }
//     return code;
//   }
// });
// console.log(marked('i am using __markdown__.'));