// latex2svg.js

const {MathpixMarkdownModel} = require('mathpix-markdown-it');

// requried by mathpix-markdown it for parse html back to markdown.
// const Window = require('window');
// const window = new Window();
// global.window = window;
// global.document = window.document;
 
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.DOMParser = new JSDOM().window.DOMParser;
// could be disabled if html -> markdown is not requried.

function latex2svg(latex) {
  const options = {
    outMath: {
        include_asciimath: false,
        include_mathml: false,
        include_latex: false,
        include_svg: true,
        include_tsv: false,
        include_table_html: false
    }
  };
  
  const html = MathpixMarkdownModel.markdownToHTML(latex, options);
  //const parsed = MathpixMarkdownModel.parseMarkdownByHTML(html, false);
  //console.log("parsed = ", parsed);
  console.log("html = ", html);
  return { svg: html };
  return html;
}

module.exports = latex2svg;