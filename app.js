const {MathpixMarkdownModel} = require('mathpix-markdown-it');

// requried by mathpix-markdown it for parse html back to markdown.
const Window = require('window');
const window = new Window();
global.window = window;
global.document = window.document;
 
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.DOMParser = new JSDOM().window.DOMParser;
// could be disabled if html -> markdown is not requried.

var fs = require('fs');
var app = require('http').createServer(handler)
app.listen(80);

const resources = [ 
"/index.css",
"/index.js",
"/favicon.ico"
];

function latex2svg(latex) {
  const options = {
    outMath: {
        include_asciimath: false,
        include_mathml: false,
        include_latex: true,
        include_svg: true,
        include_tsv: false,
        include_table_html: false
    }
  };
  
  const html = MathpixMarkdownModel.markdownToHTML(latex, options);
  const parsed = MathpixMarkdownModel.parseMarkdownByHTML(html, false);
  console.log("parsed = ", parsed);
  
  return parsed;
}

function handler (req, res) {

    console.log(req.url);
    if (resources.indexOf(req.url) >= 0) {
        
        var stream = fs.createReadStream(__dirname + "/static" + req.url);

        stream.on('error', function(error) {
            res.writeHead(404, 'Not Found');
            res.end();
        });

        stream.pipe(res);

    } else {

        if (req.url == "/latex2svg") {            

            data = []
            req.on('data', chunk =>{
                console.log(`data = ${chunk}`);
                data.push(chunk);

            }).on('end', () => {

                // hard coding test
                if (data.length == 0)
                    data = '{ "latex" : "\$\$ \\\\frac{1}{2}\$\$"}';

                json = JSON.parse(data);
                console.log(`json =`, json.latex);                
                svg = latex2svg(json.latex);
                console.log(`svg = ${svg}`);             
                res.writeHead(200);
                res.end(JSON.stringify(svg[1]));
            });


        } else {
            console.log("index.html");
            fs.readFile(__dirname + '/static/index.html', function (err, data) {

                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                res.writeHead(200);
                res.end(data);
            });
        }
    }
}


// Automation Testing
console.log("=== Automation Testing ===");

const axios = require('axios');

axios.post('http://localhost/latex2svg', {
  "latex": '\$\$\\frac{1}{2}\$\$'
}).then(res => {
    console.log(`Response.data : `, res.data);
});
