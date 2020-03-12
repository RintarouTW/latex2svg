// latex2svg.js

const {MathpixMarkdownModel} = require('mathpix-markdown-it');

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
  return { svg: html };
  return html;
}

exports.handler = function(event, context, callback) {

  console.log(event);

  data = event.body ? event.body : '{ "latex" : "\$\$ \\\\frac{1}{2}\$\$"}';
  json = {};

  try {
    json = JSON.parse(data);
  } catch (err) {
    console.log(data, err);
  }

  console.log(`json.latex =`, json.latex);

  obj = { svg :"Failed to convert"};

  if (json.latex) {
    obj = latex2svg(json.latex);
    console.log(`obj = `, obj); 
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(obj)
  });
}
